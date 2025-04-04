"use client";

import { useRef } from "react";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import SignalNode from "./SignalNode";
import ContactFormTerminal from "./ContactFormTerminal";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Contact = () => {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const smoothTitleY = useSpring(titleY, { damping: 15, stiffness: 55 });

  return (
    <section
      id="contact"
      aria-label={t("contact.section")}
      className="relative min-h-screen flex items-center justify-center px-6 py-32 sm:px-10 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 overflow-hidden"
    >
      {/* Ambient Blur Bubble Background */}
      <div className="absolute w-[40rem] h-[40rem] top-[-10rem] left-[-10rem] bg-pink-400/20 dark:bg-pink-500/10 blur-3xl rounded-full -z-10 opacity-60 animate-pulse-slow" />
      <div className="absolute w-[30rem] h-[30rem] bottom-[-8rem] right-[-8rem] bg-indigo-400/20 dark:bg-indigo-500/10 blur-3xl rounded-full -z-10 opacity-60 animate-pulse-slower" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Animated Intro & Signal Beacons */}
        <motion.div
          className="space-y-10"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white font-heading mb-16 relative inline-block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              y: shouldReduceMotion ? 0 : smoothTitleY,
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              {t("contact.title")}
            </motion.span>

            {/* Decorative underline */}
            <motion.span
              className="absolute left-0 bottom-0 h-[5px] bg-gradient-to-r from-pink-500 to-amber-500 rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </motion.h2>

          <p className="text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            {t("contact.description")}
          </p>

          {/* Floating Contact Nodes */}
          <div className="space-y-6 pt-10">
            <SignalNode
              icon={Mail}
              label={t("contact.email")}
              value="arzikulovagulsevar7@gmail.com"
              href="mailto:arzikulovagulsevar7@gmail.com"
            />
            <SignalNode
              icon={Phone}
              label={t("contact.phone")}
              value="+998 94 288 4211"
              href="tel:+998942884211"
            />
            <SignalNode
              icon={MapPin}
              label={t("contact.location")}
              value="Tashkent, Uzbekistan"
            />
          </div>
        </motion.div>

        {/* Terminal Form Panel */}
        <ContactFormTerminal />
      </div>
    </section>
  );
};

export default Contact;
