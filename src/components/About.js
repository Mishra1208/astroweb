"use client";

import styles from "./About.module.css";
import { motion } from "framer-motion";

export default function About() {
    return (
        <section className={styles.section} id="about">
            <div className={styles.container}>
                <motion.div
                    className={styles.textContent}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.heading}>ब्रह्मांड का रहस्य</h2>
                    <p className={styles.text}>
                        हमने एक ऐसा मंच बनाया है जो सिर्फ गणना नहीं करता, बल्कि आपको महसूस कराहता है कि आप इस विशाल ब्रह्मांड का हिस्सा हैं।
                        वैदिक ज्योतिष और आधुनिक खगोल विज्ञान का यह अनूठा संगम आपको अपने जीवन को एक नए नजरिए से देखने में मदद करता है।
                    </p>
                    <p className={styles.text}>
                        ग्रहों की स्थिति आपके भाग्य का नक्शा नहीं, बल्कि मौसम की तरह है। हम आपको बताते हैं कि कब 'छाता' लेना है और कब धूप का आनंद लेना है।
                    </p>
                </motion.div>

                <motion.div
                    className={styles.visualContent}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.solarSystem}>
                        {/* Realistic Sun */}
                        <div className={styles.sun}></div>

                        {/* Mercury Orbit */}
                        <div className={`${styles.orbit} ${styles.o1}`}>
                            <div className={`${styles.pWrap} ${styles.pw1}`}>
                                <div className={`${styles.planet} ${styles.mercury}`}></div>
                            </div>
                        </div>

                        {/* Earth Orbit */}
                        <div className={`${styles.orbit} ${styles.o2}`}>
                            <div className={`${styles.pWrap} ${styles.pw2}`}>
                                <div className={`${styles.planet} ${styles.earth}`}></div>
                            </div>
                        </div>

                        {/* Saturn Orbit */}
                        <div className={`${styles.orbit} ${styles.o3}`}>
                            <div className={`${styles.pWrap} ${styles.pw3}`}>
                                <div className={`${styles.planet} ${styles.saturn}`}>
                                    <div className={styles.saturnRing}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
