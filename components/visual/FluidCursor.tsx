"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const FluidCursor = () => {
  // const [isHovered, setIsHovered] = useState(false);
  const cursorSize = 15; // Fixed size for now

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
    };
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [mouse.x, mouse.y]);

  return (
    <motion.div
        style={{
            left: smoothMouse.x,
            top: smoothMouse.y,
        }}
        className="fixed w-4 h-4 rounded-full bg-black dark:bg-white pointer-events-none z-50 mix-blend-difference"
    />
  );
};
