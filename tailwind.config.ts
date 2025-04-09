import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-playfair)"],
        mono: [
          "var(--font-space-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      colors: {
        zinc: {
          950: "#09090b",
          900: "#18181b",
          800: "#27272a",
          700: "#3f3f46",
          600: "#52525b",
          500: "#71717a",
          400: "#a1a1aa",
          300: "#d4d4d8",
          200: "#e4e4e7",
          100: "#f4f4f5",
          50: "#fafafa",
        },
        indigo: {
          950: "#1e1b4b",
          900: "#312e81",
          800: "#3730a3",
          700: "#4338ca",
          600: "#4f46e5",
          500: "#6366f1",
          400: "#818cf8",
          300: "#a5b4fc",
          200: "#c7d2fe",
          100: "#e0e7ff",
          50: "#eef2ff",
        },
        // Replace pink colors with beige tones (keeping the pink name)
        pink: {
          950: "#3c2217", // Dark beige/brown
          900: "#6f442e",
          800: "#874f37",
          700: "#a5623e",
          600: "#c2784a",
          500: "#d18f59", // Main beige tone
          400: "#daa97a",
          300: "#e5c49e",
          200: "#efdbc2",
          100: "#f7ede3",
          50: "#fdf8f1", // Lightest beige
        },
        // Replace amber colors with terracotta (keeping the amber name)
        amber: {
          950: "#351a15", // Dark terracotta
          900: "#653428",
          800: "#783c2f",
          700: "#934735",
          600: "#b15c3f",
          500: "#c0714d", // Main terracotta
          400: "#cd8c6d",
          300: "#ddb29a",
          200: "#ead1c2",
          100: "#f5eae3",
          50: "#fbf6f3", // Lightest terracotta
        },
        // Optional: Add real beige/terracotta for new components
        beige: {
          500: "#d18f59",
        },
        terracotta: {
          500: "#c0714d",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        noise: "url('/noise.svg')",
      },
      boxShadow: {
        // Keep existing shadow names but update their colors
        glow: "0 0 20px rgba(209, 143, 89, 0.3)", // Updated to beige
        "glow-strong": "0 0 30px rgba(209, 143, 89, 0.5)", // Updated to beige
      },
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
      },
      blur: {
        "4xl": "72px",
        "5xl": "96px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

export default config;
