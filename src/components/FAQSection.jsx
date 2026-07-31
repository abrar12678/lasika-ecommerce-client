"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus, Shield, Truck, Settings, Clock } from "lucide-react";

/* ─────────────────────────────────────────────
   FAQ Data with Categories
   ───────────────────────────────────────────── */
const categories = [
  {
    id: "product",
    label: "Product",
    icon: Clock,
    faqs: [
      { id: 1, q: "What makes LASIKA timepieces different from other luxury watches?", a: "Every LASIKA timepiece is the culmination of over 140 years of Swiss horological tradition. Our watches feature 904L Oystersteel cases, in-house Calibre 3235 movements with 70-hour power reserves, and undergo rigorous COSC chronometer certification. Each piece is hand-assembled and tested to meet the highest standards of precision, water resistance, and durability that define true luxury." },
      { id: 2, q: "Can I customize or engrave my LASIKA timepiece?", a: "Yes, LASIKA offers a bespoke customization program. You can select from our curated collection of dials, bezels, and bracelet options. We also provide professional engraving services for case backs, allowing you to add a personal message, date, or initials. Custom orders typically take 8 to 12 weeks and are crafted at our Geneva atelier." },
    ],
  },
  {
    id: "warranty",
    label: "Warranty",
    icon: Shield,
    faqs: [
      { id: 3, q: "What is the warranty coverage for LASIKA watches?", a: "All LASIKA timepieces come with a comprehensive 5-year international warranty covering manufacturing defects in materials and workmanship. This warranty is valid at any LASIKA authorized service center worldwide. We also offer an extended warranty program providing up to 8 years of coverage." },
      { id: 4, q: "How do I authenticate my LASIKA purchase?", a: "Every LASIKA timepiece ships with a Certificate of Authenticity, an international warranty card, and a unique serial number engraved on the case. Verify your watch through our official authentication portal or visit any LASIKA authorized dealer." },
    ],
  },
  {
    id: "service",
    label: "Service",
    icon: Settings,
    faqs: [
      { id: 5, q: "How should I care for and maintain my LASIKA watch?", a: "We recommend professional service every 5 to 7 years. Between services, rinse your watch with fresh water after saltwater or chlorine exposure, avoid strong magnetic fields, and store it in its original box or a quality watch winder. The self-winding Calibre 3235 keeps running as long as you wear it regularly." },
      { id: 6, q: "What is your return and exchange policy?", a: "We offer a 14-day satisfaction guarantee on all purchases. Return your timepiece in its original, unworn condition with all packaging and documentation for a full refund. For exchanges, we provide a 30-day window through our client services team." },
    ],
  },
  {
    id: "shipping",
    label: "Shipping",
    icon: Truck,
    faqs: [
      { id: 7, q: "How is my LASIKA timepiece shipped and insured?", a: "All orders are shipped via insured express courier in our signature LASIKA presentation box. Each package includes real-time tracking, requires an adult signature upon delivery, and is fully insured for the retail value of the timepiece. Typical delivery is 2 to 5 business days worldwide." },
      { id: 8, q: "Do you offer international shipping?", a: "Yes, we ship to over 180 countries worldwide through our global logistics network. Import duties and taxes are calculated at checkout for transparency. Each shipment is tracked end-to-end and insured for the full value of your purchase." },
    ],
  },
];

const allFaqs = categories.flatMap((c) => c.faqs);

/* ─────────────────────────────────────────────
   FAQ Item
   ───────────────────────────────────────────── */
