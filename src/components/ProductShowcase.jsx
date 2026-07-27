"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
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
    name: "Submariner Date",
    model: "Model 02",
    dial: "Submariner",
    material: "Rose Gold",
    tag: "Brown Leather",
    price: "$7,250",
  },
  {
    id: 3,
    image: "/watches/watch-emerald-green.png",
    name: "Master Date",
    model: "Model 03",
    dial: "Master Date",
    material: "White Gold",
    tag: "Silver Frost",
    price: "$9,200",
  },
];

/* ─────────────────────────────────────────────
   Sub-component: Spec Badge / Floating Label
   ───────────────────────────────────────────── */
function FloatingLabel({ text, position, delay = 0, phase2 = false }) {
  const isTL = position === "tl";
  const isTR = position === "tr";
  const isBR = position === "br";
  const isBL = position === "bl";

  let posClasses = "";
  if (isTL) posClasses = "top-[15%] left-[8%] sm:top-[22%] sm:left-[14%]";
  if (isTR) posClasses = "top-[15%] right-[8%] sm:top-[22%] sm:right-[14%]";
  if (isBR) posClasses = "bottom-[18%] right-[8%] sm:bottom-[24%] sm:right-[14%]";
  if (isBL) posClasses = "bottom-[18%] left-[8%] sm:bottom-[24%] sm:left-[14%]";

  return (
    <div
      className={`absolute ${posClasses} z-30 pointer-events-none overflow-hidden py-1 px-2`}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={
          phase2
            ? { y: 0, opacity: 1 }
            : { y: "100%", opacity: 0 }
        }
        transition={{
          duration: 0.7,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase bg-[#faf9f6]/90 text-[#1a4d2e] border border-[#1a4d2e]/15 shadow-sm backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1a4d2e]" />
          {text}
        </span>
      </motion.div>
    </div>
  );
}

export default function ProductShowcase() {
  const sectionRef = useRef(null);
  const showcaseContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [carouselActive, setCarouselActive] = useState(false);
  const [showcasePhase2, setShowcasePhase2] = useState(false);

  // Dynamic pixel offsets from ProductShowcase to Breakdown center stage
  const [breakdownOffsets, setBreakdownOffsets] = useState({ x: 260, y: 850 });

  const calculateBreakdownTarget = () => {
    if (typeof window === "undefined") return;
    const showcaseContainer = showcaseContainerRef.current;
    const breakdownTarget = document.getElementById("breakdown-target-anchor");

    if (showcaseContainer && breakdownTarget) {
      const sRect = showcaseContainer.getBoundingClientRect();
      const bRect = breakdownTarget.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;

      const showcaseCY = sRect.top + scrollY + sRect.height / 2;
      const showcaseCX = sRect.left + scrollY + sRect.width / 2;

      const breakdownCY = bRect.top + scrollY + bRect.height / 2;
      const breakdownCX = bRect.left + scrollY + bRect.width / 2;

      const deltaY = breakdownCY - showcaseCY;
      const deltaX = breakdownCX - showcaseCX;

      setBreakdownOffsets({ x: deltaX, y: deltaY });
    } else {
      const isDesktop = window.innerWidth >= 1024;
      setBreakdownOffsets({
        x: isDesktop ? 260 : 0,
        y: isDesktop ? 860 : 720,
      });
    }
  };

  useEffect(() => {
    calculateBreakdownTarget();
    const timer = setTimeout(calculateBreakdownTarget, 600);
    window.addEventListener("resize", calculateBreakdownTarget);
    window.addEventListener("scroll", calculateBreakdownTarget, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateBreakdownTarget);
      window.removeEventListener("scroll", calculateBreakdownTarget);
    };
  }, []);

  // Track scroll progress as user scrolls from Showcase down into Breakdown section
  const { scrollYProgress: breakdownScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // SINGLE PILLOW + WATCH SCROLL MOTION: Glides continuously from Showcase into Breakdown section!
  const pillowGlideX = useTransform(breakdownScrollProgress, [0.1, 0.85], [0, breakdownOffsets.x]);
  const pillowGlideY = useTransform(breakdownScrollProgress, [0.1, 0.85], [0, breakdownOffsets.y]);
  const pillowGlideScale = useTransform(breakdownScrollProgress, [0.1, 0.5, 0.85], [1, 1.1, 1.45]);

  useEffect(() => {
    const handleHeroWatchLanding = () => {
      setShowcasePhase2(true);
    };

    window.addEventListener("hero-watch-landed", handleHeroWatchLanding);
    return () => {
      window.removeEventListener("hero-watch-landed", handleHeroWatchLanding);
    };
  }, []);

  const activeWatch = watches[activeIndex];

  const handleNext = () => {
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

  /* Carousel Slide Variants for Phase 2 */
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

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative h-screen min-h-screen flex flex-col justify-center bg-[#faf9f6] overflow-visible pt-16 pb-4 sm:py-12 lg:py-0 z-10 snap-start snap-always"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(26,77,46,0.03)_0%,_transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-16 py-1 sm:py-10 lg:py-8 flex items-center justify-center">
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-6 lg:gap-12">

          {/* ═══════════════════════════════════════
              LEFT SIDE: Pillow + Watch Single Physical Container (GLIDES INTO BREAKDOWN SECTION ON SCROLL)
              ═══════════════════════════════════════ */}
          <div className="relative w-full lg:w-[52%] flex items-center justify-center pt-6 pb-2 sm:pt-0 sm:pb-0 min-h-[210px] sm:min-h-[440px] lg:min-h-[460px]">
            
            {/* THE ONE AND ONLY SINGLE PILLOW + WATCH CONTAINER IN THE DOM */}
            <motion.div
              ref={showcaseContainerRef}
              id="showcase-pillow-container"
              style={{
                x: pillowGlideX,
                y: pillowGlideY,
                scale: pillowGlideScale,
              }}
              className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center z-40"
            >

              {/* Spec Texts */}
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

              {/* Pillow Stand Image */}
              <motion.div
                id="showcase-pillow-img"
                initial={{ opacity: 0, x: -60, y: -30, scale: 0.85, rotate: -8 }}
                animate={
                  isInView
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
                  width={600}
                  height={300}
                  quality={100}
                  unoptimized
                  priority
                  className="w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] contrast-[1.04] brightness-[1.02]"
                />
              </motion.div>

              {/* Watch Display Area */}
              <div className="relative z-20 w-full h-full flex items-center justify-center overflow-visible">
                {/* Default Main Watch (Rendered ONLY after Hero watch lands in Phase 2) */}
                {showcasePhase2 && !carouselActive && (
                  <div className="relative w-full h-full flex items-center justify-center pb-[8%]">
                    <Image
                      src={activeWatch.image}
                      alt={activeWatch.name}
                      width={420}
                      height={420}
                      priority
                      className="w-[200px] sm:w-[310px] md:w-[350px] lg:w-[380px] h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.25)]"
                    />
                    <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[55%] h-[8%] rounded-[50%] bg-black/20 blur-md pointer-events-none" />
                  </div>
                )}

                {/* Carousel active watches */}
                <AnimatePresence mode="popLayout" custom={direction}>
                  {carouselActive && (
                    <motion.div
                      key={activeWatch.id + "-" + activeIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="initial"
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
            className="w-full lg:w-[48%] flex flex-col justify-center max-w-[560px] z-10"
          >
            {/* Top Bar: Subheading + Navigation Arrows */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#1a4d2e]/80 uppercase">
                Our Models
              </span>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 ${
                    activeIndex === 0
                      ? "opacity-30 cursor-not-allowed bg-transparent text-black/40"
                      : "opacity-100 hover:bg-[#1a4d2e] hover:text-white hover:border-[#1a4d2e] bg-white text-black/80 shadow-sm"
                  }`}
                  aria-label="Previous Watch"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeIndex === watches.length - 1}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 ${
                    activeIndex === watches.length - 1
                      ? "opacity-30 cursor-not-allowed bg-transparent text-black/40"
                      : "opacity-100 hover:bg-[#1a4d2e] hover:text-white hover:border-[#1a4d2e] bg-white text-black/80 shadow-sm"
                  }`}
                  aria-label="Next Watch"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Main Title */}
            <h2
              className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1a1a1a] font-normal leading-[1.1] mb-6 sm:mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Pure <span className="text-[#1a4d2e] font-semibold">Brilliance</span>
            </h2>

            {/* Other Models Stack */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {watches.map((watch, index) => {
                if (index === activeIndex) return null;

                return (
                  <motion.div
                    key={watch.id}
                    onClick={() => handleCardClick(index)}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                    className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/70 border border-black/5 backdrop-blur-md cursor-pointer hover:bg-white hover:shadow-lg hover:border-[#1a4d2e]/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Thumbnail Container */}
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#f2efe9] overflow-hidden flex items-center justify-center p-1 group-hover:bg-[#e8e4db] transition-colors">
                        <Image
                          src={watch.image}
                          alt={watch.name}
                          width={60}
                          height={60}
                          className="object-contain w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Text details */}
                      <div className="flex flex-col">
                        <h4 className="text-xs sm:text-sm font-bold text-[#1a1a1a] group-hover:text-[#1a4d2e] transition-colors">
                          {watch.tag} • {watch.material}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-neutral-500 font-medium">
                          {watch.name} — {watch.dial}
                        </p>
                        <span className="text-xs sm:text-sm font-semibold text-[#1a4d2e] mt-0.5">
                          {watch.price}
                        </span>
                      </div>
                    </div>

                    {/* Arrow Indicator */}
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 group-hover:text-[#1a4d2e] group-hover:translate-x-1 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Footer Note */}
            <div className="mt-6 sm:mt-8 flex items-center justify-between text-[11px] sm:text-xs text-neutral-400 font-medium">
              <span>Model 01 / 03</span>
              <span className="hidden sm:inline">Click arrow to view next model</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}