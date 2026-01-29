"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, ContactShadows } from "@react-three/drei";
import { SpatialObject } from "./SpatialObject";
import { ZenParticles } from "../ui/ZenCanvas";

// カメラの動きを滑らかに制御するリグ
const CameraRig = ({ targetPosition }: { targetPosition: THREE.Vector3 }) => {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 15));

  useFrame(() => {
    // 速度を落としてゆったりとした動きに
    currentPos.current.lerp(targetPosition, 0.02);
    camera.position.copy(currentPos.current);
    camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z - 5);
  });

  return null;
};

type FlowStep = {
  id: string;
  title: string;
  options: { label: string; nextId: string; pos: [number, number, number] }[];
  position: [number, number, number];
};

const FLOW_DATA: Record<string, FlowStep> = {
  root: {
    id: "root",
    title: "SILENCE",
    position: [0, 0, 0],
    options: [
      { label: "IDENTITY", nextId: "identity", pos: [-10, 5, -20] },
      { label: "VESSEL", nextId: "vessel", pos: [0, -5, -20] },
      { label: "ESSENCE", nextId: "essence", pos: [10, 5, -20] },
    ],
  },
  identity: {
    id: "identity",
    title: "WHO ARE YOU?",
    position: [-10, 5, -20],
    options: [
      { label: "BACK TO VOID", nextId: "root", pos: [0, 0, 0] },
    ],
  },
  vessel: {
    id: "vessel",
    title: "FORM IS EMPTINESS",
    position: [0, -5, -20],
    options: [
      { label: "BACK TO VOID", nextId: "root", pos: [0, 0, 0] },
    ],
  },
  essence: {
    id: "essence",
    title: "PURE BEING",
    position: [10, 5, -20],
    options: [
      { label: "BACK TO VOID", nextId: "root", pos: [0, 0, 0] },
    ],
  },
};

export const ZenSpatialFlow = () => {
  const [currentStepId, setCurrentStepId] = useState("root");
  const [targetPos, setTargetPos] = useState(new THREE.Vector3(0, 0, 10));

  const handleSelect = (nextId: string) => {
    setCurrentStepId(nextId);
    const nextStep = FLOW_DATA[nextId];
    setTargetPos(new THREE.Vector3(
      nextStep.position[0],
      nextStep.position[1],
      nextStep.position[2] + 12
    ));
  };

  return (
    <div className="fixed inset-0 bg-[#050505]">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 50]} />
        
        <Environment preset="night" blur={1} />
        
        <CameraRig targetPosition={targetPos} />
        
        <ambientLight intensity={0.1} />
        <spotLight position={[15, 20, 15]} angle={0.2} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-15, -10, -10]} intensity={1} color="#222244" />

        <ContactShadows 
          resolution={1024} 
          scale={20} 
          blur={2} 
          opacity={0.5} 
          far={10} 
          color="#000000" 
        />

        <ZenParticles count={5000} />

        {Object.values(FLOW_DATA).map((step) => (
          <SpatialObject 
            key={step.id} 
            position={step.position}
            isActive={currentStepId === step.id}
          >
            <div className="text-center">
              <h2 className="text-4xl font-extralight tracking-[0.3em] mb-12 uppercase">
                {step.title}
              </h2>
              <div className="space-y-6">
                {step.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.nextId)}
                    className="block w-full py-4 border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all tracking-widest text-xs uppercase"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </SpatialObject>
        ))}
      </Canvas>
    </div>
  );
};
