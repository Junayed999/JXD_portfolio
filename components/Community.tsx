"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteContent } from "@/lib/content";
import SectionWrapper from "./SectionWrapper";
import { SparkDoodle } from "./Benefits";

// Inline SVG social icons (lucide v1.57 removed named social icons)
function IgIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.23 8.23 0 0 0 4.83 1.56V6.79a4.85 4.85 0 0 1-1.06-.1z"/>
    </svg>
  );
}

const { community } = siteContent;

// ─── SVG Avatar ───────────────────────────────────────────────────────────────
function Avatar({
  shade,
  size = 72,
  hairType,
  index,
}: {
  shade: string;
  size?: number;
  hairType: number;
  index: number;
}) {
  const hairFills = ["#2a2a2a", "#5a4030", "#6a6a6a", "#1a1a1a", "#8a7060", "#3a3a4a", "#4a3a2a"];
  const hairColor = hairFills[index % hairFills.length];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, y: [0, -(6 + index * 2), 0] }}
      transition={{
        scale: { delay: 0.15 + index * 0.1, type: "spring", stiffness: 280, damping: 18 },
        opacity: { delay: 0.15 + index * 0.1, duration: 0.4 },
        y: {
          duration: 3 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.35,
          repeatType: "loop",
        },
      }}
      whileHover={{ scale: 1.18, rotate: index % 2 === 0 ? 6 : -6, zIndex: 20 }}
      style={{ width: size, height: size, position: "relative" }}
      className="cursor-pointer"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background circle */}
        <circle cx="36" cy="36" r="36" fill={shade} />
        {/* Body/shoulders */}
        <ellipse cx="36" cy="60" rx="20" ry="14" fill={shade === "#e8e8e8" ? "#d0d0d0" : "#d4d4d4"} />
        {/* Head */}
        <circle cx="36" cy="30" r="17" fill="#f2f2f2" />
        {/* Hair */}
        {hairType === 0 && (
          <path d="M19 28 Q21 12 36 12 Q51 12 53 28 Q48 18 36 18 Q24 18 19 28 Z" fill={hairColor} />
        )}
        {hairType === 1 && (
          <>
            <path d="M22 24 Q24 10 36 10 Q48 10 50 24" fill={hairColor} />
            <ellipse cx="21" cy="27" rx="4" ry="7" fill={hairColor} />
            <ellipse cx="51" cy="27" rx="4" ry="7" fill={hairColor} />
          </>
        )}
        {hairType === 2 && (
          <path d="M19 26 Q23 10 36 10 Q49 10 53 26 L53 17 Q48 8 36 8 Q24 8 19 17 Z" fill={hairColor} />
        )}
        {hairType === 3 && (
          <>
            {[23, 28, 33, 38, 43, 48].map((cx, j) => (
              <ellipse
                key={j}
                cx={cx}
                cy={14}
                rx="3"
                ry="6"
                fill={hairColor}
                transform={`rotate(${(j - 2.5) * 9} ${cx} 14)`}
              />
            ))}
          </>
        )}
        {/* Eyes */}
        <circle cx="29" cy="30" r="2.5" fill="#3a3a3a" />
        <circle cx="43" cy="30" r="2.5" fill="#3a3a3a" />
        {/* Eye shine */}
        <circle cx="30" cy="29" r="1" fill="white" opacity="0.8" />
        <circle cx="44" cy="29" r="1" fill="white" opacity="0.8" />
        {/* Smile */}
        <path d="M28 37 Q36 44 44 37" stroke="#5a5a5a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Nose */}
        <circle cx="36" cy="34" r="1.2" fill="#ccc" />
        {/* Gloss highlight */}
        <path d="M14 20 Q36 8 58 20" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.2" fill="none" />
      </svg>
    </motion.div>
  );
}

// ─── Speech bubble ────────────────────────────────────────────────────────────
function SpeechBubble({
  text,
  style,
  delay,
}: {
  text: string;
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -10, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 16 }}
      className="absolute bg-[#0A0A0A] text-white text-[10px] font-bold px-3 py-1.5 rounded-2xl shadow-md pointer-events-none select-none"
      style={style}
    >
      {text}
      <span
        className="absolute -bottom-[6px] left-3 w-0 h-0"
        style={{
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "6px solid #0A0A0A",
        }}
      />
    </motion.div>
  );
}

