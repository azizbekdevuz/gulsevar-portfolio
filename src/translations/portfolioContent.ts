import type { Language } from "@/providers/LanguageProvider";

// Define content types for better type safety
export type TimelineItem = {
  date: string;
  role: string;
  org?: string;
  link?: string;
  highlight: boolean;
};

export type SkillSet = {
  creative: string[];
  communication: string[];
  technical: string[];
  tools: string[];
};

export type AchievementList = string[];

// Portfolio content for all languages
const portfolioContent: Record<
  Language,
  {
    timeline: TimelineItem[];
    skills: SkillSet;
    achievements: AchievementList;
  }
> = {
  // English content
  en: {
    timeline: [
      {
        date: "Mar 2025 – Present",
        role: "Script Writer",
        org: "Dr. Mirkamol Nosirjonov",
        link: "https://www.instagram.com/dr.mirkamol_nosirjon0v",
        highlight: true,
      },
      {
        date: "Sep 2024 – Present",
        role: "Script Writer & Content Manager",
        org: "PiimaOlympiad & MittiMatematik",
        link: "https://t.me/piimaolympiad_edu",
        highlight: true,
      },
      {
        date: "Dec 2024 – Feb 2025",
        role: "Script Writer",
        org: "Amir Temurovich | Procontent",
        link: "https://www.instagram.com/amirtemurov.ch",
        highlight: false,
      },
      {
        date: "May 2024 – Aug 2024",
        role: "Copywriter / Sales Manager",
        org: "PiimaOlympiad",
        highlight: false,
      },
      {
        date: "May 2023 – Sep 2024",
        role: "English Tutor",
        org: "PiimaOlympiad",
        highlight: false,
      },
      {
        date: "Sep 2019 – May 2024",
        role: "Leader of the Youth Union",
        highlight: false,
      },
    ],
    skills: {
      creative: ["Creative Writing", "Marketing / Sales", "Team Working"],
      communication: [
        "Communication Skills",
        "Problem-Solving",
        "Administrative Management",
      ],
      technical: ["Canva", "CupCut", "MS Word", "MS Excel", "MS PowerPoint"],
      tools: ["Google Docs", "Google Sheets", "Google Slides", "C++", "Swift"],
    },
    achievements: [
      "Creative Writer & Scenarist – Awarded by Umida Kenjayeva",
      "Ulugbek vorislari – Semi-finalist",
      "AIMO – Bronze Medal",
      "SEAMO – Bronze Medal (2x)",
      "English – C1 Level",
    ],
  },

  // Russian content
  ru: {
    timeline: [
      {
        date: "Март 2025 – Настоящее время",
        role: "Сценарист",
        org: "Др. Миркамол Носиржонов",
        link: "https://www.instagram.com/dr.mirkamol_nosirjon0v",
        highlight: true,
      },
      {
        date: "Сент 2024 – Настоящее время",
        role: "Сценарист и контент-менеджер",
        org: "PiimaOlympiad и MittiMatematik",
        link: "https://t.me/piimaolympiad_edu",
        highlight: true,
      },
      {
        date: "Дек 2024 – Фев 2025",
        role: "Сценарист",
        org: "Амир Темурович | Procontent",
        link: "https://www.instagram.com/amirtemurov.ch",
        highlight: false,
      },
      {
        date: "Май 2024 – Авг 2024",
        role: "Копирайтер / Менеджер по продажам",
        org: "PiimaOlympiad",
        highlight: false,
      },
      {
        date: "Май 2023 – Сент 2024",
        role: "Репетитор английского языка",
        org: "PiimaOlympiad",
        highlight: false,
      },
      {
        date: "Сент 2019 – Май 2024",
        role: "Лидер Союза Молодежи",
        highlight: false,
      },
    ],
    skills: {
      creative: [
        "Креативное письмо",
        "Маркетинг / Продажи",
        "Командная работа",
      ],
      communication: [
        "Коммуникативные навыки",
        "Решение проблем",
        "Административное управление",
      ],
      technical: ["Canva", "CupCut", "MS Word", "MS Excel", "MS PowerPoint"],
      tools: ["Google Docs", "Google Sheets", "Google Slides", "C++", "Swift"],
    },
    achievements: [
      "Творческий писатель и сценарист – Награда от Умиды Кенжаевой",
      "Улугбек ворислари – Полуфиналист",
      "AIMO – Бронзовая медаль",
      "SEAMO – Бронзовая медаль (2x)",
      "Английский язык – Уровень C1",
    ],
  },

  // Uzbek content
  uz: {
    timeline: [
      {
        date: "Mart 2025 – Hozirgi kungacha",
        role: "Ssenariy yozuvchisi",
        org: "Dr. Mirkamol Nosirjonov",
        link: "https://www.instagram.com/dr.mirkamol_nosirjon0v",
        highlight: true,
      },
      {
        date: "Sentabr 2024 – Hozirgi kungacha",
        role: "Ssenariy yozuvchisi va kontent menejeri",
        org: "PiimaOlympiad va MittiMatematik",
        link: "https://t.me/piimaolympiad_edu",
        highlight: true,
      },
      {
        date: "Dekabr 2024 – Fevral 2025",
        role: "Ssenariy yozuvchisi",
        org: "Amir Temurovich | Procontent",
        link: "https://www.instagram.com/amirtemurov.ch",
        highlight: false,
      },
      {
        date: "May 2024 – Avgust 2024",
        role: "Kopirayter / Sotuvlar menejeri",
        org: "PiimaOlympiad",
        highlight: false,
      },
      {
        date: "May 2023 – Sentabr 2024",
        role: "Ingliz tili o'qituvchisi",
        org: "PiimaOlympiad",
        highlight: false,
      },
      {
        date: "Sentabr 2019 – May 2024",
        role: "Yoshlar Ittifoqi yetakchisi",
        highlight: false,
      },
    ],
    skills: {
      creative: [
        "Ijodiy yozish",
        "Marketing / Sotuvlar",
        "Jamoa ishida ishlash",
      ],
      communication: [
        "Kommunikatsiya ko'nikmalari",
        "Muammolarni hal qilish",
        "Ma'muriy boshqaruv",
      ],
      technical: ["Canva", "CupCut", "MS Word", "MS Excel", "MS PowerPoint"],
      tools: ["Google Docs", "Google Sheets", "Google Slides", "C++", "Swift"],
    },
    achievements: [
      "Ijodiy yozuvchi va ssenariy muallifi – Umida Kenjayeva tomonidan mukofotlangan",
      "Ulug'bek vorislari – Yarim finalchi",
      "AIMO – Bronza medal",
      "SEAMO – Bronza medal (2x)",
      "Ingliz tili – C1 darajasi",
    ],
  },
};

export default portfolioContent;
