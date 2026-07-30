"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ═══════════════════════════════════════════════════
   SECTION 4: BOX REVEAL & DOCKING SECTION
   1. Watch + Pillow shrinks down and docks inside the Luxury Watch Box.
   2. Watch + Pillow + Box form ONE unified docked assembly.
   3. The entire docked box assembly zooms out and translates right between
      the words TURNING and EVERY DAY on Line 1.
   ═══════════════════════════════════════════════════ */
export default function WatchBoxSection() {
  const sectionRef = useRef(null);
  const boxGraphicRef = useRef(null);
  const watchPillowWrapperRef = useRef(null);
  const dockedAssemblyRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (
        !sectionRef.current ||
        !watchPillowWrapperRef.current ||
        !boxGraphicRef.current ||
        !dockedAssemblyRef.current
      )
        return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Initial state setups
      gsap.set(watchPillowWrapperRef.current, {
        scale: 1.6,
        y: "-25%",
        opacity: 1,
      });

      gsap.set(boxGraphicRef.current, {
        opacity: 0,
        scale: 0.75,
        y: "40px",
      });

      gsap.set(dockedAssemblyRef.current, {
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        x: "0px",
        y: "0px",
      });

      const textLines = sectionRef.current.querySelectorAll(
        ".reveal-text span.inline-block"
      );
      if (textLines.length > 0) {
        gsap.set(textLines, {
          y: "100%",
          opacity: 0,
        });
      }

      const badgeLeft = sectionRef.current.querySelector(".badge-left");
      const badgeRight = sectionRef.current.querySelector(".badge-right");
      if (badgeLeft && badgeRight) {
        gsap.set([badgeLeft, badgeRight], {
          opacity: 0,
          y: "20px",
        });
      }

      /* ── Phase 1: Unified Scale Down & Box Reveal (0.8s) ── */
      tl.to(
        watchPillowWrapperRef.current,
        {
          scale: 0.36,
          y: "15px",
          duration: 0.8,
          ease: "power2.out",
        },
        0.1
      );

      tl.to(
        boxGraphicRef.current,
        {
          opacity: 1,
          scale: 1,
          y: "0px",
          duration: 0.8,
          ease: "power2.out",
        },
        0.1
      );

      /* ── Phase 2: Perfect Docking Inside Center of Black Velvet Recess (0.5s) ── */
      tl.to(
        watchPillowWrapperRef.current,
        {
          scale: 0.325,
          y: "50px",
          duration: 0.5,
          ease: "power1.inOut",
        },
        0.8
      );

      /* ── Phase 3: Text Reveal & Box Placement Between TURNING and EVERY DAY (0.8s) ── */
      if (textLines.length > 0) {
        tl.to(
          textLines,
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          1.3
        );
      }

      const isDesktop = window.innerWidth >= 1024;
      const isMd = window.innerWidth >= 768;

      const targetX = isDesktop ? "-2.3vw" : isMd ? "-1.8vw" : "0vw";
      const targetY = isDesktop ? "-19vh" : isMd ? "-17vh" : "-20vh";
      const targetScale = isDesktop ? 0.40 : isMd ? 0.36 : 0.32;

      tl.to(
        dockedAssemblyRef.current,
        {
          x: targetX,
          y: targetY,
          scale: targetScale,
          duration: 0.9,
          ease: "power2.inOut",
        },
        1.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="box-reveal"
      className="box-reveal-section relative h-screen w-full overflow-hidden bg-[#f4efe6] snap-start snap-always select-none"
    >
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,165,110,0.12)_0%,_rgba(244,239,230,0.95)_65%,_#f4efe6_100%)] pointer-events-none z-0" />

      {/* Layer 1: Background Typography Layer (Z-Index: 5) */}
      <div className="bg-text-wrapper absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 pointer-events-none z-5">
        <h1 className="reveal-text text-3xl sm:text-5xl md:text-7xl lg:text-[6.5rem] xl:text-[7.2rem] font-black text-[#0a3d1e] tracking-tight text-center uppercase leading-[1.1] w-full max-w-[1600px]">
          
          {/* Line 1: TURNING + Snug Box Slot Gap + EVERY DAY */}
          <div className="line flex items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-5 overflow-hidden my-2 sm:my-4 md:my-5 whitespace-nowrap">
            <span className="inline-block translate-y-full whitespace-nowrap">
              TURNING
            </span>
            {/* Snug slot space for docked box to nest perfectly in center */}
            <div className="w-[70px] sm:w-[100px] md:w-[125px] lg:w-[140px] h-2 inline-block pointer-events-none shrink-0" />
            <span className="inline-block translate-y-full whitespace-nowrap">
              EVERY DAY
            </span>
          </div>

          {/* Line 2: INTO A PROMISE FOR */}
          <div className="line block overflow-hidden my-2 sm:my-4 md:my-5 whitespace-nowrap">
            <span className="inline-block translate-y-full whitespace-nowrap">
              INTO A PROMISE FOR
            </span>
          </div>

          {/* Line 3: THE FUTURE. */}
          <div className="line block overflow-hidden my-2 sm:my-4 md:my-5 whitespace-nowrap">
            <span className="inline-block translate-y-full whitespace-nowrap">
              THE FUTURE.
            </span>
          </div>
        </h1>
      </div>

      {/* Layer 2 & 3: Unified Docked Box Assembly (Z-Index: 20) */}
      <div
        ref={dockedAssemblyRef}
        className="docked-assembly-wrapper absolute left-1/2 top-1/2 z-20 flex justify-center items-center pointer-events-none"
      >
        {/* Open Rolex Box Graphic */}
        <div
          ref={boxGraphicRef}
          className="rolex-box-container relative flex items-center justify-center"
        >
          <img
            src="/watches/watch-box.png"
            alt="Open Luxury Watch Box"
            className="w-[350px] sm:w-[480px] md:w-[620px] object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* Grouped Watch + Pillow Container (Docks inside Layer 2) */}
        <div
          ref={watchPillowWrapperRef}
          id="box-pillow-container"
          className="watch-pillow-wrapper absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center w-[280px] sm:w-[420px] md:w-[480px] aspect-square"
        >
          {/* Cushion / Pillow Background */}
          <img
            src="/watches/watch-pillow.png"
            alt="Watch Cushion"
            className="pillow-img absolute w-full h-full object-contain z-1 filter drop-shadow-[0_22px_44px_rgba(0,0,0,0.45)]"
          />
          {/* Watch Image Stacked on Pillow */}
          <img
            src="/watches/hero-main-removebg-preview.png"
            alt="Rolex Watch"
            className="watch-img relative w-[82%] h-[82%] object-contain z-2 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
          />
          <div id="watch-box-target" className="absolute inset-0 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
