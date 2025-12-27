
'use client';

import { motion } from 'framer-motion';

export default function Garland({ side = 'left' }) {
    const isLeft = side === 'left';
    // Increase to 5 strings for a "thick bunch" look
    const strings = [0, 1, 2, 3, 4];

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                [side]: '-20px', // Slight negative to hug edge
                height: '40vh',
                width: '300px', // Adjusted to stop at OM icon
                zIndex: 9998,
                pointerEvents: 'none',
            }}
        >
            {/* Render strings absolutely positioned within this bunch container */}
            {strings.map((i) => (
                <GarlandString key={i} index={i} side={side} total={strings.length} />
            ))}
        </div>
    );
}

function GarlandString({ index, side, total }) {
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
    const step = 19; // Spaced out arrangement (almost 20% per string)
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
                delay: waveDelay, // Stagger the start
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
                duration: 6,
                ease: "linear",
                times: [0, 0.1, 0.25, 0.45, 0.65, 0.8, 0.9, 1]
            }
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={variants}
            style={{
                position: 'absolute', // Stack them!
                top: 0, // All hang from the very top
                left: isLeft ? positionOffset : undefined,
                right: !isLeft ? positionOffset : undefined, // Start from right edge for right side
                height: '100%',
                width: '22%', // Much thinner to allow spacing
                transformOrigin: 'top center', // Swing from top
                zIndex: 10 + index, // Layer them
                pointerEvents: 'auto',
                cursor: 'pointer',
            }}
        >
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
        </motion.div>
    );
}

