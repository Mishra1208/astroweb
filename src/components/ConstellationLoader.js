"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Simplified "Generic Constellation" paths relative to a 100x100 viewBox
// In a full version, we could have specific paths for each sign.
const genericPath = "M 20 80 L 35 50 L 50 80 L 80 20 L 60 40";

export default function ConstellationLoader({ onComplete }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000); // 3 seconds calculation
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div style={{
            width: '100%',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }}>
            {/* Pulsing Stars */}
            <div style={{ position: 'relative', width: '150px', height: '150px' }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>

                    {/* Glowing Connections - Darker Gold */}
                    <motion.path
                        d={genericPath}
                        fill="transparent"
                        stroke="#B45309"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        style={{ filter: 'drop-shadow(0 0 2px rgba(180, 83, 9, 0.5))' }}
                    />

                    {/* Stars - positioned at vertices of the generic path approximately */}
                    <Star cx="20" cy="80" delay={0} />
                    <Star cx="35" cy="50" delay={0.4} />
                    <Star cx="50" cy="80" delay={0.8} />
                    <Star cx="80" cy="20" delay={1.2} />
                    <Star cx="60" cy="40" delay={1.6} />

                    {/* Random background stars */}
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            cx={Math.random() * 100}
                            cy={Math.random() * 100}
                            r={0.5}
                            delay={Math.random()}
                        />
                    ))}

                </svg>
            </div>

            {/* Loading Text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                    marginTop: '2rem',
                    fontFamily: 'var(--font-rozha)',
                    color: '#92400e', /* Dark Brown/Maroon */
                    fontSize: '1.4rem',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}
            >
                नक्षत्र गणना...
                <span style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-poppins)',
                    color: '#B45309', /* Dark Gold */
                    letterSpacing: '2px',
                    marginTop: '0.3rem',
                    opacity: 0.9,
                    fontWeight: '600'
                }}>
                    Verifying Constellation...
                </span>
            </motion.p>
        </div>
    );
}

function Star({ cx, cy, r = 2, delay }) {
    return (
        <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="#B45309" /* Dark Star */
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1], opacity: 1 }}
            transition={{ delay: delay, duration: 1, repeat: Infinity, repeatType: "reverse" }}
            style={{ filter: 'drop-shadow(0 0 2px rgba(180, 83, 9, 0.5))' }}
        />
    );
}
