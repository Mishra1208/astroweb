"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Sun() {
    const meshRef = useRef();
    const sunTexture = useTexture("/textures/2k_sun.jpg");

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.05;
    });

    return (
        <group>
            {/* Core Sun */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[4, 64, 64]} />
                <meshStandardMaterial
                    map={sunTexture}
                    emissiveMap={sunTexture}
                    emissive="#ffffff"
                    emissiveIntensity={1.5}
                    toneMapped={false}
                />
            </mesh>

            {/* Outer Glow */}
            <pointLight distance={150} intensity={2} color="#fff" />
            <pointLight distance={150} intensity={2} color="#fbbf24" />
        </group>
    );
}
