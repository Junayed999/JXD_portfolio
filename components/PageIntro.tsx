"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const delay = prefersReducedMotion ? 0 : 1500;
    const timer = setTimeout(() => setVisible(false), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[99999] bg-white flex items-center justify-center pointer-events-none"
          exit={{
            y: "-100%",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <svg
            width="180"
            height="64"
            viewBox="0 0 180 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="JNX"
          >
            {/* J */}
            <motion.path
              d="M8 10 L8 44 Q8 56 20 56 Q32 56 32 44 L32 38"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* N */}
            <motion.path
              d="M48 54 L48 10 L82 54 L82 10"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* X */}
            <motion.path
              d="M98 10 L162 54"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              d="M162 10 L98 54"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
