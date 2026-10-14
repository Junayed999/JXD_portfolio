"use client";

import { useScroll, motion, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#0A0A0A] origin-left z-[9997]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
