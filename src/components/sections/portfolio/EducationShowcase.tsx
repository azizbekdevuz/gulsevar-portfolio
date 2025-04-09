import { useState, useRef, useCallback, memo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Award,
  School,
  BookOpen,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

// Education item interface
export interface EducationItem {
  period: string;
  institution: string;
  degree?: string;
  highlight?: boolean;
  certificateTitle?: string;
}

// Component props
interface EducationShowcaseProps {
  items: EducationItem[];
  shouldReduceMotion: boolean;
  isLargeScreen: boolean;
}

// Memoized card content component to reduce re-renders
const EducationCardContent = memo(
  ({
    education,
    shouldReduceMotion,
  }: {
    education: EducationItem;
    isExpanded: boolean;
    shouldReduceMotion: boolean;
  }) => (
    <>
      {education.degree && (
        <div className="mt-2 mb-3">
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 mt-0.5 text-indigo-500 dark:text-indigo-400" />
            <div className="text-zinc-700 dark:text-zinc-300">
              {education.degree}
            </div>
          </div>
        </div>
      )}

      {education.certificateTitle && (
        <div className="mt-2">
          <div className="flex items-start gap-2">
            <Award className="w-4 h-4 mt-0.5 text-amber-500 dark:text-amber-400" />
            <div className="text-amber-600 dark:text-amber-300">
              {education.certificateTitle}
            </div>
          </div>
        </div>
      )}

      {!shouldReduceMotion && education.highlight && (
        <motion.div
          className="mt-3 text-sm text-indigo-600 dark:text-indigo-300 flex items-center"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ChevronRight className="w-3 h-3 mr-1" />
          <span>Currently active</span>
        </motion.div>
      )}
    </>
  ),
);

EducationCardContent.displayName = "EducationCardContent";

// Year extraction utility - moved outside component to prevent recreation
const getYear = (period: string): string => {
  const match = period.match(/\d{4}/);
  return match ? match[0] : "";
};

// Animation variants defined outside component to prevent recreation on renders
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (shouldReduceMotion: boolean) => ({
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion ? 0.05 : 0.15,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const detailsVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// Main component
export const EducationShowcase = ({
  items,
  shouldReduceMotion,
  isLargeScreen,
}: EducationShowcaseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Track expanded items for accordion effect - using object for O(1) lookups
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  );

  // Memoized toggle function
  const toggleExpand = useCallback((index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative max-w-3xl mx-auto"
      variants={containerVariants}
      custom={shouldReduceMotion}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Education illustration - only on larger screens */}
      {!shouldReduceMotion && isLargeScreen && (
        <motion.div
          className="hidden md:block absolute -top-4 -right-12 w-32 h-32 text-indigo-400 opacity-30 dark:opacity-20 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <GraduationCap size={128} className="w-full h-full" strokeWidth={1} />
        </motion.div>
      )}

      {/* Education path illustration */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute left-8 top-12 bottom-0 w-0.5 bg-gradient-to-b from-indigo-600 via-indigo-400 to-indigo-200 dark:from-indigo-500 dark:via-indigo-600 dark:to-indigo-800"
          initial={{ height: 0 }}
          animate={{ height: "95%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      )}

      {/* Education timeline */}
      <div className="relative space-y-12 ml-4">
        {items.map((education, i) => {
          const isExpanded = !!expandedItems[i];
          const year = getYear(education.period);

          return (
            <motion.div
              key={`${education.institution}-${i}`}
              className="relative"
              variants={itemVariants}
              // Use will-change only when animation is active
              style={{
                willChange:
                  isInView && !shouldReduceMotion
                    ? "opacity, transform"
                    : "auto",
              }}
            >
              {/* Year marker */}
              <div className="absolute left-1 -translate-x-full top-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 opacity-70">
                {year}
              </div>

              {/* Connection node */}
              <motion.div
                className={`absolute left-4 -translate-x-1/2 top-2 z-10 w-4 h-4 rounded-full flex items-center justify-center ${
                  education.highlight
                    ? "bg-indigo-500 dark:bg-indigo-400"
                    : "bg-indigo-200 dark:bg-indigo-700"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.5, duration: 0.3 }}
              >
                {education.highlight && !shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-indigo-500 dark:bg-indigo-400"
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                )}
                <div className="w-2 h-2 rounded-full bg-white dark:bg-indigo-900" />
              </motion.div>

              {/* Education card */}
              <motion.div
                className={`ml-10 rounded-xl border ${
                  education.highlight
                    ? "border-indigo-200 dark:border-indigo-800/40"
                    : "border-zinc-200 dark:border-zinc-700"
                } overflow-hidden bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300`}
                whileHover={{ x: 5 }}
                layout
                layoutId={`education-card-${i}`}
              >
                {/* Card header - always visible */}
                <div
                  className={`p-4 cursor-pointer ${
                    education.highlight
                      ? "bg-gradient-to-r from-indigo-50 to-transparent dark:from-indigo-900/20 dark:to-transparent"
                      : ""
                  }`}
                  onClick={() => toggleExpand(i)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      {/* Institution icon */}
                      <div
                        className={`flex-shrink-0 mt-0.5 w-8 h-8 rounded-md flex items-center justify-center ${
                          education.highlight
                            ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300"
                            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {education.certificateTitle ? (
                          <Award className="w-5 h-5" />
                        ) : (
                          <School className="w-5 h-5" />
                        )}
                      </div>

                      {/* Institution details */}
                      <div>
                        <div className="text-sm text-indigo-600 dark:text-indigo-300 font-medium">
                          {education.period}
                        </div>
                        <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-white mt-0.5">
                          {education.institution}
                        </h3>
                        {education.certificateTitle && !isExpanded && (
                          <div className="mt-1 flex items-center text-sm text-amber-600 dark:text-amber-300">
                            <Award className="w-3.5 h-3.5 mr-1" />
                            {education.certificateTitle}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expand/collapse indicator */}
                    <div className="flex-shrink-0">
                      <div
                        className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <ChevronDown className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable details - using AnimatePresence for mount/unmount animations */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={detailsVariants}
                      className="px-4 pb-4 pt-0"
                      layoutId={`details-${i}`}
                    >
                      <div className="pl-11 border-l border-dashed border-indigo-100 dark:border-indigo-900/40 ml-[3px]">
                        <EducationCardContent
                          education={education}
                          isExpanded={isExpanded}
                          shouldReduceMotion={shouldReduceMotion}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated glow effect for highlighted items */}
                {education.highlight && !shouldReduceMotion && (
                  <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                    <motion.div
                      className="absolute top-0 -right-40 w-40 h-full transform -skew-x-12 bg-indigo-400/10 dark:bg-indigo-400/5"
                      animate={{
                        x: [0, 300, 0],
                      }}
                      transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Export memoized component to prevent unnecessary re-renders
export default memo(EducationShowcase);
