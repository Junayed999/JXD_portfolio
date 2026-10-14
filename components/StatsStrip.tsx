"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let raf: number;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      setCount(Math.floor(easeOut(progress) * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

const stats: Stat[] = [
  {
    value: 10,
    suffix: "+",
    label: "Years of Experience",
    sublabel: "Building world-class products",
  },
  {
    value: 1,
    suffix: "K+",
    label: "Projects Delivered",
    sublabel: "Across 40+ industries",
  },
  {
    value: 8,
    suffix: "K+",
    label: "Happy Customers",
    sublabel: "And growing every day",
  },
  {
    prefix: "",
    value: 42,
    suffix: "",
    label: "Overall Rating",
    sublabel: "Out of 5.0 on all platforms",
  },
];

function StatItem({
  stat,
  index,
  inView,
}: {
  stat: Stat;
  index: number;
  inView: boolean;
}) {
  const count = useCountUp(stat.value, 1.5, inView);

  // Special formatting for rating (42 → "4.2")
  const displayValue =
    index === 3 ? (count / 10).toFixed(1) : `${count}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-6 py-2"
    >
      <div className="text-[42px] sm:text-[52px] font-black text-white leading-none tracking-tight mb-1">
        {stat.prefix ?? ""}
        {displayValue}
        <span className="text-[28px] sm:text-[36px] text-white/70">{stat.suffix}</span>
      </div>
      <p className="text-[13px] font-semibold text-white/90 leading-snug">{stat.label}</p>
      <p className="text-[11px] text-white/40 mt-0.5">{stat.sublabel}</p>
    </motion.div>
  );
}

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 bg-[#0A0A0A] -mt-10 mx-4 lg:mx-16 xl:mx-24 rounded-3xl"
      style={{
        boxShadow: "0 24px 64px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset",
      }}
    >
      {/* Subtle grain overlay on dark band */}
      <div
        className="absolute inset-0 rounded-3xl opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        }}
      />

      <div className="relative grid grid-cols-2 lg:grid-cols-4 py-10 px-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className="relative">
            <StatItem stat={stat} index={i} inView={inView} />
            {/* Divider (not after last column) */}
            {i < stats.length - 1 && (
              <div className="absolute right-0 top-[15%] h-[70%] w-px bg-white/10 hidden lg:block" />
            )}
            {/* Mobile horizontal divider */}
            {(i === 1) && (
              <div className="absolute bottom-0 left-[10%] w-[80%] h-px bg-white/10 lg:hidden" />
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
