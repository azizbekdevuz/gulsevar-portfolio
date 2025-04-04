"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/providers/LanguageProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Instagram,
  Send,
  Youtube,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative py-16 bg-gradient-to-br from-zinc-50 via-zinc-100 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-neutral-900 overflow-hidden">
      {/* Background design elements */}
      {!shouldReduceMotion && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-700/5 dark:bg-pink-700/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-700/5 dark:bg-amber-700/10 blur-3xl rounded-full" />
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main info column */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-amber-500">
              Gulsevar Arzikulova
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300 max-w-md leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <SocialLink
                href="https://t.me/gulsevar_arzikulovas"
                icon={<Send className="w-4 h-4" />}
                label="Telegram"
                className="bg-blue-500 hover:bg-blue-600"
              />
              <SocialLink
                href="https://t.me/ssenariy_gulsevar"
                icon={<Send className="w-4 h-4" />}
                label="Portfolio"
                className="bg-teal-500 hover:bg-teal-600"
              />
              <SocialLink
                href="https://www.instagram.com/senarist_gulsevar"
                icon={<Instagram className="w-4 h-4" />}
                label="Instagram"
                className="bg-pink-500 hover:bg-pink-600"
              />
              <SocialLink
                href="https://www.youtube.com/@senarist_gulsevar"
                icon={<Youtube className="w-4 h-4" />}
                label="YouTube"
                className="bg-red-500 hover:bg-red-600"
              />
            </div>
          </motion.div>

          {/* Quick links column */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
              {t("footer.sections")}
            </h4>
            <ul className="space-y-3">
              <NavLink label={t("nav.home")} href="#hero" />
              <NavLink label={t("nav.portfolio")} href="#portfolio" />
              <NavLink label={t("nav.contact")} href="#contact" />
            </ul>
          </motion.div>

          {/* Developer info column */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
              {t("footer.developer")}
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm">
              {t("footer.designedBy")} <strong>Azizbek Arzikulov</strong>
            </p>
            <div className="flex flex-wrap gap-3">
              <DeveloperLink
                href="https://github.com/azizbekdevuz"
                icon={<Github className="w-4 h-4" />}
                label="GitHub"
              />
              <DeveloperLink
                href="https://portfolio-next-silk-two.vercel.app/"
                icon={<ExternalLink className="w-4 h-4" />}
                label="Portfolio"
              />
              <DeveloperLink
                href="https://www.linkedin.com/in/azizbek-arzikulov"
                icon={<Linkedin className="w-4 h-4" />}
                label="LinkedIn"
              />
            </div>

            {/* Script decoration - subtle cinema theme */}
            {!shouldReduceMotion && (
              <div className="relative mt-6 overflow-hidden">
                <div className="flex justify-between">
                  <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                </div>
                <div className="mt-1 p-3 border border-dashed border-zinc-300 dark:border-zinc-700 rounded bg-zinc-100/50 dark:bg-zinc-800/50 font-mono text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {/*eslint-disable-next-line react/jsx-no-comment-textnodes*/}
                  <span className="text-pink-500">//</span>
                  {t("footer.scriptComment")}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Copyright section */}
        <motion.div
          className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-zinc-600 dark:text-zinc-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>
            © {new Date().getFullYear()} Gulsevar Arzikulova.{" "}
            {t("footer.copyright")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

// Social media link component
const SocialLink = ({
  href,
  icon,
  label,
  className,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  className: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-2 px-3 py-2 rounded-full text-white text-sm ${className} shadow-sm`}
    whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    {icon}
    <span>{label}</span>
  </motion.a>
);

// Navigation link component
const NavLink = ({ label, href }: { label: string; href: string }) => (
  <li>
    <motion.a
      href={href}
      className="inline-block text-zinc-700 dark:text-zinc-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
      whileHover={{ x: 5 }}
    >
      <span className="inline-block w-2 h-2 rounded-full bg-pink-500/30 mr-2"></span>
      {label}
    </motion.a>
  </li>
);

// Developer link component (more subtle design)
const DeveloperLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-xs hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    <span>{label}</span>
  </motion.a>
);

export default Footer;
