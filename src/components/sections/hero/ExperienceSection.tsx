"use client";

import { motion } from "framer-motion";
import { BookOpen, Film, Users } from "lucide-react";
import {
  rolesContainerVariants,
  roleItemVariants,
} from "@/animations/heroAnimations";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { useCursorBlink } from "@/hooks/useCursorBlink";

// Props for the Experience Item component
interface ExperienceItemProps {
  icon: React.ElementType;
  title: string;
  company: string;
  period: string;
  colorClass: string;
  iconColorClass: string;
}

// Component for individual experience item
const ExperienceItem = ({
  icon: Icon,
  title,
  company,
  period,
  colorClass,
  iconColorClass,
}: ExperienceItemProps) => (
  <motion.div variants={roleItemVariants} className="flex items-start gap-3">
    <div
      className={`h-7 w-7 rounded-full ${colorClass} flex items-center justify-center mt-0.5`}
    >
      <Icon className={`h-3.5 w-3.5 ${iconColorClass}`} aria-hidden="true" />
    </div>
    <div>
      <h3 className="text-zinc-800 dark:text-zinc-200 font-medium">{title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {company} <span className={iconColorClass}>● {period}</span>
      </p>
    </div>
  </motion.div>
);

// Props for the ExperienceSection component
interface ExperienceSectionProps {
  isInView: boolean;
  shouldReduceMotion: boolean;
}

// Main experience section component
export const ExperienceSection = ({
  isInView,
  shouldReduceMotion,
}: ExperienceSectionProps) => {
  const { t } = useLanguage();

  // Typing effect for intro text
  const { displayedText: displayedIntroText, isComplete: isTypingComplete } =
    useTypingEffect(t("intro.text"), isInView, shouldReduceMotion ? 0 : 40);

  // Blinking cursor effect
  const cursorBlink = useCursorBlink(530);

  return (
    <div className="space-y-8">
      {/* Animated typing intro text */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.5,
              delay: 1.3,
            },
          },
        }}
      >
        <div className="font-mono text-md md:text-lg text-zinc-600 dark:text-zinc-400 border-l-2 border-pink-500 pl-4 py-1">
          <span>{displayedIntroText}</span>
          <span
            className={`inline-block w-2 h-4 ml-1 bg-pink-500 dark:bg-pink-400 
              ${cursorBlink ? "opacity-100" : "opacity-0"} 
              transition-opacity duration-200 
              ${isTypingComplete ? "animate-pulse" : ""}`}
            aria-hidden="true"
          />
        </div>
      </motion.div>

      {/* Work experience with staggered reveal */}
      <motion.div variants={rolesContainerVariants}>
        <motion.h3
          className="text-sm uppercase tracking-widest text-zinc-500 mb-3"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.3, delay: 1.5 },
            },
          }}
        >
          {t("experience")}
        </motion.h3>

        <div className="space-y-3">
          <ExperienceItem
            icon={Users}
            title={t("role.communityManager")}
            company="Rahimov School & Rahimov Kids Marketing Team"
            period={`Apr 2025 – ${t("present")}`}
            colorClass="bg-pink-100/80 dark:bg-pink-900/30"
            iconColorClass="text-pink-600 dark:text-pink-300"
          />

          <ExperienceItem
            icon={Film}
            title={t("role.contentManager")}
            company="PiimaOlympiad & MittiMatematik"
            period={`Sep 2024 – ${t("present")}`}
            colorClass="bg-pink-100/80 dark:bg-pink-900/30"
            iconColorClass="text-pink-600 dark:text-pink-300"
          />

          <ExperienceItem
            icon={BookOpen}
            title={t("role.scriptwriter")}
            company="Amir Temurovich | Procontent"
            period={`Dec 2024 – Feb 2025`}
            colorClass="bg-amber-100/80 dark:bg-amber-900/30"
            iconColorClass="text-amber-600 dark:text-amber-300"
          />

          <motion.div
            variants={roleItemVariants}
            className="text-sm text-zinc-600 dark:text-zinc-500 font-medium ml-10"
          >
            {t("former.roles")}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceSection;
