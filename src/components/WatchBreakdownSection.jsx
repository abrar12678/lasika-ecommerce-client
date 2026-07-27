"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Sparkles, CircleDot, Cpu, Shield, Layers, Award, X } from "lucide-react";

/* ═══════════════════════════════════════════════════
   CALLOUT DATA — 6 annotations positioned around the watch
   Left: Oysters, Calibre 3255, Yellow gold dial
   Right: President bracelet, Live date, Brilliant
   ═══════════════════════════════════════════════════ */
const CALLOUT_PARTS = [
  // LEFT SIDE
  {
    id: "oysters",
    title: "Oysters",
    subtitle: "18 ct Gold Hour Markers",
    description: "Hand-applied 18 ct gold hour markers with luminescent inlay set on an olive green sunray dial.",
    coords: { x: 38, y: 35 },
    badgePos: { top: "20%", left: "4%" },
    side: "left",
    icon: Sparkles,
    specs: "18 ct Gold \u2022 Sunray Finish",
  },
  {
    id: "calibre3255",
    title: "Calibre 3255",
    subtitle: "70-Hour Power Reserve",
    description: "In-house mechanical movement featuring Chronergy escapement for 15% enhanced energy efficiency.",
    coords: { x: 34, y: 48 },
    badgePos: { top: "46%", left: "1%" },
    side: "left",
    icon: Cpu,
    specs: "-2/+2 sec/day \u2022 Chronergy Escapement",
  },
  {
    id: "yellowgold",
    title: "Yellow gold dial",
    subtitle: "Roman Hour Indices",
    description: "Crafted in 18 ct yellow gold with hand-sculpted beveling for maximum light reflection.",
    coords: { x: 38, y: 65 },
    badgePos: { top: "73%", left: "3%" },
    side: "left",
    icon: Award,
    specs: "18 ct Gold \u2022 Roman Numerals",
  },
  // RIGHT SIDE
  {
    id: "bracelet",
    title: "The President bracelet",
    subtitle: "3-Piece Semi-Circular Links",
    description: "Designed in 1956 for the Day-Date, equipped with concealed Crownclasp and internal ceramic sleeve inserts.",
    coords: { x: 62, y: 22 },
    badgePos: { top: "14%", right: "4%" },
    side: "right",
    icon: Layers,
    specs: "Concealed Crownclasp \u2022 Ceramic Sleeves",
  },
  {
    id: "livedate",
    title: "Live date",
    subtitle: "2.5x Cyclops Lens",
    description: "Magnifying lens expanding the date display by 2.5 times for instant single-glance readability.",
    coords: { x: 65, y: 45 },
    badgePos: { top: "40%", right: "1%" },
    side: "right",
    icon: CircleDot,
    specs: "2.5x Optical Magnification \u2022 Sapphire",
  },
  {
    id: "brilliant",
    title: "Brilliant like no other",
    subtitle: "Polished Gold Facets",
    description: "Solid 18 ct yellow gold Oyster case with mirror-polished lugs and fluted bezel reflections.",
    coords: { x: 62, y: 72 },
    badgePos: { top: "80%", right: "3%" },
    side: "right",
    icon: Shield,
    specs: "Mirror-Polished 18 ct Gold",
  },
];

/* ═══════════════════════════════════════════════════
   MAIN BREAKDOWN SECTION
   Scroll-linked: pillow+watch glides from showcase,
   zooms in continuously with scroll, then annotations
   appear on a dark glassmorphic canvas.
   ═══════════════════════════════════════════════════ */
