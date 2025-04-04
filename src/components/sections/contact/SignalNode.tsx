"use client";

import { motion } from "framer-motion";
import { Clipboard, Check, LucideIcon } from "lucide-react";
import { useCopyFeedback } from "@/hooks/useCopyFeedback";

interface SignalNodeProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const SignalNode = ({ icon: Icon, label, value, href }: SignalNodeProps) => {
  const { copied, copy } = useCopyFeedback();

  return (
    <motion.div
      className="relative p-4 border border-zinc-200 dark:border-zinc-700 bg-white/20 dark:bg-zinc-800/30 rounded-2xl backdrop-blur-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
      whileHover={{ scale: 1.015 }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      {/* Ambient hover glow */}
      <div className="absolute -inset-2 rounded-2xl bg-pink-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500 -z-10" />

      <div className="flex items-start gap-4">
        {/* Icon with hover animation */}
        <motion.div
          className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-300 shadow-inner"
          whileHover={{ scale: 1.1, rotate: [0, 3, -2, 0] }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>

        {/* Contact Text */}
        <div className="flex-1">
          <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-0.5">
            {label}
          </div>
          {href ? (
            <a
              href={href}
              className="text-base font-semibold text-zinc-900 dark:text-white hover:underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {value}
            </a>
          ) : (
            <div className="text-base font-semibold text-zinc-900 dark:text-white">
              {value}
            </div>
          )}
        </div>

        {/* Copy button with feedback */}
        <button
          onClick={() => copy(value)}
          className="text-zinc-400 hover:text-pink-500 dark:hover:text-pink-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-md"
          aria-label={`Copy ${label}`}
        >
          <motion.div
            key={copied ? "check" : "clipboard"}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Clipboard className="w-4 h-4" />
            )}
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
};

export default SignalNode;
