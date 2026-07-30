"use client";

import { useEffect, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProductShowcase from "@/components/ProductShowcase";
import WatchDetail from "@/components/WatchDetail";
import WatchBoxSection from "@/components/WatchBoxSection";

export default function Home() {
  const isScrollingRef = useRef(false);
  const touchStartRef = useRef(0);

  useEffect(() => {
    const sections = ["hero", "showcase", "detail", "box-reveal"];

    const getCurrentSectionIndex = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
      const vh = window.innerHeight || 1;
      return Math.round(scrollPos / vh);
    };

    const scrollToSection = (index) => {
      const targetId = sections[index];
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        isScrollingRef.current = true;
        targetEl.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 900);
      }
    };

    const handleWheel = (e) => {
      if (isScrollingRef.current) return;
      if (Math.abs(e.deltaY) < 10) return;

      const currentIdx = getCurrentSectionIndex();
      const dir = e.deltaY > 0 ? 1 : -1;
      const nextIdx = Math.min(Math.max(currentIdx + dir, 0), sections.length - 1);

      if (nextIdx !== currentIdx) {
        scrollToSection(nextIdx);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (isScrollingRef.current) return;
      if (!e.touches || e.touches.length === 0) return;

      const touchEnd = e.touches[0].clientY;
      const diff = touchStartRef.current - touchEnd;

      if (Math.abs(diff) > 25) {
        const currentIdx = getCurrentSectionIndex();
        const dir = diff > 0 ? 1 : -1;
        const nextIdx = Math.min(Math.max(currentIdx + dir, 0), sections.length - 1);

        if (nextIdx !== currentIdx) {
          scrollToSection(nextIdx);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <main className="w-full relative bg-[#faf9f6]">
      <Navbar />
      <HeroSection />
      <ProductShowcase />
      <WatchDetail />
      <WatchBoxSection />
    </main>
  );
}
