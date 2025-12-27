"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time (Increased to 4.5s for readability)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 4500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="loading-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'var(--bg-primary)', // Parchment
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundImage: "url('/textures/paper-noise.png')",
                        backgroundBlendMode: 'multiply'
                    }}
                >
                    {/* Golden Glow Behind */}
                    <div style={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(176, 141, 87, 0.4) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                    }}></div>

                    {/* Spinning Sri Yantra / Mandala SVG */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        style={{ width: '150px', height: '150px', position: 'relative', zIndex: 10 }}
                    >
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Outer Circle */}
                            <circle cx="50" cy="50" r="48" stroke="#B08D57" strokeWidth="1" />
                            <circle cx="50" cy="50" r="45" stroke="#B08D57" strokeWidth="0.5" strokeDasharray="2 2" />

                            {/* Simplified Yantra Geometry (Interlocking Triangles) */}
                            <path d="M50 5 L85 80 H15 Z" stroke="#C45A00" strokeWidth="1" fill="none" opacity="0.8" />
                            <path d="M50 95 L15 20 H85 Z" stroke="#C45A00" strokeWidth="1" fill="none" opacity="0.8" />
                            <path d="M50 15 L75 70 H25 Z" stroke="#B08D57" strokeWidth="0.8" fill="none" opacity="0.6" />
                            <path d="M50 85 L25 30 H75 Z" stroke="#B08D57" strokeWidth="0.8" fill="none" opacity="0.6" />

                            {/* Central Bindu */}
                            <circle cx="50" cy="50" r="2" fill="#7A1E1E" />
                        </svg>
                    </motion.div>

                    {/* Text Container */}
                    <motion.div
                        style={{
                            marginTop: '3rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.8rem'
                        }}
                    >
                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10, letterSpacing: '5px' }}
                            animate={{ opacity: 1, y: 0, letterSpacing: '8px' }}
                            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                            style={{
                                fontFamily: 'var(--font-rozha)',
                                background: 'linear-gradient(to right, var(--accent-red), var(--accent-main))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: '2.5rem',
                                textTransform: 'uppercase',
                                filter: 'drop-shadow(0 0 2px rgba(176, 141, 87, 0.3))'
                            }}
                        >
                            ASTROWEB
                        </motion.h1>

                        {/* Hindi Subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.9 }}
                            transition={{ delay: 1.2 }}
                            style={{
                                fontFamily: 'var(--font-rozha)',
                                color: 'var(--accent-main)',
                                fontSize: '1.2rem',
                                letterSpacing: '1px',
                                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}
                        >
                            ब्रह्मांड के साथ संरेखण...
                        </motion.p>

                        {/* English Cinematic Subtitle */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            transition={{ delay: 1.8 }}
                            style={{
                                fontSize: '0.75rem',
                                fontFamily: 'var(--font-body)',
                                color: 'var(--text-main)',
                                textTransform: 'uppercase',
                                letterSpacing: '6px',
                                marginTop: '0.2rem',
                                fontWeight: '600'
                            }}
                        >
                            Aligning the Cosmos
                        </motion.span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
