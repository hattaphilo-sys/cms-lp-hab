"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export const ZenParticles = ({ count = 3000 }) => {
  const points = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    const random = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };
    for (let i = 0; i < count; i++) {
        const x = (random(i * 3) - 0.5) * 20;
        const y = (random(i * 3 + 1) - 0.5) * 20;
        const z = (random(i * 3 + 2) - 0.5) * 20;
        temp.set([x, y, z], i * 3);
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    // Subtle breathing effect
    const scale = 1 + Math.sin(time * 0.5) * 0.02;
    points.current.scale.set(scale, scale, scale);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#888888"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  );
};

const ZenMonolith = () => {
    const mesh = useRef<THREE.Mesh>(null!);
    
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        mesh.current.rotation.y = time * 0.2;
        mesh.current.position.y = Math.sin(time * 0.5) * 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={mesh} castShadow receiveShadow>
                <boxGeometry args={[1, 3, 0.1]} />
                <meshStandardMaterial 
                    color="#111111" 
                    roughness={0.1} 
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
};

export const ZenCanvas = () => {
  return (
    <div className="absolute inset-0 bg-[#0a0a0a]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 15]} />
        
        <ambientLight intensity={0.2} />
        <spotLight
          position={[5, 10, 5]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4444ff" />

        <ZenParticles />
        <ZenMonolith />
        
        {/* Subtle grid base */}
        <gridHelper 
            args={[20, 40, "#111111", "#080808"]} 
            position={[0, -2, 0]} 
            rotation={[Math.PI / 10, 0, 0]}
        />
      </Canvas>
      
      {/* Dynamic Noise Overlay for texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
    </div>
  );
};
