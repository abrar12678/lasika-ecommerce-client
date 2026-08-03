"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────
   Phase 2 — Detail card (top-left / bottom-right)
   ───────────────────────────────────────────── */
function DetailCard({ src, label, subtitle, position, phase2 }) {
  const isTopLeft = position === "top-left";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isTopLeft ? -70 : 70,
        y: isTopLeft ? -35 : 35,
        scale: 0.82,
        rotate: isTopLeft ? -10 : 10,
      }}
      animate={
        phase2
          ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: isTopLeft ? -2 : 2 }
          : {
              opacity: 0,
              x: isTopLeft ? -70 : 70,
              y: isTopLeft ? -35 : 35,
              scale: 0.82,
              rotate: isTopLeft ? -10 : 10,
            }
      }
      transition={{
        duration: 1,
        delay: isTopLeft ? 0.18 : 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute z-20 ${isTopLeft
        ? "top-[14%] left-[3%] sm:top-[14%] sm:left-[4%] md:top-[10%] md:left-[5%] lg:top-[14%] lg:left-[5%]"
        : "bottom-[10%] right-[3%] sm:bottom-[8%] sm:right-[4%] md:bottom-[10%] md:right-[5%] lg:bottom-[8%] lg:right-[5%]"
        }`}
    >
      <div
        className="relative w-[112px] sm:w-[180px] md:w-[190px] lg:w-[240px] hover-lift cursor-default"
        style={{
          background: "rgba(255, 255, 255, 0.72)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.12), 0 8px 20px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div
          className="relative overflow-hidden h-[86px] sm:h-auto flex items-center justify-center p-1 sm:p-5 md:p-4 sm:pt-5 md:pt-3 sm:pb-0"
          style={{
            background: "transparent",
            backdropFilter: "blur(6px) saturate(1.2)",
            WebkitBackdropFilter: "blur(6px) saturate(1.2)",
          }}
        >
          <Image
            src={src}
            alt={label || "Watch detail card"}
            width={180}
            height={180}
            className="max-h-[78px] sm:max-h-none w-auto sm:w-full h-auto object-contain block mx-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
            sizes="(max-width: 640px) 95px, (max-width: 768px) 160px, (max-width: 1024px) 185px, 200px"
          />
        </div>

        <div
          className="h-[56px] sm:h-auto flex flex-col justify-center p-1.5 sm:p-5 md:p-4 sm:pt-5 md:pt-4 sm:pb-5 md:pb-4 text-left"
          style={{
            background: "rgba(255, 255, 255, 0.55)",
          }}
        >
          <p
            className="text-[#1a4d2e] text-[8px] sm:text-[11px] md:text-[12px] font-bold tracking-[0.1em] sm:tracking-[0.16em] uppercase leading-tight truncate"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            {label}
          </p>
          <p
            className="text-[#1a4d2e]/65 text-[6px] sm:text-[9px] md:text-[10px] font-normal tracking-[0.01em] mt-1 sm:mt-1.5 leading-tight line-clamp-2"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Phase 2 — Scattered admiring words
   ───────────────────────────────────────────── */
function ScatteredWord({ word, phase2, index }) {
  const positions = [
    { className: "top-[68%] left-[7%] sm:top-[74%] sm:left-[5%] md:top-[72%] md:left-[5%] lg:top-[82%] lg:left-[9%]", rotate: 4 },
    { className: "top-[18%] right-[14%] sm:top-[12%] sm:right-[16%] md:top-[12%] md:right-[10%]", rotate: -4 },
    { className: "top-[18%] left-[30%] sm:top-[8%] sm:left-[26%] md:top-[8%] md:left-[20%]", rotate: 3 },
    { className: "top-[44%] right-[7%] sm:top-[42%] sm:right-[4%] md:top-[42%] md:right-[5%]", rotate: 1.5 },
    { className: "top-[91%] right-[3%] sm:top-[86%] md:top-[86%] md:right-[9%] lg:top-[88%] lg:right-[28%] left-auto", rotate: -4 },
  ];

  const pos = positions[index] || positions[0];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7, rotate: pos.rotate }}
      animate={
        phase2
          ? { opacity: 0.6, scale: 1, rotate: pos.rotate }
          : { opacity: 0, scale: 0.7, rotate: pos.rotate }
      }
      transition={{
        duration: 0.7,
        delay: 0.5 + index * 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute z-20 block pointer-events-none select-none ${pos.className}`}
    >
      <span
        className="text-[11px] sm:text-[16px] md:text-[17px] tracking-[0.1em] text-[#1a4d2e] font-normal whitespace-nowrap italic"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {word}
      </span>
    </motion.span>
  );
}

/* ─────────────────────────────────────────────
   Scroll indicator
   ───────────────────────────────────────────── */
