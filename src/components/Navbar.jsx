"use client";

import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Menu, X, Watch, Search } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/products" },
  { label: "Heritage", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ─────────────────────────────────────────────
   Subtle gold underline that animates on hover + active state highlighting
   ───────────────────────────────────────────── */
function NavLink({ link, isActive }) {
  return (
    <Link href={link.href} className="relative group py-1">
      <motion.span
        className={`text-[12.5px] tracking-[0.22em] uppercase font-medium transition-colors duration-500 ${isActive ? "text-[#c5a56e]" : "text-[#1a1a1a]/70 hover:text-[#c5a56e]"
          }`}
        style={{ fontFamily: "var(--font-geist)" }}
        whileHover={{ y: -1 }}
        transition={{ duration: 0.2 }}
      >
        {link.label}
      </motion.span>

      {/* Gold underline — animates on hover */}
      <span
        className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a56e] to-transparent transition-all duration-500 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
      />

      {/* Hover glow dot */}
      <span
        className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c5a56e] transition-all duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
          }`}
      />
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Icon button with premium hover animation
   ───────────────────────────────────────────── */
function IconButton({ icon: Icon, badge, label }) {
  return (
    <motion.button
      whileHover={{ scale: 1.12, y: -1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 450, damping: 20 }}
      className="relative text-[#1a1a1a]/60 hover:text-[#c5a56e] transition-colors duration-400 p-2 rounded-full hover:bg-[#c5a56e]/5"
    >
      <Icon className="h-[19px] w-[19px] stroke-[1.4]" />
      {badge !== undefined && badge > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a56e] text-[9px] font-bold text-[#1a4d2e] shadow-sm"
        >
          {badge}
        </motion.span>
      )}
      <span className="sr-only">{label}</span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   CTA button with luxury shimmer hover
   ───────────────────────────────────────────── */
function CTAButton({ label, variant = "outline", href }) {
  const isOutline = variant === "outline";

  return (
    <Link href={href}>
      <motion.button
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`relative overflow-hidden px-6 py-2.5 text-[10.5px] tracking-[0.2em] uppercase font-semibold rounded-sm transition-all duration-500 ${isOutline
          ? "border border-[#c5a56e]/40 text-[#c5a56e] hover:border-[#c5a56e]/80 hover:bg-[#c5a56e]/8 hover:shadow-[0_0_20px_rgba(197,165,110,0.12)]"
          : "bg-[#c5a56e] text-[#1a4d2e] hover:bg-[#d4b87a] hover:shadow-[0_4px_24px_rgba(197,165,110,0.3)]"
          }`}
        style={{ fontFamily: "var(--font-geist)" }}
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <span className="relative z-10">{label}</span>
      </motion.button>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Mobile menu item with staggered animation
   ───────────────────────────────────────────── */
function MobileNavItem({ link, index, onClose, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.2 + index * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      exit={{ opacity: 0, x: 50, transition: { duration: 0.25 } }}
    >
      <Link
        href={link.href}
        onClick={onClose}
        className={`relative text-[15px] tracking-[0.22em] uppercase transition-all duration-400 py-3 block group ${isActive ? "text-[#d4b87a]" : "text-white/50 hover:text-[#d4b87a]"
          }`}
        style={{ fontFamily: "var(--font-geist)" }}
      >
        {link.label}
        <span
          className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[#c5a56e] to-[#c5a56e]/30 transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
        />
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
   ───────────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isLinkActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "rgba(250, 249, 246, 0.88)"
            : "rgba(250, 249, 246, 0)",
          backdropFilter: scrolled
            ? "blur(20px) saturate(180%)"
            : "blur(0px) saturate(100%)",
          WebkitBackdropFilter: scrolled
            ? "blur(20px) saturate(180%)"
            : "blur(0px) saturate(100%)",
          borderBottomColor: scrolled
            ? "rgba(197, 165, 110, 0.1)"
            : "rgba(197, 165, 110, 0)",
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 border-b"
      />

      <nav className="relative mx-auto max-w-[1440px] px-6 lg:px-10 xl:px-14">
        <div className="flex h-[76px] items-center justify-between">
          {/* LEFT: Logo + Brand */}
          <Link href="/" className="relative flex items-center gap-3.5 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#c5a56e]"
            >
              <Watch className="h-[22px] w-[22px] stroke-[1.4]" />
            </motion.div>
            <div className="relative">
              <h1
                className="text-[22px] sm:text-[24px] tracking-[0.38em] text-gold-gradient font-semibold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                LASIKA
              </h1>
              <motion.span
                className="absolute -bottom-1.5 left-0 h-[1px] bg-gradient-to-r from-[#c5a56e] via-[#e8d5a8] to-transparent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 0.6,
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </Link>

          {/* CENTER: Nav Links */}
          <div className="hidden lg:flex items-center gap-11">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + i * 0.07,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <NavLink link={link} isActive={isLinkActive(link.href)} />
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Icons + Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop */}
            <div className="hidden md:flex items-center gap-1.5">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                <IconButton icon={Search} label="Search" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <IconButton icon={Heart} label="Wishlist" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <IconButton icon={ShoppingBag} label="Cart" />
              </motion.div>
              <div className="w-px h-5 bg-gradient-to-b from-transparent via-[#c5a56e]/20 to-transparent mx-2.5" />
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <CTAButton label="Sign In" variant="outline" href="/login" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
              >
                <CTAButton label="Discover" variant="filled" href="/signup" />
              </motion.div>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-1">
              <IconButton icon={Heart} label="Wishlist" />
              <IconButton icon={ShoppingBag} label="Cart" />
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setMobileOpen(true)}
                className="ml-1 text-[#1a1a1a]/70 hover:text-[#c5a56e] transition-colors duration-300 p-2 rounded-full hover:bg-[#c5a56e]/5"
              >
                <Menu className="h-[22px] w-[22px] stroke-[1.4]" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-[#0a0a0a]/70 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[380px] z-50 lg:hidden"
              style={{
                background: "linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.88 }}
                onClick={() => setMobileOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-[#d4b87a] transition-colors duration-300 p-1"
              >
                <X className="h-6 w-6" />
              </motion.button>
              <div className="flex flex-col h-full pt-16 px-8 pb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3">
                    <Watch className="h-5 w-5 text-[#c5a56e] stroke-[1.4]" />
                    <h2
                      className="text-2xl tracking-[0.38em] text-gold-gradient font-semibold"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      LASIKA
                    </h2>
                  </div>
                  <div className="divider-gold mt-4" />
                </motion.div>
                <div className="flex flex-col gap-1 mb-12">
                  {navLinks.map((link, i) => (
                    <MobileNavItem
                      key={link.label}
                      link={link}
                      index={i}
                      isActive={isLinkActive(link.href)}
                      onClose={() => setMobileOpen(false)}
                    />
                  ))}
                </div>
                <div className="divider-gold mb-10" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3"
                >
                  <CTAButton label="Sign In" variant="outline" href="/login" />
                  <CTAButton label="Discover" variant="filled" href="/signup" />
                </motion.div>
                <div className="mt-auto pt-10">
                  <div className="divider-gold mb-6" />
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase text-white/20"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    Crafted with precision since 1885
                  </p>
                  <p
                    className="text-[9px] tracking-[0.15em] uppercase text-white/10 mt-2"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    Swiss Made
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
