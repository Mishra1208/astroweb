'use client';

import { motion } from 'framer-motion';

export default function Garland({ side = 'left' }) {
    const isLeft = side === 'left';

    // Animation Variants
    const variants = {
        initial: {
            rotate: isLeft ? 5 : -5,
            opacity: 0,
            y: -20
        },
        animate: {
            rotate: 0,
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.5,
                ease: "easeOut",
                type: "spring",
                stiffness: 50
            }
        },
        hover: {
            x: isLeft ? 20 : -20, // Magnetic pull towards center/cursor
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 300,
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
                position: 'fixed',
                top: 0,
                [side]: '-30px', // Matches our "flush" positioning
                height: '65vh',
                width: '240px',
                zIndex: 9998,
                pointerEvents: 'auto', // Enable hover
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                cursor: 'pointer' // interactive feel
            }}
        >
            <img
                src="/marigold-top.png"
                alt={`Garland ${side}`}
                style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                    objectPosition: isLeft ? 'top left' : 'top right',
                    transform: !isLeft ? 'scaleX(-1)' : 'none', // Mirror right side
                    filter: isLeft
                        ? 'drop-shadow(2px 2px 3px rgba(0,0,0,0.15))'
                        : 'drop-shadow(-2px 2px 3px rgba(0,0,0,0.15))'
                }}
                draggable={false}
            />
        </motion.div>
    );
}
