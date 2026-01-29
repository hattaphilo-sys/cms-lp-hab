"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QuestionCard } from "./QuestionCard";
import { OptionButton } from "./OptionButton";
import { ArrowLeft, Send } from "lucide-react";
import { ZenCanvas } from "@/components/ui/ZenCanvas";

type FlowState = "opening" | "detail" | "form";

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
    z: -1200, // Start very far back
    rotateY: direction * 45, // Rotate in from side
    opacity: 0,
    scale: 0.6,
  }),
  center: {
    x: 0,
    z: 0,
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      mass: 1.2,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-20%" : direction < 0 ? "20%" : 0,
    z: 200,
    opacity: 0,
    scale: 1.1,
    transition: {
      duration: 0.6,
      ease: "anticipate" as const,
    },
  }),
};

export const InteractiveFlow = () => {
  const [step, setStep] = useState<FlowState>("opening");
  const [selection, setSelection] = useState<string | null>(null);
  const [direction, setDirection] = useState(0); // -1: left, 0: center, 1: right

  const handleSelect = (value: string, dir: number) => {
    setSelection(value);
    setDirection(dir);
    setStep("detail");
  };

  const handleToForm = () => {
    setDirection(0); // Zoom straight in
    setStep("form");
  };

  const handleBack = () => {
    setDirection(0); // Neutral back
    if (step === "detail") setStep("opening");
    if (step === "form") setStep("detail");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden perspective-1000">
      
      {/* Zen 3D Background */}
      <div className="absolute inset-0 -z-10">
        <ZenCanvas />
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {step === "opening" && (
          <motion.div
            key="opening"
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full max-w-2xl"
          >
            <QuestionCard layoutId="card-container">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-light tracking-widest text-white mb-6 uppercase">
                  Silence
                </h2>
                <div className="w-12 h-[1px] bg-white/20 mx-auto mb-8" />
                <p className="text-neutral-500 font-light tracking-tight">
                  What defines your current path?
                </p>
              </div>

              <div className="space-y-4">
                <OptionButton onClick={() => handleSelect("identity", -1)}>
                  <span className="tracking-widest uppercase text-sm font-light">Identity</span>
                </OptionButton>
                <OptionButton onClick={() => handleSelect("vessel", 0)}>
                  <span className="tracking-widest uppercase text-sm font-light">Vessel</span>
                </OptionButton>
                <OptionButton onClick={() => handleSelect("essence", 1)}>
                  <span className="tracking-widest uppercase text-sm font-light">Essence</span>
                </OptionButton>
              </div>
            </QuestionCard>
          </motion.div>
        )}

        {step === "detail" && (
          <motion.div
            key="detail"
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full max-w-2xl"
          >
            <QuestionCard layoutId="card-container">
              <div className="flex items-center mb-6">
                <button onClick={handleBack} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
                  <ArrowLeft size={20} className="text-neutral-500" />
                </button>
                <span className="ml-2 text-sm font-medium text-purple-600 uppercase tracking-wider">Step 2 of 3</span>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  Tell us more about your {selection}.
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400">
                  What is the primary goal you want to achieve?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <OptionButton onClick={handleToForm}>Increase Conversion</OptionButton>
                <OptionButton onClick={handleToForm}>Brand Awareness</OptionButton>
                <OptionButton onClick={handleToForm}>User Engagement</OptionButton>
                <OptionButton onClick={handleToForm}>Modernize Stack</OptionButton>
              </div>
            </QuestionCard>
          </motion.div>
        )}

        {step === "form" && (
          <motion.div
            key="form"
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full max-w-2xl"
          >
            <QuestionCard layoutId="card-container">
              <div className="flex items-center mb-6">
                <button onClick={handleBack} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
                  <ArrowLeft size={20} className="text-neutral-500" />
                </button>
                <span className="ml-2 text-sm font-medium text-green-500 uppercase tracking-wider">Final Step</span>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  Let&apos;s make it happen.
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400">
                  We&apos;ve customized this plan for <strong>{selection}</strong>.
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-black/20 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Project Details</label>
                  <textarea className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-black/20 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all h-32" placeholder="Tell us anything else..." />
                </div>
                <button className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2">
                  <span>Send Request</span>
                  <Send size={18} />
                </button>
              </form>
            </QuestionCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
