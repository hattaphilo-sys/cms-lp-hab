"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html, Float, RoundedBox } from "@react-three/drei";
import { cn } from "@/lib/utils";

interface SpatialObjectProps {
  position: [number, number, number];
  children: React.ReactNode;
  isActive?: boolean;
}

export const SpatialObject = ({ position, children, isActive = false }: SpatialObjectProps) => {
  const meshRef = useRef<any>(null!);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;

    // Scale animation
    const targetScale = isActive ? 1 : 0.8;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // Opacity animation (physical material uses transmission more than opacity)
    const targetOpacity = isActive ? 0.4 : 0.1;
    materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, 0.1);
    
    // Transmission animation for a "soul" effect
    const targetTransmission = isActive ? 0.9 : 0.4;
    materialRef.current.transmission = THREE.MathUtils.lerp(materialRef.current.transmission, targetTransmission, 0.05);
  });

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          {/* 圧倒的な厚みを持たせて「存在感」を出す (0.4 -> 1.5) */}
          <RoundedBox args={[4, 5, 1.5]} radius={0.05} smoothness={4}>
            <meshPhysicalMaterial 
              ref={materialRef}
              color="#111111" 
              metalness={0.1} 
              roughness={0.05} 
              transparent 
              opacity={0.3}
              transmission={0.4} // 初期値
              thickness={1.5}    // 屈折用の物理的な厚み
              ior={1.5}          // 屈折率
              clearcoat={1}      // 表面の光沢層
              clearcoatRoughness={0.1}
            />
          </RoundedBox>
          
          <Html
            transform
            distanceFactor={4}
            position={[0, 0, 0.76]} // 厚み (1.5) の表面に配置
            className={cn(
              "pointer-events-none transition-opacity duration-1000",
              isActive ? "opacity-100 pointer-events-auto" : "opacity-0"
            )}
          >
            <div className="w-[400px] select-none text-white p-8">
              {children}
            </div>
          </Html>
        </mesh>
      </Float>

      <pointLight 
        intensity={isActive ? 2 : 0.5} 
        distance={15} 
        color={isActive ? "#ffffff" : "#444444"} 
      />
    </group>
  );
};
