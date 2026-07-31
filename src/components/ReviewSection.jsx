"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

/* ─────────────────────────────────────────────
   Review Data (duplicated for seamless loop)
   ───────────────────────────────────────────── */
const reviews = [
  { id: 1, name: "James Harrington", title: "Watch Collector", location: "London", rating: 5, text: "The Oyster Perpetual from LASIKA is nothing short of extraordinary. The weight on the wrist, the sunburst dial catching light at every angle, and the flawless movement — it is a masterclass in horological perfection.", initials: "JH" },
  { id: 2, name: "Sophia Chen", title: "Art Director", location: "New York", rating: 5, text: "I have handled timepieces from every major Swiss maison, and LASIKA stands shoulder to shoulder with the very best. The fluted bezel alone speaks to generations of craftsmanship.", initials: "SC" },
  { id: 3, name: "Marcus Reinhardt", title: "CEO", location: "Zurich", rating: 5, text: "Three years in and it keeps perfect time, the bracelet has aged gracefully, and every time I glance at my wrist, I feel a sense of pride. Worth every penny.", initials: "MR" },
  { id: 4, name: "Amara Okafor", title: "Fashion Editor", location: "Paris", rating: 5, text: "My LASIKA timepiece has become an extension of my identity — refined, timeless, and unmistakably premium. The emerald green dial draws compliments everywhere.", initials: "AO" },
  { id: 5, name: "David Whitfield", title: "Architect", location: "Singapore", rating: 5, text: "The 904L steel case, the cyclops lens magnification, the satisfying click of the bezel — LASIKA embodies engineered excellence in every dimension.", initials: "DW" },
  { id: 6, name: "Elena Volkov", title: "Diplomat", location: "Geneva", rating: 5, text: "Wearing a LASIKA opens doors. It is a statement of taste and achievement that transcends language barriers. The craftsmanship is simply unmatched.", initials: "EV" },
  { id: 7, name: "Robert Tanaka", title: "Film Director", location: "Tokyo", rating: 5, text: "I have gifted two LASIKA timepieces to my closest collaborators. The presentation box, the weight, the finish — pure cinematic luxury.", initials: "RT" },
];

/* ─────────────────────────────────────────────
   Single Review Card (horizontal)
   ───────────────────────────────────────────── */
function ReviewCard({ review }) {
  return (
    <div
      className="flex-shrink-0 w-[340px] sm:w-[420px] md:w-[460px] lg:w-[500px] p-6 sm:p-8 rounded-2xl group cursor-default"
      style={{
        background: "rgba(255, 255, 255, 0.55)",
        border: "1px solid rgba(197, 165, 110, 0.1)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-[13px] sm:text-[15px] font-semibold tracking-[0.06em] text-[#1a4d2e]"
            style={{ fontFamily: "var(--font-playfair)", background: "linear-gradient(135deg, rgba(197,165,110,0.12), rgba(197,165,110,0.22))", border: "1px solid rgba(197,165,110,0.25)" }}
          >
            {review.initials}
          </div>
          <Quote className="absolute -top-2 -left-2 h-4 w-4 text-[#c5a56e]/30" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] sm:text-[14px] font-semibold tracking-[0.04em] text-[#1a4d2e]" style={{ fontFamily: "var(--font-geist)" }}>{review.name}</p>
          <p className="text-[11px] sm:text-[12px] tracking-[0.06em] text-[#1a4d2e]/35 mt-0.5 uppercase" style={{ fontFamily: "var(--font-geist)" }}>{review.title} — {review.location}</p>
        </div>
        <div className="flex-shrink-0 pt-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${i < review.rating ? "text-[#c5a56e] fill-[#c5a56e]" : "text-[#c5a56e]/15"}`} strokeWidth={1.5} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[#1a1a1a]/55 font-normal" style={{ fontFamily: "var(--font-geist)" }}>
        "{review.text}"
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN REVIEW SECTION — Marquee
   ───────────────────────────────────────────── */
export default function ReviewSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-80px" });

  return (
    <section ref={sectionRef} id="reviews"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #faf9f6 0%, #f4efe6 50%, #faf9f6 100%)" }}
    >
      <div className="grain-overlay" />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-12 sm:mb-16 px-5">
          <span className="inline-block text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c5a56e] font-semibold mb-4" style={{ fontFamily: "var(--font-geist)" }}>Testimonials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-normal text-[#1a4d2e] leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>What Our Clients Say</h2>
          <div className="divider-gold w-16 mx-auto mt-5" />
        </motion.div>

        {/* Marquee Row 1 — scrolls LEFT (right to left visually) */}
        <div className="overflow-hidden mb-5 sm:mb-6">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ x: { duration: 45, repeat: Infinity, ease: "linear" } }} className="flex gap-5 sm:gap-6 w-max">
            {[...reviews, ...reviews].map((r, i) => <ReviewCard key={r.id + "-r1-" + i} review={r} />)}
          </motion.div>
        </div>

        {/* Marquee Row 2 — scrolls RIGHT (left to right visually) — reversed order */}
        <div className="overflow-hidden">
          <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ x: { duration: 50, repeat: Infinity, ease: "linear" } }} className="flex gap-5 sm:gap-6 w-max">
            {[...[...reviews].reverse(), ...[...reviews].reverse()].map((r, i) => <ReviewCard key={r.id + "-r2-" + i} review={r} />)}
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 mt-14 sm:mt-20 px-5">
          {[
            { value: "4.9/5", label: "Average Rating" },
            { value: "2,400+", label: "Happy Clients" },
            { value: "140+", label: "Years Heritage" },
            { value: "100%", label: "Swiss Made" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-[#1a4d2e] tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>{stat.value}</p>
              <p className="text-[9.5px] sm:text-[10px] tracking-[0.2em] uppercase text-[#1a4d2e]/30 mt-1 font-medium" style={{ fontFamily: "var(--font-geist)" }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
