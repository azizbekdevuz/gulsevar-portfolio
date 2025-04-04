import { useState, useEffect } from "react";

/**
 * Custom hook that detects if the user prefers reduced motion
 * Uses the prefers-reduced-motion media query to respect user preferences
 *
 * @returns Boolean indicating if reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  // Default to false for SSR
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Media query for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Update value when preference changes
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Older browsers (Safari 13.1 and older)
    else if ("addListener" in mediaQuery) {
      //ts-expect-error - TypeScript doesn't know about this deprecated API
      mediaQuery.addListener(handleChange);
      return () => {
        //ts-expect-error
        mediaQuery.removeListener(handleChange);
      };
    }
  }, []);

  return prefersReducedMotion;
}
