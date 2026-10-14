import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JNX — Build Your Brand In A Good Way",
  description:
    "JNX helps you craft a powerful digital identity with precision. Streamline your workflow and stand out effortlessly.",
  keywords: ["JNX", "branding", "design", "digital identity", "creative agency"],
  authors: [{ name: "JNX Studio" }],
  openGraph: {
    title: "JNX — Build Your Brand In A Good Way",
    description:
      "JNX helps you craft a powerful digital identity with precision.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JNX — Build Your Brand In A Good Way",
    description:
      "JNX helps you craft a powerful digital identity with precision.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full bg-[#F5F5F7]">
        {/* Grain noise overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        {/* Custom cursor */}
        <CustomCursor />
        {/* Lenis smooth scroll */}
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