function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`border-b transition-colors duration-500 ${isOpen ? "border-[#c5a56e]/15" : "border-[#1a1a1a]/5"}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4.5 sm:py-5.5 md:py-6 text-left group cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 sm:gap-4 pr-4 sm:pr-6">
          <span className={`hidden sm:flex flex-shrink-0 w-7 h-7 rounded-full items-center justify-center text-[10px] font-bold transition-all duration-500 ${isOpen ? "bg-[#c5a56e] text-white" : "bg-[#c5a56e]/8 text-[#c5a56e]/50"}`} style={{ fontFamily: "var(--font-geist)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`text-[13.5px] sm:text-[14.5px] md:text-[15px] leading-relaxed transition-colors duration-400 ${isOpen ? "text-[#1a4d2e] font-medium" : "text-[#1a1a1a]/50 font-normal group-hover:text-[#1a4d2e]"}`} style={{ fontFamily: "var(--font-geist)" }}>
            {faq.q}
          </span>
        </div>
        <motion.div
          className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-[#c5a56e] text-white shadow-md shadow-[#c5a56e]/20" : "bg-[#c5a56e]/6 text-[#c5a56e]/40 group-hover:bg-[#c5a56e]/12 group-hover:text-[#c5a56e]"}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div key="minus" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }}><Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2} /></motion.div>
            ) : (
              <motion.div key="plus" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }} transition={{ duration: 0.2 }}><Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2} /></motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.3 } }}
            className="overflow-hidden"
          >
            <p className="pb-5 sm:pb-6 pl-0 sm:pl-11 pr-8 sm:pr-10 text-[13px] sm:text-[13.5px] md:text-[14px] leading-[1.8] text-[#1a1a1a]/45" style={{ fontFamily: "var(--font-geist)" }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN FAQ SECTION
   ───────────────────────────────────────────── */
export default function FAQSection() {
  const [openId, setOpenId] = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-60px" });

  const displayedFaqs = activeCat
    ? categories.find((c) => c.id === activeCat)?.faqs || allFaqs
    : allFaqs;

  const toggleFAQ = (id) => setOpenId(openId === id ? null : id);

  return (
    <section ref={sectionRef} id="faq" className="relative py-20 sm:py-28 overflow-hidden bg-[#faf9f6]">
      <div className="grain-overlay" />

      <div className="relative z-10 max-w-[860px] mx-auto px-5 sm:px-8 w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-12 sm:mb-14">
          <span className="inline-block text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c5a56e] font-semibold mb-4" style={{ fontFamily: "var(--font-geist)" }}>Support</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-normal text-[#1a4d2e] leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>Frequently Asked Questions</h2>
          <p className="mt-4 text-[13px] sm:text-[14px] text-[#1a1a1a]/35 max-w-[420px] mx-auto leading-relaxed" style={{ fontFamily: "var(--font-geist)" }}>Everything you need to know about our timepieces and services.</p>
          <div className="divider-gold w-16 mx-auto mt-6" />
        </motion.div>

        {/* Category Tabs */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {[{ id: null, label: "All" }, ...categories].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCat === cat.id;
            return (
              <motion.button key={cat.id || "all"} whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }} onClick={() => setActiveCat(cat.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-[12px] tracking-[0.1em] uppercase font-medium transition-all duration-400 cursor-pointer ${isActive ? "bg-[#c5a56e] text-white shadow-md shadow-[#c5a56e]/20" : "bg-white/60 text-[#1a1a1a]/40 hover:text-[#1a4d2e] border border-[#c5a56e]/10 hover:border-[#c5a56e]/25"}`}
                style={{ fontFamily: "var(--font-geist)" }}
              >
                {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />}
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* FAQ Items */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl px-5 sm:px-7 md:px-9 py-1 sm:py-2"
          style={{ background: "rgba(255, 255, 255, 0.55)", border: "1px solid rgba(197, 165, 110, 0.06)", boxShadow: "0 4px 24px rgba(0, 0, 0, 0.03)" }}
        >
          {displayedFaqs.map((faq, index) => (
            <FAQItem key={faq.id} faq={faq} index={index} isOpen={openId === faq.id} onToggle={() => toggleFAQ(faq.id)} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-center mt-10 sm:mt-14">
          <p className="text-[13px] text-[#1a1a1a]/30 mb-4" style={{ fontFamily: "var(--font-geist)" }}>Still have questions?</p>
          <motion.a href="/contact" whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
            className="inline-block px-8 py-3 text-[10.5px] tracking-[0.22em] uppercase font-semibold text-[#1a4d2e] border border-[#1a4d2e]/12 rounded-sm hover:bg-[#1a4d2e] hover:text-white hover:border-[#1a4d2e] transition-all duration-500 hover:shadow-lg hover:shadow-[#1a4d2e]/10"
            style={{ fontFamily: "var(--font-geist)" }}
          >Contact Our Experts</motion.a>
        </motion.div>
      </div>
    </section>
  );
}
