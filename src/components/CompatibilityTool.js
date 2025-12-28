'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import styles from './CompatibilityTool.module.css';

export default function CompatibilityTool() {
    const [names, setNames] = useState({ boy: '', girl: '' });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = () => {
        if (!names.boy || !names.girl) return;

        setLoading(true);
        setTimeout(() => {
            // Simulated Vedic Algorithm for Demo
            // Random score between 15 and 36
            const score = Math.floor(Math.random() * (36 - 15 + 1)) + 15;

            let message = "";
            if (score >= 28) message = "उत्तम मिलान! (Excellent Match) - शुभ विवाह योग।";
            else if (score >= 18) message = "सामान्य मिलान (Average Match) - दोष निवारण आवश्यक।";
            else message = "कठिन मिलान (Difficult Match) - आचार्य जी से परामर्श लें।";

            setResult({ score, message });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                <Heart size={28} color="#C45A00" style={{ display: 'inline', marginRight: '10px' }} />
                निःशुल्क गुण मिलान
            </h2>
            <p className={styles.subtitle}>Check your Vedic Love Compatibility Score</p>

            <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>वर का नाम (Boy's Name)</label>
                    <input
                        className={styles.input}
                        placeholder="Enter Name"
                        value={names.boy}
                        onChange={(e) => setNames({ ...names, boy: e.target.value })}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>वधू का नाम (Girl's Name)</label>
                    <input
                        className={styles.input}
                        placeholder="Enter Name"
                        value={names.girl}
                        onChange={(e) => setNames({ ...names, girl: e.target.value })}
                    />
                </div>
            </div>

            <button className={styles.calculateBtn} onClick={handleCalculate} disabled={loading}>
                {loading ? 'गणना हो रही है...' : 'मिलान देखें (Calculate)'}
            </button>

            {result && (
                <motion.div
                    className={styles.result}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className={styles.score}>{result.score} / 36</span>
                    <p className={styles.message}>{result.message}</p>
                    <a
                        href={`https://wa.me/918601042988?text=Acharya Ji, I checked compatibility for ${names.boy} and ${names.girl} and got score ${result.score}. Please analyze detail.`}
                        target="_blank"
                        className={styles.ctaLink}
                    >
                        📲 विस्तृत रिपोर्ट के लिए संपर्क करें (Get Full Report)
                    </a>
                </motion.div>
            )}
        </div>
    );
}
