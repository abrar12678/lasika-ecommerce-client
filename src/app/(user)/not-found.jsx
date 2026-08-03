"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Watch, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex flex-col items-center justify-center px-5 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Watch className="h-10 w-10 text-[#c5a56e]/20 mx-auto mb-6" strokeWidth={1.2} />
        <h1 className="text-6xl sm:text-8xl font-black text-[#c5a56e]/10" style={{ fontFamily: "var(--font-playfair)", }}>404</h1>
        <h2 className="mt-2 text-xl sm:text-2xl text-[#1a4d2e]" style={{ fontFamily: "var(--font-playfair)", }}>Page Not Found</h2>
        <p className="mt-2 text-[13px] text-[#1a1a1a]/35 max-w-[360px] mx-auto" style={{ fontFamily: "var(--font-geist)", }}>
          The timepiece you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <motion.span
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 mt-6 px-7 py-3 bg-[#1a4d2e] text-white rounded-lg text-[10.5px] tracking-[0.18em] uppercase font-semibold"
            style={{ fontFamily: "var(--font-geist)", }}
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            Return Home
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}
