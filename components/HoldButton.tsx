"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HoldButtonProps {
  onComplete?: () => void;
  onShake?: () => void;
  accent: string;
}

export default function HoldButton({ onComplete, onShake, accent }: HoldButtonProps) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  const startHold = () => { if (!completed) setHolding(true); };
  const stopHold = () => {
    setHolding(false);
    if (!completed) setProgress(0);
  };

  useEffect(() => {
    if (holding && !completed) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCompleted(true);
            setHolding(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            onShake?.();
            setTimeout(() => onComplete?.(), 800);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [holding, completed, onComplete, onShake]);

  const strokeOffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <div
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
        style={{
          position: "relative",
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "none",
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        <svg
          width="56" height="56" viewBox="0 0 56 56"
          style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
        >
          <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(200,205,212,0.15)" strokeWidth="1.5" />
          <circle
            cx="28" cy="28" r={radius} fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.05s linear, stroke 0.5s ease" }}
          />
        </svg>
        <motion.div
          animate={{
            scale: holding ? 1.3 : 1,
            backgroundColor: completed ? accent : holding ? accent : "#C8CDD4",
          }}
          transition={{ duration: 0.2 }}
          style={{ width: 12, height: 12, borderRadius: "50%", background: "#C8CDD4" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.span
            key="hold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "11px",
              letterSpacing: "0.25em",
              color: "rgba(200,205,212,0.7)",
              textTransform: "uppercase",
            }}
          >
            {holding ? "Hold..." : "Click and Hold"}
          </motion.span>
        ) : (
          <motion.span
            key="done"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "11px",
              letterSpacing: "0.25em",
              color: accent,
              textTransform: "uppercase",
            }}
          >
            ✓ Entering
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}