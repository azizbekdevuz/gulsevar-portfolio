"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Briefcase,
  Star,
  Download,
  PenTool,
  GraduationCap,
} from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

// import Individual Components of Portfolio section
import { TabButton } from "./TabButton";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { SkillsShowcase } from "./SkillShowcase";
import { AchievementsShowcase } from "./AchievementsShowcase";
import { EducationShowcase } from "./EducationShowcase";

// Tab types
type TabType = "experience" | "skills" | "achievements" | "education";

const Portfolio = () => {
  const { t } = useLanguage();
  const portfolioRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  // Get translated content
  const { timeline, skills, achievements, education } = usePortfolioContent();

  // Active tab state
  const [activeTab, setActiveTab] = useState<TabType>("experience");

  // Parallax scrolling effect for title
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const smoothTitleY = useSpring(titleY, { damping: 15, stiffness: 55 });

  // Smooth transitions between tabs
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.3,
        ease: "easeIn",
      },
    },
  };

  // Script page background effect
  const scriptPageEffect = !shouldReduceMotion && (
    <div className="absolute inset-0 -z-10 opacity-10 overflow-hidden dark:opacity-5 pointer-events-none">
      <div className="w-full h-full bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"></div>
    </div>
  );

  return (
    <section
      ref={portfolioRef}
      id="portfolio"
      aria-label={t("portfolio.title")}
      className="relative py-16 md:py-24 min-h-screen overflow-hidden"
    >
      {/* Background accents */}
      {!shouldReduceMotion && (
        <>
          <div className="absolute -right-64 top-64 w-96 h-96 bg-pink-500/5 blur-3xl rounded-full -z-10"></div>
          <div className="absolute -left-64 bottom-64 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full -z-10"></div>
        </>
      )}

      {/* Content container */}
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Title with parallax effect */}
        <motion.h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white font-heading mb-16 relative inline-block"
          style={{
            y: shouldReduceMotion ? 0 : smoothTitleY,
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            {t("portfolio.title")}
          </motion.span>

          {/* Decorative underline */}
          <motion.span
            className="absolute left-0 bottom-0 h-[5px] bg-gradient-to-r from-pink-500 to-amber-500 rounded-full"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </motion.h2>

        {/* Tab navigation - stylized as a script/film element */}
        <div className="mb-12">
          <nav
            className="relative flex overflow-x-auto max-w-full pb-1 hide-scrollbar"
            aria-label="Portfolio sections"
          >
            <div className="flex space-x-2 mx-auto p-1 rounded-full bg-zinc-100/80 backdrop-blur dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700">
              <TabButton
                isActive={activeTab === "experience"}
                onClick={() => setActiveTab("experience")}
                icon={<Briefcase className="w-4 h-4" />}
                label={t("portfolio.employment")}
                shouldReduceMotion={shouldReduceMotion}
              />
              <TabButton
                isActive={activeTab === "education"}
                onClick={() => setActiveTab("education")}
                icon={<GraduationCap className="w-4 h-4" />}
                label={t("portfolio.education")}
                shouldReduceMotion={shouldReduceMotion}
              />
              <TabButton
                isActive={activeTab === "skills"}
                onClick={() => setActiveTab("skills")}
                icon={<PenTool className="w-4 h-4" />}
                label={t("portfolio.skills.soft")}
                shouldReduceMotion={shouldReduceMotion}
              />
              <TabButton
                isActive={activeTab === "achievements"}
                onClick={() => setActiveTab("achievements")}
                icon={<Star className="w-4 h-4" />}
                label={t("portfolio.certifications")}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

            {/* Decorative film strip holes */}
            {!shouldReduceMotion && (
              <div className="absolute left-0 right-0 -top-3 flex justify-between px-4 pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 opacity-70"></div>
                <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 opacity-70"></div>
              </div>
            )}
          </nav>
        </div>

        {/* Tab content with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-[500px] relative"
          >
            {/* Script paper background effect */}
            {scriptPageEffect}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <ExperienceTimeline
                items={timeline}
                shouldReduceMotion={shouldReduceMotion}
                isLargeScreen={isLargeScreen}
              />
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
              <EducationShowcase
                items={education}
                shouldReduceMotion={shouldReduceMotion}
                isLargeScreen={isLargeScreen}
              />
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <SkillsShowcase
                skills={skills}
                shouldReduceMotion={shouldReduceMotion}
                isLargeScreen={isLargeScreen}
              />
            )}

            {/* Achievements Tab */}
            {activeTab === "achievements" && (
              <AchievementsShowcase
                items={achievements}
                shouldReduceMotion={shouldReduceMotion}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Resume download - always visible */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a
            href="/assets/files/resume.pdf"
            download
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white font-semibold shadow-lg hover:shadow-pink-500/25 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 dark:focus-visible:ring-offset-zinc-900"
          >
            <Download className="w-5 h-5" />
            <span>{t("portfolio.resumeCta")}</span>
            <motion.span
              className="absolute inset-0 rounded-full bg-white/20"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
