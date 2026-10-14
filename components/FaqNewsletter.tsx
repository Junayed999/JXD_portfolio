"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronRight, Check, Mail } from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionWrapper from "./SectionWrapper";
import { SparkDoodle } from "./Benefits";

const { faq } = siteContent;

// ─── Accordion Item ───────────────────────────────────────────────────────────
function AccordionItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E5E7EB] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 rounded-lg"
      >
        <span className="text-[15px] font-bold text-[#0A0A0A] group-hover:text-[#374151] transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <motion.div
            whileHover={{ x: open ? 0 : 4 }}
            className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#0A0A0A] transition-colors"
          >
            <ChevronRight size={15} className="text-[#6B7280] group-hover:text-[#0A0A0A]" />
          </motion.div>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[14px] text-[#6B7280] leading-relaxed pb-5 max-w-[480px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Newsletter Form ──────────────────────────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Newsletter subscription">
      <p className="text-[13px] text-[#6B7280] mb-3">{faq.newsletter.label}</p>
      <div className="relative flex items-center bg-white rounded-full border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden pr-1.5">
        <Mail size={16} className="absolute left-4 text-[#9CA3AF]" aria-hidden="true" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={faq.newsletter.placeholder}
          disabled={success}
          aria-label="Email address"
          aria-describedby={error ? "email-error" : undefined}
          className="flex-1 pl-10 pr-4 py-3.5 text-[13px] text-[#0A0A0A] placeholder:text-[#9CA3AF] bg-transparent outline-none cursor-none"
        />
        <motion.button
          type="submit"
          disabled={loading || success}
          whileTap={{ scale: 0.95 }}
          animate={
            success
              ? { backgroundColor: "#16a34a" }
              : { backgroundColor: "#0A0A0A" }
          }
          transition={{ duration: 0.3 }}
          aria-label={success ? "Subscribed!" : "Submit email"}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13px] font-bold flex-shrink-0 min-w-[96px] justify-center"
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.span
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5"
              >
                <Check size={15} />
                Done!
              </motion.span>
            ) : (
              <motion.span key="submit" exit={{ scale: 0 }}>
                {loading ? "..." : faq.newsletter.button}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      {error && (
        <p id="email-error" role="alert" className="text-[12px] text-red-500 mt-2 pl-2">
          {error}
        </p>
      )}
    </form>
  );
}

// ─── FAQ + Newsletter Section ─────────────────────────────────────────────────
export default function FaqNewsletter() {
  return (
    <SectionWrapper
      id="faq"
      className="bg-white py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: heading + newsletter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <SparkDoodle />
              <span className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-widest">
                FAQ & Newsletter
              </span>
            </div>
            <h2 className="text-[38px] sm:text-[46px] font-black text-[#0A0A0A] leading-[1.05] tracking-tight mb-5">
              {faq.heading.split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-10 max-w-[380px]">
              Get the latest updates, feature drops, and brand-building tips straight to your inbox.
            </p>
            <NewsletterForm />
          </div>

          {/* Right: FAQ accordion */}
          <div>
            <p className="text-[14px] text-[#6B7280] mb-6">{faq.intro}</p>
            <div
              role="list"
              aria-label="Frequently asked questions"
            >
              {faq.items.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  question={item.q}
                  answer={item.a}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
