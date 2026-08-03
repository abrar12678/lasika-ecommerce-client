"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ArrowLeft, Check, Shield, Truck, RotateCcw, Minus, Plus } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import { products } from "@/data/products";

const ease = [0.22, 1, 0.36, 1];

/* ── Skeleton ── */
function DetailSkeleton() {
  return (
    <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
      <div>
        <div className="aspect-square rounded-2xl bg-[#e6ddc9]/30 animate-pulse" />
        <div className="flex gap-3 mt-4">
          {[1,2,3,4].map(i=><div key={i} className="w-20 h-20 rounded-xl bg-[#e6ddc9]/25 animate-pulse" />)}
        </div>
      </div>
      <div className="space-y-4 pt-4">
        <div className="h-3 w-24 bg-[#e6ddc9]/40 rounded-full animate-pulse" />
        <div className="h-8 w-64 bg-[#e6ddc9]/30 rounded-full animate-pulse" />
        <div className="h-5 w-32 bg-[#c5a56e]/20 rounded-full animate-pulse" />
        <div className="h-px bg-[#e6ddc9]/30 my-4" />
        <div className="h-3 w-full bg-[#e6ddc9]/20 rounded-full animate-pulse" />
        <div className="h-3 w-full bg-[#e6ddc9]/20 rounded-full animate-pulse" />
        <div className="h-3 w-3/4 bg-[#e6ddc9]/20 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

/* ── MAIN PRODUCT DETAIL PAGE ── */
export default function ProductDetailPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [liked, setLiked] = useState(false);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = products.find((p) => p.id === params.id);
      setProduct(found || null);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [params.id]);

  const relatedProducts = products.filter((p) => p.id !== params.id && p.category === product?.category).slice(0, 3);
  if (!relatedProducts.length) {
    relatedProducts.push(...products.filter((p) => p.id !== params.id).slice(0, 3));
  }

  const handleAddToCart = useCallback(() => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  }, []);

  if (loading) {
    return (
      <PageTransition className="min-h-screen bg-[var(--color-cream)] pt-28 sm:pt-32 pb-20 px-5 sm:px-10 lg:px-14">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collection", href: "/products" }, { label: "..." }]} />
        <div className="mt-8"><DetailSkeleton /></div>
      </PageTransition>
    );
  }

  if (!product) {
    return (
      <PageTransition className="min-h-screen bg-[var(--color-cream)] flex flex-col items-center justify-center pt-28 px-5">
        <p className="text-[#1a1a1a]/30 mb-6" style={{ fontFamily: "var(--font-geist)" }}>Timepiece not found</p>
        <Link href="/products" className="text-[11px] tracking-[0.15em] uppercase text-[#c5a56e] hover:text-[#1a4d2e] transition-colors" style={{ fontFamily: "var(--font-geist)" }}>
          Back to Collection
        </Link>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-[var(--color-cream)] pb-20">
      <div className="grain-overlay" style={{ opacity: 0.012 }} />

      <section className="pt-28 sm:pt-32 pb-8 sm:pb-12 px-5 sm:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Collection", href: "/products" },
            { label: product.name },
          ]} />

          <Link href="/products" className="inline-flex items-center gap-1.5 mt-5 mb-8 text-[11px] tracking-[0.12em] uppercase text-[#1a1a1a]/40 hover:text-[#c5a56e] transition-colors duration-300 group" style={{ fontFamily: "var(--font-geist)" }}>
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
            Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {/* LEFT: Image Gallery */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease }}>
              <div className="relative aspect-square rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(197,165,110,0.08)" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImg}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease }}
                    className="absolute inset-0 flex items-center justify-center p-8 sm:p-12"
                  >
                    <Image src={product.images[activeImg]} alt={`${product.name} — View ${activeImg + 1}`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" priority />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${activeImg === i ? "ring-2 ring-[#c5a56e] shadow-md shadow-[#c5a56e]/20" : "ring-1 ring-black/5 hover:ring-[#c5a56e]/40"}`}
                    style={{ background: "rgba(255,255,255,0.6)" }}
                  >
                    <Image src={img} alt={`Thumbnail ${i + 1}`} fill sizes="80px" className="object-contain p-1.5" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Product Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }} className="flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a56e] font-semibold" style={{ fontFamily: "var(--font-geist)" }}>{product.category}</span>
              <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl text-[#1a1a1a] leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>{product.name}</h1>
              <p className="mt-1 text-[13px] text-[#1a1a1a]/40 tracking-wide" style={{ fontFamily: "var(--font-geist)" }}>{product.dial} &middot; {product.material}</p>

              <div className="divider-gold my-5" />

              <p className="text-[28px] sm:text-[32px] font-bold text-[#c5a56e] tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                ${product.price.toLocaleString()}
              </p>
              <p className="text-[11px] text-[#1a1a1a]/30 tracking-wide mt-1" style={{ fontFamily: "var(--font-geist)" }}>Tax included. Free shipping worldwide.</p>

              <p className="mt-5 text-[13px] sm:text-[14px] text-[#1a1a1a]/50 leading-[1.8]" style={{ fontFamily: "var(--font-geist)" }}>
                {product.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6 p-4 sm:p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(197,165,110,0.06)" }}>
                {[
                  ["Case Size", product.caseSize],
                  ["Movement", product.movement],
                  ["Power Reserve", product.powerReserve],
                  ["Water Resistance", product.waterResistance],
                  ["Crystal", product.crystal],
                  ["Bracelet", product.bracelet],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-[#1a1a1a]/30 font-medium" style={{ fontFamily: "var(--font-geist)" }}>{label}</p>
                    <p className="text-[12px] sm:text-[13px] text-[#1a1a1a] font-medium mt-0.5" style={{ fontFamily: "var(--font-geist)" }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Quantity + Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-7">
                <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1px solid rgba(197,165,110,0.15)" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-[#1a1a1a]/40 hover:text-[#c5a56e] transition-colors"><Minus className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                  <span className="w-10 h-10 flex items-center justify-center text-[13px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "var(--font-geist)" }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-[#1a1a1a]/40 hover:text-[#c5a56e] transition-colors"><Plus className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(26,77,46,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-[#1a4d2e] text-white rounded-lg text-[11px] tracking-[0.18em] uppercase font-semibold shimmer-hover transition-all duration-500"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {addedToCart ? <><Check className="h-4 w-4" strokeWidth={2} /> Added</> : <><ShoppingBag className="h-4 w-4" strokeWidth={1.5} /> Add to Cart</>}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setLiked(!liked)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${liked ? "bg-[#c5a56e]/10 text-[#c5a56e]" : "bg-white/60 text-[#1a1a1a]/30 hover:text-[#c5a56e]"}`}
                  style={{ border: `1px solid ${liked ? "rgba(197,165,110,0.25)" : "rgba(0,0,0,0.06)"}` }}
                >
                  <Heart className="h-4 w-4" strokeWidth={1.5} fill={liked ? "currentColor" : "none"} />
                </motion.button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 mt-7">
                {[{ icon: Shield, label: "5-Year Warranty" }, { icon: Truck, label: "Free Shipping" }, { icon: RotateCcw, label: "14-Day Returns" }].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.4)", border: "1px solid rgba(197,165,110,0.06)" }}>
                    <Icon className="h-4 w-4 text-[#c5a56e]" strokeWidth={1.5} />
                    <span className="text-[9px] tracking-[0.06em] uppercase text-[#1a1a1a]/30 font-medium" style={{ fontFamily: "var(--font-geist)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="px-5 sm:px-10 lg:px-14 pb-10">
          <div className="max-w-[1440px] mx-auto">
            <div className="divider-gold mb-10" />
            <h2 className="text-xl sm:text-2xl text-[#1a4d2e] mb-6" style={{ fontFamily: "var(--font-playfair)" }}>You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProducts.map((rp, i) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                >
                  <Link href={`/products/${rp.id}`} className="group block rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(197,165,110,0.08)", backdropFilter: "blur(10px)" }}>
                    <div className="relative aspect-square overflow-hidden bg-[#f4efe6]">
                      <Image src={rp.image} alt={rp.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-6 transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-4">
                      <p className="text-[13px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "var(--font-geist)" }}>{rp.name}</p>
                      <p className="text-[11px] text-[#1a1a1a]/35 mt-0.5" style={{ fontFamily: "var(--font-geist)" }}>{rp.dial}</p>
                      <p className="text-[15px] font-bold text-[#c5a56e] mt-2" style={{ fontFamily: "var(--font-geist)" }}>${rp.price.toLocaleString()}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  );
}
