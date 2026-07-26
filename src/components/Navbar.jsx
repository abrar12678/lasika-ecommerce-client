"use client";

import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Menu, X, Watch } from "lucide-react";
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
  { label: "All Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Subtle gold underline that animates on hover + active state highlighting
function NavLink({ link, isActive }) {
  return (
    <Link href={link.href} className="relative group">
      <motion.span
        className={`text-[13px] tracking-[0.2em] uppercase font-light transition-colors duration-300 ${
          isActive ? "text-[#c5a56e]" : "text-black hover:text-[#c5a56e]"
        }`}
      >
        {link.label}
      </motion.span>

      {/* Gold underline — always visible when active, animates on hover otherwise */}
      <span
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a56e] to-transparent transition-all duration-500 ease-out ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />

      {/* Hover glow dot */}
      <span
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c5a56e] transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
    </Link>
  );
}

// Icon button with hover animation
function IconButton({ icon: Icon, badge, label }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative text-black hover:text-[#d4b87a] transition-colors duration-300"
    >
      <Icon className="h-[20px] w-[20px] stroke-[1.5]" />
      {badge !== undefined && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a56e] text-[9px] font-bold text-[#1a4d2e]"
        >
          {badge}
        </motion.span>
      )}
      <span className="sr-only">{label}</span>
    </motion.button>
  );
}

// CTA button with luxury hover
function CTAButton({ label, variant = "outline", href }) {
  const isOutline = variant === "outline";

  return (
    <Link href={href}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`relative overflow-hidden px-5 py-2 text-[11px] tracking-[0.18em] uppercase font-medium rounded-sm transition-all duration-400 ${
          isOutline
            ? "border border-[#c5a56e]/50 text-[#d4b87a] hover:border-[#c5a56e] hover:bg-[#c5a56e]/10 hover:shadow-[0_0_15px_rgba(197,165,110,0.15)]"
            : "bg-[#c5a56e] text-[#1a4d2e] hover:bg-[#d4b87a] hover:shadow-[0_0_20px_rgba(197,165,110,0.3)]"
        }`}
      >
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
        <span className="relative z-10">{label}</span>
      </motion.button>
    </Link>
  );
}

// Mobile menu item with staggered animation + active highlighting
function MobileNavItem({ link, index, onClose, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.15 + index * 0.08,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.3 } }}
    >
      <Link
        href={link.href}
        onClick={onClose}
        className={`relative text-lg tracking-[0.2em] uppercase transition-colors duration-300 py-2 block group ${
          isActive ? "text-[#d4b87a]" : "text-white/70 hover:text-[#d4b87a]"
        }`}
      >
        {link.label}
        {/* Gold underline always visible when active */}
        <span
          className={`absolute bottom-0 left-0 h-[1px] bg-[#c5a56e] transition-all duration-400 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
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

  // Check if a nav link is active
  const isLinkActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "rgba(10,10,10,0.92)"
            : "rgba(10,10,10,0)",
          backdropFilter: scrolled
            ? "blur(20px) saturate(180%)"
            : "blur(0px) saturate(100%)",
          borderBottomColor: scrolled
            ? "rgba(197,165,110,0.08)"
            : "rgba(197,165,110,0)",
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 border-b backdrop-blur-none"
      />

      <nav className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          {/* LEFT: Logo + Brand */}
          <Link href="/" className="relative flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#c5a56e]"
            >
              <Watch className="h-6 w-6 stroke-[1.5]" />
            </motion.div>
            <div className="relative">
              <h1
                className="text-xl sm:text-2xl tracking-[0.35em] text-gold-gradient font-medium"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                LASIKA
              </h1>
              <motion.span
                className="absolute -bottom-1.5 left-0 h-[1px] bg-gradient-to-r from-[#c5a56e] via-[#d4b87a] to-transparent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </Link>

          {/* CENTER: Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <NavLink link={link} isActive={isLinkActive(link.href)} />
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Icons + Auth */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <IconButton icon={Heart} label="Wishlist" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <IconButton icon={ShoppingBag} badge={0} label="Cart" />
              </motion.div>
              <div className="w-px h-5 bg-white/10 mx-2" />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <CTAButton label="Login" variant="outline" href="/login" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                <CTAButton label="Sign Up" variant="filled" href="/signup" />
              </motion.div>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-3">
              <IconButton icon={Heart} label="Wishlist" />
              <IconButton icon={ShoppingBag} badge={2} label="Cart" />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(true)}
                className="ml-1 text-black hover:text-[#d4b87a] transition-colors duration-300 p-1"
              >
                <Menu className="h-[22px] w-[22px] stroke-[1.5]" />
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
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[360px] bg-[#0a0a0a] z-50 lg:hidden"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-5 text-white/60 hover:text-[#d4b87a] transition-colors duration-300"
              >
                <X className="h-6 w-6" />
              </motion.button>
              <div className="flex flex-col h-full pt-16 px-8 pb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="mb-10"
                >
                  <div className="flex items-center gap-3">
                    <Watch className="h-5 w-5 text-[#c5a56e] stroke-[1.5]" />
                    <h2
                      className="text-2xl tracking-[0.35em] text-gold-gradient"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      LASIKA
                    </h2>
                  </div>
                  <div className="mt-3 h-[1px] bg-gradient-to-r from-[#c5a56e]/50 to-transparent" />
                </motion.div>
                <div className="flex flex-col gap-2 mb-10">
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
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="flex flex-col gap-3"
                >
                  <CTAButton label="Login" variant="outline" href="/login" />
                  <CTAButton label="Sign Up" variant="filled" href="/signup" />
                </motion.div>
                <div className="mt-auto pt-8">
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/25">
                    Crafted with precision since 1885
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
