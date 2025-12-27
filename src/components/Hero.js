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

            <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                अपनी ब्रह्मांडीय<br />नियति खोजें
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
            >
                अपना राशिफल देखें
            </motion.button>
        </section>
    );
}
