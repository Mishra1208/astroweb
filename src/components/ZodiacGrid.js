"use client";

import styles from "./ZodiacGrid.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import HoroscopeModal from "./HoroscopeModal";

const zodiacSigns = [
    { name: "मेष (Aries)", id: "Aries", date: "21 मार्च - 19 अप्रैल", img: "/zodiac/aries.png" },
    { name: "वृषभ (Taurus)", id: "Taurus", date: "20 अप्रैल - 20 मई", img: "/zodiac/taurus.png" },
    { name: "मिथुन (Gemini)", id: "Gemini", date: "21 मई - 20 जून", img: "/zodiac/gemini.png" },
    { name: "कर्क (Cancer)", id: "Cancer", date: "21 जून - 22 जुलाई", img: "/zodiac/cancer.png" },
    { name: "सिंह (Leo)", id: "Leo", date: "23 जुलाई - 22 अगस्त", img: "/zodiac/leo.png" },
    { name: "कन्या (Virgo)", id: "Virgo", date: "23 अगस्त - 22 सितंबर", img: "/zodiac/virgo.png" },
    { name: "तुला (Libra)", id: "Libra", date: "23 सितंबर - 22 अक्टूबर", img: "/zodiac/libra.png" },
    { name: "वृश्चिक (Scorpio)", id: "Scorpio", date: "23 अक्टूबर - 21 नवंबर", img: "/zodiac/scorpio.png" },
    { name: "धनु (Sagittarius)", id: "Sagittarius", date: "22 नवंबर - 21 दिसंबर", img: "/zodiac/sagittarius.png" },
    { name: "मकर (Capricorn)", id: "Capricorn", date: "22 दिसंबर - 19 जनवरी", img: "/zodiac/capricorn.png" },
    { name: "कुंभ (Aquarius)", id: "Aquarius", date: "20 जनवरी - 18 फरवरी", img: "/zodiac/aquarius.png" },
    { name: "मीन (Pisces)", id: "Pisces", date: "19 फरवरी - 20 मार्च", img: "/zodiac/pisces.png" },
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
                        whileHover={{ y: -10 }}
                    >
                        <div className={styles.iconWrapper}>
                            <img src={sign.img} alt={sign.name} className={styles.signImage} />
                        </div>
                        <h3 className={styles.name}>{sign.name}</h3>
                        <p className={styles.date}>{sign.date}</p>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {selectedSign && (
                    <HoroscopeModal
                        sign={selectedSign.name}
                        signId={selectedSign.id}
                        icon={selectedSign.img} // Passing img path now
                        onClose={() => setSelectedSign(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
