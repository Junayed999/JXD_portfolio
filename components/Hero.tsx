"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  MutableRefObject,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

// ─── SVG Illustrations ────────────────────────────────────────────────────────

function SparkDoodle() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 4 L26 20 L40 18 L28 26 L36 40 L22 30 L10 42 L16 28 L4 22 L20 22 Z"
        stroke="#0A0A0A"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
        opacity="0.25"
      />
      <circle cx="38" cy="10" r="2" fill="#0A0A0A" opacity="0.2" />
      <circle cx="12" cy="8" r="1.2" fill="#0A0A0A" opacity="0.15" />
    </svg>
  );
}

function ScribbleUnderline({ animate }: { animate: boolean }) {
  return (
    <svg
      viewBox="0 0 340 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -bottom-3 left-0 w-full"
      aria-hidden="true"
    >
      <motion.path
        d="M2 12 C30 4, 80 16, 120 10 C160 4, 200 16, 240 9 C280 2, 320 14, 338 8"
        stroke="#0A0A0A"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function DriftingShape({
  cx,
  cy,
  r,
  delay,
  duration,
}: {
  cx: number;
  cy: number;
  r: number;
  delay: number;
  duration: number;
}) {
  return (
    <motion.ellipse
      cx={cx}
      cy={cy}
      rx={r}
      ry={r * 0.6}
      fill="none"
      stroke="#0A0A0A"
      strokeWidth="1"
      opacity={0.04}
      animate={{ cy: [cy, cy - 12, cy] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function BackgroundDoodles() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <DriftingShape cx={700} cy={80} r={80} delay={0} duration={5} />
      <DriftingShape cx={60} cy={300} r={50} delay={1.5} duration={6} />
      <DriftingShape cx={400} cy={520} r={60} delay={0.8} duration={7} />
      <DriftingShape cx={750} cy={400} r={35} delay={2} duration={4.5} />
      {/* hand-drawn corner squiggle */}
      <motion.path
        d="M780 20 Q790 30 780 40 Q770 50 780 60"
        stroke="#0A0A0A"
        strokeWidth="1.5"
        fill="none"
        opacity={0.08}
        strokeLinecap="round"
        animate={{ opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M20 520 Q10 530 20 540 Q30 550 20 560"
        stroke="#0A0A0A"
        strokeWidth="1.5"
        fill="none"
        opacity={0.08}
        strokeLinecap="round"
        animate={{ opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </svg>
  );
}

// ─── Phone Mockup ─────────────────────────────────────────────────────────────

function AppCard({
  title,
  sub,
  emoji,
}: {
  title: string;
  sub: string;
  emoji: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#F0F0F0] flex items-center gap-2.5 min-w-[120px]">
      <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] flex items-center justify-center text-lg flex-shrink-0">
        {emoji}
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#0A0A0A] leading-tight">{title}</p>
        <p className="text-[9px] text-[#6B7280] leading-tight mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-[260px] mx-auto select-none">
      {/* Phone frame */}
      <div className="relative bg-[#0A0A0A] rounded-[42px] p-[3px] shadow-[0_40px_80px_-10px_rgba(0,0,0,0.4)]">
        {/* Screen bezel */}
        <div className="bg-white rounded-[40px] overflow-hidden">
          {/* Dynamic island */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-[90px] h-[28px] bg-[#0A0A0A] rounded-full" />
          </div>

          {/* App screen content */}
          <div className="px-5 pb-6 bg-[#F8F8F8] min-h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-5 mt-2">
              <div>
                <p className="text-[9px] text-[#6B7280]">Good morning 👋</p>
                <p className="text-[13px] font-black text-[#0A0A0A] leading-tight mt-0.5">
                  Create Your<br />Own Story.
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">JX</span>
              </div>
            </div>

            {/* Search bar */}
            <div className="bg-white rounded-2xl flex items-center gap-2 px-3 py-2 mb-4 border border-[#E5E7EB]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <span className="text-[9px] text-[#6B7280]">Search projects...</span>
            </div>

            {/* Recommended label */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-[#0A0A0A]">Recommended</p>
              <p className="text-[9px] text-[#6B7280]">See all</p>
            </div>

            {/* Cards row */}
            <div className="flex gap-2 overflow-x-auto pb-1 mb-4 no-scrollbar">
              {[
                { title: "Brand Kit", sub: "12 assets", emoji: "🎨" },
                { title: "Typography", sub: "8 fonts", emoji: "✏️" },
              ].map((c) => (
                <AppCard key={c.title} {...c} />
              ))}
            </div>

            {/* My Schedule card */}
            <div className="bg-[#0A0A0A] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-white">My Schedule</p>
                <span className="text-[8px] bg-white/20 text-white px-2 py-0.5 rounded-full">
                  Today
                </span>
              </div>
              <p className="text-[9px] text-white/60 mb-3">
                3 tasks remaining for today
              </p>
              <div className="space-y-1.5 mb-3">
                {["Brand review — 10:00", "Client call — 14:00"].map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2"
                  >
                    <div className="w-1 h-1 rounded-full bg-white/40" />
                    <p className="text-[9px] text-white/70">{t}</p>
                  </div>
                ))}
              </div>
              <button className="w-full bg-white text-[#0A0A0A] rounded-xl py-1.5 text-[9px] font-bold">
                View All Tasks
              </button>
            </div>
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute left-[-3px] top-[100px] w-[3px] h-[34px] bg-[#1a1a1a] rounded-l-[3px]" />
        <div className="absolute left-[-3px] top-[148px] w-[3px] h-[34px] bg-[#1a1a1a] rounded-l-[3px]" />
        <div className="absolute right-[-3px] top-[120px] w-[3px] h-[60px] bg-[#1a1a1a] rounded-r-[3px]" />
      </div>

      {/* Bottom tab bar overlay */}
      <div className="absolute bottom-[14px] left-[14px] right-[14px] bg-white rounded-[28px] h-[56px] flex items-center justify-around px-4 shadow-[0_-2px_20px_rgba(0,0,0,0.08)] border border-[#E5E7EB]">
        {[
          { icon: "⊞", active: true },
          { icon: "♡", active: false },
          { icon: "◎", active: false, center: true },
          { icon: "✉", active: false },
          { icon: "⊙", active: false },
        ].map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-center ${
              item.center
                ? "w-10 h-10 rounded-full bg-[#0A0A0A] text-white text-base"
                : "text-base"
            } ${item.active && !item.center ? "text-[#0A0A0A]" : item.center ? "" : "text-[#6B7280]/50"}`}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Reflection/glow */}
      <div className="absolute inset-0 rounded-[42px] pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
    </div>
  );
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 15, stiffness: 150 });
  const sy = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.35);
      y.set((e.clientY - cy) * 0.35);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href="#get-started"
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0A0A0A] text-white rounded-full text-[15px] font-bold hover:bg-[#1a1a1a] transition-colors shadow-[0_4px_24px_rgba(10,10,10,0.18)] cursor-pointer"
    >
      {children}
      <motion.span
        className="inline-flex"
        animate={{ x: 0 }}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowRight size={16} />
      </motion.span>
    </motion.a>
  );
}

// ─── Headline words mask-reveal ───────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function HeadlineLine({
  words,
  underline,
}: {
  words: string[];
  underline?: boolean;
}) {
  return (
    <div className={`flex flex-wrap gap-x-[0.25em] overflow-hidden ${underline ? "relative pb-4" : ""}`}>
      {words.map((word) => (
        <div key={word} className="overflow-hidden">
          <motion.span
            className="inline-block text-[#0A0A0A] font-black"
            variants={wordVariants}
          >
            {word}
          </motion.span>
        </div>
      ))}
      {underline && <ScribbleUnderline animate={true} />}
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [startAnim, setStartAnim] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef as MutableRefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const timer = setTimeout(() => setStartAnim(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-[72px]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F5F7] via-white to-[#F5F5F7]" />
      {/* Blurred glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#e8e8e8] rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <BackgroundDoodles />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
        {/* Left: text */}
        <motion.div style={{ y: textY }} className="flex flex-col">
          {/* Spark + label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={startAnim ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0A0A0A]/5 rounded-full text-[12px] font-semibold text-[#0A0A0A] border border-[#0A0A0A]/8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] inline-block animate-pulse" />
              New — JNX v2.0 is here
            </span>
          </motion.div>

          {/* Headline */}
          <div className="relative mb-2">
            {/* Spark doodle top-right */}
            <div className="absolute -top-6 -right-2 lg:right-12 opacity-60">
              <SparkDoodle />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={startAnim ? "visible" : "hidden"}
              className="text-[52px] sm:text-[60px] lg:text-[68px] xl:text-[76px] leading-[1.0] tracking-[-0.04em] space-y-1"
            >
              <HeadlineLine words={["Build", "Your"]} />
              <HeadlineLine words={["Brand,"]} />
              <HeadlineLine words={["But In A"]} />
              <HeadlineLine words={["Good", "Way!"]} underline />
            </motion.div>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={startAnim ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-[16px] text-[#6B7280] leading-relaxed max-w-[400px] mt-8 mb-8"
          >
            JNX helps you craft a powerful digital identity with precision.
            <br />
            Streamline your workflow and stand out effortlessly.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={startAnim ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.1, duration: 0.5, type: "spring", bounce: 0.3 }}
            className="flex items-center gap-4"
          >
            <MagneticButton>Get Started</MagneticButton>
            <a
              href="#about"
              className="text-[14px] font-semibold text-[#6B7280] hover:text-[#0A0A0A] transition-colors underline underline-offset-4 decoration-[#E5E7EB] hover:decoration-[#0A0A0A]"
            >
              Learn more
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={startAnim ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex items-center gap-3 mt-8"
          >
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {["J", "A", "M", "K"].map((l, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-[#0A0A0A] to-[#3a3a3a] flex items-center justify-center text-[9px] font-bold text-white"
                >
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#0A0A0A">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-[11px] text-[#6B7280] mt-0.5">
                Loved by <strong className="text-[#0A0A0A]">8,000+</strong> creators
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: phone */}
        <motion.div
          ref={phoneRef}
          style={{ y: phoneY }}
          initial={{ opacity: 0, y: 60, rotate: -4 }}
          animate={startAnim ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.9, type: "spring", stiffness: 80, damping: 18 }}
          className="flex justify-center lg:justify-end"
        >
          {/* Floating loop */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Hand + phone container */}
            <div className="relative">
              {/* Soft glow under phone */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[40px] bg-[#0A0A0A]/10 rounded-full blur-2xl" />

              {/* Badge floating top-right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={startAnim ? { opacity: 1, scale: 1, x: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
                className="absolute -top-4 -right-8 bg-white rounded-2xl px-3 py-2 shadow-lg border border-[#E5E7EB] flex items-center gap-2 z-10"
              >
                <div className="w-2 h-2 rounded-full bg-[#0A0A0A] animate-pulse" />
                <p className="text-[10px] font-bold text-[#0A0A0A]">Live Preview</p>
              </motion.div>

              {/* Badge floating bottom-left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={startAnim ? { opacity: 1, scale: 1, x: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
                className="absolute -bottom-2 -left-10 bg-[#0A0A0A] rounded-2xl px-3 py-2 shadow-lg flex items-center gap-2 z-10"
              >
                <span className="text-lg">⚡</span>
                <div>
                  <p className="text-[9px] font-bold text-white">Fast Deploy</p>
                  <p className="text-[8px] text-white/60">Under 30s</p>
                </div>
              </motion.div>

              <PhoneMockup />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
