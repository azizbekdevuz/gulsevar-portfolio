import { useState, useEffect } from "react";

/**
 * Custom hook that creates a blinking cursor effect
 *
 * @param blinkRate - The rate at which the cursor blinks in milliseconds
 * @param initialState - The initial visibility state of the cursor
 * @returns The current visibility state of the cursor (true = visible)
 */
export function useCursorBlink(
  blinkRate: number = 530,
  initialState: boolean = true,
): boolean {
  const [isVisible, setIsVisible] = useState(initialState);

  useEffect(() => {
    // Set up interval for blinking effect
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, blinkRate);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [blinkRate]);

  return isVisible;
}
