// Main heading animation with spring physics for natural movement
export const mainHeadingVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      delay: 0.3,
      duration: 1.2,
    },
  },
};

// Container for role items with staggered children animations
export const rolesContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1.8,
    },
  },
};

// Individual role item sliding in from the left
export const roleItemVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// CTA buttons with scale and glow effects on hover
export const ctaButtonVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 2.2,
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 20px rgba(236, 72, 153, 0.4)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

// Script container animation with subtle scale effect
export const scriptContainerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1.0,
      duration: 1,
      ease: "easeOut",
    },
  },
};
