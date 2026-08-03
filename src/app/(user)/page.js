"use client";

import { useEffect, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import WatchDetail from "@/components/WatchDetail";
import WatchBoxSection from "@/components/WatchBoxSection";
import ReviewSection from "@/components/ReviewSection";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  const isScrollingRef = useRef(false);
  const touchStartRef = useRef(0);

  /* -- First 4 sections snap, rest scroll freely -- */
  const snapSections = ["hero", "showcase", "detail", "box-reveal"];

  useEffect(() => {
    const getCurrentSectionIndex = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
      const vh = window.innerHeight || 1;
      return Math.round(scrollPos / vh);
    };

    const scrollToSection = (index) => {
      const targetId = snapSections[index];
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        isScrollingRef.current = true;
        targetEl.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => { isScrollingRef.current = false; }, 1000);
      }
    };

    const isInSnapZone = () => {
      const scrollPos = window.scrollY || 0;
      const maxSnapScroll = snapSections.length * (window.innerHeight || 1);
      return scrollPos < maxSnapScroll - 50;
    };

    const handleWheel = (e) => {
      if (isScrollingRef.current) return;
      if (Math.abs(e.deltaY) < 10) return;
      if (!isInSnapZone()) return;

      const currentIdx = Math.min(getCurrentSectionIndex(), snapSections.length - 1);
      const dir = e.deltaY > 0 ? 1 : -1;
      const nextIdx = Math.min(Math.max(currentIdx + dir, 0), snapSections.length - 1);
      if (nextIdx !== currentIdx) {
        e.preventDefault();
        scrollToSection(nextIdx);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isScrollingRef.current) return;
      if (!e.touches || e.touches.length === 0) return;
      if (!isInSnapZone()) return;

      const touchEnd = e.touches[0].clientY;
      const diff = touchStartRef.current - touchEnd;
      if (Math.abs(diff) > 25) {
        const currentIdx = Math.min(getCurrentSectionIndex(), snapSections.length - 1);
        const dir = diff > 0 ? 1 : -1;
        const nextIdx = Math.min(Math.max(currentIdx + dir, 0), snapSections.length - 1);
        if (nextIdx !== currentIdx) {
          e.preventDefault();
          scrollToSection(nextIdx);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <main className="w-full relative bg-[var(--color-cream)]">
      <HeroSection />
      <ProductShowcase />
      <WatchDetail />
      <WatchBoxSection />
      <ReviewSection />
      <FAQSection />
    </main>
  );
}
