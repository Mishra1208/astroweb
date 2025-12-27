"use client";

import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Track Scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const menuItems = [
        { name: 'होम', id: 'home' },
        { name: 'राशिफल', id: 'horoscope' },
        { name: 'टैरो', id: 'tarot' },
        { name: 'हमारे बारे में', id: 'about' }
    ];

    return (
        <>
            {/* 1. PILL NAVBAR (Top State) */}
            <motion.nav
                className={`${styles.navbar} ${isScrolled ? styles.navbarHidden : ''}`}
                initial={{ y: 0, opacity: 1 }}
                animate={{
                    y: isScrolled ? -100 : 0,
                    opacity: isScrolled ? 0 : 1
                }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.logo}>
                    ASTRO<span style={{ color: 'var(--accent-main)' }}>WEB</span>
                </div>
                {/* Only visible on Desktop in Pill Mode */}
                <div className={styles.links}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            href={`#${item.id}`}
                            className={styles.link}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </motion.nav>

            {/* 2. HAMBURGER BUTTON (Scroll State) */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.button
                        className={styles.hamburgerBtn}
                        onClick={toggleMenu}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* 3. FULL SCREEN OVERLAY */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button className={styles.closeBtn} onClick={toggleMenu}>&times;</button>

                        <div className={styles.overlayLinks}>
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={`#${item.id}`}
                                        className={styles.overlayLink}
                                        onClick={toggleMenu} // Close on click
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
