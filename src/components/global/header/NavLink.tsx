import { motion } from "framer-motion";

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

export default NavLink;
