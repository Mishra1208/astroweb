"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

export default function FloatingAvatar() {
    const { scrollY } = useScroll();
    const [isMounted, setIsMounted] = useState(false);
    const [endPosition, setEndPosition] = useState("-85vw"); // Default for Desktop

    // Fade in delay to avoid clashing with Loading Screen
    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 3500); // 3.5s delay (after loading)

        // Mobile Adjustment: Move less distance to prevent cutoff
        if (window.innerWidth < 768) {
            setEndPosition("-65vw"); // iPhone Safe Zone
        }

        return () => clearTimeout(timer);
    }, []);

    // Scroll Logic: 
    // At scrollY = 0 (Top), x = 0 (Right side)
    // At scrollY = 1000 (Scrolled down), x = - (Window Width - Offset) (Left side)

    // Smooth spring physics for the movement
    const rawX = useTransform(scrollY, [0, 800], ["0vw", endPosition]);
    const x = useSpring(rawX, { stiffness: 60, damping: 20 });

    // Also rotate slightly as it moves
    const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

    if (!isMounted) return null;

    return (
        <motion.div
            style={{
                position: 'fixed',
                bottom: '110px', // Raised to sit ABOVE the WhatsApp button
                right: '30px', // Starts at Bottom Right
                x, // Moves Left on scroll
                zIndex: 40, // Below Navbar/Modals, above content
                pointerEvents: 'none' // Let clicks pass through empty space
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Draggable Inner Wrapper */}
            <motion.div
                drag
                dragMomentum={true}
                whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                style={{
                    cursor: 'grab',
                    pointerEvents: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {/* Solar Rays - Crisp & Radiating (Wrapper for Center Alignment) */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '240%',
                    height: '240%',
                    zIndex: -1,
                    pointerEvents: 'none'
                }}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: 'repeating-conic-gradient(from 0deg, transparent 0deg, transparent 4deg, rgba(255, 180, 0, 0.4) 6deg, transparent 8deg)',
                            maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
                            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
                        }}
                    />
                </div>

                {/* Inner Glow Pulse */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120%',
                        height: '120%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255, 140, 0, 0.3) 0%, transparent 70%)',
                        zIndex: -1,
                    }}
                />

                {/* Rotating Rays Ring */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: -10,
                        borderRadius: '50%',
                        border: '2px dashed rgba(255, 215, 0, 0.5)',
                        rotate
                    }}
                />

                {/* Avatar Image */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid rgba(255, 215, 0, 0.8)', // Gold Border
                    boxShadow: '0 0 20px rgba(255, 140, 0, 0.6)', // Orange Glow
                    background: '#000'
                }}>
                    <img
                        src="/maa.png"
                        alt="Maa Avatar"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
