"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* -- SECTION 4: BOX REVEAL & DOCKING SECTION -- */
export default function WatchBoxSection() {
  const sectionRef = useRef(null);
  const boxGraphicRef = useRef(null);
  const watchPillowWrapperRef = useRef(null);
  const dockedAssemblyRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !watchPillowWrapperRef.current || !boxGraphicRef.current || !dockedAssemblyRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.set(watchPillowWrapperRef.current, { scale: 1.6, y: "-25%", opacity: 1 });
      gsap.set(boxGraphicRef.current, { opacity: 0, scale: 0.75, y: "40px" });
      gsap.set(dockedAssemblyRef.current, { xPercent: -50, yPercent: -50, scale: 1, x: "0px", y: "0px" });

      const textLines = sectionRef.current.querySelectorAll(".reveal-text span.inline-block");
      if (textLines.length > 0) {
        gsap.set(textLines, { y: "100%", opacity: 0 });
      }

      const isDesktop = window.innerWidth >= 1024;
      const isMd = window.innerWidth >= 768;

      const dockingScale = isDesktop ? 0.37 : isMd ? 0.33 : 0.30;
      const dockingY = isDesktop ? "56px" : isMd ? "42px" : "16px";

      /* ── Phase 1: Scale Down & Box Reveal ── */
      tl.to(watchPillowWrapperRef.current, { scale: 0.36, y: "15px", duration: 0.85, ease: "power2.out" }, 0.1);
      tl.to(boxGraphicRef.current, { opacity: 1, scale: 1, y: "0px", duration: 0.85, ease: "power2.out" }, 0.1);

      /* ── Phase 2: Docking Inside Box ── */
      tl.to(watchPillowWrapperRef.current, { scale: dockingScale, y: dockingY, duration: 0.55, ease: "power1.inOut" }, 0.85);

      /* ── Phase 3: Text Reveal ── */
      if (textLines.length > 0) {
        tl.to(textLines, { y: "0%", opacity: 1, duration: 0.85, stagger: 0.13, ease: "power3.out" }, 1.4);
      }

      const targetX = isDesktop ? "-2.3vw" : isMd ? "-1.8vw" : "-3.5vw";
      const targetY = isDesktop ? "-19vh" : isMd ? "-17vh" : "-7.5vh";
      const targetScale = isDesktop ? 0.40 : isMd ? 0.36 : 0.26;

      tl.to(dockedAssemblyRef.current, { x: targetX, y: targetY, scale: targetScale, duration: 0.95, ease: "power2.inOut" }, 1.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="box-reveal"
      className="relative h-screen w-full overflow-hidden snap-start snap-always select-none"
      style={{ background: "linear-gradient(180deg, #f4efe6 0%, #ede5d6 100%)" }}
    >
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,165,110,0.14)_0%,_rgba(244,239,230,0.95)_65%,_#f4efe6_100%)] pointer-events-none z-0" />
      {/* Grain */}
      <div className="grain-overlay" style={{ opacity: 0.025 }} />

      {/* Layer 1: Background Typography (Z-Index: 5) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-3 sm:px-8 pointer-events-none z-5">
        <h1
          className="reveal-text text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] font-black text-[#0a3d1e] tracking-tight text-center uppercase leading-[1.08] w-full max-w-[1600px]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <div className="line flex items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-5 overflow-hidden my-2 sm:my-4 md:my-5 whitespace-nowrap">
            <span className="inline-block translate-y-full whitespace-nowrap">TURNING</span>
            <div className="w-[40px] sm:w-[100px] md:w-[125px] lg:w-[140px] h-2 inline-block pointer-events-none shrink-0" />
            <span className="inline-block translate-y-full whitespace-nowrap">EVERY DAY</span>
          </div>

          <div className="line block overflow-hidden my-2 sm:my-4 md:my-5 whitespace-nowrap">
            <span className="inline-block translate-y-full whitespace-nowrap">INTO A PROMISE FOR</span>
          </div>

          <div className="line block overflow-hidden my-2 sm:my-4 md:my-5 whitespace-nowrap">
            <span className="inline-block translate-y-full whitespace-nowrap">THE FUTURE.</span>
          </div>
        </h1>
      </div>

      {/* Layer 2 & 3: Docked Box Assembly (Z-Index: 20) */}
      <div
        ref={dockedAssemblyRef}
        className="absolute left-1/2 top-1/2 z-20 flex justify-center items-center pointer-events-none"
      >
        {/* Luxury Watch Box */}
        <div ref={boxGraphicRef} className="relative flex items-center justify-center">
          <Image
            src="/watches/watch-box.png"
            alt="Open Luxury Watch Box"
            width={800}
            height={600}
            className="w-[350px] sm:w-[480px] md:w-[620px] object-contain drop-shadow-[0_38px 65px_rgba(0,0,0,0.32)]"
          />
        </div>

        {/* Watch + Pillow Container */}
        <div
          ref={watchPillowWrapperRef}
          id="box-pillow-container"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center w-[280px] sm:w-[420px] md:w-[480px] aspect-square"
        >
          <Image
            src="/watches/watch-pillow.png"
            alt="Watch Cushion"
            width={600}
            height={600}
            className="absolute w-full h-full object-contain z-1 filter drop-shadow-[0_24px 48px_rgba(0,0,0,0.4)]"
          />
          <Image
            src="/watches/hero-main-removebg-preview.png"
            alt="LASIKA Luxury Timepiece"
            width={600}
            height={600}
            className="relative w-[82%] h-[82%] object-contain z-2 filter drop-shadow-[0_14px 28px_rgba(0,0,0,0.3)]"
          />
          <div id="watch-box-target" className="absolute inset-0 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
