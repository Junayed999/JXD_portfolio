"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteContent } from "@/lib/content";
import SectionWrapper from "./SectionWrapper";

const { benefits } = siteContent;

// ─── Spark Doodle (exported for reuse across sections) ────────────────────────
export function SparkDoodle({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 2 L17.5 13 L27 12 L19 18 L24 28 L14.5 21 L7 29 L11 19 L2 14 L13 14 Z"
        stroke="#0A0A0A"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />
      <circle cx="26" cy="6" r="1.5" fill="#0A0A0A" opacity="0.25" />
      <circle cx="8" cy="5" r="1" fill="#0A0A0A" opacity="0.2" />
    </svg>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({
  emoji,
  title,
  desc,
  delay,
}: {
  emoji: string;
  title: string;
  desc: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        boxShadow: "0 24px 48px -8px rgba(0,0,0,0.14)",
      }}
      className="bg-white rounded-3xl p-7 flex flex-col gap-5 border border-[#E5E7EB] shadow-[0_4px_24px_rgba(0,0,0,0.06)] cursor-default"
    >
      {/* 3D-style glossy emoji icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3 + delay * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5F5F7] to-[#E0E0E0] flex items-center justify-center text-3xl"
        style={{
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.8) inset",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
        }}
      >
        {emoji}
        {/* Gloss overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
      </motion.div>

      <div>
        <h3 className="text-[17px] font-black text-[#0A0A0A] mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-[13px] text-[#6B7280] leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Grayscale landscape for pin thumbnails ───────────────────────────────────
function LandscapePin({ type }: { type: number }) {
  const scenes = [
    // 0: Mountains
    <>
      <rect width="60" height="60" rx="30" fill="#dde0e0" />
      <polygon points="30,14 52,46 8,46" fill="#8a8a8a" />
      <polygon points="18,32 36,46 0,46" fill="#b0b0b0" />
      <polygon points="30,14 40,28 20,28" fill="#e0e0e0" />
    </>,
    // 1: City skyline
    <>
      <rect width="60" height="60" rx="30" fill="#e0e2e2" />
      <rect x="6" y="28" width="10" height="24" fill="#909090" />
      <rect x="20" y="20" width="10" height="32" fill="#787878" />
      <rect x="34" y="30" width="8" height="22" fill="#a0a0a0" />
      <rect x="46" y="24" width="8" height="28" fill="#888" />
      <rect x="0" y="52" width="60" height="8" fill="#c8c8c8" />
    </>,
    // 2: Forest
    <>
      <rect width="60" height="60" rx="30" fill="#dde0db" />
      <circle cx="14" cy="38" r="10" fill="#909090" />
      <circle cx="30" cy="30" r="14" fill="#767676" />
      <circle cx="46" cy="38" r="10" fill="#909090" />
      <rect x="27" y="44" width="6" height="10" fill="#888" />
    </>,
    // 3: Ocean waves
    <>
      <rect width="60" height="60" rx="30" fill="#d8dcdc" />
      <rect x="0" y="0" width="60" height="30" fill="#e8ebeb" />
      <path d="M0 34 Q15 24 30 34 Q45 44 60 34 L60 60 L0 60 Z" fill="#a8b0b0" />
      <path d="M0 42 Q15 32 30 42 Q45 52 60 42 L60 60 L0 60 Z" fill="#888e8e" />
    </>,
    // 4: Desert dunes
    <>
      <rect width="60" height="60" rx="30" fill="#e8e4dc" />
      <path d="M0 46 Q20 28 40 40 Q50 46 60 36 L60 60 L0 60 Z" fill="#c0b898" />
      <circle cx="46" cy="14" r="8" fill="#d8d8c0" />
      <path d="M40 14 L52 14" stroke="#f0f0e0" strokeWidth="2" />
    </>,
    // 5: Snow peaks
    <>
      <rect width="60" height="60" rx="30" fill="#eceef0" />
      <polygon points="30,8 54,50 6,50" fill="#909090" />
      <polygon points="30,8 42,30 18,30" fill="#ececec" />
    </>,
    // 6: Jungle
    <>
      <rect width="60" height="60" rx="30" fill="#dde0d8" />
      <ellipse cx="10" cy="50" rx="12" ry="10" fill="#888" />
      <ellipse cx="30" cy="34" rx="17" ry="15" fill="#686868" />
      <ellipse cx="52" cy="48" rx="12" ry="10" fill="#888" />
      <rect x="27" y="49" width="6" height="11" fill="#7a7a7a" />
    </>,
  ];
  return <>{scenes[type % scenes.length]}</>;
}

// ─── World Map with dotted halftone + bouncing pins ───────────────────────────
function WorldMapPins() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative w-full mt-12 overflow-hidden rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] p-4">
      <svg
        viewBox="0 0 900 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-label="World map showing destination pins"
        role="img"
      >
        <defs>
          <pattern id="halftone" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="1.6" fill="#D1D5DB" />
          </pattern>
          <clipPath id="worldClip">
            {/* North America */}
            <path d="M55 55 L95 35 L175 50 L200 80 L195 130 L160 165 L128 185 L98 200 L78 190 L58 160 L48 120 Z" />
            {/* Central America */}
            <path d="M120 200 L155 195 L165 215 L145 230 L120 225 Z" />
            {/* South America */}
            <path d="M118 235 L160 215 L200 232 L215 280 L205 342 L172 382 L138 392 L115 362 L98 310 L98 262 Z" />
            {/* Greenland */}
            <path d="M218 18 L290 12 L322 38 L312 78 L258 100 L218 80 Z" />
            {/* Europe */}
            <path d="M388 36 L462 26 L495 52 L482 92 L452 114 L408 124 L385 102 L368 68 Z" />
            {/* UK */}
            <path d="M354 52 L378 42 L394 60 L382 82 L358 86 Z" />
            {/* Africa */}
            <path d="M398 138 L462 128 L502 152 L514 202 L504 265 L480 315 L442 362 L398 374 L368 345 L348 292 L348 222 L368 168 Z" />
            {/* Asia (big) */}
            <path d="M495 28 L660 18 L780 38 L824 82 L812 142 L762 184 L698 202 L638 192 L578 182 L528 162 L498 120 L488 65 Z" />
            {/* India */}
            <path d="M598 170 L638 165 L658 185 L645 230 L618 252 L595 225 L582 188 Z" />
            {/* SE Asia */}
            <path d="M720 178 L775 165 L800 182 L798 210 L768 228 L730 218 L710 198 Z" />
            {/* Japan */}
            <path d="M792 78 L822 68 L844 88 L832 122 L802 132 L778 112 Z" />
            {/* Australia */}
            <path d="M698 275 L782 265 L842 292 L852 344 L832 385 L778 402 L718 402 L678 372 L668 322 Z" />
          </clipPath>
        </defs>

        {/* Background dots clipped to continents */}
        <rect width="900" height="400" fill="url(#halftone)" clipPath="url(#worldClip)" />

        {/* Map pins */}
        {benefits.mapPins.map((pin, i) => {
          const x = (pin.x / 100) * 900;
          const y = (pin.y / 100) * 400;
          const active = pin.active;
          const sz = active ? 50 : 38;

          return (
            <motion.g
              key={pin.label}
              initial={{ y: -30, opacity: 0, scale: 0.4 }}
              animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
              style={{ originX: `${x}px`, originY: `${y + sz + 6}px` }}
              transition={{
                delay: 0.4 + i * 0.14,
                type: "spring",
                stiffness: 280,
                damping: 16,
              }}
            >
              {/* Pulse aura for active pin */}
              {active && (
                <motion.circle
                  cx={x}
                  cy={y - sz / 2 - 4}
                  r={sz / 2 + 6}
                  stroke="#0A0A0A"
                  strokeWidth="1.5"
                  fill="none"
                  animate={{
                    r: [sz / 2 + 6, sz / 2 + 18, sz / 2 + 6],
                    opacity: [0.25, 0, 0.25],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
              )}

              {/* Circular image */}
              <clipPath id={`clip-pin-${i}`}>
                <circle cx={x} cy={y - sz / 2 - 4} r={sz / 2} />
              </clipPath>
              <g
                clipPath={`url(#clip-pin-${i})`}
                transform={`translate(${x - sz / 2}, ${y - sz - 4})`}
              >
                <svg width={sz} height={sz} viewBox="0 0 60 60">
                  <LandscapePin type={i} />
                </svg>
              </g>

              {/* Circle border */}
              <circle
                cx={x}
                cy={y - sz / 2 - 4}
                r={sz / 2}
                stroke={active ? "#0A0A0A" : "#9CA3AF"}
                strokeWidth={active ? 2.5 : 1.5}
                fill="none"
              />

              {/* Pin stem */}
              <line
                x1={x} y1={y - 4}
                x2={x} y2={y + 1}
                stroke={active ? "#0A0A0A" : "#9CA3AF"}
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Base dot */}
              <circle
                cx={x}
                cy={y + 4}
                r={active ? 4.5 : 3}
                fill="#0A0A0A"
                opacity={active ? 1 : 0.4}
              />

              {/* Label for active */}
              {active && (
                <text
                  x={x}
                  y={y + 19}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="#0A0A0A"
                  fontFamily="Outfit, system-ui, sans-serif"
                >
                  {pin.label}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Benefits Section ─────────────────────────────────────────────────────────
export default function Benefits() {
  const lines = benefits.heading.split("\n");

  return (
    <SectionWrapper id="about" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top row: heading + feature cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-4">
          {/* Left: heading + paragraph */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <SparkDoodle />
              <span className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-widest">
                Why JNX
              </span>
            </div>
            <h2 className="text-[44px] sm:text-[52px] font-black text-[#0A0A0A] leading-[1.05] tracking-tight mb-6">
              {lines[0]}
              <br />
              {lines[1]}
            </h2>
            <p className="text-[16px] text-[#6B7280] leading-relaxed max-w-[400px]">
              {benefits.paragraph}
            </p>
          </div>

          {/* Right: 3 feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {benefits.features.map((f, i) => (
              <FeatureCard
                key={f.title}
                emoji={f.emoji}
                title={f.title}
                desc={f.desc}
                delay={i * 0.12}
              />
            ))}
          </div>
        </div>

        {/* World map */}
        <WorldMapPins />
      </div>
    </SectionWrapper>
  );
}
