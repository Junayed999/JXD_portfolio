"use client";

import { useEffect } from "react";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let raf: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenisInstance: any = null;

    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical" as const,
        smoothWheel: true,
      });

      function animate(time: number) {
        lenisInstance.raf(time);
        raf = requestAnimationFrame(animate);
      }
      raf = requestAnimationFrame(animate);
    };

    initLenis();

    return () => {
      cancelAnimationFrame(raf);
      lenisInstance?.destroy();
    };
  }, []);

  return <>{children}</>;
}
