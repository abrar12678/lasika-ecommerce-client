"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Sparkles, CircleDot, Cpu, Shield, Layers, Award, CheckCircle2, ChevronRight, X } from "lucide-react";

const CALLOUT_PARTS = [
  // LEFT SIDE BADGES
  {
    id: "oysters",
    title: "Oysters",
    subtitle: "18 ct Gold Hour Markers",
    description: "Hand-applied 18 ct gold hour markers with luminescent inlay set on an olive green sunray dial.",
    coords: { x: 38, y: 35 },
    badgePos: { top: "30%", left: "12%" },
    side: "left",
    icon: Sparkles,
    specs: "18 ct Gold • Sunray Finish",
  },
  {
    id: "calibre3255",
    title: "Calibre 3255",
    subtitle: "70-Hour Power Reserve",
    description: "In-house mechanical movement featuring Chronergy escapement for 15% enhanced energy efficiency.",
    coords: { x: 34, y: 46 },
    badgePos: { top: "46%", left: "8%" },
    side: "left",
    icon: Cpu,
    specs: "-2/+2 sec/day • Chronergy Escapement",
  },
  {
    id: "yellowgold",
    title: "Yellow gold dial",
    subtitle: "Roman Hour Indices",
    description: "Crafted in 18 ct yellow gold with hand-sculpted beveling for maximum light reflection.",
    coords: { x: 36, y: 64 },
    badgePos: { top: "68%", left: "10%" },
    side: "left",
    icon: Award,
    specs: "18 ct Gold • Roman Numerals",
  },
  {
    id: "daywindow",
    title: "Full Day Window",
    subtitle: "Day Disc in 26 Languages",
    description: "Arc-shaped aperture at 12 o'clock spelling the day of the week in full.",
    coords: { x: 50, y: 22 },
    badgePos: { top: "14%", left: "22%" },
    side: "left",
    icon: CircleDot,
    specs: "Instantaneous Midnight Change",
  },

  // RIGHT SIDE BADGES
  {
    id: "bracelet",
    title: "The President bracelet",
    subtitle: "3-Piece Semi-Circular Links",
    description: "Designed in 1956 for the Day-Date, equipped with concealed Crownclasp and internal ceramic sleeve inserts.",
    coords: { x: 67, y: 16 },
    badgePos: { top: "16%", right: "12%" },
    side: "right",
    icon: Layers,
    specs: "Concealed Crownclasp • Ceramic Sleeves",
  },
  {
    id: "livedate",
    title: "Live date",
    subtitle: "2.5x Cyclops Lens",
    description: "Magnifying lens expanding the date display by 2.5 times for instant single-glance readability.",
    coords: { x: 66, y: 44 },
    badgePos: { top: "44%", right: "8%" },
    side: "right",
    icon: CircleDot,
    specs: "2.5x Optical Magnification • Sapphire",
  },
  {
    id: "brilliant",
    title: "Brilliant like no other",
    subtitle: "Polished Gold Facets",
    description: "Solid 18 ct yellow gold Oyster case with mirror-polished lugs and fluted bezel reflections.",
    coords: { x: 66, y: 68 },
    badgePos: { top: "72%", right: "10%" },
    side: "right",
    icon: Shield,
    specs: "Mirror-Polished 18 ct Gold",
  },
];

