import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Achievements showcase component
interface AchievementsShowcaseProps {
  items: string[];
  shouldReduceMotion: boolean;
}

export const AchievementsShowcase = ({
  items,
  shouldReduceMotion,
}: AchievementsShowcaseProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0.1 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 3D trophy illustration */}
      {!shouldReduceMotion && (
        <motion.div
          className="w-24 h-24 mx-auto mb-8 text-amber-400"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 8.75a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75Z" />
            <path d="M12 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.3 2.4a1.75 1.75 0 0 1 1.619-1.075h4.162a1.75 1.75 0 0 1 1.619 1.075l.726 1.451c.068-.003.136-.007.204-.007h1.12a2.5 2.5 0 0 1 2.5 2.5v1.75a4.75 4.75 0 0 1-4.75 4.75h-.5v3.25c0 .778.596 1.42 1.356 1.493l2.644.253a.75.75 0 0 1-.144 1.494l-2.644-.253A3 3 0 0 1 13 16.25v-3.25h-2v3.25a3 3 0 0 1-3.212 2.988l-2.644.254a.75.75 0 1 1-.144-1.495l2.644-.254A1.501 1.501 0 0 0 9 16.25V13h-.5A4.75 4.75 0 0 1 3.75 8.25V6.5A2.5 2.5 0 0 1 6.25 4h1.12c.068 0 .136.004.204.007l.726-1.451Zm7.574 3.1H19.25a1 1 0 0 1 1 1v1.75a3.25 3.25 0 0 1-3.25 3.25H16v-2.75c0-.73-.195-1.415-.535-2.005a6.901 6.901 0 0 0 .409-1.245ZM6.25 5.5a1 1 0 0 0-1 1v1.75A3.25 3.25 0 0 0 8.5 11.5H9V8.75c0-.73.195-1.415.535-2.005a6.901 6.901 0 0 1-.409-1.245H6.25ZM10.5 5.5V8.75c0 .69.56 1.25 1.25 1.25h.5c.69 0 1.25-.56 1.25-1.25V5.5h-3Zm4.302-2.675a.25.25 0 0 0-.231-.154h-4.142a.25.25 0 0 0-.231.154l-.514 1.028c.234.127.457.273.668.435h4.296c.211-.162.434-.308.668-.435l-.514-1.028Z"
            />
          </svg>
        </motion.div>
      )}

      {/* Achievement list */}
      <ul className="space-y-6">
        {items.map((achievement, i) => (
          <motion.li
            key={achievement}
            className="relative"
            variants={itemVariants}
          >
            <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
              {/* Achievement marker */}
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-500">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>

              {/* Achievement text */}
              <div className="flex-grow">
                <p className="text-zinc-800 dark:text-zinc-200">
                  {achievement}
                </p>
              </div>

              {/* Decorative light effect */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute top-0 right-0 w-20 h-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.7 }}
                  transition={{ delay: 0.8 + i * 0.2, duration: 1 }}
                >
                  <motion.div
                    className="absolute top-0 right-[-100%] w-20 h-[200%] bg-gradient-to-b from-transparent via-amber-200/40 to-transparent transform rotate-45"
                    animate={{
                      right: ["100%", "-100%"],
                    }}
                    transition={{
                      duration: 2,
                      delay: 1 + i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 5,
                    }}
                  />
                </motion.div>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
