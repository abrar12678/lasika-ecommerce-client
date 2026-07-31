"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────
   Watch Data
   ───────────────────────────────────────────── */
const watches = [
  { id: 1, image: "/watches/hero-main-removebg-preview.png", name: "Oyster Perpetual", model: "Model 04", dial: "Day Date", material: "Yellow Gold", tag: "Green Oysters", price: "$8,450", imageClass: "w-[190px] sm:w-[310px] md:w-[340px] lg:w-[370px]" },
  { id: 2, image: "/watches/watch-yellow-gold.png", name: "Oyster Perpetual", model: "Model 08", dial: "Master Date", material: "Rose Gold", tag: "Brown Leather", price: "$7,250", imageClass: "w-[122px] sm:w-[175px] md:w-[202px] lg:w-[232px]" },
  { id: 3, image: "/watches/watch-stealth-diver.png", name: "Oyster Perpetual", model: "Model 12", dial: "Submariner", material: "White Gold", tag: "Silver Frost", price: "$9,200", imageClass: "w-[122px] sm:w-[175px] md:w-[202px] lg:w-[232px]" },
];

/* ─────────────────────────────────────────────
   Floating Spec Label
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
        transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block px-3 py-1.5 text-[8px] sm:px-4 sm:py-2 sm:text-[10.5px] tracking-[0.12em] sm:tracking-[0.16em] uppercase font-semibold text-[#1a4d2e] rounded-full shadow-sm border border-[#c5a56e]/20"
        style={{ fontFamily: "var(--font-geist)", background: "rgba(247, 245, 237, 0.92)", backdropFilter: "blur(12px) saturate(1.2)" }}
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
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group"
      onClick={onClick}
      style={{ background: "rgba(255, 255, 255, 0.7)", border: "1px solid rgba(197, 165, 110, 0.12)", backdropFilter: "blur(10px)" }}
    >
      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c5a56e]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <div className="relative w-[68px] h-[68px] sm:w-[95px] sm:h-[95px] flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center p-1.5"
          style={{ background: "rgba(249, 248, 243, 0.9)" }}
        >
          <Image src={watch.image} alt={watch?.name ? `${watch.name} ${watch.dial}` : "Luxury Watch"} width={75} height={75}
            className="h-auto w-auto max-w-[85%] group-hover:scale-110 transition-transform duration-700 ease-out" />
        </div>
        <div className="flex-1 min-w-0 relative z-10">
          <h3 className="text-[11px] sm:text-[13px] tracking-[0.06em] sm:tracking-[0.07em] font-bold text-[#1a4d2e] truncate" style={{ fontFamily: "var(--font-geist)" }}>{watch.tag} &middot; {watch.material}</h3>
          <p className="text-[9.5px] sm:text-[11px] text-[#1a4d2e]/50 mt-0.5 sm:mt-1 tracking-[0.02em] truncate" style={{ fontFamily: "var(--font-geist)" }}>{watch.name} — {watch.dial}</p>
          <div className="flex items-center justify-between mt-1.5 sm:mt-2">
            <p className="text-[13px] sm:text-[15px] font-bold text-[#c5a56e]" style={{ fontFamily: "var(--font-geist)" }}>{watch.price}</p>
            <motion.div whileHover={{ x: 4 }} className="text-[#c5a56e]/30 group-hover:text-[#c5a56e] transition-colors duration-400 flex-shrink-0">
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PRODUCT SHOWCASE
   ───────────────────────────────────────────── */