// ─── Floating social icon ─────────────────────────────────────────────────────
function SocialIcon({
  Icon,
  style,
  delay,
  label,
}: {
  Icon: React.ElementType;
  style: React.CSSProperties;
  delay: number;
  label: string;
}) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 18 }}
      whileHover={{ scale: 1.2, rotate: 12 }}
      whileTap={{ scale: 0.92 }}
      className="absolute w-10 h-10 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]"
      style={style}
      aria-label={label}
    >
      <Icon size={17} className="text-[#0A0A0A]" />
    </motion.button>
  );
}

// ─── Avatar cluster layout ────────────────────────────────────────────────────
const avatarConfig = [
  { left: "50%", top: "50%", style: { transform: "translate(-50%,-50%)" }, size: 90, shade: "#d8d8d8", hair: 0 },
  { left: "12%", top: "18%", style: {}, size: 64, shade: "#e8e8e8", hair: 1 },
  { left: "68%", top: "12%", style: {}, size: 60, shade: "#c8c8c8", hair: 2 },
  { left: "82%", top: "48%", style: {}, size: 66, shade: "#e0e0e0", hair: 3 },
  { left: "62%", top: "76%", style: {}, size: 58, shade: "#d4d4d4", hair: 1 },
  { left: "18%", top: "74%", style: {}, size: 62, shade: "#e4e4e4", hair: 0 },
  { left: "3%", top: "50%", style: {}, size: 54, shade: "#d0d0d0", hair: 2 },
];

function AvatarCluster({ inView }: { inView: boolean }) {
  if (!inView) return <div className="w-full h-[440px]" />;

  return (
    <div className="relative w-full h-[440px]" aria-label="Community member avatars">
      {/* Blob backdrop */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <ellipse cx="200" cy="200" rx="185" ry="175" fill="#F5F5F7" />
        <ellipse cx="165" cy="185" rx="145" ry="135" fill="#EBEBEB" opacity="0.55" />
      </svg>

      {/* Avatars */}
      {avatarConfig.map((a, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: a.left,
            top: a.top,
            ...a.style,
            ...(a.style.transform ? {} : { marginLeft: -a.size / 2, marginTop: -a.size / 2 }),
          }}
        >
          <Avatar shade={a.shade} size={a.size} hairType={a.hair} index={i} />
        </div>
      ))}

      {/* Speech bubbles */}
      {community.bubbles.map((text, i) => {
        const positions: React.CSSProperties[] = [
          { left: "4%", top: "5%" },
          { left: "58%", top: "2%" },
          { left: "70%", top: "66%" },
          { left: "0%", top: "80%" },
        ];
        return (
          <SpeechBubble
            key={text}
            text={text}
            style={positions[i]}
            delay={0.7 + i * 0.15}
          />
        );
      })}

      {/* Social icons */}
      <SocialIcon Icon={IgIcon} style={{ left: "44%", top: "0%" }} delay={0.9} label="Instagram" />
      <SocialIcon Icon={XIcon} style={{ right: "0%", top: "24%" }} delay={1.05} label="Twitter / X" />
      <SocialIcon Icon={TikTokIcon} style={{ right: "0%", top: "68%" }} delay={1.2} label="TikTok" />
    </div>
  );
}

// ─── Community Section ────────────────────────────────────────────────────────
export default function Community() {
  const clusterRef = useRef<HTMLDivElement>(null);
  const inView = useInView(clusterRef, { once: true, margin: "-80px" });
  const lines = community.heading.split("\n");

  return (
    <SectionWrapper id="community" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <SparkDoodle />
              <span className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-widest">
                Community
              </span>
            </div>
            <h2 className="text-[40px] sm:text-[48px] font-black text-[#0A0A0A] leading-[1.05] tracking-tight mb-5">
              {lines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-[16px] text-[#6B7280] leading-relaxed mb-8 max-w-[400px]">
              {community.paragraph}
            </p>
            <motion.a
              href="#community"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A0A0A] text-white font-bold text-[14px] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:bg-[#1a1a1a] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A0A0A]"
            >
              {community.cta}
              <span aria-hidden="true">→</span>
            </motion.a>
          </div>

          {/* Right: avatar cluster */}
          <div ref={clusterRef}>
            <AvatarCluster inView={inView} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
