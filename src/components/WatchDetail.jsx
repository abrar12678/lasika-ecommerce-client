"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";

/* -- WATCH PARTS: Callout Annotation Data -- */
const WATCH_PARTS = [
  { id: "bezel", name: "FLUTED BEZEL", subtitle: "18K Yellow Gold", sx: 57.5, sy: 34.0, cx: 66.75, cy: 29.0, ex: 76.0, ey: 24.0, hLen: 5, align: "right" },
  { id: "cyclops", name: "CYCLOPS LENS", subtitle: "2.5× Date Magnifier", sx: 57.0, sy: 49.5, cx: 66.5, cy: 49.48, ex: 76.0, ey: 49.5, hLen: 5, align: "right" },
  { id: "bracelet", name: "PRESIDENT BRACELET", subtitle: "Two-Tone Jubilee Links", sx: 50.0, sy: 87.0, cx: 63.0, cy: 82.5, ex: 76.0, ey: 78.0, hLen: 5, align: "right" },
  { id: "dial", name: "SUNBURST DIAL", subtitle: "Olive Sunray Finish", sx: 44.0, sy: 42.0, cx: 34.0, cy: 33.0, ex: 24.0, ey: 24.0, hLen: 5, align: "left" },
  { id: "movement", name: "CALIBRE 3235", subtitle: "Perpetual Movement & Hands", sx: 49.8, sy: 49.5, cx: 36.9, cy: 49.48, ex: 24.0, ey: 49.5, hLen: 5, align: "left" },
  { id: "case", name: "OYSTER CASE", subtitle: "904L Steel & 100m Case", sx: 39.0, sy: 58.0, cx: 31.5, cy: 68.0, ex: 24.0, ey: 78.0, hLen: 5, align: "left" },
];

