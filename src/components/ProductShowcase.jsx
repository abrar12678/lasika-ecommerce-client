"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

/* ─────────────────────────────────────────────
   Watch Data
   ───────────────────────────────────────────── */
const watches = [
  {
    id: 1,
    image: "/watches/hero-main-removebg-preview.png",
    name: "Oyster Perpetual",
    model: "Model 04",
    dial: "Day Date",
    material: "Yellow Gold",
    tag: "Green Oysters",
    price: "$8,450",
  },
  {
    id: 2,
    image: "/watches/watch-yellow-gold.png",
    name: "Oyster Perpetual",
    model: "Model 08",
    dial: "Master Date",
    material: "Rose Gold",
    tag: "Brown Leather",
    price: "$7,250",
  },
  {
    id: 3,
    image: "/watches/watch-emerald-green.png",
    name: "Oyster Perpetual",
    model: "Model 12",
    dial: "Submariner",
    material: "White Gold",
    tag: "Silver Frost",
    price: "$9,200",
  },
];

/* ─────────────────────────────────────────────
   Floating Spec Label Pill
   Phase 2: Appears with overflow-hidden text reveal (exact same as Hero headline text reveal)
   ───────────────────────────────────────────── */
function FloatingLabel({ text, position, delay = 0, phase2 }) {
  const posClasses = {
    tl: "top-[10%] left-[0%] sm:top-[4%] sm:left-[2%] md:-top-[10%] md:-left-[6%] lg:-top-[20%] lg:-left-[12%]",
    tr: "top-[10%] right-[0%] sm:top-[4%] sm:right-[2%] md:-top-[10%] md:-right-[6%] lg:-top-[20%] lg:-right-[12%]",
    bl: "bottom-[2%] -left-[1%] sm:bottom-[16%] sm:left-[2%] md:-bottom-[4%] md:-left-[8%] lg:-bottom-[16%] lg:-left-[14%]",
    br: "bottom-[2%] -right-[1%] sm:bottom-[16%] sm:right-[2%] md:-bottom-[4%] md:-right-[8%] lg:-bottom-[16%] lg:-right-[14%]",
  };

  return (
    <div className={`absolute z-30 overflow-hidden ${posClasses[position]}`}>
      <motion.span
        suppressHydrationWarning
        initial={{ y: "110%" }}
        animate={phase2 ? { y: "0%" } : { y: "110%" }}
        transition={{
          duration: 0.9,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block px-2.5 py-1 text-[8.5px] sm:px-3.5 sm:py-1.5 sm:text-[11px] tracking-[0.08em] sm:tracking-[0.14em] uppercase font-semibold text-[#1a4d2e] bg-[#f7f5ed] border border-gray-300/90 rounded-full shadow-sm backdrop-blur-md"
      >
        {text}
      </motion.span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Watch Card (right side)
   ───────────────────────────────────────────── */
function WatchCard({ watch, direction, delay = 0, onClick }) {
  return (
    <motion.div
      layout
      initial={{ x: direction > 0 ? 180 : -180, opacity: 0, scale: 0.95 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: direction > 0 ? -180 : 180, opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex-shrink-0 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden cursor-pointer group hover:shadow-md transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-4">
        <div className="relative w-[65px] h-[65px] sm:w-[90px] sm:h-[90px] flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-[#f9f8f3] flex items-center justify-center p-1">
          <Image
            src={watch.image}
            alt={watch?.name ? `${watch.name} ${watch.dial}` : "Luxury Watch"}
            width={75}
            height={75}
            className="h-auto w-auto max-w-[85%] group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[11px] sm:text-[13px] tracking-[0.04em] sm:tracking-[0.05em] font-bold text-[#1a4d2e] truncate">
            {watch.tag} &middot; {watch.material}
          </h3>
          <p className="text-[9.5px] sm:text-[11px] text-[#1a4d2e]/60 mt-0.5 sm:mt-1 tracking-[0.02em] sm:tracking-[0.03em] truncate">
            {watch.name} — {watch.dial}
          </p>
          <p className="text-[12px] sm:text-[14px] font-semibold text-[#4a9c7a] mt-1 sm:mt-1.5">
            {watch.price}
          </p>
        </div>
        <motion.div
          whileHover={{ x: 3 }}
          className="text-[#1a4d2e]/30 group-hover:text-[#1a4d2e] transition-colors duration-300 flex-shrink-0"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PRODUCT SHOWCASE SECTION
   2 Phases:
   - Phase 1: Left pillow comes from top-left (Hero card style), right content comes from bottom-right (Hero card style). Hero main watch floats in front of screen and lands straight on empty pillow area.
   - Phase 2: Pillow zooms in, watch sets perfectly, and left spec texts reveal (Hero text reveal animation style).
   - Carousel: Clicking Right Arrow slides current watch off-screen to left, next watch enters from right onto zoomed pillow.
   ───────────────────────────────────────────── */
export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showcasePhase2, setShowcasePhase2] = useState(false);
  const [carouselActive, setCarouselActive] = useState(false);
  const [isScrollingAway, setIsScrollingAway] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-120px" });

  /* ═══ Detect when user scrolls away from showcase (toward detail section) ═══ */
  const { scrollYProgress: showcaseScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(showcaseScrollProgress, "change", (latest) => {
    setIsScrollingAway(latest > 0.05);
  });

  /* Trigger Phase 2 (Pillow Zoom & Text Reveal) after Phase 1 entrance */
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowcasePhase2(true);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setShowcasePhase2(false);
    }
  }, [isInView]);

  /* Listen to hero-watch-reenter event when user scrolls UP back toward Hero */
  useEffect(() => {
    const handleReenter = () => {
      if (activeIndex !== 0 || carouselActive) {
        setDirection(-1);
        setActiveIndex(0);
        const timer = setTimeout(() => {
          setCarouselActive(false);
        }, 600);
        return () => clearTimeout(timer);
      }
    };
    window.addEventListener("hero-watch-reenter", handleReenter);
    return () => window.removeEventListener("hero-watch-reenter", handleReenter);
  }, [activeIndex, carouselActive]);

  const activeWatch = watches[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === watches.length - 1;

  /* Strictly show only the remaining upcoming cards to the right */
  const rightCards = watches.slice(activeIndex + 1);

  const handleNext = () => {
    if (isLast) return;
    if (!carouselActive && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("hero-watch-exit", { detail: { dir: 1 } })
      );
    }
    setCarouselActive(true);
    setDirection(1);
    setActiveIndex((prev) => Math.min(prev + 1, watches.length - 1));
  };

  const handlePrev = () => {
    if (isFirst) return;
    if (!carouselActive && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("hero-watch-exit", { detail: { dir: -1 } })
      );
    }
    setCarouselActive(true);
    setDirection(-1);
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleCardClick = (index) => {
    const dir = index > activeIndex ? 1 : index < activeIndex ? -1 : 0;
    if (dir !== 0) {
      if (!carouselActive && typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("hero-watch-exit", { detail: { dir } })
        );
      }
      setCarouselActive(true);
      setDirection(dir);
      setActiveIndex(index);
    }
  };

  /* Carousel Slide Variants for Phase 2 (Left watch slides out off-screen to left -100vw, new watch enters from right 100vw) */
  const slideVariants = {
    initial: (dir) => ({
      x: dir > 0 ? "100vw" : "-100vw",
      opacity: 1,
      scale: 1,
      rotate: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100vw" : "100vw",
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.32, 0, 0.67, 0],
      },
    }),
  };

  const { scrollYProgress: showcaseExitProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Fades out pillow container as user scrolls past Showcase into Detail section
  const showcasePillowOpacity = useTransform(showcaseExitProgress, [0, 0.45, 0.9], [1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative h-screen min-h-screen flex flex-col justify-center bg-[#faf9f6] overflow-hidden pt-16 pb-4 sm:py-12 lg:py-0 z-10 snap-start snap-always"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(26,77,46,0.03)_0%,_transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-16 py-1 sm:py-10 lg:py-8 flex items-center justify-center">
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-6 lg:gap-12">

          {/* ═══════════════════════════════════════
              LEFT SIDE: Pillow (Top-Left style entrance & Phase 2 zoom in) + Spec Texts (Hero text reveal style)
              ═══════════════════════════════════════ */}
          <div className="relative w-full lg:w-[52%] flex items-center justify-center pt-6 pb-2 sm:pt-0 sm:pb-0 min-h-[210px] sm:min-h-[440px] lg:min-h-[460px]">
            
            {/* Pillow & Watch Container Area */}
            <motion.div style={{ opacity: showcasePillowOpacity }} id="showcase-pillow-container" className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center">

              {/* Phase 2: Left Spec Texts — Revealed with Hero section overflow-hidden text reveal style */}
              <FloatingLabel
                text={activeWatch.model}
                position="tl"
                delay={0.1}
                phase2={showcasePhase2}
              />
              <FloatingLabel
                text={activeWatch.dial}
                position="tr"
                delay={0.25}
                phase2={showcasePhase2}
              />
              <FloatingLabel
                text={activeWatch.material}
                position="br"
                delay={0.4}
                phase2={showcasePhase2}
              />
              <FloatingLabel
                text={activeWatch.tag}
                position="bl"
                delay={0.55}
                phase2={showcasePhase2}
              />

              {/* Pillow Stand:
                  Phase 1: Enters from top-left direction (like hero top-left card)
                  Phase 2: Zooms in (scale: 1.08) to set the watch perfectly!
              */}
              <motion.div
                id="showcase-pillow-img"
                initial={{ opacity: 0, x: -60, y: -30, scale: 0.85, rotate: -8 }}
                animate={
                  isScrollingAway
                    ? { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0 }
                    : isInView
                      ? showcasePhase2
                        ? { opacity: 1, x: 0, y: 0, scale: 1.08, rotate: 0 }
                        : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }
                      : { opacity: 0, x: -60, y: -30, scale: 0.85, rotate: -8 }
                }
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:translate-y-0 w-[42%] sm:w-[75%] z-[5]"
              >
                <Image
                  src="/watches/watch-pillow.png"
                  alt="Watch Display Pillow Stand"
                  width={500}
                  height={500}
                  quality={100}
                  priority
                  sizes="(max-width: 768px) 75vw, 480px"
                  className="w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] contrast-[1.04] brightness-[1.02]"
                />
              </motion.div>

              {/* Watch Display Area:
                  In Phase 1: Pre-set watch image is removed so Hero watch floats down onto empty pillow.
                  In Phase 2 / Carousel: When user interacts, carousel watch slides in from right onto zoomed pillow!
              */}
              <div className="relative z-20 w-full h-full flex items-center justify-center overflow-visible">
                <AnimatePresence mode="popLayout" custom={direction}>
                  {carouselActive && !isScrollingAway && (
                    <motion.div
                      key={activeWatch.id + "-" + activeIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial={carouselActive ? "initial" : { opacity: 1, scale: 1 }}
                      animate="animate"
                      exit="exit"
                      className="relative w-full h-full flex items-center justify-center pb-[8%]"
                    >
                      <Image
                        src={activeWatch.image}
                        alt={activeWatch?.name ? `${activeWatch.name} — ${activeWatch.dial}` : "Oyster Perpetual Timepiece"}
                        width={420}
                        height={420}
                        priority
                        className="w-[200px] sm:w-[310px] md:w-[350px] lg:w-[380px] h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.25)]"
                      />
                      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[55%] h-[8%] rounded-[50%] bg-black/20 blur-md pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>

          {/* ═══════════════════════════════════════
              RIGHT SIDE: Heading + Arrow + Cards Stack
              Phase 1: Enters from bottom-right direction (like hero bottom-right card)
              ═══════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 30, scale: 0.85, rotate: 8 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }
                : { opacity: 0, x: 60, y: 30, scale: 0.85, rotate: 8 }
            }
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full lg:w-[45%] flex flex-col justify-center lg:py-4"
          >
            {/* Header & Prominent Right Arrow Button */}
            <div className="relative mb-2 sm:mb-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[12px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#1a4d2e]/50 font-semibold block">
                  Our Models
                </span>

                {/* Left & Right Arrow Buttons (← / →) for Carousel Navigation */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <motion.button
                    disabled={isFirst}
                    whileHover={!isFirst ? { scale: 1.08 } : {}}
                    whileTap={!isFirst ? { scale: 0.94 } : {}}
                    onClick={handlePrev}
                    className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full shadow-md border border-gray-200/80 flex items-center justify-center transition-all duration-300 ${
                      isFirst
                        ? "bg-gray-100 opacity-40 cursor-not-allowed text-gray-400"
                        : "bg-white text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white cursor-pointer group"
                    }`}
                    aria-label="Previous Model"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
                  </motion.button>

                  <motion.button
                    disabled={isLast}
                    whileHover={!isLast ? { scale: 1.08 } : {}}
                    whileTap={!isLast ? { scale: 0.94 } : {}}
                    onClick={handleNext}
                    className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full shadow-md border border-gray-200/80 flex items-center justify-center transition-all duration-300 ${
                      isLast
                        ? "bg-gray-100 opacity-40 cursor-not-allowed text-gray-400"
                        : "bg-white text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white cursor-pointer group"
                    }`}
                    aria-label="Next Model"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                  </motion.button>
                </div>
              </div>

              <h2
                className="mt-1 sm:mt-3 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight"
                style={{ fontFamily: "'Esthoria', serif" }}
              >
                <span className="text-[#1a1a1a]">Pure </span>
                <span className="text-[#1a4d2e]">Brilliance</span>
              </h2>
            </div>

            {/* Watch Cards Stack */}
            <div className="space-y-2 sm:space-y-3.5 mb-2 sm:mb-6">
              <AnimatePresence mode="popLayout">
                {rightCards.map((w, idx) => (
                  <WatchCard
                    key={w.id + "-" + w.model}
                    watch={w}
                    direction={direction}
                    delay={idx * 0.08}
                    onClick={() =>
                      handleCardClick(watches.findIndex((item) => item.id === w.id))
                    }
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Navigation indicator */}
            <div className="flex items-center justify-between text-[11px] tracking-[0.15em] text-[#1a4d2e]/40 font-medium pt-2">
              <span>
                Model {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(watches.length).padStart(2, "0")}
              </span>
              <span>Click arrow to view next model</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}