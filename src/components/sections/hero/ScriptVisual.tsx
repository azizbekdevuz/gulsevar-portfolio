"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/providers/LanguageProvider";
import { scriptContainerVariants } from "@/animations/heroAnimations";
import { useState, useEffect } from "react";
import Image from "next/image";

// Props for the ScriptVisual component
interface ScriptVisualProps {
  isInView: boolean;
  shouldReduceMotion: boolean;
}

// Array of image URLs for the slider
const imageUrls = [
  "/assets/img/image1.jpg",
  "/assets/img/image2.jpg",
  "/assets/img/image3.jpg",
  "/assets/img/image4.jpg",
];

// Custom hook for preloading images to improve performance
const useImagePreloader = (urls: string[]) => {
  useEffect(() => {
    urls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  }, [urls]);
};

// Main script visual component
export const ScriptVisual = ({
  isInView,
  shouldReduceMotion,
}: ScriptVisualProps) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload all images for smoother transitions
  useImagePreloader(imageUrls);

  // Mark component as loaded after a short delay
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Use simplified animation variants for users who prefer reduced motion
  const variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : scriptContainerVariants;

  // Image slider logic - changes image every 5 seconds (slower transition)
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      className="lg:col-span-5 relative group"
      variants={variants}
      aria-label="Script visualization"
      role="img"
    >
      <div className="aspect-[3/4] relative bg-white/30 dark:bg-gradient-to-br dark:from-zinc-800/30 dark:to-zinc-900/30 rounded-2xl border border-pink-200/70 dark:border-pink-800/30 backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-pink-500/10 hover:border-pink-200/30 dark:hover:border-pink-700/30">
        {/* Image slider section */}
        <div className="absolute inset-0 flex flex-col">
          {/* Image slider */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {isInView && (
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic-bezier for smoother motion
                  }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={imageUrls[currentImageIndex]}
                      alt={`Slide ${currentImageIndex + 1}`}
                      width={400}
                      height={533}
                      priority={currentImageIndex === 0}
                      quality={90}
                      loading="eager"
                      className="object-contain w-full h-full transition-opacity duration-300"
                      style={{ opacity: isLoaded ? 1 : 0 }}
                      onLoadingComplete={(img) => {
                        img.style.opacity = "1";
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced gulsevar.line text area */}
          <div className="p-6 bg-gradient-to-r from-white/90 via-white/85 to-white/90 dark:from-zinc-900/90 dark:via-zinc-900/85 dark:to-zinc-900/90 backdrop-blur-md border-t border-pink-100/20 dark:border-pink-800/30 z-10">
            <AnimatePresence>
              {isInView && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                  className="italic text-center text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed"
                >
                  {t("gulsevar.line")}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Enhanced decorative corner elements */}
        <div
          className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-pink-500/40 dark:border-pink-400/40 z-20 rounded-tl-sm transition-all duration-500 group-hover:border-pink-500/60 dark:group-hover:border-pink-400/60"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-pink-500/40 dark:border-pink-400/40 z-20 rounded-tl-sm transition-all duration-500 group-hover:border-pink-500/60 dark:group-hover:border-pink-400/60"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-pink-500/40 dark:border-pink-400/40 z-20 rounded-tl-sm transition-all duration-500 group-hover:border-pink-500/60 dark:group-hover:border-pink-400/60"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-pink-500/40 dark:border-pink-400/40 z-20 rounded-tl-sm transition-all duration-500 group-hover:border-pink-500/60 dark:group-hover:border-pink-400/60"
          aria-hidden="true"
        />
      </div>

      {/* Enhanced radial glow effect beneath the component - only for users without reduced motion */}
      {!shouldReduceMotion && (
        <>
          <div
            className="absolute -z-10 inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-amber-500/10 blur-xl opacity-30 rounded-full transition-all duration-700 group-hover:opacity-50"
            aria-hidden="true"
          />
          <div
            className="absolute -z-20 inset-0 bg-gradient-to-br from-transparent via-amber-500/5 to-pink-500/5 blur-2xl opacity-20 rounded-full animate-pulse transition-all duration-700 group-hover:opacity-30"
            style={{ animationDuration: "8s" }}
            aria-hidden="true"
          />
        </>
      )}
    </motion.div>
  );
};

export default ScriptVisual;
