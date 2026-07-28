"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════
   SECTION 4: BOX REVEAL SECTION
   Watch shrinks down and lands inside luxury watch presentation box
   ═══════════════════════════════════════════════════ */
export default function WatchBoxSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.4,
  });

  /* Background parallax text Y movement */
  const textY = useTransform(smoothProgress, [0, 1], [60, -60]);
  const textOpacity = useTransform(smoothProgress, [0.15, 0.4, 0.85], [0, 1, 0.4]);

  /* Box entrance animation */
  const boxScale = useTransform(smoothProgress, [0.2, 0.55], [0.85, 1]);
  const boxOpacity = useTransform(smoothProgress, [0.1, 0.35], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="box-reveal"
      className="relative h-screen min-h-screen flex items-center justify-center bg-[#faf9f6] overflow-hidden snap-start snap-always select-none z-10"
    >
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,165,110,0.08)_0%,_rgba(250,249,246,0.9)_60%,_#faf9f6_100%)] pointer-events-none z-0" />

      {/* ═══ Background Big Luxury Typography ═══ */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none z-[1]"
      >
        <h2
          className="text-[4rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-normal tracking-[0.12em] text-[#1a4d2e]/10 leading-none"
          style={{ fontFamily: "'Esthoria', serif" }}
        >
          UNBOX
        </h2>
        <p
          className="text-[1.5rem] sm:text-[3rem] md:text-[4rem] tracking-[0.25em] text-[#c5a56e]/20 uppercase font-light -mt-4 sm:-mt-8"
          style={{ fontFamily: "serif" }}
        >
          PERFECTION
        </p>
      </motion.div>

      {/* ═══════════════════════════════════════════
          LUXURY WATCH BOX CONTAINER (Target for main watch landing)
          ═══════════════════════════════════════════ */}
      <motion.div
        id="box-pillow-container"
        style={{ scale: boxScale, opacity: boxOpacity }}
        className="relative z-10 w-[300px] sm:w-[440px] md:w-[500px] aspect-square flex items-center justify-center pointer-events-auto"
      >
        {/* Watch Box Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/watches/luxury-watch-box.png"
            alt="Luxury Leather Watch Presentation Box"
            width={600}
            height={600}
            quality={100}
            priority
            className="w-full h-auto object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.35)]"
          />

          {/* Invisible target slot anchor inside box */}
          <div
            id="watch-box-target"
            className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[240px] h-[180px] sm:h-[240px] pointer-events-none border border-transparent"
          />
        </div>
      </motion.div>

      {/* ═══ Bottom CTA & Tagline ═══ */}
      <motion.div
        style={{ opacity: boxOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-center flex flex-col items-center gap-3"
      >
        <p className="text-[9px] sm:text-xs tracking-[0.3em] uppercase text-neutral-500 font-medium">
          Complete Presentation • Swiss Heritage
        </p>
        <button className="px-7 py-3 rounded-full bg-[#1a4d2e] text-white text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/20 cursor-pointer">
          Reserve Timepiece
        </button>
      </motion.div>
    </section>
  );
}
