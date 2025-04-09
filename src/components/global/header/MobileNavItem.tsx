import { motion } from "framer-motion";

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

export default MobileNavItem;
