import { motion } from "framer-motion";

// Tab button component with animations
interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  shouldReduceMotion: boolean;
}

export const TabButton = ({
  isActive,
  onClick,
  icon,
  label,
  shouldReduceMotion,
}: TabButtonProps) => (
  <button
    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 outline-none ${
      isActive
        ? "text-white"
        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
    }`}
    onClick={onClick}
    aria-selected={isActive}
    role="tab"
  >
    {/* Background pill for active state */}
    {isActive && (
      <motion.span
        className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-amber-500"
        layoutId={shouldReduceMotion ? undefined : "activeTabBackground"}
        transition={{ type: "spring", duration: 0.5 }}
      />
    )}
    <span className="relative z-10 flex items-center gap-1.5">
      {icon}
      {label}
    </span>
  </button>
);
