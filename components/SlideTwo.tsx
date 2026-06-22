"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import HoldButton from "./HoldButton";

interface SlideProps {
  onNext: () => void;
  onPrev: () => void;
  onShake: () => void;
  accent: string;
  isMobile: boolean;
}

export default function SlideTwo({ onNext, onPrev, onShake, accent, isMobile }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 });
      gsap.fromTo(btnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.9 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: isMobile ? "center" : "flex-end",
        paddingRight: isMobile ? "20px" : "8rem",
        paddingLeft: isMobile ? "20px" : "2rem",
        paddingBottom: isMobile ? "140px" : "0",
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: isMobile ? "100%" : "420px", width: "100%" }}>
        <h1
          ref={titleRef}
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 300,
            fontSize: isMobile ? "clamp(42px, 12vw, 64px)" : "clamp(64px, 7vw, 100px)",
            letterSpacing: "0.25em",
            lineHeight: 1,
            color: "#ffffff",
            marginBottom: isMobile ? "16px" : "24px",
            opacity: 0,
            whiteSpace: isMobile ? "normal" : "nowrap",
          }}
        >
          DETECT
        </h1>
        <p
          ref={textRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: isMobile ? "12px" : "13px",
            lineHeight: "1.9",
            color: "rgba(200,205,212,0.8)",
            marginBottom: isMobile ? "28px" : "40px",
            opacity: 0,
          }}
        >
          Advanced sensor arrays deployed across critical zones allow real-time environmental monitoring. Autonomous drones navigate complex terrain, transmitting hazard data before human intervention is ever required.
        </p>
        <div ref={btnRef} style={{ display: "flex", alignItems: "center", gap: isMobile ? "12px" : "16px", opacity: 0, flexWrap: "wrap" }}>
          <HoldButton onComplete={() => setTimeout(onNext, 800)} onShake={onShake} accent={accent} />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            style={{
              padding: isMobile ? "12px 24px" : "14px 32px",
              background: "#ffffff",
              color: "#0A0C0F",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              border: "none",
              cursor: isMobile ? "pointer" : "none",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => !isMobile && (e.currentTarget.style.background = accent)}
            onMouseLeave={(e) => !isMobile && (e.currentTarget.style.background = "#ffffff")}
          >
            Enter
          </motion.button>
        </div>
      </div>
    </div>
  );
}