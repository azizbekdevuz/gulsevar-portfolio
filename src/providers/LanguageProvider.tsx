"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import uz from "@/translations/uz";
import ru from "@/translations/ru";
import en from "@/translations/en";

export type Language = "uz" | "ru" | "en";

type FlatTranslations = {
  [key: string]: string;
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  translations: FlatTranslations;
};

const translationsByLang: Record<Language, FlatTranslations> = {
  uz,
  ru,
  en,
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("uz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && ["uz", "ru", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const t = (key: string): string => {
    const current = translationsByLang[language];
    if (!current[key]) {
      console.warn(`Translation key "${key}" not found in [${language}]`);
      return key;
    }
    return current[key];
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    translations: translationsByLang[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
