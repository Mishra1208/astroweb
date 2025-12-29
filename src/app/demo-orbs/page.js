"use client";

import { motion } from 'framer-motion';

const videos = [1, 2, 3, 4];

export default function DemoOrbs() {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#090a0f',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
        }}>
            {/* Simple Star Background */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                opacity: 0.1,
                zIndex: 0
            }}></div>

            <h1 style={{
                zIndex: 10,
                fontSize: '3rem',
                color: '#60a5fa',
                marginBottom: '4rem',
                textShadow: '0 0 20px rgba(96, 165, 250, 0.6)',
                fontFamily: 'serif'
            }}>Mystic Portal Orbs</h1>

            <div style={{
                display: 'flex',
                gap: '4rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                zIndex: 10,
                perspective: '1000px'
            }}>
                {videos.map((v, i) => (
                    <motion.div
                        key={v}
                        animate={{
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        whileHover={{
                            scale: 1.2,
                            boxShadow: "0 0 50px rgba(251, 191, 36, 0.6)",
                            borderColor: "rgba(251, 191, 36, 1)"
                        }}
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: `radial-gradient(circle at 30% 30%, rgba(20,20,40,0.9), #000)`,
                            border: '2px solid rgba(96, 165, 250, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 0 30px rgba(96, 165, 250, 0.2)',
                            position: 'relative'
                        }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem' }}>🔮</div>
                            <span style={{ fontFamily: 'serif', marginTop: '10px', display: 'block' }}>Vision {v}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
