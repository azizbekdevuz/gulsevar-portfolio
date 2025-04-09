import { useLanguage } from "@/providers/LanguageProvider";
import portfolioContent from "@/translations/portfolioContent";

/**
 * Custom hook that provides language-specific portfolio content
 *
 * @returns Object containing translated timeline items, skills, achievements, and education
 */
export function usePortfolioContent() {
  const { language } = useLanguage();

  // Return the content for the current language
  return portfolioContent[language];
}
