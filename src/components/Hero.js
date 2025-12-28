"use client";

import styles from "./Hero.module.css";
import { motion } from "framer-motion";
import MandalaBackground from "./MandalaBackground";

export default function Hero() {
    return (
        <section className={styles.hero} id="home">
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <MandalaBackground />
            </div>

            {/* OM Symbol - Spiritual Focus */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                    width: '80px',
                    height: '80px',
                    marginBottom: '1rem',
                    position: 'relative',
                    zIndex: 2,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 0 20px rgba(196, 90, 0, 0.4)',
                    border: '2px solid rgba(176, 141, 87, 0.6)'
                }}
            >
                <img
                    src="/om-symbol.jpg"
                    alt="Om Symbol"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </motion.div>

            <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                अपना भविष्य जानें
            </motion.h1>

            <motion.p
                className={styles.subtitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
            >
                सितारों के रहस्य को जानें। दैनिक राशिफल, टैरो कार्ड रीडिंग और गहरे ज्योतिषीय ज्ञान का अनुभव करें।
            </motion.p>

            <motion.button
                className={styles.ctaButton}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    const element = document.getElementById('horoscope');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
            >
                अपना राशिफल देखें
            </motion.button>
        </section>
    );
}
