'use client';

import { motion } from 'framer-motion';

export default function Garland({ side = 'left' }) {
    const isLeft = side === 'left';
    const strings = [0, 1, 2]; // Render 3 distinct strings per bunch

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                [side]: '-30px',
                height: '65vh',
                width: '240px',
                zIndex: 9998,
                pointerEvents: 'none', // Container doesn't block, strings might
                display: 'flex',
                flexDirection: 'row',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
            }}
        >
            {strings.map((i) => (
                <GarlandString key={i} index={i} side={side} />
            ))}
        </div>
    );
}

function GarlandString({ index, side }) {
    const isLeft = side === 'left';

    // Stagger animations based on index for "fluid" wave
    const waveDelay = index * 0.2;
    const duration = 2 + (index * 0.3); // Varying speeds

    const variants = {
        initial: {
            rotate: isLeft ? 5 + index : -(5 + index),
            opacity: 0,
            y: -50
        },
        animate: {
            rotate: 0,
            opacity: 1,
            y: 0,
            transition: {
                delay: waveDelay,
                duration: duration,
                ease: "easeInOut",
                type: "spring",
                stiffness: 40,
                damping: 10
            }
        },
        hover: {
            // Magnetic pull: inner strings move less, outer strings move more? 
            // Or all move towards cursor.
            x: isLeft ? 15 : -15,
            rotate: isLeft ? -2 : 2,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
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
                height: '100%',
                width: '33%', // Divide space among strings
                position: 'relative',
                top: index * -10, // Slight vertical stagger for natural look
                pointerEvents: 'auto',
                cursor: 'pointer',
                zIndex: 10 - index
            }}
        >
            <img
                src="/newgarland.png" // Single string asset provided by user
                alt={`Garland String`}
                style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                    transform: !isLeft ? 'scaleX(-1)' : 'none',
                    filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.15))'
                }}
                draggable={false}
            />
        </motion.div>
    );
}
