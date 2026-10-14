"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";

import { siteContent } from "@/lib/content";

const { footer } = siteContent;

// Inline SVG social icons
function IgIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function FbIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function XIcon2() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const socialIconComponents: Record<string, React.ElementType> = {
  Instagram: IgIcon,
  Facebook: FbIcon,
  Twitter: XIcon2,
};

// ─── JNX Logo (inline, white variant) ────────────────────────────────────────
function FooterLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="7" fill="white" fillOpacity="0.15" />
        <path d="M6 20 L14 8 L22 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M10 20 L14 13 L18 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
      </svg>
      <span className="text-[22px] font-black tracking-[-0.04em] text-white">JNX</span>
    </div>
  );
}

// ─── Footer link column ───────────────────────────────────────────────────────
function LinkColumn({
  title,
  links,
  delay,
}: {
  title: string;
  links: string[];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="text-[13px] font-black text-white uppercase tracking-widest mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5" role="list">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-[13px] text-white/50 hover:text-white/80 transition-colors duration-200 focus:outline-none focus-visible:text-white"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      ref={ref}
      className="relative bg-[#0A0A0A] rounded-t-[32px] pt-16 pb-8 overflow-hidden"
      aria-label="Site footer"
    >
      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none rounded-t-[32px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] gap-10 lg:gap-8 mb-14">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <FooterLogo />
            <p className="text-[13px] text-white/40 leading-relaxed mt-4 max-w-[200px]">
              {footer.tagline}
            </p>
          </motion.div>

          {/* Link columns */}
          {footer.columns.map((col, i) => (
            <LinkColumn
              key={col.title}
              title={col.title}
              links={col.links}
              delay={0.08 * (i + 1)}
            />
          ))}

          {/* Contact column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-[13px] font-black text-white uppercase tracking-widest mb-4">
              {footer.contact.title}
            </h3>
            <a
              href={`mailto:${footer.contact.email}`}
              className="flex items-center gap-2 text-[13px] text-white/50 hover:text-white/80 transition-colors mb-5 focus:outline-none focus-visible:text-white"
            >
              <Mail size={14} />
              {footer.contact.email}
            </a>

            {/* Social buttons */}
            <div className="flex items-center gap-3">
              {footer.contact.socials.map((name, i) => {
                const Icon = socialIconComponents[name] ?? IgIcon;
                return (
                  <motion.a
                    key={name}
                    href="#"
                    whileHover={{ scale: 1.18, rotate: 8 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 16 }}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={name}
                    title={name}
                  >
                    <Icon size={15} className="text-white" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-7" role="separator" />

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-[12px] text-white/30"
        >
          {footer.copyright}
        </motion.p>
      </div>
    </footer>
  );
}
