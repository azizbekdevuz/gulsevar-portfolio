"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Import individual components
import ScriptVisual from "./ScriptVisual";
import ExperienceSection from "./ExperienceSection";
import CtaButton from "./CtaButton";

/**
 * Main Home page component with Hero section and other content sections
 * Uses modular components and custom hooks for clean architecture
 */
export default function Hero() {
  // Get translation function and current language
  const { t } = useLanguage();

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
  const scrollTo = useScrollTo();

  // Start animations when the component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const scrollToPortfolio = useCallback(() => {
    scrollTo("portfolio");
  }, [scrollTo]);

  const scrollToContact = useCallback(() => {
    scrollTo("contact");
  }, [scrollTo]);

  return (
    <>
      {/* Hero section */}
      <section
        ref={heroRef}
        id="hero"
        className="relative z-10 flex min-h-screen items-center justify-center py-12 px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: shouldReduceMotion ? 0.05 : 0.1,
                },
              },
            }}
          >
            {/* Left content column */}
            <div className="lg:col-span-7 space-y-8 md:space-y-10">
              {/* Cinematic opening tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: shouldReduceMotion ? 0.5 : 1.5 }}
              >
                <div className="text-amber-400 text-xs tracking-widest uppercase font-mono">
                  {t("intro.tagline")}
                </div>
              </motion.div>

              {/* Main content area: name, intro, experience */}
              <div className="space-y-8">
                {/* Name heading */}
                <motion.h1
                  className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 relative font-heading text-balance"
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: shouldReduceMotion ? "tween" : "spring",
                        delay: 0.3,
                        duration: shouldReduceMotion ? 0.7 : 1.2,
                      },
                    },
                  }}
                >
                  <span className="block relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-900 dark:from-zinc-100 dark:to-zinc-200">
                      Gulsevar
                    </span>
                    <span
                      className="absolute w-full h-[2px] bottom-1 left-0 bg-gradient-to-r from-pink-500 to-transparent"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 dark:from-pink-300 dark:via-rose-200 dark:to-amber-200">
                    Arzikulova
                  </span>
                </motion.h1>

                {/* Professional title */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: 0.8 },
                    },
                  }}
                >
                  <h2 className="text-xl md:text-2xl text-zinc-800 dark:text-zinc-300 font-medium flex items-center gap-2">
                    <span
                      className="text-pink-500 dark:text-pink-400 h-4 w-4"
                      aria-hidden="true"
                    >
                      ✎
                    </span>
                    {t("title")}
                  </h2>
                </motion.div>

                {/* Experience section with typing effect handled internally */}
                <ExperienceSection
                  isInView={isInView}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </div>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 2.2,
                      staggerChildren: 0.2,
                    },
                  },
                }}
              >
                <CtaButton
                  onClick={scrollToPortfolio}
                  label={t("button.viewWork")}
                  icon={ArrowRight}
                  isPrimary={true}
                  ariaLabel={`${t("button.viewWork")} - ${t("scroll.to.portfolio")}`}
                />

                <CtaButton
                  onClick={scrollToContact}
                  label={t("button.contactMe")}
                  icon={ChevronDown}
                  isPrimary={false}
                  ariaLabel={`${t("button.contactMe")} - ${t("scroll.to.contact")}`}
                />
              </motion.div>
            </div>

            {/* Right content column with script visual */}
            <ScriptVisual
              isInView={isInView}
              shouldReduceMotion={shouldReduceMotion}
            />
          </motion.div>

          {/* Scroll indicator */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                delay: 4.5,
              }}
              aria-hidden="true"
            >
              <ChevronDown className="h-6 w-6 text-zinc-500" />
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
