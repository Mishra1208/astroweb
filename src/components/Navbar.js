"use client";

import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Track Scroll & Resize
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        handleScroll();
        handleResize();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const menuItems = [
        { name: 'होम', id: 'home', href: '/' },
        { name: 'सेवाएं', id: 'services', href: '/services' },
        { name: 'राशिफल', id: 'horoscope', href: '/services#horoscope' },
        { name: 'टैरो', id: 'tarot', href: '/services#tarot' }
    ];

    return (
        <>
            {/* 1. PILL NAVBAR (Top State) */}
            {/* Hidden on mobile to avoid clutter, replaced by Logo+Burger */}
            {!isMobile && (
                <motion.nav
                    className={`${styles.navbar} ${isScrolled ? styles.navbarHidden : ''}`}
                    initial={{ y: 0, x: "-50%", opacity: 1 }}
                    animate={{
                        y: isScrolled ? -100 : 0,
                        x: "-50%", // Maintain centering during scroll animation
                        opacity: isScrolled ? 0 : 1
                    }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Left Ganesh */}
                    <img src="/ganesh.png" alt="Shree Ganesh" className={styles.ganeshIcon} />

                    {/* Updated Branding: Full Hindi Name */}
                    <div className={styles.logo} style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', textAlign: 'center', lineHeight: 1.2 }}>
                        आचार्य पंडित <span style={{ color: 'var(--accent-main)' }}>राज कुमार तिवारी</span>
                    </div>

                    <div className={styles.links}>
                        {menuItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={styles.link}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Ganesh */}
                    <img src="/ganesh.png" alt="Shree Ganesh" className={styles.ganeshIcon} />
                </motion.nav>
            )}

            {/* Mobile Logo (Visible on Mobile, Hides on Scroll) */}
            {isMobile && (
                <motion.div
                    className={styles.mobileLogo}
                    initial={{ y: 0, x: "-50%", opacity: 1 }}
                    animate={{
                        y: isScrolled ? -100 : 0,
                        x: "-50%",
                        opacity: isScrolled ? 0 : 1
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'fixed',
                        top: '1.5rem', // Moved up slightly to fit vertical stack
                        left: '50%', // Centered
                        zIndex: 10000,
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        color: 'var(--accent-red)',
                        textShadow: '0 0 10px rgba(239, 230, 216, 0.8)',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        flexDirection: 'column', // Vertical Stack
                        alignItems: 'center',
                        gap: '0.2rem' // Tight gap between icon and text
                    }}
                >
                    {/* Single Top Ganesh Icon */}
                    <img
                        src="/ganesh.png"
                        alt="Ganesh"
                        style={{
                            height: '45px', // Slightly larger for center focus
                            width: 'auto',
                            filter: 'drop-shadow(0 0 5px gold)'
                        }}
                    />

                    {/* Brand Name Below */}
                    <span>
                        आचार्य पंडित <span style={{ color: 'var(--accent-main)' }}>राज कुमार तिवारी</span>
                    </span>
                </motion.div>
            )}

            {/* 2. HAMBURGER BUTTON (Scroll State OR Mobile) */}
            {/* Always visible on mobile, visible on scroll for desktop */}
            <AnimatePresence>
                {(isScrolled || isMobile) && (
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
                                        href={item.href}
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
