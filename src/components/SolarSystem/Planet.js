"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

export default function Planet({ planetData }) {
    const { radius, distance, speed, textureUrl, hasRings, ringTextureUrl } = planetData;
    const meshRef = useRef();
    const groupRef = useRef();

    // Load Texture
    const texture = useTexture(textureUrl);

    // Random start angle so planets aren't all aligned
    const startAngle = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Orbit Rotation
        const angle = t * speed + startAngle;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;

        if (groupRef.current) {
            groupRef.current.position.set(x, 0, z);
        }

        // Self Rotation
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group>
            {/* The Orbit Path (Visual Ring) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[distance - 0.1, distance + 0.1, 128]} />
                <meshBasicMaterial color="#444" opacity={0.3} transparent side={THREE.DoubleSide} />
            </mesh>

            {/* The Planet Group (Moves along orbit) */}
            <group ref={groupRef}>
                <mesh ref={meshRef}>
                    <sphereGeometry args={[radius, 64, 64]} />
                    <meshStandardMaterial
                        map={texture}
                        emissiveMap={texture}
                        emissive="#ffffff"
                        emissiveIntensity={0.5}
                        metalness={0.4}
                        roughness={0.7}
                        toneMapped={false}
                    />
                </mesh>

                {/* Saturn Rings - Extracted to component to avoid conditional hook */}
                {hasRings && ringTextureUrl && (
                    <PlanetRing radius={radius} ringTextureUrl={ringTextureUrl} />
                )}
            </group>
        </group>
    );
}

function PlanetRing({ radius, ringTextureUrl }) {
    const ringTexture = useTexture(ringTextureUrl);
    ringTexture.rotation = Math.PI / 2;

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            {/* Ring args: innerRadius, outerRadius, thetaSegments */}
            <ringGeometry args={[radius + 0.5, radius + 2.5, 64]} />
            <meshStandardMaterial
                map={ringTexture}
                transparent
                side={THREE.DoubleSide}
                opacity={0.8}
            />
        </mesh>
    );
}
