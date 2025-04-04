import { useState, useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface TypingEffectResult {
  displayedText: string;
  isComplete: boolean;
  restart: () => void;
}

/**
 * Custom hook that creates a typing animation effect
 *
 * @param text - The full text to be typed
 * @param isActive - Whether the typing effect should be active (e.g., component is in view)
 * @param speed - Typing speed in milliseconds per character (lower is faster)
 * @param initialDelay - Delay before typing starts in milliseconds
 * @returns Object containing the currently displayed text and completion status
 */
export function useTypingEffect(
  text: string,
  isActive: boolean = true,
  speed: number = 50,
  initialDelay: number = 0,
): TypingEffectResult {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Restart the typing animation
  const restart = () => {
    setDisplayedText("");
    setIsComplete(false);
  };

  useEffect(() => {
    // Reset when text changes (e.g., language switch)
    restart();
  }, [text]);

  useEffect(() => {
    // If reduced motion is preferred, show the full text immediately
    if (shouldReduceMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    // Don't start typing if not active
    if (!isActive || !text) return;

    let index = 0;
    let timeoutId: NodeJS.Timeout;

    // Initial delay before typing starts
    const startTyping = () => {
      timeoutId = setTimeout(typeNextChar, initialDelay);
    };

    // Function to type the next character
    const typeNextChar = () => {
      if (index < text.length) {
        // Dynamically adjust speed based on punctuation for more natural effect
        const char = text[index];
        const isPunctuation = [".", ",", "!", "?", ";", ":"].includes(char);
        const nextSpeed = isPunctuation ? speed * 4 : speed;

        setDisplayedText(text.substring(0, index + 1));
        index++;
        timeoutId = setTimeout(typeNextChar, nextSpeed);
      } else {
        setIsComplete(true);
      }
    };

    startTyping();

    // Clean up timeouts on unmount or when dependencies change
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isActive, text, speed, initialDelay, shouldReduceMotion]);

  return { displayedText, isComplete, restart };
}