export default function WatchBreakdownSection() {
  const containerRef = useRef(null);
  const breakdownPillowRef = useRef(null);
  const canvasRef = useRef(null);
  const [activePartId, setActivePartId] = useState(null);
  const [selectedPartModal, setSelectedPartModal] = useState(null);
  const [isArrived, setIsArrived] = useState(false);
  const [showCallouts, setShowCallouts] = useState(false);
  const [lineCoords, setLineCoords] = useState([]);
  const [offsets, setOffsets] = useState({ x: -240, y: -450 });

  // ═══════════════════════════════════════════════════
  // OFFSET CALCULATION — mount + resize only (NOT scroll)
  // ═══════════════════════════════════════════════════
  const calculateTargetOffsets = useCallback(() => {
    if (typeof window === "undefined") return;
    const showcaseEl = document.getElementById("showcase-pillow-container");
    const breakdownEl = breakdownPillowRef.current;
    if (showcaseEl && breakdownEl) {
      const sRect = showcaseEl.getBoundingClientRect();
      const bRect = breakdownEl.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const showcaseCY = sRect.top + scrollY + sRect.height / 2;
      const showcaseCX = sRect.left + sRect.width / 2;
      const breakdownCY = bRect.top + scrollY + bRect.height / 2;
      const breakdownCX = bRect.left + bRect.width / 2;
      setOffsets({ x: showcaseCX - breakdownCX, y: showcaseCY - breakdownCY });
    }
  }, []);

  useEffect(() => {
    calculateTargetOffsets();
    const timer = setTimeout(calculateTargetOffsets, 500);
    window.addEventListener("resize", calculateTargetOffsets);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateTargetOffsets);
    };
  }, [calculateTargetOffsets]);

  // ═══════════════════════════════════════════════════
  // UNIFIED SCROLL PROGRESS
  // 0 = showcase top at viewport top
  // 1 = breakdown centered in viewport
  // ═══════════════════════════════════════════════════
  const unifiedProgress = useMotionValue(0);

  useEffect(() => {
    const updateProgress = () => {
      const showcaseEl = document.getElementById("showcase");
      const breakdownEl = containerRef.current;
      if (!showcaseEl || !breakdownEl) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight;
      const startScroll = showcaseEl.offsetTop;
      const endScroll =
        breakdownEl.offsetTop + breakdownEl.offsetHeight / 2 - vh / 2;
      const range = endScroll - startScroll;
      if (range <= 0) return;
      unifiedProgress.set(
        Math.min(1, Math.max(0, (scrollY - startScroll) / range))
      );
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // Spring-smoothed progress — responsive to track scroll closely
  const smoothProgress = useSpring(unifiedProgress, {
    stiffness: 250,
    damping: 35,
    mass: 0.4,
  });

  // ═══════════════════════════════════════════════════
  // SCROLL-LINKED TRANSFORMS
  // ═══════════════════════════════════════════════════

  // STEP 1: Pillow + Watch glides from Showcase to Breakdown center
  // Eased curve: stays near start, accelerates mid-flight, decelerates at landing
  const pillowX = useTransform(smoothProgress, [0, 0.3, 0.65, 1], [offsets.x, offsets.x * 0.92, offsets.x * 0.3, 0]);
  const pillowY = useTransform(smoothProgress, [0, 0.3, 0.65, 1], [offsets.y, offsets.y * 0.92, offsets.y * 0.3, 0]);
  // Smooth crossfade — breakdown pillow fades IN as showcase pillow fades OUT
  const pillowOpacity = useTransform(
    smoothProgress,
    [0.15, 0.3, 0.5],
    [0, 0.9, 1]
  );
  // STEP 2: Scroll-linked zoom — scale increases continuously with scroll
  const pillowScale = useTransform(smoothProgress, [0.25, 0.85], [1.0, 2.4]);
  // Watch counter-scale — shrinks relative to pillow so pillow visually dominates
  const watchRelativeScale = useTransform(smoothProgress, [0.25, 0.85], [1.0, 0.82]);


  // ═══════════════════════════════════════════════════
  // STEP 3: Reveal callout pins when scroll progress > 85%
  // ═══════════════════════════════════════════════════
  useMotionValueEvent(unifiedProgress, "change", (latest) => {
    if (latest > 0.85) {
      setIsArrived(true);
    } else {
      setIsArrived(false);
      setShowCallouts(false);
    }
  });

  // STEP 4: After arriving, reveal annotation system
  useEffect(() => {
    if (isArrived) {
      const timer = setTimeout(() => setShowCallouts(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isArrived]);

  // ═══════════════════════════════════════════════════
  // COMPUTE SVG LINE COORDINATES
  // Uses getBoundingClientRect ONCE when callouts appear
  // (not on every scroll — avoids jitter)
  // ═══════════════════════════════════════════════════
  const computeLineCoords = useCallback(() => {
    if (!showCallouts || !canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    if (!canvasRect || canvasRect.width === 0) return;
    const coords = CALLOUT_PARTS.map((part) => {
      const hotspot = document.getElementById(`hotspot-${part.id}`);
      const pill = document.getElementById(`pill-${part.id}`);
      if (!hotspot || !pill) return null;
      const hRect = hotspot.getBoundingClientRect();
      const pRect = pill.getBoundingClientRect();
      return {
        id: part.id,
        x1: ((hRect.left + hRect.width / 2 - canvasRect.left) / canvasRect.width) * 100,
        y1: ((hRect.top + hRect.height / 2 - canvasRect.top) / canvasRect.height) * 100,
        x2: ((pRect.left + pRect.width / 2 - canvasRect.left) / canvasRect.width) * 100,
        y2: ((pRect.top + pRect.height / 2 - canvasRect.top) / canvasRect.height) * 100,
      };
    }).filter(Boolean);
    setLineCoords(coords);
  }, [showCallouts]);

  useEffect(() => {
    if (!showCallouts) {
      setLineCoords([]);
      return;
    }
    const timer = setTimeout(computeLineCoords, 300);
    window.addEventListener("resize", computeLineCoords);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", computeLineCoords);
    };
  }, [showCallouts, computeLineCoords]);

  /* ═══════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════ */
  return (
    <section
      ref={containerRef}
      id="watch-breakdown"
      className="relative h-screen min-h-screen w-full flex flex-col items-center justify-center bg-[#faf9f6] overflow-visible z-20 snap-start snap-always py-6 px-4 sm:px-8 select-none border-none outline-none"
      aria-label="Interactive Feature Breakdown"
    >
      {/* ═══════════════════════════════════════════════════
          CENTER STAGE
          Scroll-linked Watch + Annotation overlay
          ═══════════════════════════════════════════════════ */}
      <div className="relative w-[90vw] max-w-4xl aspect-square sm:aspect-[4/3] z-40">



        {/* ═══ WATCH + PILLOW: scroll-linked (x, y, opacity, scale) ═══
            This layer moves from showcase to breakdown center.
            Hotspots are INSIDE so they scale with the watch. */}
        <motion.div
          ref={breakdownPillowRef}
          id="breakdown-pillow-container"
          style={{
            x: pillowX,
            y: pillowY,
            opacity: pillowOpacity,
            scale: pillowScale,
          }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="relative w-[70%] sm:w-[60%] md:w-[55%] aspect-[4/5] flex items-center justify-center">

            {/* Soft shadow beneath pillow */}
            <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[70%] h-[10%] rounded-[50%] bg-black/30 blur-xl pointer-events-none" />

            {/* Pillow Image */}
            <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[95%] z-[5]">
              <Image
                src="/watches/watch-pillow.png"
                alt="Watch Display Pillow Stand"
                width={500}
                height={500}
                quality={100}
                priority
                sizes="(max-width: 768px) 90vw, 896px"
                className="w-full h-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.22)] contrast-[1.04] brightness-[1.02]"
              />
            </div>

            {/* Watch Image — counter-scales so it shrinks relative to pillow */}
            <motion.div
              style={{ scale: watchRelativeScale }}
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              <Image
                src="/watches/hero-main-removebg-preview.png"
                alt="Oyster Perpetual Day-Date 40 Close-up"
                width={520}
                height={520}
                priority
                className="w-[200px] sm:w-[320px] md:w-[400px] h-auto object-contain drop-shadow-[0_30px_55px_rgba(0,0,0,0.3)]"
              />
            </motion.div>

            {/* ═══ HOTSPOT TARGET NODES
                Inside the watch container so they scale with the zoom.
                Semantic <button> elements for accessibility. */}
            <AnimatePresence>
              {showCallouts &&
                CALLOUT_PARTS.map((part, idx) => {
                  const isActive =
                    activePartId === part.id ||
                    selectedPartModal?.id === part.id;
                  return (
                    <motion.button
                      key={`hotspot-${part.id}`}
                      id={`hotspot-${part.id}`}
                      aria-label={`Inspect ${part.title} feature`}
                      tabIndex={0}
                      style={{
                        left: `${part.coords.x}%`,
                        top: `${part.coords.y}%`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: isActive ? 1.5 : 1,
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.15 + idx * 0.08,
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full transition-transform duration-200 ${
                        isActive
                          ? "scale-150"
                          : "hover:scale-125"
                      }`}
                      onMouseEnter={() => setActivePartId(part.id)}
                      onMouseLeave={() => setActivePartId(null)}
                      onClick={() => setSelectedPartModal(part)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedPartModal(part);
                        }
                      }}
                    >
                      {/* Core dot */}
                      <span className="relative w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] block" />
                      {/* Pulse ring (only when active/hovered) */}
                      <span
                        className={`absolute -inset-1.5 rounded-full bg-white/40 transition-opacity duration-300 ${
                          isActive ? "animate-ping opacity-80" : "opacity-0"
                        }`}
                      />
                    </motion.button>
                  );
                })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ═══ ANNOTATION LAYER: SVG Lines + Floating Glassmorphic Pills
            Positioned in same canvas space but NOT scaled with watch.
            Pills are interactive (pointer-events-auto). */}
        <div
          ref={canvasRef}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          {/* SVG Leader Lines — Desktop/Tablet only (hidden on mobile) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {lineCoords.map((line, idx) => {
              const isActive =
                activePartId === line.id ||
                selectedPartModal?.id === line.id;
              return (
                <motion.line
                  key={`line-${line.id}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={
                    isActive
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.25)"
                  }
                  strokeWidth={isActive ? 0.35 : 0.18}
                  strokeDasharray="0.6 0.4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                />
              );
            })}
          </svg>

          {/* Floating Glassmorphic Callout Badges — Desktop/Tablet */}
          <AnimatePresence>
            {showCallouts &&
              CALLOUT_PARTS.map((part, idx) => {
                const isActive =
                  activePartId === part.id ||
                  selectedPartModal?.id === part.id;
                return (
                  <motion.button
                    key={`badge-${part.id}`}
                    id={`pill-${part.id}`}
                    style={part.badgePos}
                    initial={{ opacity: 0, scale: 0.8, y: 12 }}
                    animate={{
                      opacity: 1,
                      scale: isActive ? 1.05 : 1,
                      y: 0,
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: 12 }}
                    transition={{
                      delay: 0.25 + idx * 0.1,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="absolute hidden md:block pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full"
                    onMouseEnter={() => setActivePartId(part.id)}
                    onMouseLeave={() => setActivePartId(null)}
                    onClick={() => setSelectedPartModal(part)}
                    aria-label={`View details for ${part.title}`}
                  >
                    <div
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide backdrop-blur-md shadow-lg shadow-black/40 inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all duration-300 ${
                        isActive
                          ? "bg-neutral-900/80 border border-white/40 text-white"
                          : "bg-neutral-900/60 border border-white/15 text-zinc-200 hover:bg-neutral-900/80 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          isActive
                            ? "bg-white animate-pulse"
                            : "bg-white/50"
                        }`}
                      />
                      {part.title}
                    </div>
                  </motion.button>
                );
              })}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ MOBILE BOTTOM DRAWER
          Horizontal swipeable carousel of pill buttons
          SVG lines hidden to prevent visual clutter. */}
      <AnimatePresence>
        {showCallouts && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10"
          >
            <div
              className="flex overflow-x-auto gap-2.5 p-4 snap-x"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {CALLOUT_PARTS.map((part) => {
                const isActive =
                  activePartId === part.id ||
                  selectedPartModal?.id === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => setSelectedPartModal(part)}
                    className={`snap-start flex-shrink-0 px-3.5 py-2 rounded-full text-[11px] font-medium tracking-wide whitespace-nowrap transition-all duration-300 border ${
                      isActive
                        ? "bg-white text-black border-white"
                        : "bg-white/10 text-zinc-300 border-white/10 active:bg-white/20"
                    }`}
                    aria-label={`View details for ${part.title}`}
                  >
                    {part.title}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ DETAIL MODAL ═══ */}
      <AnimatePresence>
        {selectedPartModal && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedPartModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-neutral-900 rounded-2xl p-6 text-left shadow-2xl overflow-hidden border border-white/10"
            >
              <button
                onClick={() => setSelectedPartModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-zinc-400 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="Close detail view"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <selectedPartModal.icon className="w-3.5 h-3.5" />
                Craftsmanship Detail
              </div>

              <h3 className="text-2xl font-serif text-white font-semibold">
                {selectedPartModal.title}
              </h3>
              <p className="text-sm text-zinc-400 font-medium mt-1">
                {selectedPartModal.subtitle}
              </p>

              <p className="text-sm text-zinc-500 leading-relaxed mt-4 font-light">
                {selectedPartModal.description}
              </p>

              <div className="mt-5 p-3.5 rounded-xl bg-white/5 flex items-center justify-between border border-white/5">
                <span className="text-xs text-zinc-600 uppercase tracking-wider">
                  Specifications
                </span>
                <span className="text-xs font-semibold text-zinc-300">
                  {selectedPartModal.specs}
                </span>
              </div>

              <button
                onClick={() => setSelectedPartModal(null)}
                className="mt-6 w-full py-3 rounded-xl bg-white text-neutral-900 font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all shadow-lg"
              >
                Close Inspector
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
