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

export type EducationItem = {
  period: string;
  institution: string;
  degree?: string;
  highlight?: boolean;
  certificateTitle?: string;
};

// Portfolio content for all languages
const portfolioContent: Record<
  Language,
  {
    timeline: TimelineItem[];
    skills: SkillSet;
    achievements: AchievementList;
    education: EducationItem[];
  }
> = {
  // English content
  en: {
    timeline: [
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
      "Successful Graduate of Blogging Mentorship",
      "Creative Writer & Scenarist – Awarded by Umida Kenjayeva",
      "Ulugbek vorislari – Semi-finalist",
      "AIMO – Bronze Medal",
      "SEAMO – Bronze Medal (2x)",
      "English – C1 Level",
    ],
    education: [
      {
        period: "Aug 2024 - Present",
        institution: "New Uzbekistan University",
        degree: "Economics and Data Science",
        highlight: true,
      },
      {
        period: "Mar 2025 - Apr 2025",
        institution: "'Blogging' Mentorship by Jasurbek Anvarov",
        certificateTitle: "Successful Graduate",
        highlight: true,
      },
      {
        period: "Oct 2024 - Dec 2024",
        institution: "'0 dan Ssenariy' Mentorship by Umida Kenjayeva",
        certificateTitle: "Successful Graduate",
        highlight: true,
      },
      {
        period: "Oct 2021 - Jun 2024",
        institution: "Presidential School, Samarkand",
        degree: "A Level Curriculum (Biology, CS, Math)",
        highlight: false,
      },
      {
        period: "Sep 2013 - Oct 2021",
        institution: "School #46, Jomboy, Samarkand",
        highlight: false,
      },
    ],
  },

  // Russian content
  ru: {
    timeline: [
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
      "Успешный выпускник курса наставничества в блогинге",
      "Творческий писатель и сценарист – Награда от Умиды Кенжаевой",
      "Улугбек ворислари – Полуфиналист",
      "AIMO – Бронзовая медаль",
      "SEAMO – Бронзовая медаль (2x)",
      "Английский язык – Уровень C1",
    ],
    education: [
      {
        period: "Авг 2024 - Настоящее время",
        institution: "Новый Университет Узбекистана",
        degree: "Экономика и Анализ данных",
        highlight: true,
      },
      {
        period: "Март 2025 - Апр 2025",
        institution: "Менторство «Блогинг» от Жасурбека Анварова",
        certificateTitle: "Успешный выпускник",
        highlight: true,
      },
      {
        period: "Окт 2024 - Дек 2024",
        institution: "Менторство «0 дан Ссенарий» от Умиды Кенжаевой",
        certificateTitle: "Успешный выпускник",
        highlight: true,
      },
      {
        period: "Окт 2021 - Июнь 2024",
        institution: "Президентская школа, Самарканд",
        degree: "Программа A Level (Биология, Информатика, Математика)",
        highlight: false,
      },
      {
        period: "Сент 2013 - Окт 2021",
        institution: "Школа №46, Джомбой, Самарканд",
        highlight: false,
      },
    ],
  },

  // Uzbek content
  uz: {
    timeline: [
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
      "Bloglar bo'yicha murabbiylik bo'yicha muvaffaqiyatli bitiruvchi",
      "Ijodiy yozuvchi va ssenariy muallifi – Umida Kenjayeva tomonidan mukofotlangan",
      "Ulug'bek vorislari – Yarim finalchi",
      "AIMO – Bronza medal",
      "SEAMO – Bronza medal (2x)",
      "Ingliz tili – C1 darajasi",
    ],
    education: [
      {
        period: "Avgust 2024 - Hozirgi kungacha",
        institution: "New Uzbekistan University",
        degree: "Iqtisod va Ma'lumotlar tahlili",
        highlight: true,
      },
      {
        period: "Mart 2025 - Aprel 2025",
        institution: "«Blogging» Mentorlik dasturi - Jasurbek Anvarov",
        certificateTitle: "Muvaffaqiyatli bitiruvchi",
        highlight: true,
      },
      {
        period: "Oktyabr 2024 - Dekabr 2024",
        institution: "«0 dan Ssenariy» Mentorlik dasturi - Umida Kenjayeva",
        certificateTitle: "Muvaffaqiyatli bitiruvchi",
        highlight: true,
      },
      {
        period: "Okt 2021 - Iyun 2024",
        institution: "Prezident maktabi, Samarqand",
        degree: "A Level dasturi (Biologiya, Informatika, Matematika)",
        highlight: false,
      },
      {
        period: "Sentabr 2013 - Oktyabr 2021",
        institution: "46-maktab, Jomboy, Samarqand",
        highlight: false,
      },
    ],
  },
};

export default portfolioContent;
