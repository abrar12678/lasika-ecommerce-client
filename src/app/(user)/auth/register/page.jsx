"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Watch, ArrowRight, User, AlertCircle } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { signUp, signIn } from "@/lib/auth.client";
import { toast } from "react-toastify";

const ease = [0.22, 1, 0.36, 1];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm: "",
    agreed: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname.trim() || !formData.email.trim()) {
      toast.warn("Please enter your name and email address.");
      return;
    }
    if (formData.password.length < 8) {
      const msg = "Password must be at least 8 characters long.";
      setErrorMsg(msg);
      toast.warn(msg);
      return;
    }
    if (formData.password !== formData.confirm) {
      const msg = "Passwords do not match!";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }
    if (!formData.agreed) {
      const msg = "Please accept the Terms of Service to continue.";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.fullname,
        callbackURL: "/",
      });
      if (res?.error) {
        const msg = res.error.message || "Could not create account.";
        setErrorMsg(msg);
        toast.error(msg);
      } else {
        toast.success("Account created successfully! Welcome to LASIKA.");
        setTimeout(() => {
          router.push("/");
        }, 1200);
      }
    } catch (err) {
      const msg = err?.message || "Registration failed. Please try again.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    toast.info(`Connecting to ${provider.toUpperCase()}...`);
    try {
      await signIn.social({ provider, callbackURL: "/" });
    } catch (err) {
      const msg = `Failed to authenticate with ${provider}.`;
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  return (
    <PageTransition className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center px-5 py-24 sm:py-28 relative">
      <div className="grain-overlay" style={{ opacity: 0.02 }} />

      <div className="w-full max-w-[440px] relative z-10 mx-auto">
        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <Watch className="h-6 w-6 text-[#c5a56e] group-hover:rotate-[360deg] transition-transform duration-800" strokeWidth={1.4} />
            <span className="text-2xl tracking-[0.35em] text-[#1a4d2e] font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
              LASIKA
            </span>
          </Link>
          <h1 className="mt-5 text-2xl sm:text-3xl text-[#1a4d2e]" style={{ fontFamily: "var(--font-playfair)" }}>
            Create Account
          </h1>
          <p className="mt-1.5 text-[13px] text-[#1a1a1a]/40" style={{ fontFamily: "var(--font-geist)" }}>
            Join the LASIKA family
          </p>
        </motion.div>

        {/* Card Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="rounded-3xl p-6 sm:p-9 bg-white/70 backdrop-blur-xl border border-[#c5a56e]/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]"
        >
          {/* Error Banner */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[12px] flex items-center gap-2.5"
                style={{ fontFamily: "var(--font-geist)" }}
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name */}
            <div className="relative">
              <label
                htmlFor="fullname"
                className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                  focused === "fullname" || formData.fullname
                    ? "top-2 text-[9px] tracking-[0.16em] uppercase text-[#c5a56e] font-semibold"
                    : "top-1/2 -translate-y-1/2 text-[13px] text-[#1a1a1a]/40"
                }`}
                style={{ fontFamily: "var(--font-geist)" }}
              >
                Full Name
              </label>
              <User
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                  focused === "fullname" ? "text-[#c5a56e]" : "text-[#1a1a1a]/30"
                }`}
                strokeWidth={1.5}
              />
              <input
                id="fullname"
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                onFocus={() => setFocused("fullname")}
                onBlur={() => setFocused(null)}
                required
                className={`w-full pl-11 pr-4 ${
                  formData.fullname ? "pt-5 pb-2" : "py-3.5"
                } bg-white/80 rounded-xl outline-none text-[13px] text-[#1a1a1a] transition-all duration-300 ring-1 ring-black/5 focus:ring-2 focus:ring-[#c5a56e]/40 focus:bg-white`}
                style={{ fontFamily: "var(--font-geist)" }}
              />
            </div>

            {/* Email Address */}
            <div className="relative">
              <label
                htmlFor="email"
                className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                  focused === "email" || formData.email
                    ? "top-2 text-[9px] tracking-[0.16em] uppercase text-[#c5a56e] font-semibold"
                    : "top-1/2 -translate-y-1/2 text-[13px] text-[#1a1a1a]/40"
                }`}
                style={{ fontFamily: "var(--font-geist)" }}
              >
                Email Address
              </label>
              <Mail
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                  focused === "email" ? "text-[#c5a56e]" : "text-[#1a1a1a]/30"
                }`}
                strokeWidth={1.5}
              />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                required
                className={`w-full pl-11 pr-4 ${
                  formData.email ? "pt-5 pb-2" : "py-3.5"
                } bg-white/80 rounded-xl outline-none text-[13px] text-[#1a1a1a] transition-all duration-300 ring-1 ring-black/5 focus:ring-2 focus:ring-[#c5a56e]/40 focus:bg-white`}
                style={{ fontFamily: "var(--font-geist)" }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                    focused === "password" || formData.password
                      ? "top-2 text-[9px] tracking-[0.16em] uppercase text-[#c5a56e] font-semibold"
                      : "top-1/2 -translate-y-1/2 text-[13px] text-[#1a1a1a]/40"
                  }`}
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  Password (min 8 characters)
                </label>
                <Lock
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                    focused === "password" ? "text-[#c5a56e]" : "text-[#1a1a1a]/30"
                  }`}
                  strokeWidth={1.5}
                />
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  minLength={8}
                  required
                  className={`w-full pl-11 pr-11 ${
                    formData.password ? "pt-5 pb-2" : "py-3.5"
                  } bg-white/80 rounded-xl outline-none text-[13px] text-[#1a1a1a] transition-all duration-300 ring-1 ring-black/5 focus:ring-2 focus:ring-[#c5a56e]/40 focus:bg-white`}
                  style={{ fontFamily: "var(--font-geist)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30 hover:text-[#c5a56e] transition-colors duration-300"
                >
                  {showPass ? <EyeOff className="h-4 w-4" strokeWidth={1.5} /> : <Eye className="h-4 w-4" strokeWidth={1.5} />}
                </button>
              </div>
              <p className="text-[10px] text-[#1a1a1a]/40 mt-1 pl-3" style={{ fontFamily: "var(--font-geist)" }}>
                Must be at least 8 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label
                htmlFor="confirm"
                className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                  focused === "confirm" || formData.confirm
                    ? "top-2 text-[9px] tracking-[0.16em] uppercase text-[#c5a56e] font-semibold"
                    : "top-1/2 -translate-y-1/2 text-[13px] text-[#1a1a1a]/40"
                }`}
                style={{ fontFamily: "var(--font-geist)" }}
              >
                Confirm Password
              </label>
              <Lock
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                  focused === "confirm" ? "text-[#c5a56e]" : "text-[#1a1a1a]/30"
                }`}
                strokeWidth={1.5}
              />
              <input
                id="confirm"
                name="confirm"
                type={showConfirm ? "text" : "password"}
                value={formData.confirm}
                onChange={handleChange}
                onFocus={() => setFocused("confirm")}
                onBlur={() => setFocused(null)}
                required
                className={`w-full pl-11 pr-11 ${
                  formData.confirm ? "pt-5 pb-2" : "py-3.5"
                } bg-white/80 rounded-xl outline-none text-[13px] text-[#1a1a1a] transition-all duration-300 ring-1 ring-black/5 focus:ring-2 focus:ring-[#c5a56e]/40 focus:bg-white`}
                style={{ fontFamily: "var(--font-geist)" }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30 hover:text-[#c5a56e] transition-colors duration-300"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" strokeWidth={1.5} /> : <Eye className="h-4 w-4" strokeWidth={1.5} />}
              </button>
            </div>

            {/* Terms & Conditions Checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer group pt-1">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 rounded border-[#c5a56e]/30 text-[#1a4d2e] focus:ring-[#c5a56e]/30 accent-[#1a4d2e] cursor-pointer flex-shrink-0"
              />
              <span className="text-[11.5px] text-[#1a1a1a]/50 leading-relaxed" style={{ fontFamily: "var(--font-geist)" }}>
                I agree to the{" "}
                <a href="#" className="text-[#c5a56e] hover:text-[#1a4d2e] font-medium transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#c5a56e] hover:text-[#1a4d2e] font-medium transition-colors">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit CTA */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01, boxShadow: "0 8px 25px rgba(26,77,46,0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 mt-2 bg-[#1a4d2e] text-white rounded-xl text-[11px] tracking-[0.2em] uppercase font-semibold disabled:opacity-50 shimmer-hover flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#1a4d2e]/10"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-black/5" />
            <span className="text-[10px] tracking-[0.18em] uppercase text-[#1a1a1a]/30 font-medium" style={{ fontFamily: "var(--font-geist)" }}>
              OR CONTINUE WITH
            </span>
            <div className="flex-1 h-px bg-black/5" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSocialSignIn("google")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] text-[#1a1a1a]/70 font-medium transition-all duration-300 hover:text-[#1a1a1a] bg-white border border-black/5 hover:border-[#c5a56e]/30 shadow-sm cursor-pointer"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </motion.button>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSocialSignIn("apple")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] text-[#1a1a1a]/70 font-medium transition-all duration-300 hover:text-[#1a1a1a] bg-white border border-black/5 hover:border-[#c5a56e]/30 shadow-sm cursor-pointer"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Apple
            </motion.button>
          </div>
        </motion.div>

        {/* Footer Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-[12.5px] text-[#1a1a1a]/40"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#c5a56e] hover:text-[#1a4d2e] font-semibold transition-colors duration-300">
            Sign in
          </Link>
        </motion.p>
      </div>
    </PageTransition>
  );
}
