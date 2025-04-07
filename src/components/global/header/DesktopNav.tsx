"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe, Moon, Sun } from "lucide-react";
import NavLink from "./NavLink";
import Languages from "./Languages";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";

type Props = {
  onNavClick: (sectionId: string) => void;
  languageMenuOpen: boolean;
  setLanguageMenuOpen: (open: boolean) => void;
};

const DesktopNav = ({
  onNavClick,
  languageMenuOpen,
  setLanguageMenuOpen,
}: Props) => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const currentLanguage =
    Languages.find((lang) => lang.code === language) || Languages[0];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <NavLink label={t("nav.home")} onClick={() => onNavClick("hero")} />
      <NavLink
        label={t("nav.portfolio")}
        onClick={() => onNavClick("portfolio")}
      />
      <NavLink label={t("nav.contact")} onClick={() => onNavClick("contact")} />

      {/* Language Switcher */}
      <div className="relative">
        <motion.button
          onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{currentLanguage.flag}</span>
        </motion.button>

        <AnimatePresence>
          {languageMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 divide-y divide-zinc-200 dark:divide-zinc-700 overflow-hidden"
            >
              <div className="py-1">
                {Languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLanguageMenuOpen(false);
                    }}
                    className={`group flex justify-between items-center w-full px-4 py-2 text-sm ${
                      language === lang.code
                        ? "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
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
    </nav>
  );
};

export default DesktopNav;
