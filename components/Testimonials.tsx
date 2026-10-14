"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionWrapper from "./SectionWrapper";
import { SparkDoodle } from "./Benefits";

const { testimonials } = siteContent;

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg
            key={star}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`star-${star}-${rating}`}>
                <stop offset={half ? "50%" : filled ? "100%" : "0%"} stopColor="#0A0A0A" />
                <stop offset={half ? "50%" : filled ? "100%" : "0%"} stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={filled ? "#0A0A0A" : half ? `url(#star-${star}-${rating})` : "#E5E7EB"}
            />
          </svg>
        );
      })}
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────
function TestimonialCard({
  quote, name, role, avatar, rating, index,
}: {
  quote: string; name: string; role: string; avatar: string; rating: number; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 24px 48px -8px rgba(0,0,0,0.14)" }}
      className="flex-shrink-0 w-[320px] sm:w-[360px] bg-white rounded-3xl p-7 border border-[#E5E7EB] shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col gap-4 transition-shadow cursor-default"
    >
      {/* Quote mark */}
      <span className="text-[40px] leading-none font-black text-[#0A0A0A] opacity-15 select-none">&ldquo;</span>

      {/* Quote */}
      <p className="text-[14px] text-[#374151] leading-relaxed flex-1">{quote}</p>

      {/* Divider */}
      <div className="h-px bg-[#E5E7EB]" />

      {/* Author + rating */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A0A0A] to-[#3a3a3a] flex items-center justify-center text-white text-[12px] font-black flex-shrink-0">
            {avatar}
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#0A0A0A]">{name}</p>
            <p className="text-[11px] text-[#6B7280]">{role}</p>
          </div>
        </div>
        <StarRating rating={rating} />
      </div>
    </motion.div>
  );
}

// ─── Testimonials Carousel ────────────────────────────────────────────────────
export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 376; // card width + gap

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, testimonials.items.length - 1));
    setCurrentIndex(clamped);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: clamped * cardWidth,
        behavior: "smooth",
      });
    }
  }, []);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) goTo(currentIndex + 1);
    else if (info.offset.x > 50) goTo(currentIndex - 1);
  };

  return (
    <SectionWrapper
      id="testimonials"
      className="bg-[#F5F5F7] py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <SparkDoodle />
              <span className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-widest">
                Testimonials
              </span>
            </div>
            <h2 className="text-[40px] sm:text-[48px] font-black text-[#0A0A0A] leading-[1.05] tracking-tight">
              {testimonials.heading.split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
          </div>

          {/* Arrow controls */}
          <div className="flex items-center gap-3" role="group" aria-label="Carousel controls">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center hover:bg-[#0A0A0A] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => goTo(currentIndex + 1)}
              disabled={currentIndex === testimonials.items.length - 1}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#1a1a1a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Cards */}
        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={{ left: -(testimonials.items.length - 1) * cardWidth, right: 0 }}
          onDragEnd={handleDragEnd}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-4 cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: "x mandatory" }}
          aria-live="polite"
        >
          {testimonials.items.map((item, i) => (
            <div key={item.name} style={{ scrollSnapAlign: "start" }}>
              <TestimonialCard {...item} index={i} />
            </div>
          ))}
        </motion.div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-6" role="tablist">
          {testimonials.items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 h-2 bg-[#0A0A0A]"
                  : "w-2 h-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]"
              }`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
