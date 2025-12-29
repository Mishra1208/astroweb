
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Garland({ side = 'left' }) {
    const isLeft = side === 'left';
    // Increase to 7 strings for a richer, grander pillar look (Temple Luxury)
    const strings = [0, 1, 2, 3, 4, 5, 6];

    // State to delay the start of the animation until after loading screen
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        const hasShown = sessionStorage.getItem("introShown");
        const delay = hasShown ? 100 : 3200; // Immediate if already shown, else sync with loading

        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, delay);
        return () => clearTimeout(timer);
    }, []);

    // State for scroll visibility
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Show only when at the very top (within 100px)
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -500 }} // Pull up out of view
            transition={{ duration: 0.8, ease: "easeInOut" }} // Slow, elegant retraction
            style={{
                position: 'fixed',
                top: 0,
                [side]: '-20px', // Slight negative to hug edge
                height: '40vh',
                width: '350px', // Slightly wider for 7 strings
                zIndex: 9998,
                pointerEvents: 'none',
            }}
            className={`fixedGarland ${side}`}
        >
            {/* Render strings absolutely positioned within this bunch container */}
            {strings.map((i) => (
                <GarlandString
                    key={i}
                    index={i}
                    side={side}
                    total={strings.length}
                    shouldAnimate={startAnimation && isVisible}
                />
            ))}
        </motion.div>
    );
}

function GarlandString({ index, side, total, shouldAnimate }) {
    const isLeft = side === 'left';

    // Physics Parameters
    // Outer strings (higher index) sway more? Or random?
    // Let's make them slightly different so they don't move in unison.
    const waveDelay = index * 0.15;
    const duration = 2 + (index % 3) * 0.5; // 2.0, 2.5, 3.0...

    // Calculate overlap
    // We want them clustered. 
    // Let's spread them across the 180px width but with heavy overlap.
    // Each string could be ~60px wide? 
    // actually let's use percentage.
    // spread 5 strings across 100% width? No, that's too spread.
    // spread them across 80% of width.
    const step = 16; // Adjusted for 7 strings to keep gaps
    const positionOffset = isLeft
        ? `${index * step}% `
        : `${(total - 1 - index) * step}% `; // Mirror positions for right side?

    const variants = {
        initial: {
            rotate: isLeft ? 15 : -15, // Start with a clear angle
            opacity: 0,
            y: -50, // Start slightly higher up
        },
        animate: {
            rotate: 0,
            opacity: 1,
            y: 0,
            transition: {
                delay: waveDelay, // Just local stagger, no huge delay
                // Physical spring properties for "Pendulum" effect
                type: "spring",
                stiffness: 40,  // Tension
                damping: 7,     // Low friction = more swings before stopping
                mass: 1.5 + (index * 0.2), // Lower strings heavier?
                restDelta: 0.001
            }
        },
        hover: {
            // A "push" effect that swings and settles
            rotate: isLeft
                ? [0, 10, -8, 6, -4, 2, -1, 0]
                : [0, -10, 8, -6, 4, -2, 1, 0],
            transition: {
                delay: 0, // Instant reaction
                duration: 6,
                ease: "linear",
                times: [0, 0.1, 0.25, 0.45, 0.65, 0.8, 0.9, 1]
            }
        }
    };

    return (
        <motion.div
            initial="initial"
            animate={shouldAnimate ? "animate" : "initial"}
            variants={variants}
            className={`garland-string string-${index}`}
            style={{
                position: 'absolute', // Stack them!
                top: 0, // All hang from the very top
                left: isLeft ? positionOffset : undefined,
                right: !isLeft ? positionOffset : undefined, // Start from right edge for right side
                height: '100%',
                width: '20%', // Slightly thinner for 7 strings
                transformOrigin: 'top center', // Swing from top
                zIndex: 10 + index, // Layer them
                pointerEvents: 'auto',
                cursor: 'pointer',
            }}
        >
            <div className="mobileSwayWrapper" style={{ width: '100%', height: '100%' }}>
                <img
                    src="/newgarland.png"
                    alt={`Garland String ${index} `}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Force it to fill the height even if it crops width
                        objectPosition: 'top center', // Ensure distinct top attachment
                        transform: !isLeft ? 'scaleX(-1)' : 'none',
                        filter: 'drop-shadow(2px 4px 5px rgba(0,0,0,0.2))' // Deep shadow for depth
                    }}
                    draggable={false}
                />
            </div>
        </motion.div>
    );
}

