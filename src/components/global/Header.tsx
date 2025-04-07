"use client";

import { useScrollTo } from "@/hooks/useScrollTo";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu } from "lucide-react";

import DesktopNav from "./header/DesktopNav";
import MobileMenu from "./header/MobileMenu";

const Header = () => {
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
          <DesktopNav
            onNavClick={handleNavClick}
            languageMenuOpen={languageMenuOpen}
            setLanguageMenuOpen={setLanguageMenuOpen}
          />

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
      <MobileMenu
        isOpen={mobileMenuOpen}
        closeMenu={() => setMobileMenuOpen(false)}
        handleNavClick={handleNavClick}
      />
    </>
  );
};

export default Header;
