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
        x: isTopLeft ? -60 : 60,
        y: isTopLeft ? -30 : 30,
        scale: 0.85,
        rotate: isTopLeft ? -8 : 8,
      }}
      animate={
        phase2
          ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: isTopLeft ? -3 : 3 }
          : {
            opacity: 0,
            x: isTopLeft ? -60 : 60,
            y: isTopLeft ? -30 : 30,
            scale: 0.85,
            rotate: isTopLeft ? -8 : 8,
          }
      }
      transition={{
        duration: 0.9,
        delay: isTopLeft ? 0.15 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute z-20 ${isTopLeft
        ? "top-[16%] left-[4%] sm:top-[16%] sm:left-[5%] md:top-[12%] md:left-[6%] lg:top-[16%] lg:left-[6%]"
        : "bottom-[12%] right-[4%] sm:bottom-[10%] sm:right-[5%] md:bottom-[12%] md:right-[6%] lg:bottom-[10%] lg:right-[6%]"
        }`}
    >
      {/* Card — WHITE TRANSPARENT */}
      <div
        className="relative w-[108px] sm:w-[175px] md:w-[180px] lg:w-[230px]"
        style={{
          background: "rgba(255, 255, 255, 0.60)",
          border: "1px solid rgba(255, 255, 255, 0.70)",
          boxShadow: "2px 4px 20px rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* ── Div 1: Image area — GLASS TRANSPARENT (Identical fixed height on mobile) ── */}
        <div
          className="relative overflow-hidden h-[82px] sm:h-auto flex items-center justify-center p-1 sm:p-5 md:p-3.5 sm:pt-4 md:pt-2.5 sm:pb-0"
          style={{
            background: "transparent",
            backdropFilter: "blur(4px) saturate(1.1)",
            WebkitBackdropFilter: "blur(4px) saturate(1.1)",
            borderTop: "1px solid rgba(255, 255, 255, 0.45)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.45)",
            borderRight: "1px solid rgba(255, 255, 255, 0.45)",
          }}
        >
          <Image
            src={src}
            alt={label || "Watch detail card"}
            width={180}
            height={180}
            className="max-h-[74px] sm:max-h-none w-auto sm:w-full h-auto object-contain block mx-auto"
            sizes="(max-width: 640px) 90px, (max-width: 768px) 155px, (max-width: 1024px) 180px, 195px"
          />
        </div>

        {/* ── Div 2: Text area — WHITE TRANSPARENT (Identical fixed height on mobile) ── */}
        <div
          className="h-[52px] sm:h-auto flex flex-col justify-center p-1 sm:p-5 md:p-3.5 sm:pt-4 md:pt-3 sm:pb-5 md:pb-3.5 text-left"
          style={{
            background: "rgba(255, 255, 255, 0.60)",
          }}
        >
          <p
            className="text-[#1a4d2e] text-[8.5px] sm:text-[11px] md:text-[12px] font-bold tracking-[0.08em] sm:tracking-[0.14em] uppercase leading-tight truncate"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            {label}
          </p>
          <p
            className="text-[#1a4d2e]/75 text-[6.5px] sm:text-[9px] md:text-[10px] font-normal tracking-[0.01em] mt-0.5 sm:mt-1.5 leading-tight line-clamp-2"
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
    { className: "top-[70%] left-[8%] sm:top-[76%] sm:left-[6%] md:top-[74%] md:left-[6%] lg:top-[84%] lg:left-[10%]", rotate: 5 }, // Timeless.
    { className: "top-[20%] right-[16%] sm:top-[14%] sm:right-[18%] md:top-[14%] md:right-[12%]", rotate: -5 }, // Elegant.
    { className: "top-[20%] left-[32%] sm:top-[10%] sm:left-[28%] md:top-[10%] md:left-[22%]", rotate: 4 }, // Precious.
    { className: "top-[46%] right-[8%] sm:top-[44%] sm:right-[5%] md:top-[44%] md:right-[6%]", rotate: 2 }, // Refined.
    { className: "top-[93%] right-[4%] sm:top-[88%] md:top-[88%] md:right-[10%] lg:top-[90%] lg:right-[22%] left-auto", rotate: -5 }, // Prestigious.
  ];

  const pos = positions[index] || positions[0];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, rotate: pos.rotate }}
      animate={
        phase2
          ? { opacity: 1, scale: 1, rotate: pos.rotate }
          : { opacity: 0, scale: 0.8, rotate: pos.rotate }
      }
      transition={{
        duration: 0.6,
        delay: 0.4 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute z-20 block pointer-events-none select-none ${pos.className}`}
    >
      <span
        className="text-[11px] sm:text-[15px] md:text-base tracking-[0.08em] text-[#1a4d2e] font-normal whitespace-nowrap"
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
      transition={{ delay: delay || 4, duration: 1 }}
      onClick={onClick}
      className="hidden sm:flex flex-col items-center gap-2 mt-6 cursor-pointer pointer-events-auto group"
    >
      <span className="text-[9px] tracking-[0.3em] uppercase text-[#1a4d2e]/40 group-hover:text-[#1a4d2e] transition-colors">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-4 w-4 text-[#1a4d2e]/40 group-hover:text-[#1a4d2e] transition-colors" />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN HERO SECTION
   Watch floats down with scroll → unboxes onto showcase pillow
   ───────────────────────────────────────────── */
export default function HeroSection() {
  const containerRef = useRef(null);
  const [phase1, setPhase1] = useState(false);
  const [phase2, setPhase2] = useState(false);
  const [bgPhase, setBgPhase] = useState(false);

  const scrollToShowcase = () => {
    const showcase = document.getElementById("showcase");
    if (showcase) {
      showcase.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ═══ Spring-smoothed scroll progress ═══
  // Responsive spring — fast enough to track scroll, smooth enough to avoid jank.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 35,
    mass: 0.4,
  });

  /* Text & CTA scroll parallax (moves down slower — stays behind) */
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const [offsets, setOffsets] = useState({ x: 0, y: 0, scale: 0.79 });

  const calculateTarget = () => {
    const pillowContainer = document.getElementById("showcase-pillow-container");
    const heroElement = document.getElementById("hero");
    const isDesktop = window.innerWidth >= 1024;
    const isMd = window.innerWidth >= 768;
    const isSm = window.innerWidth >= 640;

    const scale = isDesktop ? 0.79 : isMd ? 0.97 : isSm ? 0.91 : 1.04;

    if (pillowContainer && heroElement) {
      const pillowRect = pillowContainer.getBoundingClientRect();
      const heroRect = heroElement.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;

      // The un-transformed center of hero section in document coordinates
      const heroCenterY = heroRect.top + scrollY + heroRect.height / 2;
      const heroCenterX = heroRect.left + heroRect.width / 2;

      // The un-transformed target position on the pillow in document coordinates (micro-tuned slightly lower)
      const pillowCenterY = pillowRect.top + scrollY + pillowRect.height * (isSm ? 0.50 : 0.56) + 5;
      const pillowCenterX = pillowRect.left + pillowRect.width / 2;

      // Exact document-relative distance between hero center and pillow target
      const rawDeltaY = pillowCenterY - heroCenterY;
      const rawDeltaX = pillowCenterX - heroCenterX;

      setOffsets({ x: rawDeltaX, y: rawDeltaY, scale });
    } else {
      setOffsets({
        x: isDesktop ? -285 : 0,
        y: isDesktop ? 805 : isSm ? 672 : 558,
        scale,
      });
    }
  };

  // Recalculate offsets on mount, after phase2, on resize and scroll
  useEffect(() => {
    calculateTarget();
    if (phase2) {
      const timer = setTimeout(calculateTarget, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase2]);

  // Only recalculate offsets on resize, NOT on scroll.
  // Recalculating on scroll caused the watch to "suddenly drop" because
  // getBoundingClientRect + setState created a 1-frame jitter on every scroll event.
  // The offsets are document-constant (offsetTop-based) so they never change while scrolling.
  useEffect(() => {
    window.addEventListener("resize", calculateTarget);
    return () => {
      window.removeEventListener("resize", calculateTarget);
    };
  }, []);

  /* Watch: eased transform curves — stays near start, accelerates mid-flight, decelerates at landing.
     Combined with the soft spring, this eliminates any visible "sudden drop" on scroll-snap. */
  const watchY = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0, offsets.y * 0.05, offsets.y * 0.55, offsets.y]);
  const watchX = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0, offsets.x * 0.05, offsets.x * 0.55, offsets.x]);
  /* Watch scales to match pillow size responsively */
  const watchScale = useTransform(smoothProgress, [0, 0.4, 1], [1, 1 - (1 - offsets.scale) * 0.1, offsets.scale]);
  /* Watch rotates smoothly back to 0deg to sit upright on pillow */
  const watchRotate = useTransform(smoothProgress, [0, 0.4, 1], [0, -8 * 0.1, -8]);
  /* Watch stays 100% visible on top of pillow until user clicks carousel arrow */
  const watchOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  /* Dark overlay */
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.12]);

  const [heroExitDir, setHeroExitDir] = useState(null);
  const [heroExited, setHeroExited] = useState(false);
  const prevScrollRef = useRef(0);

  /* Detect scroll UP to trigger re-entry of main watch onto pillow and restore Hero watch layer */
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

  useEffect(() => {
    const handleExit = (e) => {
      setHeroExitDir(e.detail.dir);
      const timer = setTimeout(() => {
        setHeroExited(true);
      }, 700);
      return () => clearTimeout(timer);
    };
    window.addEventListener("hero-watch-exit", handleExit);
    return () => window.removeEventListener("hero-watch-exit", handleExit);
  }, []);

  useEffect(() => {
    setPhase1(true);
    const timer = setTimeout(() => {
      setPhase2(true);
      setBgPhase(true);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  const admiringWords = [
    "Timeless.",
    "Elegant.",
    "Precious.",
    "Refined.",
    "Prestigious.",
  ];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-12 sm:pt-20 z-20 snap-start snap-always"
    >
      {/* BACKGROUND — white → phase 2 gradient */}
      <motion.div
        animate={{
          background: bgPhase
            ? "linear-gradient(160deg, rgba(235, 231, 219) 0%, rgba(220, 208, 186) 50%, rgba(235, 231, 219) 100%)"
            : "#ffffff",
        }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      />

      {/* Dark overlay on scroll */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[#0a0a0a] pointer-events-none"
      />

      {/* PHASE 1 — BACKGROUND HEADLINE TEXT */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={phase1 ? { y: "0%" } : {}}
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[3rem] sm:text-[6rem] md:text-[6.5rem] lg:text-[10rem] xl:text-[12rem] font-normal tracking-[0.08em] text-[#1a4d2e] leading-none select-none"
              style={{ fontFamily: "'Esthoria', serif" }}
            >
              OYSTER
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={phase1 ? { y: "0%" } : {}}
              transition={{
                duration: 1,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[3rem] sm:text-[6rem] md:text-[6.5rem] lg:text-[10rem] xl:text-[12rem] font-normal tracking-[0.08em] text-[#1a4d2e] leading-none select-none"
              style={{ fontFamily: "'Esthoria', serif" }}
            >
              PERPETUAL
            </motion.h1>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          WATCH — floats down & left with scroll to land directly on left pillow
          ═══════════════════════════════════════════ */}
      {!heroExited && (
        <motion.div
          id="hero-watch-wrapper"
          animate={
            heroExitDir !== null
              ? { x: heroExitDir > 0 ? "-120vw" : "120vw", opacity: 0 }
              : {}
          }
          transition={{ duration: 0.7, ease: [0.32, 0, 0.67, 0] }}
          style={{
            y: watchY,
            x: watchX,
            scale: watchScale,
            rotate: watchRotate,
            opacity: watchOpacity,
          }}
          className="absolute inset-0 z-30 pointer-events-none"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              id="hero-watch-container"
              initial={{ opacity: 0, scale: 0.75, y: 60, rotate: 0 }}
              animate={
                phase2
                  ? { opacity: 1, scale: 1, y: 0, rotate: 8 }
                  : phase1
                    ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
                    : { opacity: 0, scale: 0.75, y: 60, rotate: 0 }
              }
              transition={
                phase2
                  ? { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 1.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }
              }
              className="relative will-change-transform"
            >
              <Image
                src="/watches/hero-main-removebg-preview.png"
                alt="LASIKA Perpetual — Luxury Timepiece"
                width={520}
                height={360}
                className="relative z-10 w-[200px] sm:w-[340px] md:w-[360px] lg:w-[480px] h-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.25)]"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* CTA + Scroll — at bottom, scrolls with text (slower) */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-x-0 bottom-12 sm:bottom-2 md:bottom-3 lg:bottom-5 z-[35] flex flex-col items-center text-center pointer-events-none"
      >
        {/* Gold divider — phase 2 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={phase2 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c5a56e]/50 to-transparent mb-6 sm:mb-8"
        />

        {/* CTA Button — phase 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={phase2 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 30px rgba(26,77,46,0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToShowcase}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative overflow-hidden bg-[#1a4d2e] text-white px-5 sm:px-10 py-2 sm:py-3.5 rounded-sm text-[9.5px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-medium shadow-lg pointer-events-auto cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Learn more</span>
          </motion.button>
        </motion.div>

        <ScrollIndicator delay={4} onClick={scrollToShowcase} />
      </motion.div>

      {/* PHASE 2 — TOP-LEFT BEZEL CARD */}
      <DetailCard
        src="/watches/hero-detail-bezel-removebg-preview.png"
        label="Fluted Bezel"
        subtitle="Ceramic insert with engraved numerals"
        position="top-left"
        phase2={phase2}
      />

      {/* PHASE 2 — BOTTOM-RIGHT MOVEMENT CARD */}
      <DetailCard
        src="/watches/hero-detail-movement.png"
        label="Calibre 3235"
        subtitle="A technical feat of movement"
        position="bottom-right"
        phase2={phase2}
      />

      {/* PHASE 2 — SCATTERED ADMIRING WORDS (ON ALL VIEWPORTS) */}
      {admiringWords.map((word, i) => (
        <ScatteredWord key={word} word={word} phase2={phase2} index={i} />
      ))}

      {/* Side decorative text */}
      <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={phase2 ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[9px] tracking-[0.4em] uppercase text-[#c5a56e]/20 [writing-mode:vertical-lr] rotate-180"
        >
          Swiss Made — Est. 1885
        </motion.p>
      </div>
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={phase2 ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[9px] tracking-[0.4em] uppercase text-[#c5a56e]/20 [writing-mode:vertical-lr]"
        >
          Perpetual Excellence
        </motion.p>
      </div>
    </section>
  );
}