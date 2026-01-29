"use client";

import React, { useRef, useEffect } from "react";

interface GradientStop {
  color: string;
  position: number;
}

interface GradientDefinition {
  stops: GradientStop[];
  centerX: number; // Percentage 0-100
  centerY: number; // Percentage 0-100
}

interface CanvasFractalGridProps {
  dotSize?: number;
  dotSpacing?: number;
  dotOpacity?: number;
  gradientAnimationDuration?: number;
  waveIntensity?: number;
  waveRadius?: number;
  dotColor?: string;
  glowColor?: string;
  enableNoise?: boolean;
  noiseOpacity?: number;
  enableMouseGlow?: boolean;
  initialPerformance?: "low" | "medium" | "high";
  gradients?: GradientDefinition[];
  className?: string; // Standard className support
}

export const CanvasFractalGrid = ({
  dotSize = 2,
  dotSpacing = 20,
  dotOpacity = 0.5,
  gradientAnimationDuration = 10,
  waveIntensity = 20,
  waveRadius = 200,
  dotColor = "rgba(255, 255, 255, 0.5)",
  glowColor = "rgba(255, 255, 255, 1)",
  enableNoise = false,
  noiseOpacity = 0.05,
  enableMouseGlow = false,
  initialPerformance = "high",
  gradients = [],
  className,
}: CanvasFractalGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    const resize = () => {
      if (canvas.parentElement) {
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };
    
    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };
    if (enableMouseGlow) {
        window.addEventListener("mousemove", handleMouseMove);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      timeRef.current += 0.01;

      // Draw Gradients
      gradients.forEach((grad, index) => {
        // Simple animation: move center slightly
        const moveX = Math.sin(timeRef.current * 0.5 + index) * 10;
        const moveY = Math.cos(timeRef.current * 0.5 + index) * 10;
        
        const x = (grad.centerX + moveX / 10) * width / 100;
        const y = (grad.centerY + moveY / 10) * height / 100;
        const radius = Math.max(width, height) * 0.8; // Large radius

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.stops.forEach((stop) => {
           gradient.addColorStop(stop.position / 100, stop.color);
        });

        ctx.fillStyle = gradient;
        ctx.globalCompositeOperation = "screen"; // Blend mode
        ctx.fillRect(0, 0, width, height);
      });
      
      ctx.globalCompositeOperation = "source-over"; // Reset blend mode

      // Draw Grid
      const rows = Math.ceil(height / dotSpacing);
      const cols = Math.ceil(width / dotSpacing);

      ctx.fillStyle = dotColor;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * dotSpacing;
            const y = j * dotSpacing;

            // Wave Calculation
            // Calculate distance from some moving points or center
            // Let's create a "fractal" feel with multiple sine waves
            const distFromCenter = Math.sqrt(Math.pow(x - width/2, 2) + Math.pow(y - height/2, 2));
            
            // Interaction Wave (Mouse)
            let mouseDist = 0;
            if (enableMouseGlow) {
                mouseDist = Math.sqrt(Math.pow(x - mouseRef.current.x, 2) + Math.pow(y - mouseRef.current.y, 2));
            }

            const wave = Math.sin(distFromCenter * 0.01 - timeRef.current) * Math.cos(x * 0.02 + timeRef.current);
            const sizeOffset = Math.max(0, wave * (waveIntensity / 10)); // Modify size based on wave
            
            let currentDotSize = dotSize + sizeOffset;
            let currentOpacity = dotOpacity;

            // Mouse Glow Interaction
            if (enableMouseGlow && mouseDist < waveRadius) {
                 const glowFactor = 1 - (mouseDist / waveRadius);
                 currentDotSize += glowFactor * 3;
                 currentOpacity += glowFactor * 0.5;
            }

            ctx.globalAlpha = Math.min(1, Math.max(0, currentOpacity));
            ctx.beginPath();
            ctx.arc(x, y, currentDotSize, 0, Math.PI * 2);
            ctx.fill();
        }
      }

      // Noise Overlay
      if (enableNoise) {
          // Implementing real per-pixel noise every frame is heavy.
          // Let's do a simple overlay or skip for performance if needed.
          // For now, skipping per-pixel noise for 60fps stability.
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (enableMouseGlow) {
          window.removeEventListener("mousemove", handleMouseMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dotSize, dotSpacing, dotOpacity, dotColor, gradients, waveIntensity, enableMouseGlow, waveRadius]);

  return (
    <canvas 
        ref={canvasRef} 
        className={className} 
        style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};
