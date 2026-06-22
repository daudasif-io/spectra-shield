"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SlideCounterProps {
  currentSlide: number;
  totalSlides: number;
}

export default function SlideCounter({ currentSlide, totalSlides }: SlideCounterProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Current slide number */}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentSlide}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-mono text-sm text-orano-yellow"
          style={{ letterSpacing: "0.1em" }}
        >
          0{currentSlide + 1}
        </motion.span>
      </AnimatePresence>

      {/* Divider lines */}
      <div className="flex items-center gap-1">
        <div className="w-8 h-px bg-orano-text/40" />
        <div className="w-8 h-px bg-orano-text/20" />
      </div>

      {/* Total slides */}
      <span
        className="font-mono text-sm text-orano-text/40"
        style={{ letterSpacing: "0.1em" }}
      >
        0{totalSlides}
      </span>
    </div>
  );
}