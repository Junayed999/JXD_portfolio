// ─── JNX Site Content ───────────────────────────────────────────────────────
// Edit all copy from this single file.

export const siteContent = {
  brand: {
    name: "JNX",
    tagline: "Build beautifully. Ship confidently. Grow endlessly.",
    email: "hello@jnx.studio",
  },

  nav: {
    links: [
      { label: "Home", href: "#home", active: true },
      { label: "About", href: "#about" },
      { label: "Pricing", href: "#pricing", hasDropdown: true },
      { label: "Contact", href: "#contact" },
      { label: "Blog", href: "#blog" },
    ],
    pricing: [
      { label: "Starter Plan", desc: "Perfect for individuals" },
      { label: "Pro Plan", desc: "For growing teams" },
      { label: "Enterprise", desc: "Custom solutions" },
    ],
  },

  hero: {
    badge: "New — JNX v2.0 is here",
    headline: ["Build Your", "Brand,", "But In A", "Good Way!"],
    subtext:
      "JNX helps you craft a powerful digital identity with precision.\nStreamline your workflow and stand out effortlessly.",
    cta: "Get Started",
    ctaSecondary: "Learn more",
    socialProof: "Loved by 8,000+ creators",
  },

  stats: [
    { value: 10, suffix: "+", label: "Years of Experience", sub: "Building world-class products" },
    { value: 1, suffix: "K+", label: "Projects Delivered", sub: "Across 40+ industries" },
    { value: 8, suffix: "K+", label: "Happy Customers", sub: "And growing every day" },
    { value: 42, suffix: "", label: "Overall Rating", sub: "Out of 5.0 on all platforms", isRating: true },
  ],

  benefits: {
    heading: "That The Way\nTo Grow!",
    paragraph:
      "We give you the tools, guidance, and community to help your brand flourish. Everything you need — in one place.",
    features: [
      {
        emoji: "🌍",
        title: "Lot Of Choices",
        desc: "Access hundreds of curated templates, brand kits, and design systems tailored to your niche.",
      },
      {
        emoji: "🧳",
        title: "Best Guide",
        desc: "Step-by-step playbooks from industry experts. Build a strategy that actually converts.",
      },
      {
        emoji: "🎟️",
        title: "Easy Booking",
        desc: "Schedule calls, workshops, and reviews in seconds. No back-and-forth, ever.",
      },
    ],
    mapPins: [
      { x: 17, y: 36, label: "New York", active: false },
      { x: 26, y: 58, label: "São Paulo", active: false },
      { x: 47, y: 28, label: "London", active: false },
      { x: 52, y: 44, label: "Lagos", active: true },
      { x: 68, y: 22, label: "Moscow", active: false },
      { x: 76, y: 42, label: "Mumbai", active: false },
      { x: 88, y: 55, label: "Sydney", active: false },
    ],
  },

  search: {
    heading: "Forest, Starry Night,\nCampfire, What Else\nDo You Need?",
    paragraph:
      "Find your perfect creative space. Browse by theme, mood, or medium — then book instantly.",
    searchBar: {
      destination: { label: "Location", placeholder: "Choose Destination" },
      date: { label: "Date", placeholder: "Add Date" },
    },
  },

  community: {
    heading: "Community Service\nIs Calling, No Need\nFor Stalling.",
    paragraph:
      "Join 8,000+ creators sharing ideas, feedback, and inspiration every single day. It's warm, it's welcoming, and it's free.",
    cta: "Join Community",
    bubbles: ["Join up!", "Welcome!", "Hello!", "Hola!"],
  },

  testimonials: {
    heading: "Satisfied Customers\nAre Our Best Ads.",
    items: [
      {
        quote:
          "JNX completely transformed how I present my work. My client conversion rate jumped 40% in the first month.",
        name: "Amara Osei",
        role: "Photographer",
        avatar: "A",
        rating: 5,
      },
      {
        quote:
          "The templates are stunning, but what really hooked me is how intuitive everything feels. Zero learning curve.",
        name: "Lucas Fernández",
        role: "Traveler & Blogger",
        avatar: "L",
        rating: 4.5,
      },
      {
        quote:
          "I was skeptical at first, but JNX delivered beyond expectations. My brand finally looks as good as my skills.",
        name: "Yuki Tanaka",
        role: "Climber & Creator",
        avatar: "Y",
        rating: 5,
      },
      {
        quote:
          "The community alone is worth it. I got more actionable feedback here in a week than in a year elsewhere.",
        name: "Sofia Eriksson",
        role: "Brand Strategist",
        avatar: "S",
        rating: 4.5,
      },
      {
        quote:
          "Fast, beautiful, and endlessly customizable. JNX is the creative partner I didn't know I needed.",
        name: "Daniel Park",
        role: "UI Designer",
        avatar: "D",
        rating: 5,
      },
    ],
  },

  faq: {
    heading: "Got A Question\nFor JNX?",
    newsletter: {
      label: "Stay in the loop — subscribe for updates.",
      placeholder: "Enter your email",
      button: "Submit",
    },
    intro: "Maybe your question has been answered, check this out.",
    items: [
      {
        q: "What is JNX?",
        a: "JNX is a premium brand-building platform that gives creators, freelancers, and agencies everything they need to present their work beautifully and grow their audience.",
      },
      {
        q: "How to get started?",
        a: "Simply click 'Get Started', create a free account, and pick a template. You'll have a live page in under 5 minutes — no coding required.",
      },
      {
        q: "What kind of service will I get?",
        a: "You get access to hundreds of templates, a curated brand kit library, expert guides, community access, and priority support — all included in every plan.",
      },
    ],
  },

  footer: {
    tagline: "Build beautifully. Ship confidently.",
    columns: [
      {
        title: "Company",
        links: ["About Us", "Features", "News", "FAQ"],
      },
      {
        title: "Resources",
        links: ["Events", "Promo", "Blog Demo"],
      },
      {
        title: "Support",
        links: ["Account", "Support Center", "Feedback", "Contact Us", "Accessibility"],
      },
    ],
    contact: {
      title: "Contact Info",
      email: "hello@jnx.studio",
      socials: ["Instagram", "Facebook", "Twitter"],
    },
    copyright: "Copyright © 2026 JNX. All right reserved.",
  },
};
