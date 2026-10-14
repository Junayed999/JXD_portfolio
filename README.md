# JNX — Premium Landing Page

A production-quality single-page landing site built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Monochrome palette, buttery smooth scroll, premium micro-interactions.

---

## 🚀 Getting Started

```bash
# Navigate to the project
cd jnx-app

# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

---

## 📁 File Structure

```
jnx-app/
├── app/
│   ├── globals.css          # Design tokens, grain overlay, keyframes
│   ├── layout.tsx           # Outfit font, grain, cursor, Lenis
│   └── page.tsx             # Assembles all sections
├── components/
│   ├── CustomCursor.tsx     # Black dot + grey ring, scales on hover
│   ├── LenisProvider.tsx    # Buttery smooth scroll (Lenis)
│   ├── PageIntro.tsx        # White screen → JNX wordmark draws → slide-up
│   ├── ScrollProgressBar.tsx# Thin black progress bar at top
│   ├── SectionWrapper.tsx   # Fade-up + blur-to-sharp reveal (reusable)
│   ├── Navbar.tsx           # Sticky glass nav + mobile menu
│   ├── Hero.tsx             # Headline animation, phone mockup, parallax
│   ├── StatsStrip.tsx       # Count-up stats, overlaps hero
│   ├── Benefits.tsx         # Feature cards + dotted world map with pins
│   ├── SearchSection.tsx    # Scroll-linked text, floating search bar
│   ├── Community.tsx        # SVG avatar cluster, speech bubbles
│   ├── Testimonials.tsx     # Drag carousel + dot pagination
│   ├── FaqNewsletter.tsx    # Accordion + email form with success animation
│   └── Footer.tsx           # Black rounded-top footer with social icons
└── lib/
    └── content.ts           # ← ALL site copy lives here (edit me!)
```

---

## ✏️ Customizing Copy

**Edit `lib/content.ts`** to change any text, stats, testimonials, FAQ items, or footer links — everything flows from this single file:

```ts
// Example: Change the hero headline
hero: {
  headline: ["Build Your", "Brand,", "But In A", "Good Way!"],
  // ↑ Each string is one line
}
```

---

## 🎨 Design Tokens

All colors and typography live in `app/globals.css` under `@theme`:

```css
@theme {
  --color-jnx-black: #0A0A0A;   /* headings, buttons, footer */
  --color-jnx-grey: #6B7280;    /* body text */
  --color-jnx-border: #E5E7EB;  /* card borders */
  --color-jnx-surface: #F5F5F7; /* page background */
  --font-sans: "Outfit", system-ui, sans-serif;
}
```

---

## ♿ Accessibility

- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- All interactive elements have `aria-label`
- Keyboard-navigable accordion (Enter/Space) and carousel (Tab + arrow buttons)
- Focus-visible ring on all focusable elements
- `prefers-reduced-motion` respected — all Framer Motion + Lenis animations skip

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| next | 16.x | Framework |
| framer-motion | 14.x | All animations |
| lenis | 1.x | Smooth scroll |
| lucide-react | latest | Icons |
| tailwindcss | 4.x | Styling |

---

## 🌐 Deployment

Push to GitHub and deploy instantly to Vercel:

```bash
npx vercel --prod
```
