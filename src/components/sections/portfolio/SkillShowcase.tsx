import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/providers/LanguageProvider";
import { PenTool, Code } from "lucide-react";

// Skills showcase component
interface SkillsShowcaseProps {
  skills: {
    creative: string[];
    communication: string[];
    technical: string[];
    tools: string[];
  };
  shouldReduceMotion: boolean;
  isLargeScreen: boolean;
}

export const SkillsShowcase = ({ skills }: SkillsShowcaseProps) => {
  const { t } = useLanguage();

  // Refs for each skill category
  const creativityRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);

  // Check if sections are in view
  const creativityInView = useInView(creativityRef, {
    once: true,
    amount: 0.3,
  });
  const technicalInView = useInView(technicalRef, { once: true, amount: 0.3 });

  // Skill animation variants
  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
      {/* Creativity skills */}
      <div
        ref={creativityRef}
        className="relative p-6 rounded-xl border border-pink-200 dark:border-pink-900/30 bg-gradient-to-br from-white to-pink-50 dark:from-zinc-900 dark:to-pink-950/10"
      >
        {/* Category icon */}
        <span className="absolute -top-5 left-5 w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/20 text-pink-500 dark:text-pink-300">
          <PenTool className="w-5 h-5" />
        </span>

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 mt-2">
          {t("portfolio.skills.creative")}
        </h3>

        <div className="flex flex-wrap gap-3 mt-4">
          {skills.creative.map((skill, i) => (
            <motion.span
              key={skill}
              className="text-sm font-medium px-4 py-2 rounded-full bg-pink-100/80 dark:bg-pink-900/20 text-pink-600 dark:text-pink-200 border border-pink-200 dark:border-pink-800/50"
              variants={skillVariants}
              initial="hidden"
              animate={creativityInView ? "visible" : "hidden"}
              custom={i}
            >
              {skill}
            </motion.span>
          ))}
          {skills.communication.map((skill, i) => (
            <motion.span
              key={skill}
              className="text-sm font-medium px-4 py-2 rounded-full bg-pink-100/80 dark:bg-pink-900/20 text-pink-600 dark:text-pink-200 border border-pink-200 dark:border-pink-800/50"
              variants={skillVariants}
              initial="hidden"
              animate={creativityInView ? "visible" : "hidden"}
              custom={i + skills.creative.length}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Technical skills */}
      <div
        ref={technicalRef}
        className="relative p-6 rounded-xl border border-amber-200 dark:border-amber-900/30 bg-gradient-to-br from-white to-amber-50 dark:from-zinc-900 dark:to-amber-950/10"
      >
        {/* Category icon */}
        <span className="absolute -top-5 left-5 w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-500 dark:text-amber-300">
          <Code className="w-5 h-5" />
        </span>

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 mt-2">
          {t("portfolio.skills.technical")}
        </h3>

        <div className="flex flex-wrap gap-3 mt-4">
          {skills.technical.map((skill, i) => (
            <motion.span
              key={skill}
              className="text-sm font-medium px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-900/20 text-amber-600 dark:text-amber-200 border border-amber-200 dark:border-amber-800/50"
              variants={skillVariants}
              initial="hidden"
              animate={technicalInView ? "visible" : "hidden"}
              custom={i}
            >
              {skill}
            </motion.span>
          ))}
          {skills.tools.map((skill, i) => (
            <motion.span
              key={skill}
              className="text-sm font-medium px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-900/20 text-amber-600 dark:text-amber-200 border border-amber-200 dark:border-amber-800/50"
              variants={skillVariants}
              initial="hidden"
              animate={technicalInView ? "visible" : "hidden"}
              custom={i + skills.technical.length}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};
