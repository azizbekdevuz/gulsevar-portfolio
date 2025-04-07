type Language = {
  code: "uz" | "ru" | "en";
  name: string;
  nativeName: string;
  flag: string;
};

const Languages: Language[] = [
  {
    code: "uz",
    name: "Uzbek",
    nativeName: "O'zbekcha",
    flag: "🇺🇿",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
];

export default Languages;
