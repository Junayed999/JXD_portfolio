"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home", active: true },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing", hasDropdown: true },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "#blog" },
];

const pricingDropdown = [
  { label: "Starter Plan", desc: "Perfect for individuals" },
  { label: "Pro Plan", desc: "For growing teams" },
  { label: "Enterprise", desc: "Custom solutions" },
];

function JNXLogo() {
  return (
    <a href="#home" className="flex items-center gap-2 select-none group">
      {/* Arch / triangle mark */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect width="28" height="28" rx="7" fill="#0A0A0A" />
        <path
          d="M6 20 L14 8 L22 20"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M10 20 L14 13 L18 20"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.5"
        />
      </svg>
      <span className="text-[22px] font-black tracking-[-0.04em] text-[#0A0A0A] group-hover:opacity-80 transition-opacity">
        JNX
      </span>
    </a>
  );
}

function NavLink({
  label,
  href,
  active,
  hasDropdown,
}: {
  label: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
}) {
  const [open, setOpen] = useState(false);

  if (hasDropdown) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button className="flex items-center gap-1 text-[14px] font-medium text-[#0A0A0A]/80 hover:text-[#0A0A0A] transition-colors relative pb-[2px] group">
          {label}
          <ChevronDown
            size={13}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0A0A0A] group-hover:w-full transition-all duration-300 ease-out" />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 min-w-[220px] bg-white/90 backdrop-blur-xl border border-[#E5E7EB] rounded-2xl shadow-xl p-2 z-50"
            >
              {pricingDropdown.map((item) => (
                <a
                  key={item.label}
                  href="#pricing"
                  className="flex flex-col px-4 py-3 rounded-xl hover:bg-[#F5F5F7] transition-colors group/item"
                >
                  <span className="text-[13px] font-semibold text-[#0A0A0A] group-hover/item:text-black">
                    {item.label}
                  </span>
                  <span className="text-[12px] text-[#6B7280]">{item.desc}</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <a
      href={href}
      className="relative flex flex-col items-center text-[14px] font-medium text-[#0A0A0A]/80 hover:text-[#0A0A0A] transition-colors group pb-[2px]"
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-[1.5px] bg-[#0A0A0A] transition-all duration-300 ease-out ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
      {active && (
        <span className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0A0A0A]" />
      )}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB] shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between gap-8">
          <JNXLogo />

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#login"
              className="px-5 py-2.5 text-[13px] font-semibold text-white bg-[#0A0A0A] rounded-full hover:bg-[#1a1a1a] transition-colors"
            >
              Login
            </a>
            <a
              href="#register"
              className="px-5 py-2.5 text-[13px] font-semibold text-[#0A0A0A] border border-[#0A0A0A] rounded-full hover:bg-[#0A0A0A] hover:text-white transition-all duration-200"
            >
              Register
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#F5F5F7] transition-colors"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-[88px] px-8 pb-12"
          >
            <div className="flex flex-col gap-2 flex-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-[#E5E7EB] text-[22px] font-bold text-[#0A0A0A] hover:text-[#6B7280] transition-colors"
                >
                  {link.label}
                  <ArrowRight size={20} className="text-[#6B7280]" />
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.35 }}
              className="flex flex-col gap-3"
            >
              <a
                href="#login"
                className="w-full text-center py-4 text-[15px] font-semibold text-white bg-[#0A0A0A] rounded-2xl"
              >
                Login
              </a>
              <a
                href="#register"
                className="w-full text-center py-4 text-[15px] font-semibold text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-2xl"
              >
                Register
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
