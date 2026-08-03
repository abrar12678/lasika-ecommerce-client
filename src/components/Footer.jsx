"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Watch, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Collection: [
    { label: "Oyster Perpetual", href: "/products?category=Oyster+Perpetual" },
    { label: "Day-Date", href: "/products?category=Day-Date" },
    { label: "Submariner", href: "/products?category=Submariner" },
    { label: "GMT-Master", href: "/products?category=GMT-Master" },
    { label: "Explorer", href: "/products?category=Explorer" },
  ],
  Services: [
    { label: "Watch Care", href: "/about" },
    { label: "Authentication", href: "/about" },
    { label: "Engraving", href: "/contact" },
    { label: "Appraisal", href: "/contact" },
    { label: "Repair", href: "/contact" },
  ],
  Company: [
    { label: "Our Heritage", href: "/about" },
    { label: "Atelier", href: "/about" },
    { label: "Sustainability", href: "/about" },
    { label: "Careers", href: "/contact" },
    { label: "Press", href: "/contact" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Info", href: "/contact" },
    { label: "Returns", href: "/contact" },
    { label: "FAQ", href: "/#faq" },
    { label: "Size Guide", href: "/products" },
  ],
};

export default function Footer() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-40px" });

  return (
    <footer ref={sectionRef} className="relative bg-[#0f0f0f] text-white overflow-hidden">
      {/* Top gold line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a56e]/40 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 sm:pt-20 pb-8 sm:pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 sm:gap-8 lg:gap-6 mb-14 sm:mb-16">
          {/* Brand Column */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="col-span-2 sm:col-span-3 lg:col-span-1 mb-6 lg:mb-0">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <Watch className="h-5 w-5 text-[#c5a56e] stroke-[1.4] group-hover:rotate-[360deg] transition-transform duration-800" />
              <h3 className="text-xl tracking-[0.35em] text-gold-gradient font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>LASIKA</h3>
            </Link>
            <p className="text-[12px] sm:text-[13px] leading-[1.7] text-white/30 max-w-[260px]" style={{ fontFamily: "var(--font-geist)" }}>
              Swiss luxury timepieces crafted with precision since 1885. Every watch tells a story of perpetual excellence.
            </p>
            <div className="flex items-center gap-3.5 mt-6">
              <motion.a href="#" whileHover={{ y: -2, scale: 1.1 }} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#c5a56e]/30 transition-colors duration-300 group">
                <svg className="h-4 w-4 text-white/30 group-hover:text-[#c5a56e] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </motion.a>
              <motion.a href="#" whileHover={{ y: -2, scale: 1.1 }} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#c5a56e]/30 transition-colors duration-300 group">
                <svg className="h-4 w-4 text-white/30 group-hover:text-[#c5a56e] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </motion.a>
              <motion.a href="#" whileHover={{ y: -2, scale: 1.1 }} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#c5a56e]/30 transition-colors duration-300 group">
                <svg className="h-4 w-4 text-white/30 group-hover:text-[#c5a56e] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
              <motion.a href="#" whileHover={{ y: -2, scale: 1.1 }} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#c5a56e]/30 transition-colors duration-300 group">
                <svg className="h-4 w-4 text-white/30 group-hover:text-[#c5a56e] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links], colIdx) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + colIdx * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-white/50 font-semibold mb-4 sm:mb-5" style={{ fontFamily: "var(--font-geist)" }}>{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[12px] sm:text-[13px] text-white/25 hover:text-[#c5a56e] transition-colors duration-300" style={{ fontFamily: "var(--font-geist)" }}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Row */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 pt-8 border-t border-white/6 pb-8 sm:pb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <a href="mailto:concierge@lasika.com" className="flex items-center gap-2.5 text-[12px] text-white/25 hover:text-[#c5a56e] transition-colors duration-300" style={{ fontFamily: "var(--font-geist)" }}>
              <Mail className="h-3.5 w-3.5" strokeWidth={1.4} />concierge@lasika.com
            </a>
            <a href="tel:+41227101885" className="flex items-center gap-2.5 text-[12px] text-white/25 hover:text-[#c5a56e] transition-colors duration-300" style={{ fontFamily: "var(--font-geist)" }}>
              <Phone className="h-3.5 w-3.5" strokeWidth={1.4} />+41 22 710 18 85
            </a>
            <Link href="/contact" className="flex items-center gap-2.5 text-[12px] text-white/25 hover:text-[#c5a56e] transition-colors duration-300" style={{ fontFamily: "var(--font-geist)" }}>
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.4} />Rue du Rhône 40, Geneva
            </Link>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/15 tracking-[0.04em]" style={{ fontFamily: "var(--font-geist)" }}>
            &copy; 2025 LASIKA. All rights reserved. Swiss Made.
          </p>
          <div className="flex items-center gap-5">
            {[{ label: "Privacy Policy", href: "/about" }, { label: "Terms of Service", href: "/about" }, { label: "Cookie Settings", href: "/contact" }].map((link) => (
              <Link key={link.label} href={link.href} className="text-[11px] text-white/15 hover:text-white/40 transition-colors duration-300 tracking-wide" style={{ fontFamily: "var(--font-geist)" }}>{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
