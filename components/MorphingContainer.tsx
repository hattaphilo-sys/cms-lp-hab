"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface MorphingContainerProps {
  mode: "static" | "interactive";
  children: React.ReactNode;
}

export const MorphingContainer = ({ mode, children }: MorphingContainerProps) => {
  return (
    <div className="relative w-full min-h-screen p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
