"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  children: React.ReactNode;
  className?: string;
  layoutId?: string; // Important for shared layout animation if needed
}

export const QuestionCard = ({ children, className, layoutId }: QuestionCardProps) => {
  return (
    <motion.div
      layout
      layoutId={layoutId}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        layout: { duration: 0.4, type: "spring", bounce: 0.2 } 
      }}
      className={cn(
        "w-full max-w-2xl mx-auto p-8 rounded-none overflow-hidden", // 禅: 角丸を排除（または最小化）
        "bg-black/40 backdrop-blur-3xl",
        "border border-white/5",
        "shadow-[0_0_50px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      <motion.div layout className="space-y-6">
        {children}
      </motion.div>
    </motion.div>
  );
};
