"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown, Heart, ShoppingBag, Eye } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import { products, categories, sortOptions } from "@/data/products";

const ease = [0.22, 1, 0.36, 1];

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(197,165,110,0.08)" }}>
      <div className="aspect-square bg-[#e6ddc9]/40 animate-pulse" />
      <div className="p-4 sm:p-5">
        <div className="h-3 w-20 bg-[#e6ddc9]/50 rounded-full animate-pulse mb-2.5" />
        <div className="h-2.5 w-32 bg-[#e6ddc9]/30 rounded-full animate-pulse mb-3" />
        <div className="h-4 w-16 bg-[#c5a56e]/20 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

/* ── Product Card ── */
function ProductCard({ product, index }) {
  const [liked, setLiked] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease }}
      className="group rounded-2xl overflow-hidden cursor-pointer relative"
      style={{
        background: "rgba(255,255,255,0.65)",
        border: "1px solid rgba(197,165,110,0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#f4efe6]">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-[#e6ddc9]/30 animate-pulse" />
        )}
        <Image
          src={product.image}
          alt={`${product.name} — ${product.dial}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-contain p-6 sm:p-8 transition-transform duration-700 ease-out group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${liked ? "bg-[#c5a56e] text-white shadow-md shadow-[#c5a56e]/30" : "bg-white/80 backdrop-blur-md text-[#1a1a1a]/50 hover:text-[#c5a56e]"}`}
          >
            <Heart className="h-4 w-4" strokeWidth={1.5} fill={liked ? "currentColor" : "none"} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => e.preventDefault()}
            className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#1a1a1a]/50 hover:text-[#c5a56e] flex items-center justify-center transition-all duration-300"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          </motion.button>
        </div>

        {/* View Button */}
        <Link href={`/products/${product.id}`}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.03 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500"
          >
            <span className="flex items-center gap-1.5 px-5 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold bg-[#1a4d2e] text-white shadow-lg"
              style={{ fontFamily: "var(--font-geist)" }}>
              <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
              View Details
            </span>
          </motion.div>
        </Link>
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] tracking-[0.18em] uppercase text-[#c5a56e] font-semibold" style={{ fontFamily: "var(--font-geist)" }}>
            {product.category}
          </span>
          {product.featured && (
            <span className="text-[8px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full bg-[#c5a56e]/8 text-[#c5a56e] font-medium" style={{ fontFamily: "var(--font-geist)" }}>
              Featured
            </span>
          )}
        </div>
        <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#1a1a1a] tracking-wide leading-snug" style={{ fontFamily: "var(--font-geist)" }}>
          {product.name}
        </h3>
        <p className="text-[12px] text-[#1a1a1a]/40 mt-0.5 tracking-wide" style={{ fontFamily: "var(--font-geist)" }}>
          {product.dial} &middot; {product.material.split(" & ")[0].split(",")[0]}
        </p>
        <div className="divider-gold mt-3 mb-3" />
        <p className="text-[16px] sm:text-[17px] font-bold text-[#c5a56e] tracking-tight" style={{ fontFamily: "var(--font-geist)" }}>
          ${product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}

/* ── MAIN COLLECTION PAGE ── */
export default function CollectionPage() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let list = activeCategory === "All" ? [...products] : products.filter((p) => p.category === activeCategory);
    switch (activeSort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "name-asc": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "featured": list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
      default: break;
    }
    return list;
  }, [activeCategory, activeSort]);

  return (
    <PageTransition className="min-h-screen bg-[var(--color-cream)] pb-20">
      <div className="grain-overlay" style={{ opacity: 0.015 }} />

      {/* Hero Banner */}
      <section className="relative pt-28 sm:pt-32 pb-10 sm:pb-14 px-5 sm:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collection" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6"
          >
            <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c5a56e] font-semibold block mb-3" style={{ fontFamily: "var(--font-geist)" }}>
              Our Timepieces
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-normal text-[#1a4d2e] leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              The Collection
            </h1>
            <p className="mt-3 text-[13px] sm:text-[14px] text-[#1a1a1a]/40 max-w-[480px] leading-relaxed" style={{ fontFamily: "var(--font-geist)" }}>
              Each timepiece embodies generations of Swiss craftsmanship and uncompromising attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Sort Bar */}
      <section className="sticky top-[76px] z-30 px-5 sm:px-10 lg:px-14 py-3 sm:py-4"
        style={{ background: "rgba(250,249,246,0.92)", backdropFilter: "blur(20px) saturate(180%)", borderBottom: "1px solid rgba(197,165,110,0.06)" }}>
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 sm:hidden text-[11px] tracking-[0.12em] uppercase font-semibold text-[#1a4d2e]"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
            Filters
          </button>

          {/* Category Pills */}
          <div className={`${showFilters ? "flex" : "hidden"} sm:flex flex-wrap items-center gap-2 flex-1`}>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] tracking-[0.1em] uppercase font-medium transition-all duration-400 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#1a4d2e] text-white shadow-md shadow-[#1a4d2e]/15"
                    : "bg-white/60 text-[#1a1a1a]/40 hover:text-[#1a4d2e] border border-[#c5a56e]/10 hover:border-[#c5a56e]/25"
                }`}
                style={{ fontFamily: "var(--font-geist)" }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown className="h-3.5 w-3.5 text-[#c5a56e]/60" strokeWidth={1.5} />
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="text-[11px] tracking-[0.06em] text-[#1a1a1a]/60 bg-transparent border-none outline-none cursor-pointer appearance-none pr-4"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-5 sm:px-10 lg:px-14 mt-6 sm:mt-8">
        <div className="max-w-[1440px] mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <>
              <p className="text-[11px] text-[#1a1a1a]/30 tracking-wide mb-5" style={{ fontFamily: "var(--font-geist)" }}>
                Showing {filtered.length} timepiece{filtered.length !== 1 ? "s" : ""}
              </p>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {filtered.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-[14px] text-[#1a1a1a]/30" style={{ fontFamily: "var(--font-geist)" }}>
                    No timepieces found in this collection.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
