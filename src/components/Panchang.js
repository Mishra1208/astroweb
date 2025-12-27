"use client";

import styles from "./Panchang.module.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Panchang() {
    const [currentDate, setCurrentDate] = useState("");
    const [rahuKaal, setRahuKaal] = useState("");

    const [sunData, setSunData] = useState({
        sunrise: "--:--",
        sunset: "--:--",
        abhijit: "11:45 AM - 12:30 PM" // Approximate fixed window for now
    });
    const [locationName, setLocationName] = useState("Delhi (Default)");

    useEffect(() => {
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(date.toLocaleDateString('hi-IN', options));

        // Helper: Convert "HH:MM AM" string to Date object for today
        const parseTime = (timeStr) => {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':');
            if (hours === '12') hours = '00';
            if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
            const d = new Date();
            d.setHours(hours, minutes, 0);
            return d;
        };

        // Helper: Format Date object back to "HH:MM AM"
        const formatTime = (dateObj) => {
            return dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        };

        const calculateVedicTimes = (sunriseStr, sunsetStr) => {
            if (sunriseStr === "--:--" || sunsetStr === "--:--") return;

            const sunRise = parseTime(sunriseStr);
            const sunSet = parseTime(sunsetStr);

            // 1. Calculate Day Duration (Dinmaan)
            const dayDurationMinutes = (sunSet - sunRise) / 1000 / 60;
            const oneEighth = dayDurationMinutes / 8; // Each Muhurat is ~90 mins (but exactly 1/8th)

            // 2. Calculate Abhijit Muhurat (Midday - 4th segment? No, it's roughly 8th Muhurat of 15, or midday)
            // Simpler reliable rule: Midpoint of day +/- 24 mins
            const midDay = new Date(sunRise.getTime() + (dayDurationMinutes * 60 * 1000) / 2);
            const abhijitStart = new Date(midDay.getTime() - 24 * 60 * 1000);
            const abhijitEnd = new Date(midDay.getTime() + 24 * 60 * 1000);

            setSunData(prev => ({
                ...prev,
                abhijit: `${formatTime(abhijitStart)} - ${formatTime(abhijitEnd)}`
            }));

            // 3. Calculate Rahu Kaal (Based on Weekday Octant)
            // Mon: 2nd, Tue: 7th, Wed: 5th, Thu: 6th, Fri: 4th, Sat: 3rd, Sun: 8th
            const dayIndex = date.getDay(); // 0=Sun, 1=Mon...
            const octantMap = {
                1: 1, // Mon (2nd part, index 1)
                2: 6, // Tue (7th part, index 6)
                3: 4, // Wed (5th part, index 4)
                4: 5, // Thu (6th part, index 5)
                5: 3, // Fri (4th part, index 3)
                6: 2, // Sat (3rd part, index 2)
                0: 7  // Sun (8th part, index 7)
            };

            const startMinutes = octantMap[dayIndex] * oneEighth;
            const endMinutes = startMinutes + oneEighth;

            const rahuStart = new Date(sunRise.getTime() + startMinutes * 60 * 1000);
            const rahuEnd = new Date(sunRise.getTime() + endMinutes * 60 * 1000);

            setRahuKaal(`${formatTime(rahuStart)} - ${formatTime(rahuEnd)}`);
        };

        const fetchSunTimes = async (lat, lng, locName) => {
            try {
                const res = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`);
                const data = await res.json();

                if (data.results) {
                    // API returns UTC ISO strings
                    const sunriseDate = new Date(data.results.sunrise);
                    const sunsetDate = new Date(data.results.sunset);

                    const sunriseTime = sunriseDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
                    const sunsetTime = sunsetDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

                    setSunData(prev => ({
                        ...prev,
                        sunrise: sunriseTime,
                        sunset: sunsetTime
                    }));
                    setLocationName(locName);

                    // Trigger Calculation with live times
                    calculateVedicTimes(sunriseTime, sunsetTime);
                }
            } catch (err) {
                console.error("API Error:", err);
            }
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => fetchSunTimes(position.coords.latitude, position.coords.longitude, "Local Time"),
                (error) => {
                    console.warn("Location denied, using Delhi default.");
                    fetchSunTimes(28.6139, 77.2090, "Delhi (Default)"); // Default to New Delhi
                }
            );
        } else {
            fetchSunTimes(28.6139, 77.2090, "Delhi (Default)");
        }
    }, []);

    const items = [
        { label: "सूर्योदय", time: sunData.sunrise, img: "/zodiac/sunrise.png", id: "sunrise" },
        { label: "सूर्यास्त", time: sunData.sunset, img: "/zodiac/sunset.svg", id: "sunset" },
        { label: "राहु काल (अशुभ)", time: rahuKaal, img: "/zodiac/rahu.png", id: "rahu", isDanger: true },
        { label: "अभिजित मुहूर्त (शुभ)", time: sunData.abhijit, img: "/zodiac/subh.png", id: "abhijit" }
    ];

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
        >
            <div className={styles.header}>
                <h2 className={styles.title}>आज का पंचांग</h2>
                <div className={styles.date}>{currentDate}</div>
            </div>

            <div className={styles.grid}>
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        className={`${styles.dialCard} ${item.isDanger ? styles.danger : ''}`}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className={styles.dialCircle}>
                            <img src={item.img} alt={item.label} className={styles.dialIcon} />
                        </div>
                        <span className={styles.label}>{item.label}</span>
                        <span className={styles.time}>{item.time}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
