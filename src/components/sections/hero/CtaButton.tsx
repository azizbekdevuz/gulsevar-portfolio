"use client";

import React from "react";
import { motion } from "framer-motion";
import { ctaButtonVariants } from "@/animations/heroAnimations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { LucideIcon } from "lucide-react";

interface CtaButtonProps {
  onClick: () => void;
  label: string;
  icon: LucideIcon; // Use LucideIcon type instead of React.ElementType
  isPrimary?: boolean;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

/**
 * Enhanced Call to Action button component with animation and full accessibility
 */
export const CtaButton = ({
  onClick,
  label,
  icon: Icon,
  isPrimary = true,
  className = "",
  ariaLabel,
  disabled = false,
}: CtaButtonProps) => {
  const shouldReduceMotion = useReducedMotion();

  // Determine the accessible label (use provided or default to visible label)
  const accessibleLabel = ariaLabel || label;

  // Check if icon is a horizontal direction icon
  const isHorizontalIcon =
    Icon.toString().includes("ArrowRight") ||
    Icon.toString().includes("ArrowLeft");

  const iconMotionClass = isHorizontalIcon
    ? "group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
    : "group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5";

  // Use simplified animation for reduced motion
  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        hover: { scale: 1.02 },
      }
    : ctaButtonVariants;

  return (
    <motion.button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 group
        focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-zinc-900
        transition-all duration-300
        ${
          isPrimary
            ? "bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-md hover:shadow-lg dark:hover:shadow-pink-800/30"
            : "border border-pink-500/30 text-pink-600 dark:text-pink-300 hover:bg-pink-500/10 transition-colors duration-300"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      variants={variants}
      whileHover={disabled ? {} : "hover"}
      whileTap={disabled ? {} : { scale: 0.98 }}
      role="button"
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      aria-label={accessibleLabel}
      aria-disabled={disabled}
      // Make the button keyboard accessible
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {label}
      <Icon
        className={`h-4 w-4 transition-transform duration-300 ${!disabled ? iconMotionClass : ""}`}
        aria-hidden="true"
      />
    </motion.button>
  );
};

export default CtaButton;
