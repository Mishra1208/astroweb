"use client";

import styles from "./HoroscopeModal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchDailyHoroscope } from "@/lib/api";

export default function HoroscopeModal({ sign, signId, onClose, icon }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('today');

    useEffect(() => {
        let isMounted = true;

        async function getData() {
            setLoading(true);
            const result = await fetchDailyHoroscope(signId, timeframe);

            if (isMounted) {
                setData(result);
                setLoading(false);
            }
        }

        if (signId) {
            getData();
        }

        return () => { isMounted = false; };
    }, [signId, timeframe]);

    if (!sign) return null;

    return (
        <AnimatePresence>
            <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className={styles.modal}
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <motion.button
                        className={styles.closeButton}
                        onClick={onClose}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        ×
                    </motion.button>

                    <div className={styles.header}>
                        <motion.div
                            className={styles.icon}
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 2, 0, -2, 0]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <img src={icon} alt={sign} />
                        </motion.div>
                        <motion.h2
                            className={styles.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {sign}
                        </motion.h2>
                    </div>

                    <div className={styles.tabs}>
                        {[
                            { id: 'today', label: 'आज' },
                            { id: 'tomorrow', label: 'कल' },
                            { id: 'weekly', label: 'साप्ताहिक' },
                            { id: 'monthly', label: 'मासिक' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                className={`${styles.tab} ${timeframe === tab.id ? styles.activeTab : ''}`}
                                onClick={() => setTimeframe(tab.id)}
                            >
                                {tab.label}
                                {timeframe === tab.id && (
                                    <motion.div
                                        layoutId="horoscopeIndicator"
                                        className={styles.tabIndicator}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className={styles.contentArea}>
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={styles.loadingWrapper}
                                >
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            opacity: [0.5, 1, 0.5]
                                        }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className={styles.loadingPulse}
                                    >
                                        ✨
                                    </motion.div>
                                    <p className={styles.loadingText}>
                                        सितारों की चाल देखी जा रही है...
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={timeframe}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <p className={styles.text}>{data?.text}</p>

                                    <div className={styles.footer}>
                                        {data?.readMoreUrl ? (
                                            <a
                                                href={data.readMoreUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.readMore}
                                            >
                                                विस्तार से पढ़ें →
                                            </a>
                                        ) : <div />}

                                        <div className={styles.sourceInfo}>
                                            <span className={styles.liveDot}></span>
                                            {data?.isLive ? (
                                                <a
                                                    href="https://www.livehindustan.com/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.sourceLink}
                                                >
                                                    {data.source} Live
                                                </a>
                                            ) : "Archived"}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
