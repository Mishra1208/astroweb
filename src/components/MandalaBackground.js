"use client";

import { motion } from "framer-motion";

export default function MandalaBackground() { // Simple Sri Yantra-inspired geometric pattern
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.15 // Subtle watermark
        }}>
            <motion.svg
                width="800"
                height="800"
                viewBox="0 0 100 100"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                style={{ fill: 'none', stroke: '#B08D57', strokeWidth: '0.2' }}
            >
                {/* Outer Circles */}
                <circle cx="50" cy="50" r="48" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="45" />

                {/* Petals (Simplified) */}
                {[...Array(16)].map((_, i) => (
                    <circle
                        key={i}
                        cx={50 + 40 * Math.cos(i * Math.PI / 8)}
                        cy={50 + 40 * Math.sin(i * Math.PI / 8)}
                        r="5"
                    />
                ))}

                {/* Inner Triangles / Geometry */}
                <polygon points="50,10 90,80 10,80" />
                <polygon points="50,90 90,20 10,20" />
                <polygon points="50,15 85,75 15,75" strokeWidth="0.1" />
                <polygon points="50,85 85,25 15,25" strokeWidth="0.1" />

                {/* Center */}
                <circle cx="50" cy="50" r="2" fill="#B08D57" />
            </motion.svg>
        </div>
    );
}
