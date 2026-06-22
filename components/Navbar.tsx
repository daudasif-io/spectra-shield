"use client";

import { motion } from "framer-motion";

interface NavbarProps {
  currentSlide: number;
  totalSlides: number;
  accent: string;
  isMobile: boolean;
}

export default function Navbar({ currentSlide, totalSlides, accent, isMobile }: NavbarProps) {
  return (
    <>
      {/* Top left — accent bar + tagline */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? "20px" : "32px",
          left: isMobile ? "16px" : "32px",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div style={{ width: "3px", height: "14px", background: accent, flexShrink: 0, transition: "background 0.5s ease" }} />
        {!isMobile && (
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(200,205,212,0.8)", whiteSpace: "nowrap" }}>
            Innovation is part of our DNA
          </span>
        )}
      </div>

      {/* Top center — slide counter */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? "20px" : "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <motion.span
          key={currentSlide}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Courier New', monospace", fontSize: isMobile ? "11px" : "13px", color: accent, letterSpacing: "0.1em", transition: "color 0.5s ease" }}
        >
          0{currentSlide + 1}
        </motion.span>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <div style={{ width: isMobile ? "18px" : "28px", height: "1px", background: "rgba(200,205,212,0.4)" }} />
          <div style={{ width: isMobile ? "18px" : "28px", height: "1px", background: "rgba(200,205,212,0.15)" }} />
        </div>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: isMobile ? "11px" : "13px", color: "rgba(200,205,212,0.35)", letterSpacing: "0.1em" }}>
          0{totalSlides}
        </span>
      </div>

      {/* Top right — desktop only */}
      {!isMobile && (
        <div style={{ position: "absolute", top: "32px", right: "56px", zIndex: 20, display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(200,205,212,0.7)", whiteSpace: "nowrap" }}>
            Live the experiences
          </span>
          <span style={{ color: "rgba(200,205,212,0.4)", fontSize: "16px" }}>≡</span>
        </div>
      )}

      {/* Bottom left — logo */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "20px" : "28px",
          left: isMobile ? "16px" : "32px",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke={accent} strokeWidth="2.5" fill="none" style={{ transition: "stroke 0.5s ease" }} />
          <path d="M20 4 C 28 10, 32 20, 20 36 C 8 20, 12 10, 20 4Z" fill={accent} opacity="0.9" style={{ transition: "fill 0.5s ease" }} />
        </svg>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: isMobile ? "15px" : "18px", color: "#ffffff", letterSpacing: "0.05em" }}>
          Spectra
        </span>
      </div>

      {/* Bottom center — language — desktop only */}
      {!isMobile && (
        <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", zIndex: 20, display: "flex", alignItems: "center", gap: "16px" }}>
          <button style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", color: "#ffffff", letterSpacing: "0.2em", background: "none", border: "none", cursor: "none" }}>EN</button>
          <span style={{ color: "rgba(200,205,212,0.25)", fontSize: "12px" }}>|</span>
          <button style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", color: "rgba(200,205,212,0.4)", letterSpacing: "0.2em", background: "none", border: "none", cursor: "none" }}>FR</button>
          <span style={{ marginLeft: "12px", color: "rgba(200,205,212,0.25)" }}>—</span>
        </div>
      )}

      {/* Bottom right — desktop only */}
      {!isMobile && (
        <div style={{ position: "absolute", bottom: "28px", right: "56px", zIndex: 20 }}>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", color: "rgba(200,205,212,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Return to <span style={{ color: "rgba(200,205,212,0.75)" }}>Spectra-Shield.Group</span>
          </span>
        </div>
      )}
    </>
  );
}