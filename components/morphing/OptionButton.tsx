"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface OptionButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  selected?: boolean;
}

export const OptionButton = ({
  children,
  className,
  selected,
  ...props
}: OptionButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full text-left px-6 py-4 rounded-xl border border-neutral-200 dark:border-neutral-800",
        "bg-white dark:bg-black/50 backdrop-blur-sm transition-colors",
        "text-neutral-600 dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/50",
        selected && "border-purple-500 bg-purple-500/5 ring-1 ring-purple-500",
        className
      )}
      {...props}
    >
        <div className="flex items-center justify-between">
            {children}
            {/* Subtle arrow indicator on hover could go here */}
        </div>
    </motion.button>
  );
};
