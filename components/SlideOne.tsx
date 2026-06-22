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
}

export default function SlideOne({ onNext, onPrev, onShake, accent }: SlideProps) {
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
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "8rem",
        paddingLeft: "2rem",
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: "420px", width: "100%" }}>
        <h1
          ref={titleRef}
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(64px, 7vw, 100px)",
            letterSpacing: "0.25em",
            lineHeight: 1,
            color: "#ffffff",
            marginBottom: "24px",
            opacity: 0,
            whiteSpace: "nowrap",
          }}
        >
          PROTECT
        </h1>

        <p
          ref={textRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "13px",
            lineHeight: "1.9",
            color: "rgba(200,205,212,0.8)",
            marginBottom: "40px",
            opacity: 0,
          }}
        >
          Locating gamma radiation sources in nonaccessible areas is
          challenging, and a major safety concern. Thanks to NanoPix, this
          miniature gamma camera can squeeze itself into tiny spaces making
          the invisible visible.
        </p>

        <div
          ref={btnRef}
          style={{ display: "flex", alignItems: "center", gap: "32px", opacity: 0 }}
        >
          <HoldButton onComplete={() => setTimeout(onNext, 800)} onShake={onShake} accent={accent} />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            style={{
              padding: "14px 32px",
              background: "#ffffff",
              color: "#0A0C0F",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              border: "none",
              cursor: "none",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = accent)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
          >
            Enter
          </motion.button>
        </div>
      </div>
    </div>
  );
}