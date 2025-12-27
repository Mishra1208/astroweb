"use client";

import styles from "./ZodiacGrid.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import HoroscopeModal from "./HoroscopeModal";

const zodiacSigns = [
    { name: "मेष (Aries)", id: "Aries", date: "21 मार्च - 19 अप्रैल", icon: "♈" },
    { name: "वृषभ (Taurus)", id: "Taurus", date: "20 अप्रैल - 20 मई", icon: "♉" },
    { name: "मिथुन (Gemini)", id: "Gemini", date: "21 मई - 20 जून", icon: "♊" },
    { name: "कर्क (Cancer)", id: "Cancer", date: "21 जून - 22 जुलाई", icon: "♋" },
    { name: "सिंह (Leo)", id: "Leo", date: "23 जुलाई - 22 अगस्त", icon: "♌" },
    { name: "कन्या (Virgo)", id: "Virgo", date: "23 अगस्त - 22 सितंबर", icon: "♍" },
    { name: "तुला (Libra)", id: "Libra", date: "23 सितंबर - 22 अक्टूबर", icon: "♎" },
    { name: "वृश्चिक (Scorpio)", id: "Scorpio", date: "23 अक्टूबर - 21 नवंबर", icon: "♏" },
    { name: "धनु (Sagittarius)", id: "Sagittarius", date: "22 नवंबर - 21 दिसंबर", icon: "♐" },
    { name: "मकर (Capricorn)", id: "Capricorn", date: "22 दिसंबर - 19 जनवरी", icon: "♑" },
    { name: "कुंभ (Aquarius)", id: "Aquarius", date: "20 जनवरी - 18 फरवरी", icon: "♒" },
    { name: "मीन (Pisces)", id: "Pisces", date: "19 फरवरी - 20 मार्च", icon: "♓" },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function ZodiacGrid() {
    const [selectedSign, setSelectedSign] = useState(null);

    return (
        <section className={styles.gridSection} id="horoscope">
            <motion.h2
                className={styles.heading}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                अपनी राशि चुनें
            </motion.h2>

            <motion.div
                className={styles.grid}
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
            >
                {zodiacSigns.map((sign) => (
                    <motion.div
                        key={sign.id}
                        className={styles.card}
                        variants={item}
                        onClick={() => setSelectedSign(sign)}
                    >
                        <span className={styles.icon}>{sign.icon}</span>
                        <h3 className={styles.name}>{sign.name}</h3>
                        <p className={styles.date}>{sign.date}</p>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {selectedSign && (
                    <HoroscopeModal
                        sign={selectedSign.name}
                        signId={selectedSign.id} // Pass ID for data lookup
                        icon={selectedSign.icon}
                        onClose={() => setSelectedSign(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
