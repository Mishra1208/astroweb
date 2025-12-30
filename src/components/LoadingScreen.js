"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if intro has already been shown in this session
        const hasShown = sessionStorage.getItem("introShown");

        if (hasShown) {
            setIsLoading(false);
        } else {
            // Simulate loading time (Optimized to 3s)
            const timer = setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem("introShown", "true");
            }, 3000);
            return () => clearTimeout(timer);
        }
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
                        zIndex: 20000,
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

                    {/* Goddess Eye Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            width: '280px',
                            height: 'auto',
                            marginBottom: '1rem',
                            zIndex: 20,
                            position: 'relative'
                        }}
                    >
                        <motion.img
                            src="/eye.png"
                            alt="Divine Goddess Eye"
                            animate={{
                                filter: ["drop-shadow(0 0 15px rgba(196, 90, 0, 0.4))", "drop-shadow(0 0 40px rgba(196, 90, 0, 0.9))", "drop-shadow(0 0 15px rgba(196, 90, 0, 0.4))"],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </motion.div>


                    {/* Spinning Sri Yantra / Mandala Image */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                            width: '280px',
                            height: '280px',
                            position: 'relative',
                            zIndex: 10,
                            border: '1px solid rgba(176, 141, 87, 0.2)',
                            borderRadius: '50%',
                            padding: '10px',
                            background: 'rgba(176, 141, 87, 0.05)',
                            boxShadow: '0 0 30px rgba(196, 90, 0, 0.2)'
                        }}
                    >
                        {/* Inner Image */}
                        <div style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <img
                                src="/mandala-glow.jpg"
                                alt="Loading Mandala"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: 'sepia(0.5) contrast(1.2)' // Blends better with parchment
                                }}
                            />
                        </div>
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
                        {/* Institute Name */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 1 }}
                            style={{
                                textAlign: 'center',
                                marginBottom: '0.5rem'
                            }}
                        >
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '2rem',
                                background: 'linear-gradient(to right, #7A1E1E, #C45A00)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                margin: 0,
                                fontWeight: '800',
                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                                letterSpacing: '1px'
                            }}>
                                जय मां भवानी ज्योतिष शोध संस्थान
                            </h2>
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10, letterSpacing: '5px' }}
                            animate={{ opacity: 1, y: 0, letterSpacing: '8px' }}
                            transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
                            style={{
                                fontFamily: 'var(--font-rozha)',
                                background: 'linear-gradient(to right, var(--accent-red), var(--accent-main))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: '2rem',
                                textTransform: 'uppercase',
                                filter: 'drop-shadow(0 0 2px rgba(176, 141, 87, 0.3))'
                            }}
                        >
                            आचार्य पंडित राज कुमार तिवारी
                        </motion.h1>

                        {/* Hindi Subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.9 }}
                            transition={{ delay: 0.9 }}
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
                            transition={{ delay: 1.5 }}
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
