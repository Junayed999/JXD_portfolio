import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Benefits from "@/components/Benefits";
import SearchSection from "@/components/SearchSection";
import Community from "@/components/Community";
import Testimonials from "@/components/Testimonials";
import FaqNewsletter from "@/components/FaqNewsletter";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import PageIntro from "@/components/PageIntro";

export default function HomePage() {
  return (
    <>
      {/* Page-load intro overlay */}
      <PageIntro />

      {/* Scroll progress bar */}
      <ScrollProgressBar />

      {/* Floating page-frame card */}
      <main className="page-frame" id="main">
        {/* 3.1 Sticky navbar */}
        <Navbar />

        {/* 3.2 Hero */}
        <Hero />

        {/* 3.3 Stats strip — overlaps hero bottom */}
        <StatsStrip />

        {/* Spacer so stats strip doesn't bleed into benefits */}
        <div className="h-8 bg-white" aria-hidden="true" />

        {/* 3.4 Benefits + world map */}
        <Benefits />

        {/* 3.5 Search — scroll-linked animation */}
        <SearchSection />

        {/* 3.6 Community */}
        <Community />

        {/* 3.7 Testimonials carousel */}
        <Testimonials />

        {/* 3.8 FAQ + Newsletter */}
        <FaqNewsletter />

        {/* 3.9 Footer */}
        <Footer />
      </main>
    </>
  );
}