export default function WatchDetail() {
  const sectionRef = useRef(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  const pathsRef = useRef([]);
  const watchDotsRef = useRef([]);
  const endDotsRef = useRef([]);
  const hLinesRef = useRef([]);
  const labelsRef = useRef([]);
  const subtitleRefs = useRef([]);

  const tlRef = useRef(null);
  const animTimerRef = useRef(null);
  const hasPlayedRef = useRef(false);
  const zoomLockRef = useRef(false);

  /* -- IMPERATIVE: Play callout animation -- */
  const playCalloutAnimation = useCallback(() => {
    if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }

    const vPaths = pathsRef.current.filter(Boolean);
    const vWDots = watchDotsRef.current.filter(Boolean);
    const vEDots = endDotsRef.current.filter(Boolean);
    const vHLines = hLinesRef.current.filter(Boolean);
    const vLabels = labelsRef.current.filter(Boolean);
    const vSubtitles = subtitleRefs.current.filter(Boolean);

    if (!vPaths.length) return;

    vPaths.forEach((p) => {
      try {
        const len = p.getTotalLength() || 100;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      } catch (_) {
        gsap.set(p, { strokeDashoffset: 0 });
      }
    });

    gsap.set(vWDots, { scale: 0, opacity: 0 });
    gsap.set(vEDots, { scale: 0, opacity: 0 });
    gsap.set(vHLines, { scaleX: 0 });
    gsap.set(vLabels, { opacity: 0, y: 14 });
    gsap.set(vSubtitles, { opacity: 0, y: 8 });

    vWDots.forEach((d) => gsap.set(d, { transformOrigin: "center center" }));
    vEDots.forEach((d) => gsap.set(d, { transformOrigin: "center center" }));
    vHLines.forEach((line, i) => {
      const isRight = WATCH_PARTS[i]?.align === "right";
      gsap.set(line, { transformOrigin: isRight ? "0% 50%" : "100% 50%" });
    });

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(vWDots, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.06, ease: "back.out(2.5)" });
    tl.to(vPaths, { strokeDashoffset: 0, duration: 0.9, stagger: 0.07, ease: "power2.inOut" }, 0.15);
    tl.to(vEDots, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: "back.out(2)" }, 0.65);
    tl.to(vHLines, { scaleX: 1, duration: 0.4, stagger: 0.04, ease: "power2.out" }, 0.7);
    tl.to(vLabels, { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power2.out" }, 0.8);
    tl.to(vSubtitles, { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" }, 0.95);
  }, []);

  /* -- IMPERATIVE: Reset -- */
  const resetCalloutAnimation = useCallback(() => {
    if (animTimerRef.current) { clearTimeout(animTimerRef.current); animTimerRef.current = null; }
    if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }

    const vPaths = pathsRef.current.filter(Boolean);
    const vWDots = watchDotsRef.current.filter(Boolean);
    const vEDots = endDotsRef.current.filter(Boolean);
    const vHLines = hLinesRef.current.filter(Boolean);
    const vLabels = labelsRef.current.filter(Boolean);
    const vSubtitles = subtitleRefs.current.filter(Boolean);

    vPaths.forEach((p) => {
      try { const len = p.getTotalLength(); gsap.set(p, { strokeDasharray: len, strokeDashoffset: len }); } catch (_) { }
    });
    gsap.set(vWDots, { scale: 0, opacity: 0 });
    gsap.set(vEDots, { scale: 0, opacity: 0 });
    gsap.set(vHLines, { scaleX: 0 });
    gsap.set(vLabels, { opacity: 0, y: 14 });
    gsap.set(vSubtitles, { opacity: 0, y: 8 });
  }, []);

  /* -- Calculate delta -- */
  const calculateDelta = useCallback(() => {
    const pillowContainer = document.getElementById("showcase-pillow-container");
    const detailElement = sectionRef.current;
    if (pillowContainer && detailElement) {
      const pillowRect = pillowContainer.getBoundingClientRect();
      const detailRect = detailElement.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;
      setDelta({
        x: pillowRect.left + scrollX + pillowRect.width / 2 - (detailRect.left + scrollX + detailRect.width / 2),
        y: pillowRect.top + scrollY + pillowRect.height / 2 - (detailRect.top + scrollY + detailRect.height / 2),
      });
    }
  }, []);

  useEffect(() => {
    calculateDelta();
    const t = setTimeout(calculateDelta, 800);
    window.addEventListener("resize", calculateDelta);
    return () => { clearTimeout(t); window.removeEventListener("resize", calculateDelta); };
  }, [calculateDelta]);

  /* -- IntersectionObserver -- */
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const el = document.getElementById("detail");
    if (!el) return;
    let zoomInTimer, zoomOutTimer;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (zoomOutTimer) { clearTimeout(zoomOutTimer); zoomOutTimer = null; }
          if (!zoomLockRef.current) {
            zoomInTimer = setTimeout(() => {
              zoomLockRef.current = true;
              setIsZoomed(true);
              window.dispatchEvent(new CustomEvent("detail-zoom-trigger", { detail: { zoomed: true } }));
              if (!hasPlayedRef.current) {
                hasPlayedRef.current = true;
                animTimerRef.current = setTimeout(() => { animTimerRef.current = null; playCalloutAnimation(); }, 50);
              }
            }, 800);
          }
        } else {
          if (zoomInTimer) { clearTimeout(zoomInTimer); zoomInTimer = null; }
          zoomOutTimer = setTimeout(() => {
            zoomLockRef.current = false;
            hasPlayedRef.current = false;
            setIsZoomed(false);
            window.dispatchEvent(new CustomEvent("detail-zoom-trigger", { detail: { zoomed: false } }));
            resetCalloutAnimation();
          }, 500);
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      if (zoomInTimer) clearTimeout(zoomInTimer);
      if (zoomOutTimer) clearTimeout(zoomOutTimer);
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
      if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }
    };
  }, [playCalloutAnimation, resetCalloutAnimation]);

  /* -- Scroll Progress -- */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.4 });
  const pillowY = useTransform(smooth, [0, 0.45, 0.8], [delta.y, 0, 0]);
  const pillowX = useTransform(smooth, [0, 0.45, 0.8], [delta.x, 0, 0]);
  const pillowOpacity = useTransform(smooth, [0.02, 0.1, 0.85, 0.95], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="detail"
      className="relative h-screen min-h-screen flex items-center justify-center bg-[#faf9f6] overflow-hidden snap-start snap-always select-none"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,77,46,0.03)_0%,_rgba(250,249,246,0.85)_60%,_#faf9f6_100%)] pointer-events-none z-0" />

      {/* Grain */}
      <div className="grain-overlay" style={{ opacity: 0.012 }} />

      {/* -- PILLOW CONTAINER -- */}
      <motion.div
        animate={{ scale: isZoomed ? 3.6 : 1 }}
        transition={{ duration: isZoomed ? 2.2 : 1.1, ease: isZoomed ? [0.16, 1, 0.3, 1] : [0.45, 0, 0.85, 0.35] }}
        style={{ y: pillowY, x: pillowX, opacity: pillowOpacity, zIndex: 5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
      >
        <div className="relative w-[340px] sm:w-[480px] aspect-square flex items-center justify-center translate-y-[45px]">
          <Image
            src="/watches/watch-pillow.png"
            alt="Dark Leather Display Pillow"
            width={600}
            height={600}
            quality={95}
            priority
            className="w-full h-auto object-contain filter drop-shadow-[0_32px 65px_rgba(0,0,0,0.45)] contrast-[1.04] brightness-[1.01]"
          />
        </div>
      </motion.div>

      {/* -- CALLOUT ANNOTATION OVERLAY -- */}
      <div
        className="absolute inset-0 pointer-events-none z-[50]"
        style={{ opacity: isZoomed ? 1 : 0, transition: "opacity 0.6s ease 0.15s" }}
      >
        {/* SVG Pointer Lines */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-[0_0_10px_rgba(255,255,255,0.95)]"
          fill="none"
        >
          <defs>
            <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
          </defs>
          {WATCH_PARTS.map((p, i) => (
            <path
              key={p.id}
              ref={(el) => (pathsRef.current[i] = el)}
              d={`M${p.sx},${p.sy} Q${p.cx},${p.cy} ${p.ex},${p.ey}`}
              stroke="url(#lineGlow)"
              strokeWidth="1.6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Watch-Part Dots */}
        {WATCH_PARTS.map((p, i) => (
          <div
            key={`wd-${p.id}`}
            ref={(el) => (watchDotsRef.current[i] = el)}
            className="absolute flex items-center justify-center pointer-events-none"
            style={{ left: `${p.sx}%`, top: `${p.sy}%`, transform: "translate(-50%, -50%)" }}
          >
            <span className="absolute w-3.5 h-3.5 rounded-full bg-[#c5a56e]/30 animate-ping" />
            <span className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white border-2 border-[#c5a56e]/60 shadow-[0_0_14px_rgba(197,165,110,0.8)]" />
          </div>
        ))}

        {/* Endpoint Dots */}
        {WATCH_PARTS.map((p, i) => (
          <div
            key={`ed-${p.id}`}
            ref={(el) => (endDotsRef.current[i] = el)}
            className="absolute w-2 h-2 rounded-full bg-[#c5a56e] border border-[#c5a56e]/60 shadow-[0_0_10px_rgba(197,165,110,0.6)]"
            style={{ left: `${p.ex}%`, top: `${p.ey}%`, transform: "translate(-50%, -50%)" }}
          />
        ))}

        {/* Horizontal Connector Lines */}
        {WATCH_PARTS.map((p, i) => {
          const isRight = p.align === "right";
          const lineLeft = isRight ? p.ex : p.ex - p.hLen;
          return (
            <div
              key={`hl-${p.id}`}
              ref={(el) => (hLinesRef.current[i] = el)}
              className="absolute h-[1.5px] bg-gradient-to-r from-[#c5a56e]/80 to-[#c5a56e]/40"
              style={{
                left: `${lineLeft}%`,
                top: `${p.ey}%`,
                width: `${p.hLen}%`,
                transformOrigin: `${isRight ? "0%" : "100%"} 50%`,
                transform: "scaleX(0)",
              }}
            />
          );
        })}

        {/* Text Labels (glass morphism) with subtitles */}
        {WATCH_PARTS.map((p, i) => {
          const isRight = p.align === "right";
          const labelX = isRight ? p.ex + p.hLen : p.ex - p.hLen;
          return (
            <div
              key={`lb-${p.id}`}
              className="absolute pointer-events-auto"
              style={{
                left: isRight ? `${labelX}%` : "auto",
                right: isRight ? "auto" : `${100 - labelX}%`,
                top: `${p.ey}%`,
                transform: "translateY(-50%)",
              }}
            >
              <div
                ref={(el) => (labelsRef.current[i] = el)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/40 shadow-[0_10px 40px_rgba(0,0,0,0.2)] flex flex-col ${isRight ? "text-left items-start" : "text-right items-end"}`}
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(16px) saturate(1.5)",
                  WebkitBackdropFilter: "blur(16px) saturate(1.5)",
                }}
              >
                <p
                  className="text-[8.5px] sm:text-[10.5px] md:text-[11.5px] tracking-[0.16em] uppercase font-bold text-white leading-tight whitespace-nowrap"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {p.name}
                </p>
                <p
                  ref={(el) => (subtitleRefs.current[i] = el)}
                  className="text-[7px] sm:text-[8.5px] md:text-[9px] tracking-[0.06em] uppercase font-normal text-white/50 mt-0.5 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {p.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
