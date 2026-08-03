"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-1.5 text-[11px] sm:text-[12px] tracking-[0.08em]"
      style={{ fontFamily: "var(--font-geist)" }}
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight className="h-3 w-3 text-[#c5a56e]/40" strokeWidth={2} />
            )}
            {isLast ? (
              <span className="text-[#1a4d2e] font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-[#1a1a1a]/40 hover:text-[#c5a56e] transition-colors duration-300"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </motion.nav>
  );
}
