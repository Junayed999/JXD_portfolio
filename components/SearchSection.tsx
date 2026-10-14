"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { MapPin, Calendar, Search } from "lucide-react";
import { siteContent } from "@/lib/content";
import { SparkDoodle } from "./Benefits";

const { search } = siteContent;

// ─── SVG curved hand-drawn line that draws as you scroll ─────────────────────
function CurvedLineDeco({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <svg
      viewBox="0 0 80 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-8 top-1/2 -translate-y-1/2 h-[55%] pointer-events-none"
      aria-hidden="true"
    >
      <motion.path
        d="M40 10 C80 60, 0 100, 40 150 C80 200, 0 240, 40 290"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength: progress, opacity: 0.15 }}
      />
    </svg>
  );
}

export default function SearchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Slide text in from right as section scrolls into view
  const textX = useTransform(scrollYProgress, [0.1, 0.45], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  // Line draws itself on scroll
  const lineProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const lines = search.heading.split("\n");

  return (
    <section
      ref={sectionRef}
      id="search"
      className="relative bg-[#F5F5F7] py-24 lg:py-32 overflow-hidden"
    >
      {/* Scroll-linked curved deco */}
      <CurvedLineDeco progress={lineProgress} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div style={{ x: textX, opacity: textOpacity }} className="max-w-xl">
          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <SparkDoodle />
            <span className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-widest">
              Discover
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-[38px] sm:text-[46px] lg:text-[52px] font-black text-[#0A0A0A] leading-[1.05] tracking-tight mb-5">
            {lines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p className="text-[16px] text-[#6B7280] leading-relaxed mb-10 max-w-[380px]">
            {search.paragraph}
          </p>

          {/* Floating search bar */}
          <motion.div
            whileHover={{
              y: -4,
              boxShadow: "0 24px 60px -8px rgba(0,0,0,0.18)",
            }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.10)] border border-[#E5E7EB] overflow-hidden"
            role="search"
            aria-label="Search destinations and dates"
          >
            <div className="flex flex-col sm:flex-row items-stretch">
              {/* Destination */}
              <label
                className={`flex items-center gap-3 px-5 py-4 flex-1 transition-colors duration-150 ${
                  focusedField === "dest" ? "bg-[#F9F9FB]" : ""
                }`}
              >
                <MapPin size={17} className="text-[#9CA3AF] flex-shrink-0" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] font-bold text-[#0A0A0A] uppercase tracking-wider mb-0.5">
                    {search.searchBar.destination.label}
                  </span>
                  <input
                    type="text"
                    placeholder={search.searchBar.destination.placeholder}
                    className="text-[13px] text-[#6B7280] bg-transparent outline-none placeholder:text-[#9CA3AF] w-full"
                    onFocus={() => setFocusedField("dest")}
                    onBlur={() => setFocusedField(null)}
                    aria-label="Choose destination"
                  />
                </div>
              </label>

              {/* Vertical divider desktop */}
              <div className="hidden sm:block w-px bg-[#E5E7EB] my-3" aria-hidden="true" />
              {/* Horizontal divider mobile */}
              <div className="sm:hidden h-px bg-[#E5E7EB] mx-5" aria-hidden="true" />

              {/* Date */}
              <label
                className={`flex items-center gap-3 px-5 py-4 flex-1 transition-colors duration-150 ${
                  focusedField === "date" ? "bg-[#F9F9FB]" : ""
                }`}
              >
                <Calendar size={17} className="text-[#9CA3AF] flex-shrink-0" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] font-bold text-[#0A0A0A] uppercase tracking-wider mb-0.5">
                    {search.searchBar.date.label}
                  </span>
                  <input
                    type="text"
                    placeholder={search.searchBar.date.placeholder}
                    className="text-[13px] text-[#6B7280] bg-transparent outline-none placeholder:text-[#9CA3AF] w-full"
                    onFocus={() => setFocusedField("date")}
                    onBlur={() => setFocusedField(null)}
                    aria-label="Add date"
                  />
                </div>
              </label>

              {/* Search button */}
              <div className="flex items-center justify-center p-3">
                <motion.button
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 320, damping: 15 }}
                  className="w-12 h-12 rounded-full bg-[#0A0A0A] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A0A0A]"
                  aria-label="Search"
                >
                  <Search size={17} className="text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
