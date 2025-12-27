"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Sun from './Sun';
import Planet from './Planet';
import { solarData } from './SolarData';
import { Suspense } from 'react';

export default function Scene() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
            <Canvas camera={{ position: [0, 40, 60], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.1} /> {/* Low ambient to keep space dark */}
                    {/* Sun handles the main lighting */}

                    {/* The Sun acts as the main point light in its component */}
                    <Sun />

                    {/* Generate Planets */}
                    {solarData.map((data, index) => (
                        <Planet key={index} planetData={data} />
                    ))}

                    <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    {/* Controls constrained to keep scene visible */}
                    <OrbitControls
                        enablePan={true}
                        minDistance={20}
                        maxDistance={150}
                        maxPolarAngle={Math.PI / 1.5} // Don't allow going too far below
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
