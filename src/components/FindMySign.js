"use client";

import styles from "./FindMySign.module.css";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ConstellationLoader from "./ConstellationLoader";

export default function FindMySign() {
    const [activeTab, setActiveTab] = useState("simple"); // 'simple' | 'precise'
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedGeo, setSelectedGeo] = useState(null); // { lat, lon }
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    // Generate stable stars for background
    const stars = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            cx: Math.random() * 100,
            cy: Math.random() * 100,
            delay: Math.random()
        }));
    }, []);

    // Western Calculation (Simple)
    const calculateWesternSign = (dateString) => {
        if (!dateString) return null;
        const d = new Date(dateString);
        const day = d.getDate();
        const month = d.getMonth() + 1;

        let sign = "";
        let icon = "";
        let hindiName = "";

        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) { sign = "Aries"; hindiName = "मेष"; icon = "/zodiac/aries.png"; }
        else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) { sign = "Taurus"; hindiName = "वृषभ"; icon = "/zodiac/taurus.png"; }
        else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) { sign = "Gemini"; hindiName = "मिथुन"; icon = "/zodiac/gemini.png"; }
        else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) { sign = "Cancer"; hindiName = "कर्क"; icon = "/zodiac/cancer.png"; }
        else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) { sign = "Leo"; hindiName = "सिंह"; icon = "/zodiac/leo.png"; }
        else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) { sign = "Virgo"; hindiName = "कन्या"; icon = "/zodiac/virgo.png"; }
        else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) { sign = "Libra"; hindiName = "तुला"; icon = "/zodiac/libra.png"; }
        else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) { sign = "Scorpio"; hindiName = "वृश्चिक"; icon = "/zodiac/scorpio.png"; }
        else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) { sign = "Sagittarius"; hindiName = "धनु"; icon = "/zodiac/sagittarius.png"; }
        else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) { sign = "Capricorn"; hindiName = "मकर"; icon = "/zodiac/capricorn.png"; }
        else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) { sign = "Aquarius"; hindiName = "कुंभ"; icon = "/zodiac/aquarius.png"; }
        else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) { sign = "Pisces"; hindiName = "मीन"; icon = "/zodiac/pisces.png"; }

        return { sign, hindiName, icon, type: "Western Sun Sign" };
    };

    // Live City Search
    const handleCityChange = async (e) => {
        const val = e.target.value;
        setCity(val);
        setSelectedGeo(null); // Reset precise selection if user edits

        if (val.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            // Debounce could be added here, but for simplicity triggering on change > 3 chars
            // Open-Meteo is fast enough.
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(val)}&count=5&language=en&format=json`);
            const geoData = await geoRes.json();
            if (geoData.results) {
                setSuggestions(geoData.results);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
            }
        } catch (err) {
            console.error("Geo search failed", err);
        }
    };

    const selectCity = (item) => {
        const displayName = `${item.name}, ${item.admin1 || ''}, ${item.country || ''}`;
        setCity(displayName);
        setSelectedGeo({ lat: item.latitude, lon: item.longitude });
        setSuggestions([]);
        setShowSuggestions(false);
    };

    // Precise Vedic Calculation
    const calculateVedicSign = async () => {
        try {
            setLoading(true);
            let latitude, longitude;

            if (selectedGeo) {
                // Use pre-selected accurate coordinates
                latitude = selectedGeo.lat;
                longitude = selectedGeo.lon;
            } else {
                // Fallback: If user typed but didn't select, try one last fetch
                const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
                const geoData = await geoRes.json();

                if (!geoData.results || geoData.results.length === 0) {
                    alert("शहर नहीं मिला. कृपया सुझावों में से चुनें.");
                    setLoading(false);
                    return;
                }
                latitude = geoData.results[0].latitude;
                longitude = geoData.results[0].longitude;
            }

            // 2. Local Backend Calculation
            const res = await fetch(`/api/calculate-sign?dob=${date}&time=${time}&lat=${latitude}&lon=${longitude}&tz=5.5`); // Defaulting TZ to 5.5 for simplicity, perfectly accurate for India
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setResult({
                ...data,
                type: "Vedic Moon Sign (Rashi)"
            });

        } catch (error) {
            console.error(error);
            alert("गणना विफल रही. कृपया विवरण जांचें.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setResult(null);

        if (activeTab === "simple") {
            setLoading(true);
            setTimeout(() => {
                const res = calculateWesternSign(date);
                setResult(res);
                setLoading(false);
            }, 1500); // Fake delay for effect
        } else {
            if (!date || !time || !city) {
                alert("कृपया सही जानकारी भरें (कैलकुलेशन के लिए).");
                return;
            }
            calculateVedicSign();
        }
    };

    return (
        <section className={styles.section}>
            <motion.div
                className={styles.container}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className={styles.heading}>अपनी राशि जानें</h2>
                <p className={styles.subtext}>
                    {activeTab === "simple"
                        ? "अपनी जन्मतिथि से जानें अपना सूर्य राशि (Western)"
                        : "अपनी जन्म कुंडली से जानें अपनी सटीक चंद्र राशि (Vedic)"}
                </p>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'simple' ? styles.activeTab : ''}`}
                        onClick={() => { setActiveTab('simple'); setResult(null); }}
                    >
                        जन्म तारीख अनुसार
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'precise' ? styles.activeTab : ''}`}
                        onClick={() => { setActiveTab('precise'); setResult(null); }}
                    >
                        वैदिक कुंडली अनुसार
                    </button>
                </div>

                {!loading && !result && (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>जन्म तिथि (Date of Birth)</label>
                            <input
                                type="date"
                                className={styles.input}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        {activeTab === 'precise' && (
                            <>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>जन्म समय (Birth Time)</label>
                                    <input
                                        type="time"
                                        step="1"
                                        className={styles.input}
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>जन्म स्थान (Birth Place)</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={city}
                                            onChange={handleCityChange}
                                            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                                            placeholder="शहर का नाम लिखें (e.g. Prayagraj)"
                                            required
                                            autoComplete="off"
                                        />
                                        {showSuggestions && suggestions.length > 0 && (
                                            <motion.ul
                                                className={styles.suggestionsList}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {suggestions.map((item, index) => (
                                                    <motion.li
                                                        key={item.id}
                                                        className={styles.suggestionItem}
                                                        onClick={() => selectCity(item)}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                    >
                                                        {item.country_code && (
                                                            <img
                                                                src={`https://flagcdn.com/w40/${item.country_code.toLowerCase()}.png`}
                                                                alt={item.country_code}
                                                                className={styles.flag}
                                                            />
                                                        )}
                                                        <div className={styles.suggestionText}>
                                                            <strong>{item.name}</strong>
                                                            <small> {item.admin1}, {item.country}</small>
                                                        </div>
                                                    </motion.li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        <motion.button
                            className={styles.button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                        >
                            {activeTab === 'simple' ? 'अपनी राशि जानें' : 'अपनी राशि जानें'}
                        </motion.button>
                    </form>
                )}

                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ConstellationLoader onComplete={() => { }} />
                        </motion.div>
                    )}

                    {result && !loading && (
                        <motion.div
                            key="result"
                            className={styles.result}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <div className={styles.badge}>{result.type}</div>
                            <div className={styles.iconWrapper}>
                                <div className={styles.iconGlow}></div>
                                <img src={result.icon} alt={result.sign} className={styles.signImage} />
                            </div>
                            <h3 className={styles.signName}>{result.hindiName}</h3>
                            <p className={styles.dateRange}>{result.sign}</p>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <motion.button
                                    className={styles.button}
                                    style={{ fontSize: '0.9rem', width: 'auto', padding: '0.8rem 1.5rem' }}
                                    onClick={() => setResult(null)}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    पुनः जाँचें
                                </motion.button>

                                {activeTab === 'precise' && selectedGeo && (
                                    <a
                                        href={`/kundli?date=${date}&time=${time}&lat=${selectedGeo.lat}&lng=${selectedGeo.lon}&city=${encodeURIComponent(city)}&tz=5.5`}
                                        className={styles.button} // Reusing button class for consistent style
                                        style={{
                                            fontSize: '0.9rem',
                                            width: 'auto',
                                            padding: '0.8rem 1.5rem',
                                            textDecoration: 'none',
                                            background: 'linear-gradient(to right, #fbbf24, #d97706)',
                                            color: '#000',
                                            fontWeight: 'bold',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        लग्न कुंडली देखें 🕉️
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
