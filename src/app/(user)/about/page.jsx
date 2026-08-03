"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";

const ease = [0.22, 1, 0.36, 1];

const milestones = [
  { year: "1885", title: "Founded in Geneva", desc: "Master watchmaker Edouard Lasika establishes his atelier on Rue du Rhone, crafting pocket watches for European royalty and discerning collectors." },
  { year: "1920", title: "The First Wristwatch", desc: "LASIKA pioneers the transition from pocket to wrist, introducing the Oyster case with its revolutionary hermetic seal." },
  { year: "1953", title: "The Submariner Debuts", desc: "Born for the depths, the Submariner becomes the first diving watch waterproof to 100 metres, redefining professional tool watches." },
  { year: "1985", title: "Centenary Excellence", desc: "LASIKA celebrates 100 years with the Calibre 3135 movement, setting new standards for precision and reliability in automatic winding." },
  { year: "2012", title: "The Calibre 3235 Era", desc: "Introduction of the next-generation movement with 14 patents, the Chronergy escapement, and a 70-hour power reserve." },
  { year: "2025", title: "Perpetual Innovation", desc: "LASIKA continues to push boundaries with cutting-edge materials, sustainable manufacturing, and timeless design that transcends generations." },
];

const values = [
  { title: "Precision", desc: "Every movement is assembled by hand and tested over 14 days across five positions and three temperature zones to achieve COSC chronometer certification.", icon: "01" },
  { title: "Heritage", desc: "140 years of uninterrupted watchmaking tradition. Every timepiece carries the accumulated knowledge of generations of Swiss master watchmakers.", icon: "02" },
  { title: "Innovation", desc: "From the Oyster case to the Chronergy escapement, our 500+ patents represent an unwavering commitment to pushing the boundaries of horology.", icon: "03" },
  { title: "Sustainability", desc: "Our Geneva atelier runs on 100% renewable energy. We source ethically mined precious metals and are committed to carbon-neutral operations by 2030.", icon: "04" },
];

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

