"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";

const ease = [0.22, 1, 0.36, 1];

const contactInfo = [
  { icon: MapPin, label: "Visit Our Atelier", value: "Rue du Rhône 40\n1204 Geneva, Switzerland", href: "#" },
  { icon: Phone, label: "Call Us", value: "+41 22 710 18 85", href: "tel:+41227101885" },
  { icon: Mail, label: "Email", value: "concierge@lasika.com", href: "mailto:concierge@lasika.com" },
  { icon: Clock, label: "Hours", value: "Mon — Fri: 9:00 — 18:00\nSat: 10:00 — 16:00 CET", href: null },
];

function FormField({ label, name, type = "text", required = true, placeholder, rows }) {
  const [focused, setFocused] = useState(false);
  const Component = rows ? "textarea" : "input";
  return (
    <div className="relative group">
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${
          focused || type === "textarea"
            ? "top-3 text-[9px] tracking-[0.15em] uppercase text-[#c5a56e] font-semibold"
            : "top-1/2 -translate-y-1/2 text-[13px] text-[#1a1a1a]/30"
        }`}
        style={{ fontFamily: "var(--font-geist)" }}
      >
        {label}
      </label>
      <Component
        id={name}
        name={name}
        type={type}
        required={required}
        rows={rows}
        placeholder={focused ? placeholder : ""}
        onFocus={() => setFocused(true)}
        onBlur={(e) => !e.target.value && setFocused(false)}
        className={`w-full bg-white/60 rounded-xl outline-none transition-all duration-400 ${
          focused
            ? "ring-2 ring-[#c5a56e]/30 shadow-[0_0_0_4px_rgba(197,165,110,0.06)]"
            : "ring-1 ring-black/5 hover:ring-black/10"
        } ${rows ? "px-4 pt-7 pb-3 resize-none" : "px-4 py-3.5"} text-[13px] text-[#1a1a1a]`}
        style={{ fontFamily: "var(--font-geist)" }}
      />
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <PageTransition className="min-h-screen bg-[var(--color-cream)] pb-20">
      <div className="grain-overlay" style={{ opacity: 0.015 }} />

      {/* Header */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-14 px-5 sm:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }} className="mt-6">
            <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c5a56e] font-semibold block mb-3" style={{ fontFamily: "var(--font-geist)" }}>Get in Touch</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-normal text-[#1a4d2e] leading-tight" style={{ fontFamily: "var(--font-playfair)", }}>Contact Us</h1>
            <p className="mt-3 text-[13px] sm:text-[14px] text-[#1a1a1a]/40 max-w-[480px] leading-relaxed" style={{ fontFamily: "var(--font-geist)", }}>
              Our concierge team is here to assist you with any enquiries about our timepieces, services, or appointments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="px-5 sm:px-10 lg:px-14 pb-10 sm:pb-14">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, i) => {
            const Icon = info.icon;
            const Wrapper = info.href ? "a" : "div";
            return (
              <motion.a
                key={info.label}
                href={info.href || "#"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                whileHover={{ y: -3, boxShadow: "0 16px 40px -12px rgba(0,0,0,0.1)" }}
                className="block p-5 rounded-2xl group cursor-pointer"
                style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(197,165,110,0.08)", backdropFilter: "blur(10px)" }}
              >
                <div className="w-9 h-9 rounded-full bg-[#c5a56e]/8 flex items-center justify-center mb-3 group-hover:bg-[#c5a56e]/15 transition-colors duration-300">
                  <Icon className="h-4 w-4 text-[#c5a56e]" strokeWidth={1.5} />
                </div>
                <p className="text-[11px] tracking-[0.12em] uppercase text-[#1a1a1a]/30 font-semibold" style={{ fontFamily: "var(--font-geist)", }}>{info.label}</p>
                <p className="mt-1.5 text-[13px] text-[#1a1a1a]/70 leading-relaxed whitespace-pre-line" style={{ fontFamily: "var(--font-geist)", }}>{info.value}</p>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* Form + Map */}
      <section className="px-5 sm:px-10 lg:px-14 pb-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-3 p-6 sm:p-8 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(197,165,110,0.08)", backdropFilter: "blur(10px)" }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}>
                    <CheckCircle className="h-14 w-14 text-[#c5a56e] mx-auto" strokeWidth={1.2} />
                  </motion.div>
                  <h3 className="mt-5 text-xl text-[#1a4d2e]" style={{ fontFamily: "var(--font-playfair)", }}>Message Sent</h3>
                  <p className="mt-2 text-[13px] text-[#1a1a1a]/40 max-w-[320px] mx-auto" style={{ fontFamily: "var(--font-geist)", }}>Thank you for reaching out. Our concierge team will respond within 24 hours.</p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-lg text-[10.5px] tracking-[0.15em] uppercase font-semibold bg-[#1a4d2e] text-white"
                    style={{ fontFamily: "var(--font-geist)", }}
                  >Send Another Message</motion.button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Full Name" name="name" placeholder="John Harrington" />
                    <FormField label="Email Address" name="email" type="email" placeholder="john@example.com" />
                  </div>
                  <FormField label="Phone Number" name="phone" type="tel" placeholder="+41 22 710 18 85" required={false} />
                  <FormField label="Subject" name="subject" placeholder="Enquiry about Oyster Perpetual" />
                  <FormField label="Message" name="message" rows={5} placeholder="Tell us how we can assist you..." />
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[11px] text-[#1a1a1a]/25" style={{ fontFamily: "var(--font-geist)", }}>We respond within 24 hours</p>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(26,77,46,0.2)" }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-7 py-3 bg-[#1a4d2e] text-white rounded-lg text-[10.5px] tracking-[0.18em] uppercase font-semibold disabled:opacity-60 shimmer-hover"
                      style={{ fontFamily: "var(--font-geist)", }}
                    >
                      {loading ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <><Send className="h-3.5 w-3.5" strokeWidth={1.5} /> Send Message</>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="lg:col-span-2 rounded-2xl overflow-hidden h-[360px] lg:h-auto"
            style={{ background: "linear-gradient(145deg, #e6ddc9, #f4efe6)", border: "1px solid rgba(197,165,110,0.08)" }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <MapPin className="h-8 w-8 text-[#c5a56e]/30 mb-3" strokeWidth={1.2} />
              <p className="text-[14px] text-[#1a4d2e] font-medium" style={{ fontFamily: "var(--font-playfair)", }}>Rue du Rhône 40</p>
              <p className="text-[12px] text-[#1a1a1a]/30 mt-1" style={{ fontFamily: "var(--font-geist)", }}>1204 Geneva, Switzerland</p>
              <p className="text-[11px] text-[#c5a56e]/50 mt-4 tracking-wide" style={{ fontFamily: "var(--font-geist)", }}>46.2044° N, 6.1432° E</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="mt-4 text-[10.5px] tracking-[0.15em] uppercase text-[#1a4d2e] hover:text-[#c5a56e] transition-colors font-semibold" style={{ fontFamily: "var(--font-geist)", }}>
                Open in Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