function ScrollIndicator({ delay, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay || 4.2, duration: 1.2 }}
      onClick={onClick}
      className="hidden sm:flex flex-col items-center gap-2.5 mt-6 cursor-pointer pointer-events-auto group"
    >
      <span
        className="text-[9px] tracking-[0.35em] uppercase text-[#1a4d2e]/30 group-hover:text-[#c5a56e] transition-colors duration-500"
        style={{ fontFamily: "var(--font-geist)" }}
      >
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-4 w-4 text-[#1a4d2e]/30 group-hover:text-[#c5a56e] transition-colors duration-500" />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN HERO SECTION
   ───────────────────────────────────────────── */
export default function HeroSection() {
  const containerRef = useRef(null);
  const [phase1, setPhase1] = useState(false);
  const [phase2, setPhase2] = useState(false);
  const [bgPhase, setBgPhase] = useState(false);
  const [offsets, setOffsets] = useState({ x: 0, y: 0, scale: 0.79 });
  const [detailOffsets, setDetailOffsets] = useState({ x: 0, y: 0 });
  const [boxOffsets, setBoxOffsets] = useState({ x: 0, y: 0 });

  const scrollToShowcase = () => {
    const showcase = document.getElementById("showcase");
    if (showcase) {
      showcase.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollY, [0, 200], [0, 40]);
  const textOpacity = useTransform(scrollY, [0, 100, 180], [1, 0, 0]);

  const calculateTarget = () => {
    const pillowContainer = document.getElementById("showcase-pillow-container");
    const detailElement = document.getElementById("detail");
    const boxContainer = document.getElementById("watch-box-target") || document.getElementById("box-pillow-container");
    const heroElement = document.getElementById("hero");
    const isDesktop = window.innerWidth >= 1024;
    const isMd = window.innerWidth >= 768;
    const isSm = window.innerWidth >= 640;

    const scale = isDesktop ? 0.79 : isMd ? 0.97 : isSm ? 0.91 : 0.80;

    if (heroElement) {
      const heroRect = heroElement.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const heroCenterY = heroRect.top + scrollY + heroRect.height / 2;
      const heroCenterX = heroRect.left + heroRect.width / 2;

      if (pillowContainer) {
        const pillowRect = pillowContainer.getBoundingClientRect();
        const pillowCenterY = pillowRect.top + scrollY + pillowRect.height * (isSm ? 0.50 : 0.51);
        const pillowCenterX = pillowRect.left + pillowRect.width / 2;
        const calculatedX = pillowCenterX - heroCenterX;
        const finalX = isDesktop && calculatedX > -100 ? -285 : calculatedX;
        setOffsets({
          x: finalX,
          y: pillowCenterY - heroCenterY,
          scale,
        });
      } else {
        setOffsets({ x: isDesktop ? -285 : 0, y: isDesktop ? 805 : isSm ? 672 : 558, scale });
      }

      if (detailElement) {
        const detailRect = detailElement.getBoundingClientRect();
        const detailCenterY = detailRect.top + scrollY + detailRect.height / 2 + 45;
        const detailCenterX = detailRect.left + detailRect.width / 2;
        setDetailOffsets({ x: detailCenterX - heroCenterX, y: detailCenterY - heroCenterY });
      } else {
        setDetailOffsets({ x: 0, y: (heroRect.height || window.innerHeight) * 2 });
      }

      if (boxContainer) {
        const boxRect = boxContainer.getBoundingClientRect();
        const boxCenterY = boxRect.top + scrollY + boxRect.height / 2;
        const boxCenterX = boxRect.left + boxRect.width / 2;
        setBoxOffsets({ x: boxCenterX - heroCenterX, y: boxCenterY - heroCenterY });
      } else {
        setBoxOffsets({ x: 0, y: (heroRect.height || window.innerHeight) * 3 });
      }
    }
  };

  useEffect(() => {
    calculateTarget();
    if (phase2) {
      const timer = setTimeout(calculateTarget, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase2]);

  useEffect(() => {
    window.addEventListener("resize", calculateTarget);
    return () => window.removeEventListener("resize", calculateTarget);
  }, []);

  const [vh, setVh] = useState(800);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setVh(window.innerHeight);
      const handleResize = () => setVh(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const smoothScrollY = useSpring(scrollY, { stiffness: 200, damping: 30, mass: 0.4 });

  const watchY = useTransform(
    smoothScrollY,
    [0, vh * 0.35, vh * 0.7, vh, vh * 1.35, vh * 1.7, vh * 2.0, vh * 2.35, vh * 2.7, vh * 3.0],
    [
      0, offsets.y * 0.05, offsets.y * 0.55, offsets.y,
      offsets.y + (detailOffsets.y - offsets.y) * 0.1,
      offsets.y + (detailOffsets.y - offsets.y) * 0.6,
      detailOffsets.y,
      detailOffsets.y + (boxOffsets.y - detailOffsets.y) * 0.1,
      detailOffsets.y + (boxOffsets.y - detailOffsets.y) * 0.6,
      boxOffsets.y,
    ]
  );

  const watchX = useTransform(
    smoothScrollY,
    [0, vh * 0.35, vh * 0.7, vh, vh * 1.35, vh * 1.7, vh * 2.0, vh * 2.35, vh * 2.7, vh * 3.0],
    [
      0, offsets.x * 0.05, offsets.x * 0.55, offsets.x,
      offsets.x + (detailOffsets.x - offsets.x) * 0.1,
      offsets.x + (detailOffsets.x - offsets.x) * 0.6,
      detailOffsets.x,
      detailOffsets.x + (boxOffsets.x - detailOffsets.x) * 0.1,
      detailOffsets.x + (boxOffsets.x - detailOffsets.x) * 0.6,
      boxOffsets.x,
    ]
  );

  const [detailZoomed, setDetailZoomed] = useState(false);

  useEffect(() => {
    const handleZoomEvent = (e) => setDetailZoomed(e.detail.zoomed);
    window.addEventListener("detail-zoom-trigger", handleZoomEvent);
    return () => window.removeEventListener("detail-zoom-trigger", handleZoomEvent);
  }, []);

  const watchScrollScale = useTransform(
    smoothScrollY,
    [0, vh * 0.4, vh, vh * 1.35, vh * 2.0, vh * 3.0],
    [1, 1 - (1 - offsets.scale) * 0.1, offsets.scale, offsets.scale, offsets.scale, 0.65]
  );

  const targetWatchScale = useTransform(
    smoothScrollY,
    (latest) => {
      const isDetailSection = latest >= vh * 1.6 && latest < vh * 2.7;
      if (isDetailSection && detailZoomed) return 1.55;
      return watchScrollScale.get();
    }
  );

  const watchScale = useSpring(targetWatchScale, { stiffness: 120, damping: 24, mass: 0.5 });

  const watchRotate = useTransform(
    smoothScrollY,
    [0, vh * 0.4, vh, vh * 2.0, vh * 3.0],
    [0, -8 * 0.1, -8, -8, -8]
  );

  const watchOpacity = useTransform(scrollY, [0, vh * 2.4, vh * 2.8], [1, 1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.1]);

  const [heroExitDir, setHeroExitDir] = useState(null);
  const [heroExited, setHeroExited] = useState(false);
  const prevScrollRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isScrollingUp = latest < prevScrollRef.current;
    prevScrollRef.current = latest;
    if (isScrollingUp && latest < 0.55) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("hero-watch-reenter"));
      }
      setHeroExitDir(null);
      setHeroExited(false);
    }
  });

  /* -- Listen for hero-watch-exit (carousel switch in showcase) -- */
  useEffect(() => {
    let timer = null;
    const handleExit = (e) => {
      setHeroExitDir(e.detail.dir);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setHeroExited(true), 700);
    };
    window.addEventListener("hero-watch-exit", handleExit);
    return () => {
      window.removeEventListener("hero-watch-exit", handleExit);
      if (timer) clearTimeout(timer);
    };
  }, []);

  /* -- Listen for showcase-silent-reset (showcase scrolls to detail, hide carousel watch) -- */
  useEffect(() => {
    const handleSilentReset = () => {
      calculateTarget();
      setHeroExitDir(null);
      setHeroExited(false);
    };
    window.addEventListener("showcase-silent-reset", handleSilentReset);
    return () => window.removeEventListener("showcase-silent-reset", handleSilentReset);
  }, []);

  /* -- Listen for hero-watch-reenter (user scrolling UP past hero) -- */
  useEffect(() => {
    const handleReenter = () => {
      setHeroExitDir(null);
      setHeroExited(false);
    };
    window.addEventListener("hero-watch-reenter", handleReenter);
    return () => window.removeEventListener("hero-watch-reenter", handleReenter);
  }, []);

  useEffect(() => {
    setPhase1(true);
    const timer = setTimeout(() => {
      setPhase2(true);
      setBgPhase(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const admiringWords = ["Timeless.", "Elegant.", "Precious.", "Refined.", "Prestigious."];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen min-h-screen overflow-visible flex items-center justify-center pt-12 sm:pt-20 snap-start snap-always"
    >
      {/* SVG Filter */}
      <svg className="hidden">
        <filter id="grunge-stamp-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* ── Background ── */}
      <motion.div
        animate={{
          backgroundColor: bgPhase ? "#e6ddc9" : "#ffffff",
        }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <motion.div
          animate={{ opacity: bgPhase ? 1 : 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,252,245,0.92)_0%,_rgba(235,225,205,0.96)_55%,_#e6ddc9_100%)]"
        />
      </motion.div>

      {/* Paper Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-overlay bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* Dark overlay on scroll */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[#0a0a0a] pointer-events-none z-10"
      />

      {/* ── Giant Text ── */}
      <div className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none select-none">
        <div className="flex flex-col items-center">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "115%" }}
              animate={phase1 ? { y: "0%" } : {}}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-[3.5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10.5rem] xl:text-[12.5rem] font-black tracking-tight text-[#004B23] leading-[0.88] uppercase"
              style={{
                fontFamily: "var(--font-playfair)",
                filter: "url(#grunge-stamp-texture)",
              }}
            >
              OYSTER
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "115%" }}
              animate={phase1 ? { y: "0%" } : {}}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-[3.5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10.5rem] xl:text-[12.5rem] font-black tracking-tight text-[#004B23] leading-[0.88] uppercase -mt-2 sm:-mt-6"
              style={{
                fontFamily: "var(--font-playfair)",
                filter: "url(#grunge-stamp-texture)",
              }}
            >
              PERPETUAL
            </motion.h1>
          </div>
        </div>
      </div>

      {/* -- WATCH: floats with scroll -- */}
      {!heroExited && (
        <motion.div
          id="hero-watch-wrapper"
          animate={
            heroExitDir !== null
              ? { x: heroExitDir > 0 ? "-120vw" : "120vw", opacity: 0 }
              : { opacity: 1 }
          }
          transition={
            heroExitDir !== null
              ? { duration: 0.7, ease: [0.32, 0, 0.67, 0] }
              : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          }
          style={{ y: watchY, x: watchX, scale: watchScale, rotate: watchRotate, opacity: watchOpacity }}
          className="absolute inset-0 z-[20] pointer-events-none"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              id="hero-watch-container"
              initial={{ opacity: 0, scale: 0.7, y: 70, rotate: 0 }}
              animate={
                phase2
                  ? { opacity: 1, scale: 1, y: 0, rotate: 8 }
                  : phase1
                    ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
                    : { opacity: 0, scale: 0.7, y: 70, rotate: 0 }
              }
              transition={
                phase2
                  ? { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }
              }
              className="relative will-change-transform"
            >
              <div className="absolute top-[82%] left-1/2 -translate-x-1/2 w-[70%] h-[28px] bg-black/25 rounded-[100%] filter blur-xl pointer-events-none z-0" />
              <Image
                src="/watches/hero-main-removebg-preview.png"
                alt="LASIKA Perpetual — Luxury Timepiece"
                width={520}
                height={360}
                className="relative z-10 w-[200px] sm:w-[340px] md:w-[360px] lg:w-[480px] h-auto drop-shadow-[0_40px_70px_rgba(0,0,0,0.32)]"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* CTA + Scroll */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-x-0 bottom-16 sm:bottom-2 md:bottom-3 lg:bottom-5 z-[35] flex flex-col items-center text-center pointer-events-none"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={phase2 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c5a56e]/40 to-transparent mb-7 sm:mb-9"
        />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={phase2 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 40px rgba(26,77,46,0.22), 0 0 0 1px rgba(197,165,110,0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToShowcase}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="shimmer-hover relative overflow-hidden bg-[#1a4d2e] text-white px-6 sm:px-12 py-2.5 sm:py-4 rounded-sm text-[9px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.28em] uppercase font-semibold shadow-lg shadow-[#1a4d2e]/15 pointer-events-auto cursor-pointer"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            <span className="relative z-10">Discover Collection</span>
          </motion.button>
        </motion.div>

        <ScrollIndicator delay={4.2} onClick={scrollToShowcase} />
      </motion.div>

      {/* PHASE 2 — Detail Cards */}
      <DetailCard
        src="/watches/hero-detail-bezel-removebg-preview.png"
        label="Fluted Bezel"
        subtitle="Ceramic insert with engraved numerals"
        position="top-left"
        phase2={phase2}
      />
      <DetailCard
        src="/watches/hero-detail-movement.png"
        label="Calibre 3235"
        subtitle="A technical feat of movement"
        position="bottom-right"
        phase2={phase2}
      />

      {/* PHASE 2 — Scattered Words */}
      {admiringWords.map((word, i) => (
        <ScatteredWord key={word} word={word} phase2={phase2} index={i} />
      ))}

      {/* Side decorative text */}
      <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={phase2 ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[9px] tracking-[0.45em] uppercase text-[#c5a56e]/15 [writing-mode:vertical-lr] rotate-180"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          Swiss Made — Est. 1885
        </motion.p>
      </div>
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={phase2 ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[9px] tracking-[0.45em] uppercase text-[#c5a56e]/15 [writing-mode:vertical-lr]"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          Perpetual Excellence
        </motion.p>
      </div>
    </section>
  );
}
