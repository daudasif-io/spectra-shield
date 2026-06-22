"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import SlideOne from "@/components/SlideOne";
import SlideTwo from "@/components/SlideTwo";
import SlideThree from "@/components/SlideThree";
import SlideFour from "@/components/SlideFour";
import SlideFive from "@/components/SlideFive";
import SlideSix from "@/components/SlideSix";

// Dynamic import OUTSIDE component — never recreated on render
const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

const ACCENT = ["#F5C800", "#3A7BD5", "#00E87A", "#A855F7", "#FF6B35", "#00D4FF"] as const;

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const totalSlides = 6;
  const accent = ACCENT[currentSlide] ?? ACCENT[0];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };

    const animate = () => {
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.18;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.18;
      if (followerRef.current) {
        followerRef.current.style.left = followerPos.current.x + "px";
        followerRef.current.style.top = followerPos.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  useEffect(() => {
    if (cursorRef.current) cursorRef.current.style.background = accent;
    if (followerRef.current) followerRef.current.style.borderColor = accent + "70";
  }, [accent]);

  const shakeScreen = () => {
    if (!mainRef.current) return;
    gsap.timeline()
      .to(mainRef.current, { x: -10, duration: 0.06, ease: "power2.out" })
      .to(mainRef.current, { x: 10, duration: 0.06, ease: "power2.out" })
      .to(mainRef.current, { x: -8, duration: 0.06, ease: "power2.out" })
      .to(mainRef.current, { x: 8, duration: 0.06, ease: "power2.out" })
      .to(mainRef.current, { x: -5, duration: 0.05, ease: "power2.out" })
      .to(mainRef.current, { x: 5, duration: 0.05, ease: "power2.out" })
      .to(mainRef.current, { x: -2, duration: 0.04, ease: "power2.out" })
      .to(mainRef.current, { x: 0, duration: 0.04, ease: "power2.out" });
  };

  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const goToPrev = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const slides = [
    <SlideOne   key="s1" onNext={goToNext} onPrev={goToPrev} accent={accent} onShake={shakeScreen} isMobile={isMobile} />,
    <SlideTwo   key="s2" onNext={goToNext} onPrev={goToPrev} accent={accent} onShake={shakeScreen} isMobile={isMobile} />,
    <SlideThree key="s3" onNext={goToNext} onPrev={goToPrev} accent={accent} onShake={shakeScreen} isMobile={isMobile} />,
    <SlideFour  key="s4" onNext={goToNext} onPrev={goToPrev} accent={accent} onShake={shakeScreen} isMobile={isMobile} />,
    <SlideFive  key="s5" onNext={goToNext} onPrev={goToPrev} accent={accent} onShake={shakeScreen} isMobile={isMobile} />,
    <SlideSix   key="s6" onNext={goToNext} onPrev={goToPrev} accent={accent} onShake={shakeScreen} isMobile={isMobile} />,
  ];

  return (
    <main
      ref={mainRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#0A0C0F",
      }}
    >
      {/* Custom cursor — desktop only */}
      {!isMobile && (
        <>
          <div
            ref={cursorRef}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: accent,
              position: "fixed",
              pointerEvents: "none",
              zIndex: 9999,
              transform: "translate(-50%, -50%)",
              top: 0,
              left: 0,
              transition: "background 0.5s ease",
            }}
          />
          <div
            ref={followerRef}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: `1px solid ${accent}70`,
              position: "fixed",
              pointerEvents: "none",
              zIndex: 9998,
              transform: "translate(-50%, -50%)",
              top: 0,
              left: 0,
              transition: "border-color 0.5s ease",
            }}
          />
        </>
      )}

      {/* 3D Scene — always mounted outside AnimatePresence, never remounts */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Scene3D currentSlide={currentSlide} />
      </div>

      {/* Navbar — always mounted */}
      <Navbar
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        accent={accent}
        isMobile={isMobile}
      />

      {/* Only slide text content transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "absolute", inset: 0, zIndex: 10 }}
        >
          {slides[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* Prev button — desktop only */}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            right: "calc(8rem + 440px)",
            top: "50%",
            marginTop: "-26px",
            zIndex: 9990,
          }}
        >
          <button
            onClick={goToPrev}
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.75)",
              background: "rgba(0,0,0,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "none",
              transition: "border-color 0.3s ease, background 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = accent;
              e.currentTarget.style.background = "rgba(0,0,0,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.75)";
              e.currentTarget.style.background = "rgba(0,0,0,0.35)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M16 10H4M8 5L3 10l5 5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Next button — desktop only */}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            right: "calc(8rem - 68px)",
            top: "50%",
            marginTop: "-26px",
            zIndex: 9990,
          }}
        >
          <button
            onClick={goToNext}
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.75)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "none",
              transition: "border-color 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.75)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 5l5 5-5 5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Mobile nav — bottom center */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9990,
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <button
            onClick={goToPrev}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: `1.5px solid ${accent}`,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M16 10H4M8 5L3 10l5 5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentSlide(i)}
                style={{
                  width: i === currentSlide ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === currentSlide ? accent : "rgba(200,205,212,0.3)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: `1.5px solid ${accent}`,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 5l5 5-5 5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}