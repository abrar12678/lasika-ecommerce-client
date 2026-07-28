"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════
   WATCH PARTS INDICATOR DATA — 6 Horology Marking Points
   ═══════════════════════════════════════════════════ */
const WATCH_PARTS = [
  {
    id: "bezel",
    name: "FLUTED BEZEL",
    subtitle: "18K Yellow Gold",
    labelPos: { top: "20%", right: "4%" },
    line: { x1: 56, y1: 32, x2: 78, y2: 22 },
  },
  {
    id: "cyclops",
    name: "CYCLOPS LENS",
    subtitle: "2.5x Magnifier",
    labelPos: { top: "46%", right: "2%" },
    line: { x1: 60, y1: 47, x2: 82, y2: 47 },
  },
  {
    id: "dial",
    name: "SUNBURST DIAL",
    subtitle: "Olive Sunray Finish",
    labelPos: { top: "20%", left: "4%" },
    line: { x1: 48, y1: 46, x2: 22, y2: 22 },
  },
  {
    id: "movement",
    name: "CALIBRE 3235",
    subtitle: "70H Power Reserve",
    labelPos: { top: "46%", left: "2%" },
    line: { x1: 40, y1: 47, x2: 18, y2: 47 },
  },
  {
    id: "case",
    name: "OYSTER CASE",
    subtitle: "100m Waterproof",
    labelPos: { bottom: "20%", left: "4%" },
    line: { x1: 42, y1: 62, x2: 22, y2: 76 },
  },
  {
    id: "bracelet",
    name: "PRESIDENT BRACELET",
    subtitle: "Concealed Crownclasp",
    labelPos: { bottom: "20%", right: "4%" },
    line: { x1: 52, y1: 72, x2: 78, y2: 76 },
  },
];

/* ═══════════════════════════════════════════════════
   MAIN WATCH DETAIL COMPONENT
   Renders the dark leather pillow and synchronized part marking dash lines!
   ═══════════════════════════════════════════════════ */
export default function WatchDetail() {
  const sectionRef = useRef(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  /* ═══ Calculate distance offset: Showcase Pillow -> WatchDetail Center ═══ */
  const calculateDelta = useCallback(() => {
    const pillowContainer = document.getElementById("showcase-pillow-container");
    const detailElement = sectionRef.current;

    if (pillowContainer && detailElement) {
      const pillowRect = pillowContainer.getBoundingClientRect();
      const detailRect = detailElement.getBoundingClientRect();

      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;

      const pillowCenter = {
        x: pillowRect.left + scrollX + pillowRect.width / 2,
        y: pillowRect.top + scrollY + pillowRect.height / 2,
      };

      const detailCenter = {
        x: detailRect.left + scrollX + detailRect.width / 2,
        y: detailRect.top + scrollY + detailRect.height / 2,
      };

      setDelta({
        x: pillowCenter.x - detailCenter.x,
        y: pillowCenter.y - detailCenter.y,
      });
    }
  }, []);

  useEffect(() => {
    calculateDelta();
    const timer = setTimeout(calculateDelta, 800);
    window.addEventListener("resize", calculateDelta);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateDelta);
    };
  }, [calculateDelta]);

  /* ═══ 0.8s Time-Based Zoom & Part Marking Trigger ═══ */
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const detailEl = document.getElementById("detail");
    if (!detailEl) return;

    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Wait 0.8s after landing in Details section, then smoothly zoom in pillow, watch & reveal part marking indicators!
          timer = setTimeout(() => {
            setIsZoomed(true);
            if (typeof window !== "undefined") {
              window.dispatchEvent(
                new CustomEvent("detail-zoom-trigger", { detail: { zoomed: true } })
              );
            }
          }, 800);
        } else {
          setIsZoomed(false);
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("detail-zoom-trigger", { detail: { zoomed: false } })
            );
          }
          if (timer) clearTimeout(timer);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(detailEl);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  /* ═══ Scroll Progress tracking ═══ */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.4,
  });

  /* ═══ 1. Smooth Flight (Showcase Pillow Position -> Detail Center Position) ═══ */
  const pillowY = useTransform(smoothProgress, [0, 0.45, 0.8], [delta.y, 0, 0]);
  const pillowX = useTransform(smoothProgress, [0, 0.45, 0.8], [delta.x, 0, 0]);
  const pillowOpacity = useTransform(smoothProgress, [0.02, 0.1, 0.85, 0.95], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="detail"
      className="relative h-screen min-h-screen flex items-center justify-center bg-[#faf9f6] overflow-hidden snap-start snap-always select-none z-15"
    >
      {/* ═══ Subtle Luxury Ambient Radial Glow ═══ */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,77,46,0.04)_0%,_rgba(250,249,246,0.8)_60%,_#faf9f6_100%)] pointer-events-none z-0" />

      {/* ═══ Subtle Grain Background Texture Overlay ═══ */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #000000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ═══════════════════════════════════════════
          PILLOW CONTAINER: Lands in center, then smoothly zooms 1x -> 3.6x 0.8s after arrival
          ═══════════════════════════════════════════ */}
      <motion.div
        animate={{
          scale: isZoomed ? 3.6 : 1,
        }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          y: pillowY,
          x: pillowX,
          opacity: pillowOpacity,
        }}
        className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none will-change-transform"
      >
        <div className="relative w-[340px] sm:w-[480px] aspect-square flex items-center justify-center translate-y-[45px]">
          <Image
            src="/watches/watch-pillow.png"
            alt="Dark Leather Display Pillow"
            width={600}
            height={600}
            quality={100}
            priority
            className="w-full h-auto object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] contrast-[1.04] brightness-[1.01]"
          />
        </div>
      </motion.div>


    </section>
  );
}
