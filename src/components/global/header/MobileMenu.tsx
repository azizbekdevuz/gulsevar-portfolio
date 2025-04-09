"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe, Moon, Sun, X } from "lucide-react";
import MobileNavItem from "./MobileNavItem";
import Languages from "./Languages";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
  handleNavClick: (sectionId: string) => void;
};

const MobileMenu = ({ isOpen, closeMenu, handleNavClick }: Props) => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const currentLanguage =
    Languages.find((lang) => lang.code === language) || Languages[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-0 bottom-0 right-0 w-full max-w-xs bg-white dark:bg-zinc-900 shadow-xl z-50 flex flex-col"
        >
          <div className="p-5 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="font-heading font-bold text-xl text-zinc-900 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-amber-500">
                Menu
              </span>
            </h2>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={closeMenu}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              <X className="h-6 w-6" />
            </motion.button>
          </div>

          <nav className="flex-1 overflow-y-auto p-5">
            <ul className="space-y-6">
              <MobileNavItem
                label={t("nav.home")}
                onClick={() => handleNavClick("hero")}
                delay={0.1}
              />
              <MobileNavItem
                label={t("nav.portfolio")}
                onClick={() => handleNavClick("portfolio")}
                delay={0.2}
              />
              <MobileNavItem
                label={t("nav.contact")}
                onClick={() => handleNavClick("contact")}
                delay={0.3}
              />
            </ul>
          </nav>

          <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 flex justify-around">
            {/* Language Switcher */}
            <div className="relative">
              <motion.button
                onClick={() => setLanguage(language === "en" ? "uz" : "en")}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {currentLanguage.flag} {currentLanguage.nativeName}
                </span>
              </motion.button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