export default function HeritagePage() {
  return (
    <PageTransition className="min-h-screen bg-[var(--color-cream)] pb-20">
      <div className="grain-overlay" style={{ opacity: 0.015 }} />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-14 sm:pb-20 px-5 sm:px-10 lg:px-14 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(197,165,110,0.08)_0%,_transparent_60%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Heritage" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }} className="mt-6 max-w-[700px]">
            <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c5a56e] font-semibold block mb-3" style={{ fontFamily: "var(--font-geist)" }}>Since 1885</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-normal text-[#1a4d2e] leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Our Heritage
            </h1>
            <p className="mt-4 text-[13px] sm:text-[14px] text-[#1a1a1a]/45 max-w-[540px] leading-[1.8]" style={{ fontFamily: "var(--font-geist)" }}>
              For over 140 years, LASIKA has been at the forefront of Swiss horology, crafting timepieces that embody precision, elegance, and an unwavering commitment to excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="px-5 sm:px-10 lg:px-14 pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeIn>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden" style={{ background: "linear-gradient(145deg, #f4efe6, #e6ddc9)" }}>
              <Image src="/watches/watch-pillow.png" alt="LASIKA Craftsmanship" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-10" />
              <div className="grain-overlay" style={{ opacity: 0.03 }} />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a56e] font-semibold" style={{ fontFamily: "var(--font-geist)" }}>The LASIKA Story</span>
            <h2 className="mt-3 text-2xl sm:text-3xl text-[#1a1a1a] leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              A Legacy Wristwatch by Wristwatch
            </h2>
            <p className="mt-4 text-[13px] sm:text-[14px] text-[#1a1a1a]/50 leading-[1.8]" style={{ fontFamily: "var(--font-geist)" }}>
              What began in a modest Geneva atelier in 1885 has grown into one of the most revered names in luxury watchmaking. Edouard Lasika founded the maison on a singular principle: that a watch should be as beautiful inside as it is outside.
            </p>
            <p className="mt-3 text-[13px] sm:text-[14px] text-[#1a1a1a]/50 leading-[1.8]" style={{ fontFamily: "var(--font-geist)" }}>
              Today, every LASIKA timepiece continues to be hand-assembled and tested in our Geneva workshop. From the smelting of gold alloys to the final waterproofness test, each of the 500+ operations that go into making a LASIKA watch is performed to standards that have been refined across five generations of master watchmakers.
            </p>
            <p className="mt-3 text-[13px] sm:text-[14px] text-[#1a1a1a]/50 leading-[1.8]" style={{ fontFamily: "var(--font-geist)" }}>
              This dedication to craft is why LASIKA watches are passed down through families, why they hold their value unlike any other luxury good, and why the name LASIKA remains synonymous with the very best of Swiss watchmaking.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-5 sm:px-10 lg:px-14 pb-16 sm:pb-24">
        <div className="max-w-[900px] mx-auto">
          <FadeIn className="text-center mb-12 sm:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a56e] font-semibold" style={{ fontFamily: "var(--font-geist)" }}>Milestones</span>
            <h2 className="mt-3 text-2xl sm:text-3xl text-[#1a4d2e]" style={{ fontFamily: "var(--font-playfair)" }}>Through the Decades</h2>
            <div className="divider-gold w-16 mx-auto mt-5" />
          </FadeIn>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c5a56e]/25 to-transparent" />

            {milestones.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.06}>
                <div className={`relative flex items-start gap-6 sm:gap-0 mb-10 sm:mb-14 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#c5a56e] shadow-[0_0_10px_rgba(197,165,110,0.5)] z-10 mt-1.5" />

                  {/* Content */}
                  <div className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:text-left"}`}>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#c5a56e] font-bold" style={{ fontFamily: "var(--font-geist)" }}>{m.year}</span>
                    <h3 className="mt-1 text-[16px] sm:text-[18px] text-[#1a1a1a] font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>{m.title}</h3>
                    <p className="mt-2 text-[12px] sm:text-[13px] text-[#1a1a1a]/40 leading-[1.75]" style={{ fontFamily: "var(--font-geist)" }}>{m.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-5 sm:px-10 lg:px-14 pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a56e] font-semibold" style={{ fontFamily: "var(--font-geist)" }}>Philosophy</span>
            <h2 className="mt-3 text-2xl sm:text-3xl text-[#1a4d2e]" style={{ fontFamily: "var(--font-playfair)" }}>What Drives Us</h2>
            <div className="divider-gold w-16 mx-auto mt-5" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)" }} transition={{ duration: 0.4, ease }} className="p-6 sm:p-7 rounded-2xl h-full" style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(197,165,110,0.08)", backdropFilter: "blur(10px)" }}>
                  <span className="text-[28px] font-bold text-[#c5a56e]/15" style={{ fontFamily: "var(--font-playfair)" }}>{v.icon}</span>
                  <h3 className="mt-2 text-[15px] text-[#1a4d2e] font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>{v.title}</h3>
                  <p className="mt-2 text-[12px] text-[#1a1a1a]/40 leading-[1.75]" style={{ fontFamily: "var(--font-geist)" }}>{v.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Banner */}
      <section className="px-5 sm:px-10 lg:px-14 pb-16 sm:pb-20">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 lg:p-20 text-center" style={{ background: "linear-gradient(145deg, #1a4d2e, #004B23)" }}>
            <div className="grain-overlay" style={{ opacity: 0.04 }} />
            <div className="relative z-10">
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#c5a56e] font-semibold" style={{ fontFamily: "var(--font-geist)" }}>Crafted in Geneva</span>
              <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-normal leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                Every Second Tells<br />a Story of Excellence
              </h2>
              <p className="mt-4 text-[13px] sm:text-[14px] text-white/40 max-w-[520px] mx-auto leading-relaxed" style={{ fontFamily: "var(--font-geist)" }}>
                Visit our Geneva atelier and witness the art of Swiss watchmaking firsthand. By appointment only.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block mt-8 px-8 py-3 bg-[#c5a56e] text-[#1a4d2e] rounded-lg text-[10.5px] tracking-[0.2em] uppercase font-semibold hover:bg-[#d4b87a] transition-colors duration-400"
                style={{ fontFamily: "var(--font-geist)" }}
              >
                Book an Appointment
              </motion.a>
            </div>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
