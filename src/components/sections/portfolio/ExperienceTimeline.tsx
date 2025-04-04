import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { TimelineItem } from "@/translations/portfolioContent";

// Experience timeline component
interface ExperienceTimelineProps {
  items: TimelineItem[];
  shouldReduceMotion: boolean;
  isLargeScreen: boolean;
}

export const ExperienceTimeline = ({
  items,
  shouldReduceMotion,
  isLargeScreen,
}: ExperienceTimelineProps) => {
  // Get references for each timeline item for scroll animation
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0.05 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Timeline line - cinematic film strip effect */}
      <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-zinc-200 dark:bg-zinc-700 md:left-1/2 md:-ml-[1px]">
        {!shouldReduceMotion &&
          Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 -left-[3px] bg-amber-400/60 rounded-full md:left-0 md:-ml-[3px]"
              style={{ top: `${i * 10}%` }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(251, 191, 36, 0)",
                  "0 0 0 4px rgba(251, 191, 36, 0.2)",
                  "0 0 0 0 rgba(251, 191, 36, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.5,
              }}
            />
          ))}
      </div>

      {/* Timeline items */}
      <div className="ml-12 md:ml-0 space-y-12 md:space-y-0">
        {items.map((item, index) => (
          <motion.div
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            key={`${item.role}-${index}`}
            className={`relative ${isLargeScreen ? (index % 2 === 0 ? "md:pr-[calc(50%_+_2rem)]" : "md:pl-[calc(50%_+_2rem)] md:text-right") : ""}`}
            variants={itemVariants}
          >
            {/* Timeline node */}
            <div
              className={`absolute left-[-27px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-zinc-800 border-2 ${item.highlight ? "border-pink-500" : "border-zinc-300 dark:border-zinc-600"} ${isLargeScreen ? (index % 2 === 0 ? "md:left-auto md:right-[-27px]" : "md:left-[-27px]") : ""}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${item.highlight ? "bg-pink-500" : "bg-zinc-400 dark:bg-zinc-500"}`}
              ></span>

              {/* Pulse effect for highlighted items */}
              {item.highlight && !shouldReduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(236, 72, 153, 0)",
                      "0 0 0 4px rgba(236, 72, 153, 0.3)",
                      "0 0 0 0 rgba(236, 72, 153, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              )}
            </div>

            {/* Content card */}
            <motion.div
              className={`p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ${item.highlight ? "border-l-4 border-l-pink-500 dark:border-l-pink-400" : ""}`}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-1.5">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {item.date}
                </p>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {item.role}
                </h3>
                {item.org && (
                  <p className="text-zinc-600 dark:text-zinc-300">
                    {item.link ? (
                      <a
                        href={item.link}
                        className="inline-flex items-center gap-1 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.org}
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    ) : (
                      item.org
                    )}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
