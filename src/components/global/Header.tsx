"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { useScrollTo } from "@/hooks/useScrollTo";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";

type Language = {
  code: "uz" | "ru" | "en";
  name: string;
  nativeName: string;
  flag: string;
};

const languages: Language[] = [
  {
    code: "uz",
    name: "Uzbek",
    nativeName: "O'zbekcha",
    flag: "🇺🇿",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
];

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const scrollTo = useScrollTo();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Navbar scrolled state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent hydration errors with theme and language
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    scrollTo(sectionId);
    setMobileMenuOpen(false);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  if (!mounted) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg shadow-md"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo/Name */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="group">
              <h1 className="font-heading font-bold text-lg sm:text-xl text-zinc-900 dark:text-white transition-colors">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-amber-500">
                  Gulsevar
                </span>
                <span className="text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                  {" "}
                  Arzikulova
                </span>
              </h1>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              label={t("nav.home")}
              onClick={() => handleNavClick("hero")}
            />
            <NavLink
              label={t("nav.portfolio")}
              onClick={() => handleNavClick("portfolio")}
            />
            <NavLink
              label={t("nav.contact")}
              onClick={() => handleNavClick("contact")}
            />

            {/* Language Switcher (Desktop) */}
            <div className="relative">
              <motion.button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {currentLanguage.flag}
                </span>
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
                      {languages.map((lang) => (
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

            {/* Theme Toggle (Desktop) */}
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

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </header>
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
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
                onClick={() => setMobileMenuOpen(false)}
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
              {/* Language Switcher (Mobile) */}
              <div className="relative">
                <motion.button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {currentLanguage.flag} {currentLanguage.nativeName}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {languageMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-0 mb-2 w-44 rounded-md shadow-lg bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 overflow-hidden"
                    >
                      <div className="py-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setLanguageMenuOpen(false);
                            }}
                            className={`flex items-center w-full px-4 py-2 text-sm ${
                              language === lang.code
                                ? "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20"
                                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                            }`}
                          >
                            <span className="text-lg mr-2">{lang.flag}</span>
                            <span>{lang.nativeName}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle (Mobile) */}
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
    </>
  );
};

// Desktop Navigation Link
const NavLink = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className="relative font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {label}
    <motion.span
      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-amber-500"
      whileHover={{ width: "100%" }}
      transition={{ duration: 0.2 }}
    />
  </motion.button>
);

// Mobile Navigation Item with animation
const MobileNavItem = ({
  label,
  onClick,
  delay,
}: {
  label: string;
  onClick: () => void;
  delay: number;
}) => (
  <motion.li
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.3 }}
  >
    <button
      onClick={onClick}
      className="w-full text-left font-medium text-xl py-2 text-zinc-900 dark:text-white hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center"
    >
      <motion.span
        className="w-2 h-2 bg-pink-500 rounded-full mr-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.2 }}
      />
      {label}
    </button>
  </motion.li>
);

export default Header;
