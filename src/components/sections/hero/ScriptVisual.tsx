"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { scriptContainerVariants } from "@/animations/heroAnimations";

// Props for the ScriptVisual component
interface ScriptVisualProps {
  isInView: boolean;
  shouldReduceMotion: boolean;
}

// Component for script header section
const ScriptHeader = ({ isInView }: { isInView: boolean }) => {
  const { t } = useLanguage();

  return (
    <div className="p-8 flex flex-col gap-2">
      <AnimatePresence>
        {isInView && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="font-mono text-xs text-zinc-500 dark:text-zinc-500 uppercase tracking-wider"
            >
              {t("screenplay")}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="text-2xl font-bold text-zinc-900 dark:text-white"
            >
              {t("scriptTitle")}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.5 }}
              className="text-sm text-zinc-600 dark:text-zinc-400"
            >
              {t("writtenBy")}
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 2.2, duration: 1.2 }}
              className="h-px bg-gradient-to-r from-pink-500 to-transparent mt-4"
              aria-hidden="true"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Component for script lines and dialogs
interface ScriptLineProps {
  delay: number;
  text: string;
  className?: string;
  isCharacter?: boolean;
  isCentered?: boolean;
}

const ScriptLine = ({
  delay,
  text,
  className = "",
  isCharacter = false,
  isCentered = false,
}: ScriptLineProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.6 }}
    className={`
      font-mono text-xs 
      ${isCentered ? "text-center" : ""} 
      text-zinc-600 dark:text-zinc-400 
      ${isCharacter ? "uppercase mb-1" : "mb-3"} 
      ${className}
    `}
  >
    {text}
  </motion.div>
);

// Component for script narrative text
interface ScriptDescriptionProps {
  delay: number;
  text: string;
  className?: string;
}

const ScriptDescription = ({
  delay,
  text,
  className = "",
}: ScriptDescriptionProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.6 }}
    className={`text-sm text-zinc-800 dark:text-zinc-300 mb-6 ${className}`}
  >
    {text}
  </motion.div>
);

// Component for script content - the main screenplay text
const ScriptContent = ({ isInView }: { isInView: boolean }) => {
  const { t } = useLanguage();

  return (
    <div className="px-8 pt-6 flex-1">
      <AnimatePresence>
        {isInView && (
          <>
            <ScriptLine
              delay={2.5}
              text={t("fadeIn")}
              isCentered
              className="mb-4"
            />

            <ScriptLine delay={2.7} text={t("ext.scene")} />

            <ScriptDescription delay={2.9} text={t("scene.description")} />

            <ScriptLine
              delay={3.1}
              text={t("narrator")}
              isCharacter
              isCentered
            />

            <ScriptDescription
              delay={3.3}
              text={t("narrator.line")}
              className="italic text-center"
            />

            <ScriptLine delay={3.5} text={t("character.description")} />

            <ScriptLine
              delay={3.7}
              text={t("character.gulsevar")}
              isCharacter
              isCentered
            />

            <ScriptDescription
              delay={3.9}
              text={t("gulsevar.line")}
              className="italic text-center"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Component for script footer with page number
const ScriptFooter = ({ isInView }: { isInView: boolean }) => {
  const { t } = useLanguage();

  return (
    <div className="p-8">
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.1, duration: 0.8 }}
            className="flex items-center justify-between"
          >
            <div className="font-mono text-xs text-zinc-500">
              {t("continued")}
            </div>
            <div className="font-mono text-xs text-zinc-500">1.</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main script visual component
export const ScriptVisual = ({
  isInView,
  shouldReduceMotion,
}: ScriptVisualProps) => {
  // Use simplified animation variants for users who prefer reduced motion
  const variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : scriptContainerVariants;

  return (
    <motion.div
      className="lg:col-span-5 relative"
      variants={variants}
      aria-label="Script visualization"
      role="img"
    >
      <div className="aspect-[3/4] relative bg-white/50 dark:bg-gradient-to-br dark:from-zinc-800/50 dark:to-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm overflow-hidden shadow-xl transition-colors duration-500">
        {/* Script visual elements */}
        <div className="absolute inset-0 flex flex-col">
          {/* Cinematic stripe */}
          <div
            className="h-6 bg-gradient-to-r from-pink-600/40 to-amber-500/40"
            aria-hidden="true"
          />

          {/* Script header with title and author */}
          <ScriptHeader isInView={isInView} />

          {/* Script content with scene description and dialog */}
          <ScriptContent isInView={isInView} />

          {/* Script footer with page number */}
          <ScriptFooter isInView={isInView} />
        </div>

        {/* Film frame edge markers - purely decorative */}
        <div
          className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-pink-500/40"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-pink-500/40"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-pink-500/40"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-pink-500/40"
          aria-hidden="true"
        />

        {/* Star rating visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.3, duration: 0.8 }}
          className="absolute top-6 right-6 flex items-center"
          aria-label="5 star rating"
          role="img"
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
          ))}
        </motion.div>
      </div>

      {/* Radial glow effect beneath the component - only for users without reduced motion */}
      {!shouldReduceMotion && (
        <div
          className="absolute -z-10 inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-amber-500/10 blur-xl opacity-50 rounded-full"
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
};

export default ScriptVisual;
