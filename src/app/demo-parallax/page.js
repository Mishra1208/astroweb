"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const videos = [1, 2, 3, 4, 5];

export default function DemoParallax() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <div ref={ref} style={{ height: '300vh', background: '#111', color: '#fff' }}>
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <h1 style={{ fontFamily: 'serif', fontSize: '3rem', color: '#d4af37', marginBottom: '50px' }}>
                    The Vedic Reel (Scroll Down)
                </h1>

                <motion.div style={{ x, display: 'flex', gap: '50px', paddingLeft: '20vw' }}>
                    {videos.map((v) => (
                        <div key={v} style={{
                            flex: '0 0 400px',
                            height: '250px',
                            border: '10px solid #d4af37',
                            background: '#222',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            {/* Ornamental Pillar Left */}
                            <div style={{
                                position: 'absolute', left: '-30px', height: '100%', width: '20px', background: '#d4af37'
                            }}></div>

                            <h2>Chapter {v}</h2>

                            {/* Ornamental Pillar Right */}
                            <div style={{
                                position: 'absolute', right: '-30px', height: '100%', width: '20px', background: '#d4af37'
                            }}></div>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div style={{ position: 'fixed', bottom: 20, right: 20, color: '#666' }}>
                Scroll to explore...
            </div>
        </div>
    );
}