export default function WatchBreakdownSection() {
  const containerRef = useRef(null);
  const [activePartId, setActivePartId] = useState(null);
  const [selectedPartModal, setSelectedPartModal] = useState(null);
  const [showCallouts, setShowCallouts] = useState(false);

  // Scroll Progress tied to page scrolling into this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Listen to scroll progress to trigger delayed callouts reveal once Showcase pillow arrives in center
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.65) {
      setShowCallouts(true);
    } else {
      setShowCallouts(false);
    }
  });

  const activePart = CALLOUT_PARTS.find((p) => p.id === (activePartId || selectedPartModal?.id));

  return (
    <section
      ref={containerRef}
      id="watch-breakdown"
      className="relative h-screen min-h-screen w-full flex items-center justify-center bg-[#faf9f6] text-[#1a4d2e] overflow-visible z-20 snap-start snap-always py-6 px-4 sm:px-8 select-none border-none outline-none"
    >
      {/* Top Header Tagline */}
      <div className="absolute top-6 sm:top-8 inset-x-0 z-30 flex flex-col items-center text-center px-4">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#1a4d2e] bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Anatomy Inspector
        </div>
        <h2
          className="text-2xl sm:text-4xl font-serif text-[#1a1a1a] font-medium mt-1.5"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          OYSTER PERPETUAL <span className="italic text-[#1a4d2e]">DAY-DATE 40</span>
        </h2>
      </div>

      {/* CENTER STAGE: ANCHOR TARGET WHERE PRODUCT SHOWCASE PILLOW LANDS (NO SECOND DUPLICATE PILLOW RENDERED) */}
      <div className="relative w-full max-w-6xl mx-auto h-full flex items-center justify-center z-10 pt-10">
        <div
          id="breakdown-target-anchor"
          className="relative w-full max-w-[340px] sm:max-w-[460px] aspect-[4/5] flex items-center justify-center pointer-events-none"
        >
          {/* ORIGIN TARGET PINS ON WATCH PARTS (Revealed when Showcase pillow arrives) */}
          <AnimatePresence>
            {showCallouts &&
              CALLOUT_PARTS.map((part) => {
                const isSelected = activePartId === part.id || selectedPartModal?.id === part.id;
                return (
                  <motion.div
                    key={`pin-${part.id}`}
                    style={{ left: `${part.coords.x}%`, top: `${part.coords.y}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto cursor-pointer group"
                    onMouseEnter={() => setActivePartId(part.id)}
                    onMouseLeave={() => setActivePartId(null)}
                    onClick={() => setSelectedPartModal(part)}
                  >
                    <span
                      className={`absolute inset-0 rounded-full animate-ping transition-opacity duration-300 ${
                        isSelected ? "bg-[#1a4d2e] opacity-90 scale-150" : "bg-[#1a4d2e] opacity-40"
                      }`}
                    />
                    <div
                      className={`relative w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-[#1a4d2e] text-white shadow-md scale-125"
                          : "bg-white text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white hover:scale-110 shadow-sm"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>

      {/* FLOATING PILL CAPSULE BADGES (Revealed smoothly once watch arrives) */}
      <div className="absolute inset-0 z-50 max-w-7xl mx-auto w-full h-full pointer-events-none">
        <AnimatePresence>
          {showCallouts &&
            CALLOUT_PARTS.map((part, idx) => {
              const isHovered = activePartId === part.id || selectedPartModal?.id === part.id;
              const posStyle = part.badgePos;

              return (
                <motion.div
                  key={`badge-${part.id}`}
                  style={posStyle}
                  initial={{ opacity: 0, scale: 0.7, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: 15 }}
                  transition={{ duration: 0.5, delay: 0.25 + idx * 0.08, ease: "easeOut" }}
                  className="absolute pointer-events-auto"
                  onMouseEnter={() => setActivePartId(part.id)}
                  onMouseLeave={() => setActivePartId(null)}
                  onClick={() => setSelectedPartModal(part)}
                >
                  <div
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide backdrop-blur-md shadow-md flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                      isHovered
                        ? "bg-[#1a4d2e] text-white shadow-lg scale-110"
                        : "bg-white/95 text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white hover:shadow-lg"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isHovered ? "bg-white animate-pulse" : "bg-[#1a4d2e]"}`} />
                    <span>{part.title}</span>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>

      {/* SVG ANIMATED ARROW CALLOUT LINES */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="emeraldLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a4d2e" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#b59450" stopOpacity="1" />
              <stop offset="100%" stopColor="#1a4d2e" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {showCallouts && (
            <>
              {/* Left Side Lines */}
              <motion.path
                d="M 43% 35% L 26% 32%"
                fill="none"
                stroke={activePartId === "oysters" ? "#1a4d2e" : "url(#emeraldLineGrad)"}
                strokeWidth={activePartId === "oysters" ? "2.5" : "1.2"}
                strokeDasharray="4 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              />

              <motion.path
                d="M 41% 47% L 22% 47%"
                fill="none"
                stroke={activePartId === "calibre3255" ? "#1a4d2e" : "url(#emeraldLineGrad)"}
                strokeWidth={activePartId === "calibre3255" ? "2.5" : "1.2"}
                strokeDasharray="4 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              />

              <motion.path
                d="M 42% 64% L 24% 68%"
                fill="none"
                stroke={activePartId === "yellowgold" ? "#1a4d2e" : "url(#emeraldLineGrad)"}
                strokeWidth={activePartId === "yellowgold" ? "2.5" : "1.2"}
                strokeDasharray="4 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              />

              <motion.path
                d="M 50% 25% L 36% 16%"
                fill="none"
                stroke={activePartId === "daywindow" ? "#1a4d2e" : "url(#emeraldLineGrad)"}
                strokeWidth={activePartId === "daywindow" ? "2.5" : "1.2"}
                strokeDasharray="4 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              />

              {/* Right Side Lines */}
              <motion.path
                d="M 58% 22% L 76% 18%"
                fill="none"
                stroke={activePartId === "bracelet" ? "#1a4d2e" : "url(#emeraldLineGrad)"}
                strokeWidth={activePartId === "bracelet" ? "2.5" : "1.2"}
                strokeDasharray="4 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              />

              <motion.path
                d="M 58% 45% L 78% 45%"
                fill="none"
                stroke={activePartId === "livedate" ? "#1a4d2e" : "url(#emeraldLineGrad)"}
                strokeWidth={activePartId === "livedate" ? "2.5" : "1.2"}
                strokeDasharray="4 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              />

              <motion.path
                d="M 58% 68% L 76% 72%"
                fill="none"
                stroke={activePartId === "brilliant" ? "#1a4d2e" : "url(#emeraldLineGrad)"}
                strokeWidth={activePartId === "brilliant" ? "2.5" : "1.2"}
                strokeDasharray="4 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              />
            </>
          )}
        </svg>
      </div>

      {/* FOOTER CRAFTSMANSHIP SPEC BANNER */}
      <div className="absolute bottom-4 inset-x-0 z-40 max-w-4xl mx-auto px-4 flex items-center justify-between text-xs text-[#1a4d2e]">
        {activePart ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white/95 backdrop-blur-md px-5 py-3 rounded-full flex items-center justify-between shadow-xl"
          >
            <span className="flex items-center gap-2 font-semibold text-[#1a1a1a]">
              <CheckCircle2 className="w-4 h-4 text-[#1a4d2e]" />
              {activePart.title} — <span className="font-normal text-neutral-600">{activePart.description}</span>
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-[#1a4d2e] bg-[#1a4d2e]/10 px-3 py-1 rounded-full">
              {activePart.specs}
            </span>
          </motion.div>
        ) : (
          <div className="w-full flex items-center justify-between text-[11px] text-[#1a4d2e]/70 font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#1a4d2e]" />
              Hover or click any callout badge to inspect craftsmanship details
            </span>
            <span className="hidden sm:inline font-mono text-[#1a4d2e]/50">
              REF. 228238 • 18 CT YELLOW GOLD
            </span>
          </div>
        )}
      </div>

      {/* POPUP MODAL FOR SELECTED PART DETAILS */}
      <AnimatePresence>
        {selectedPartModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl p-6 text-left shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedPartModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a4d2e]/10 text-[#1a4d2e] text-xs font-semibold uppercase tracking-wider mb-3">
                <selectedPartModal.icon className="w-3.5 h-3.5" />
                Craftsmanship Detail
              </div>

              <h3 className="text-2xl font-serif text-[#1a1a1a] font-semibold">
                {selectedPartModal.title}
              </h3>
              <p className="text-sm text-[#1a4d2e] font-medium mt-1">
                {selectedPartModal.subtitle}
              </p>

              <p className="text-sm text-neutral-600 leading-relaxed mt-4 font-light">
                {selectedPartModal.description}
              </p>

              <div className="mt-5 p-3.5 rounded-xl bg-neutral-50 flex items-center justify-between">
                <span className="text-xs text-neutral-500 uppercase tracking-wider">Specifications</span>
                <span className="text-xs font-semibold text-[#1a4d2e]">{selectedPartModal.specs}</span>
              </div>

              <button
                onClick={() => setSelectedPartModal(null)}
                className="mt-6 w-full py-3 rounded-xl bg-[#1a4d2e] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#133a22] transition-all shadow-lg"
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
