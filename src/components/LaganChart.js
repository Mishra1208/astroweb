'use client';

import React from 'react';
import styles from './LaganChart.module.css';

// House Center Coordinates (for placing Planets)
// Based on 400x400 viewBox
const HOUSE_CENTERS = {
    1: { x: 200, y: 100 },   // Top Diamond (Lagan)
    2: { x: 100, y: 50 },    // Top-Left Triangle
    3: { x: 50, y: 100 },    // Left-Top Triangle
    4: { x: 100, y: 200 },   // Left Diamond
    5: { x: 50, y: 300 },    // Left-Bottom Triangle
    6: { x: 100, y: 350 },   // Bottom-Left Triangle
    7: { x: 200, y: 300 },   // Bottom Diamond
    8: { x: 300, y: 350 },   // Bottom-Right Triangle
    9: { x: 350, y: 300 },   // Right-Bottom Triangle
    10: { x: 300, y: 200 },  // Right Diamond
    11: { x: 350, y: 100 },  // Right-Top Triangle
    12: { x: 300, y: 50 },   // Top-Right Triangle
};

// Sign Number Coordinates (Corner of the house)
// Typically small number indicating Rashi
const SIGN_COORDS = {
    1: { x: 200, y: 170 }, // Bottom of Top Diamond
    2: { x: 170, y: 30 },  // Top of H2
    3: { x: 30, y: 170 },  // Top of H3
    4: { x: 170, y: 200 }, // Right of Left Diamond
    5: { x: 30, y: 230 },  // Top of H5
    6: { x: 170, y: 370 }, // Bottom of H6
    7: { x: 200, y: 230 }, // Top of Bottom Diamond
    8: { x: 230, y: 370 }, // Bottom of H8
    9: { x: 370, y: 230 }, // Top of H9
    10: { x: 230, y: 200 }, // Left of Right Diamond
    11: { x: 370, y: 170 }, // Bottom of H11
    12: { x: 230, y: 30 }   // Top of H12
};

export default function LaganChart({ ascendantSign, planets }) {
    // 1. Calculate Sign for each House
    // House 1 = Ascendant Sign
    // House 2 = (Asc + 1) etc.
    // Normalized to 1-12
    const houseSigns = {};
    for (let i = 1; i <= 12; i++) {
        let sign = (ascendantSign + i - 1) % 12;
        if (sign === 0) sign = 12;
        houseSigns[i] = sign;
    }

    console.log("LaganChart Debug:", { ascendantSign, houseSigns });
    console.log("Planets:", planets.map(p => `${p.name}: ${p.rashi.id}`));

    // 2. Map Planets to Houses
    // We need to find which House a planet belongs to.
    // Planet has 'rashi.id' (1-12).
    // House X has Sign Y.
    // If Planet Rashi == Sign Y, puts Planet in House X.
    const housePlanets = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] };

    // Hindi Numerals Helper
    const toHindiNum = (n) => {
        const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return n.toString().split('').map(d => hindiDigits[parseInt(d)]).join('');
    };

    planets.forEach(planet => {
        const planetRashi = planet.rashi.id;
        const houseNum = Object.keys(houseSigns).find(h => houseSigns[h] === planetRashi);
        if (houseNum) {
            // Use Hindi short name (e.g., 'सू')
            housePlanets[houseNum].push(planet.short || planet.name.substring(0, 2));
        }
    });

    return (
        <div className={styles.container}>
            <svg viewBox="0 0 400 400" className={styles.chartSvg}>
                {/* --- DEFINITIONS --- */}
                <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity="1" />
                    </linearGradient>
                </defs>

                {/* --- BORDERS & LINES --- */}
                <rect x="2" y="2" width="396" height="396" stroke="url(#goldGradient)" strokeWidth="3" fill="none" />
                <line x1="0" y1="0" x2="400" y2="400" stroke="url(#goldGradient)" strokeWidth="2" />
                <line x1="400" y1="0" x2="0" y2="400" stroke="url(#goldGradient)" strokeWidth="2" />
                <polygon points="200,0 400,200 200,400 0,200" stroke="url(#goldGradient)" strokeWidth="2" fill="none" />

                {/* --- SPECIAL: 'Lagna' Label in House 1 --- */}
                <text x="200" y="70" className={styles.lagnaText} textAnchor="middle" fill="#ef4444" fontWeight="bold" fontSize="16">
                    लग्न
                </text>

                {/* --- SIGNS & PLANETS --- */}
                {Object.keys(houseSigns).map(houseNum => (
                    <g key={houseNum}>
                        {/* Sign Number (Hindi) */}
                        <text
                            x={SIGN_COORDS[houseNum].x}
                            y={SIGN_COORDS[houseNum].y}
                            className={styles.signNumber}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {toHindiNum(houseSigns[houseNum])}
                        </text>

                        {/* Planets in this House */}
                        {housePlanets[houseNum].length > 0 && (
                            <text
                                x={HOUSE_CENTERS[houseNum].x}
                                y={HOUSE_CENTERS[houseNum].y + (houseNum === "1" ? 15 : 0)} // Shift down slightly in H1 to avoid 'Lagna' text
                                className={styles.planetText}
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                {housePlanets[houseNum].reduce((acc, curr, i) => {
                                    const chunkIndex = Math.floor(i / 2);
                                    if (!acc[chunkIndex]) acc[chunkIndex] = [];
                                    acc[chunkIndex].push(curr);
                                    return acc;
                                }, []).map((chunk, i, arr) => (
                                    <tspan
                                        key={i}
                                        x={HOUSE_CENTERS[houseNum].x}
                                        dy={i === 0 ? -(arr.length - 1) * 10 : 20}
                                    >
                                        {chunk.join(' ')}
                                    </tspan>
                                ))}
                            </text>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}
