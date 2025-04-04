"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Clapperboard } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render UI after component has mounted to avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/80 dark:bg-zinc-100/20 backdrop-blur-md border border-zinc-800 dark:border-zinc-700 shadow-md"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="relative w-6 h-6">
        {/* Sun icon (light mode) */}
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          animate={{
            opacity: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : -90,
            scale: theme === "light" ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-5 w-5 text-amber-500" />
        </motion.div>

        {/* Moon icon (dark mode) */}
        <motion.div
          initial={{ opacity: 0, rotate: 90 }}
          animate={{
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 90,
            scale: theme === "dark" ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-5 w-5 text-zinc-200" />
        </motion.div>

        {/* Film clapperboard transitioning effect */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{ duration: 0.3, times: [0, 0.5, 1] }}
          key={theme} // Force animation to replay on theme change
          className="absolute inset-0 flex items-center justify-center"
        >
          <Clapperboard className="h-5 w-5 text-pink-400" />
        </motion.div>
      </div>
    </motion.button>
  );
}
