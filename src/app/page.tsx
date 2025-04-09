"use client";

import { useRef, useEffect, useMemo, memo } from "react";
import { useAnimation, useInView } from "framer-motion";
import { useLanguage } from "@/providers/LanguageProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Import Sections - use dynamic imports for code splitting
import dynamic from "next/dynamic";
import Hero from "@/components/sections/hero/Hero";

// Dynamically import components that aren't needed for initial render
// This improves initial page load time
const Portfolio = dynamic(
  () => import("@/components/sections/portfolio/Portfolio"),
  {
    ssr: true, // Pre-render on server for SEO
    loading: () => (
      <div className="min-h-screen" aria-label="Loading portfolio section" />
    ), // Placeholder during loading
  },
);

const Contact = dynamic(() => import("@/components/sections/contact/Contact"), {
  ssr: true, // Pre-render on server for SEO
  loading: () => (
    <div className="min-h-screen py-20" aria-label="Loading contact section" />
  ), // Placeholder during loading
});

// Separate background elements into their own memoized component
const BackgroundElements = memo(function BackgroundElements() {
  return (
    <>
      {/* Film grain overlay - using inlined SVG pattern for performance */}
      <div
        className="absolute inset-0 bg-[url('/assets/img/noise.svg')] opacity-[0.02] dark:opacity-[0.03] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Visual accent elements */}
      <div
        className="absolute -top-32 -left-32 w-64 h-64 bg-pink-700/5 dark:bg-pink-700/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-64 h-64 bg-amber-700/5 dark:bg-amber-700/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full shadow-[0_0_40px_12px_rgba(236,72,153,0.3)] dark:shadow-[0_0_40px_12px_rgba(236,72,153,0.4)] animate-pulse"
        aria-hidden="true"
      />
    </>
  );
});

/**
 * Main Home page component with Hero section and other content sections
 * Uses modular components, dynamic imports, and memoization for optimized performance
 */
export default function Home() {
  // Get translation function and current language
  const { t, language } = useLanguage();

  // References for scroll targets and animation control
  const heroRef = useRef<HTMLElement>(null);

  // Animation control hooks
  const controls = useAnimation();
  const isInView = useInView(heroRef, {
    once: true,
    // Trigger slightly before fully in view for smoother experience
    amount: 0.3,
  });
  const shouldReduceMotion = useReducedMotion();

  // Start animations when the component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Memoize main classes to prevent recalculation on re-renders
  const mainClasses = useMemo(
    () =>
      "flex min-h-screen flex-col relative overflow-hidden bg-gradient-to-br from-zinc-50 via-zinc-100 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-neutral-900 transition-colors duration-500",
    [],
  );

  return (
    <main className={mainClasses} dir="ltr" lang={language}>
      {/* Only render background elements if animations are enabled */}
      {!shouldReduceMotion && <BackgroundElements />}

      {/* Hero section - critical for initial view */}
      <Hero />

      {/* Portfolio section - will be loaded asynchronously */}
      <Portfolio />

      {/* Contact section - will be loaded asynchronously */}
      <section
        id="contact"
        className="min-h-screen py-20"
        aria-label={t("contact.section")}
      >
        <Contact />
      </section>
    </main>
  );
}
