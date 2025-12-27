"use client";

import styles from "./HoroscopeModal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchDailyHoroscope } from "@/lib/api";

export default function HoroscopeModal({ sign, signId, onClose, icon }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function getData() {
            setLoading(true);
            // Wait a small bit to show loading state (optional, just for feel)
            // await new Promise(r => setTimeout(r, 500)); 

            const result = await fetchDailyHoroscope(signId);

            if (isMounted) {
                setData(result);
                setLoading(false);
            }
        }

        if (signId) {
            getData();
        }

        return () => { isMounted = false; };
    }, [signId]);

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
                    initial={{ scale: 0.8, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: 50, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className={styles.closeButton} onClick={onClose}>×</button>

                    <div className={styles.header}>
                        <span className={styles.icon}>{icon}</span>
                        <h2 className={styles.title}>{sign}</h2>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                style={{
                                    display: 'inline-block',
                                    width: '50px',
                                    height: '50px',
                                    border: '4px solid rgba(255,215,0,0.3)',
                                    borderTop: '4px solid gold',
                                    borderRadius: '50%'
                                }}
                            />
                            <p style={{ marginTop: '1.5rem', color: '#ccc', fontFamily: 'var(--font-poppins)' }}>
                                सितारों से संपर्क हो रहा है...
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.details}>
                                {data.mood && <span className={styles.tag}>{data.mood}</span>}
                                {data.chakra && <span className={styles.tag}>{data.chakra}</span>}
                            </div>
                            <p className={styles.text}>{data.text}</p>

                            <div style={{
                                marginTop: '1.5rem',
                                fontSize: '0.85rem',
                                color: data.isLive ? '#4ade80' : '#fda4af',
                                textAlign: 'right',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '6px'
                            }}>
                                <span style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: data.isLive ? '#4ade80' : '#fda4af',
                                    display: 'inline-block'
                                }}></span>
                                {data.isLive ? "लाइव भविष्यवाणी (API)" : "ऑफ़लाइन संग्रह (Offline)"}
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
