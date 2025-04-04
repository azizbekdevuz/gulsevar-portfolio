"use client";

import { useRef, useEffect } from "react";
import { useAnimation, useInView } from "framer-motion";
import { useLanguage } from "@/providers/LanguageProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

//Import Sections
import Hero from "@/components/sections/hero/Hero";
import Portfolio from "@/components/sections/portfolio/Portfolio";
import Contact from "@/components/sections/contact/Contact";

/**
 * Main Home page component with Hero section and other content sections
 * Uses modular components and custom hooks for clean architecture
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

  return (
    <main
      className="flex min-h-screen flex-col relative overflow-hidden bg-gradient-to-br from-zinc-50 via-zinc-100 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-neutral-900 transition-colors duration-500"
      dir="ltr"
      lang={language}
    >
      {/* Background elements - disabled with prefers-reduced-motion */}
      {!shouldReduceMotion && (
        <>
          {/* Film grain overlay */}
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
      )}

      {/* Hero section */}
      <Hero />

      {/* Portfolio section placeholder - to be expanded later */}
      <Portfolio />

      {/* Contact section */}
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