export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showcasePhase2, setShowcasePhase2] = useState(false);
  const [carouselActive, setCarouselActive] = useState(false);
  const [isScrollingAway, setIsScrollingAway] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const resetTimerRef = useRef(null);
  const hasResetOnScrollAway = useRef(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-120px" });

  const { scrollYProgress: showcaseScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* -- When scrolling AWAY (toward Detail) with non-main watch active:
     1. Slide non-main watch out back to its card
     2. Reset to main watch (index 0)
     3. Dispatch showcase-silent-reset so hero watch reappears on pillow
     Then main watch continues down to Detail section with pillow -- */
  const resetToMainWatch = useCallback(() => {
    if (activeIndex === 0 && !carouselActive) return;
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    setIsResetting(true);
    setDirection(-1);
    setActiveIndex(0);
    setCarouselActive(false);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("showcase-silent-reset"));
    }

    resetTimerRef.current = setTimeout(() => {
      setIsResetting(false);
    }, 300);
  }, [activeIndex, carouselActive]);

  useMotionValueEvent(showcaseScrollProgress, "change", (latest) => {
    const scrollingAway = latest > 0.03;
    setIsScrollingAway(scrollingAway);

    /* -- If scrolling down past showcase with a non-main watch, reset to main (once) -- */
    if (scrollingAway && (activeIndex !== 0 || carouselActive) && !hasResetOnScrollAway.current) {
      hasResetOnScrollAway.current = true;
      resetToMainWatch();
    }
    /* -- Reset guard when user scrolls back into showcase -- */
    if (!scrollingAway) {
      hasResetOnScrollAway.current = false;
    }
  });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowcasePhase2(true), 750);
      return () => clearTimeout(timer);
    } else {
      setShowcasePhase2(false);
    }
  }, [isInView]);

  /* -- When hero-watch-reenter fires (user scrolling UP past hero):
     If non-main watch is active, slide it out, reset to main,
     then hero watch re-enters hero section -- */
  useEffect(() => {
    const handleReenter = () => {
      if (activeIndex !== 0 || carouselActive) {
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

        setDirection(-1);
        setActiveIndex(0);

        resetTimerRef.current = setTimeout(() => {
          setCarouselActive(false);
          setIsResetting(false);
        }, 600);
      }
    };
    window.addEventListener("hero-watch-reenter", handleReenter);
    return () => {
      window.removeEventListener("hero-watch-reenter", handleReenter);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [activeIndex, carouselActive]);

  /* -- Cleanup on unmount -- */
  useEffect(() => {
    return () => { if (resetTimerRef.current) clearTimeout(resetTimerRef.current); };
  }, []);

  const activeWatch = watches[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === watches.length - 1;
  const rightCards = watches.filter((_, idx) => idx !== activeIndex);

  const handleNext = () => {
    if (isLast) return;
    const nextIdx = Math.min(activeIndex + 1, watches.length - 1);
    if (!carouselActive && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("hero-watch-exit", { detail: { dir: 1 } }));
    }
    setCarouselActive(true);
    setDirection(1);
    setActiveIndex(nextIdx);
  };

  const handlePrev = () => {
    if (isFirst) return;
    const nextIdx = Math.max(activeIndex - 1, 0);
    if (!carouselActive && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("hero-watch-exit", { detail: { dir: -1 } }));
    }
    setCarouselActive(true);
    setDirection(-1);
    setActiveIndex(nextIdx);
  };

  const handleCardClick = (index) => {
    const dir = index > activeIndex ? 1 : index < activeIndex ? -1 : 0;
    if (dir !== 0) {
      if (!carouselActive && typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("hero-watch-exit", { detail: { dir } }));
      }
      setCarouselActive(true);
      setDirection(dir);
      setActiveIndex(index);
    }
  };

  const slideVariants = {
    initial: (dir) => ({ x: dir > 0 ? "100vw" : "-100vw", opacity: 1, scale: 1, rotate: 0 }),
    animate: { x: 0, opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir) => ({ x: dir > 0 ? "-100vw" : "100vw", opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7, ease: [0.32, 0, 0.67, 0] } }),
  };

  const { scrollYProgress: showcaseExitProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const showcasePillowOpacity = useTransform(showcaseExitProgress, [0, 0.45, 0.9], [1, 1, 0]);

  return (
    <section ref={sectionRef} id="showcase"
      className="relative h-screen min-h-screen flex flex-col justify-center overflow-hidden pt-16 pb-4 sm:py-12 lg:py-0 z-10 snap-start snap-always"
      style={{ background: "linear-gradient(145deg, #F3ECE2 0%, #E8DFD0 100%)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.5)_0%,_transparent_65%)] pointer-events-none" />
      <div className="grain-overlay" />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-1 sm:py-10 lg:py-8 flex items-center justify-center">
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-6 lg:gap-14">

          {/* -- LEFT: Pillow + Spec Texts -- */}
          <div className="relative w-full lg:w-[52%] flex items-center justify-center pt-6 pb-2 sm:pt-0 sm:pb-0 min-h-[220px] sm:min-h-[460px] lg:min-h-[480px]">
            <motion.div style={{ opacity: showcasePillowOpacity }} id="showcase-pillow-container" className="relative w-full max-w-[500px] aspect-[4/3] flex items-center justify-center">

              <FloatingLabel text={activeWatch.model} position="tl" delay={0.12} phase2={showcasePhase2} />
              <FloatingLabel text={activeWatch.dial} position="tr" delay={0.28} phase2={showcasePhase2} />
              <FloatingLabel text={activeWatch.material} position="br" delay={0.44} phase2={showcasePhase2} />
              <FloatingLabel text={activeWatch.tag} position="bl" delay={0.6} phase2={showcasePhase2} />

              <motion.div id="showcase-pillow-img"
                initial={{ opacity: 0, x: -65, y: -35, scale: 0.82, rotate: -10 }}
                animate={
                  isScrollingAway ? { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0 }
                    : isInView ? (showcasePhase2 ? { opacity: 1, x: 0, y: 0, scale: 1.1, rotate: 0 } : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 })
                      : { opacity: 0, x: -65, y: -35, scale: 0.82, rotate: -10 }
                }
                transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:translate-y-0 w-[44%] sm:w-[78%] z-[5]"
              >
                <Image src="/watches/watch-pillow.png" alt="Watch Display Pillow" width={500} height={500} quality={100} priority
                  sizes="(max-width: 768px) 78vw, 500px"
                  className="w-full h-auto drop-shadow-[0_22px_40px_rgba(0,0,0,0.16)] contrast-[1.03] brightness-[1.02]" />
              </motion.div>

              <div className="relative z-20 w-full h-full flex items-center justify-center overflow-visible">
                <AnimatePresence mode="popLayout" custom={direction}>
                  {carouselActive && (
                    <motion.div key={activeWatch.id + "-" + activeIndex} custom={direction}
                      variants={slideVariants}
                      initial={carouselActive ? "initial" : { opacity: 1, scale: 1 }}
                      animate="animate"
                      exit="exit"
                      className="relative w-full h-full flex items-center justify-center pt-1 sm:pt-2"
                    >
                      <Image src={activeWatch.image} alt={activeWatch?.name ? `${activeWatch.name} — ${activeWatch.dial}` : "Oyster Perpetual"}
                        width={480} height={480} priority
                        className={`${activeWatch.imageClass || "w-[122px] sm:w-[175px] md:w-[202px] lg:w-[232px]"} h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.22)]`} />
                      <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 w-[50%] h-[7%] rounded-[50%] bg-black/18 blur-md pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* -- RIGHT: Heading + Arrows + Cards -- */}
          <motion.div initial={{ opacity: 0, x: 65, y: 35, scale: 0.82, rotate: 10 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 } : { opacity: 0, x: 65, y: 35, scale: 0.82, rotate: 10 }}
            transition={{ duration: 1, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[45%] flex flex-col justify-center lg:py-4"
          >
            <div className="relative mb-3 sm:mb-7">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.32em] uppercase text-[#1a4d2e]/40 font-semibold block" style={{ fontFamily: "var(--font-geist)" }}>Our Collection</span>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <motion.button disabled={isFirst} whileHover={!isFirst ? { scale: 1.1, y: -1 } : {}} whileTap={!isFirst ? { scale: 0.92 } : {}} onClick={handlePrev}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-400 cursor-pointer ${isFirst ? "bg-white/40 opacity-30 cursor-not-allowed text-gray-400 border border-white/30" : "bg-white text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white shadow-md shadow-black/5 hover:shadow-lg hover:shadow-[#1a4d2e]/15 border border-transparent group"}`}
                    aria-label="Previous Model"
                  ><ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2] group-hover:-translate-x-0.5 transition-transform duration-300" /></motion.button>
                  <motion.button disabled={isLast} whileHover={!isLast ? { scale: 1.1, y: -1 } : {}} whileTap={!isLast ? { scale: 0.92 } : {}} onClick={handleNext}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-400 cursor-pointer ${isLast ? "bg-white/40 opacity-30 cursor-not-allowed text-gray-400 border border-white/30" : "bg-white text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white shadow-md shadow-black/5 hover:shadow-lg hover:shadow-[#1a4d2e]/15 border border-transparent group"}`}
                    aria-label="Next Model"
                  ><ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2] group-hover:translate-x-0.5 transition-transform duration-300" /></motion.button>
                </div>
              </div>
              <h2 className="mt-2 sm:mt-4 text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-normal leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                <span className="text-[#1a1a1a]">Pure </span><span className="text-[#1a4d2e]">Brilliance</span>
              </h2>
              <p className="mt-2 sm:mt-3 text-[11px] sm:text-[13px] text-[#1a4d2e]/40 max-w-[320px] leading-relaxed" style={{ fontFamily: "var(--font-geist)" }}>
                Each timepiece in our collection embodies generations of Swiss craftsmanship and uncompromising attention to detail.
              </p>
            </div>

            <div className="space-y-2.5 sm:space-y-4 mb-3 sm:mb-7">
              <AnimatePresence mode="popLayout">
                {rightCards.map((w, idx) => (
                  <WatchCard key={w.id + "-" + w.model} watch={w} direction={direction} delay={idx * 0.09}
                    onClick={() => handleCardClick(watches.findIndex((item) => item.id === w.id))} />
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between text-[10.5px] tracking-[0.18em] text-[#1a4d2e]/30 font-medium pt-2" style={{ fontFamily: "var(--font-geist)" }}>
              <span>Model {String(activeIndex + 1).padStart(2, "0")} / {String(watches.length).padStart(2, "0")}</span>
              <span className="hidden sm:inline">Click arrow to explore</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
