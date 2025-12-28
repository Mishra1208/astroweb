"use client";

import styles from "./FindMySign.module.css";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ConstellationLoader from "./ConstellationLoader";

export default function FindMySign() {
    const [date, setDate] = useState("");
    const [result, setResult] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);

    // Generate stable stars for background
    const stars = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            cx: Math.random() * 100,
            cy: Math.random() * 100,
            delay: Math.random()
        }));
    }, []);

    const calculateSign = (dateString) => {
        if (!dateString) return null;

        const d = new Date(dateString);
        const day = d.getDate();
        const month = d.getMonth() + 1; // 1-12

        let sign = "";
        let icon = "";
        let hindiName = "";

        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
            sign = "Aries"; hindiName = "मेष"; icon = "/zodiac/aries.png";
        } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
            sign = "Taurus"; hindiName = "वृषभ"; icon = "/zodiac/taurus.png";
        } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
            sign = "Gemini"; hindiName = "मिथुन"; icon = "/zodiac/gemini.png";
        } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
            sign = "Cancer"; hindiName = "कर्क"; icon = "/zodiac/cancer.png";
        } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
            sign = "Leo"; hindiName = "सिंह"; icon = "/zodiac/leo.png";
        } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
            sign = "Virgo"; hindiName = "कन्या"; icon = "/zodiac/virgo.png";
        } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
            sign = "Libra"; hindiName = "तुला"; icon = "/zodiac/libra.png";
        } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
            sign = "Scorpio"; hindiName = "वृश्चिक"; icon = "/zodiac/scorpio.png";
        } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
            sign = "Sagittarius"; hindiName = "धनु"; icon = "/zodiac/sagittarius.png";
        } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
            sign = "Capricorn"; hindiName = "मकर"; icon = "/zodiac/capricorn.png";
        } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
            sign = "Aquarius"; hindiName = "कुंभ"; icon = "/zodiac/aquarius.png";
        } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
            sign = "Pisces"; hindiName = "मीन"; icon = "/zodiac/pisces.png";
        }

        return { sign, hindiName, icon };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setResult(null);
        setIsVerifying(true);
    };

    const handleVerificationComplete = () => {
        const res = calculateSign(date);
        setResult(res);
        setIsVerifying(false);
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
                <p className={styles.subtext}>अपनी जन्मतिथि दर्ज करें और ब्रह्मांड में अपना स्थान खोजें।</p>

                {!isVerifying && !result && (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input
                                type="date"
                                className={styles.input}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <motion.button
                            className={styles.button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                        >
                            खोजें
                        </motion.button>
                    </form>
                )}

                <AnimatePresence mode="wait">
                    {isVerifying && (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ConstellationLoader onComplete={handleVerificationComplete} />
                        </motion.div>
                    )}

                    {result && !isVerifying && (
                        <motion.div
                            key="result"
                            className={styles.result}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <div className={styles.iconWrapper}>
                                <div className={styles.iconGlow}></div>
                                <img src={result.icon} alt={result.sign} className={styles.signImage} />
                            </div>
                            <h3 className={styles.signName}>{result.hindiName}</h3>
                            <p className={styles.dateRange}>{result.sign}</p>

                            <motion.button
                                className={styles.button}
                                style={{ marginTop: '2rem', fontSize: '0.8rem' }}
                                onClick={() => setResult(null)}
                                whileHover={{ scale: 1.05 }}
                            >
                                पुनः प्रयास करें
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
