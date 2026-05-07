import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      colors: {
        pink: {
          bg: "#f9eee8",
          card: "#f3e0d8",
          accent: "#c9856a",
          "accent-light": "#e8b5a2",
          text: "#3a2218",
          muted: "#b08070",
          secondary: "#7a5548",
        },
        offwhite: {
          bg: "#f5f2ee",
          card: "#ede9e3",
          accent: "#8a7060",
          "accent-light": "#b8a898",
          text: "#2a2018",
          muted: "#9a8878",
          secondary: "#6a5848",
        },
      },
    },
  },
  plugins: [],
};
export default config;
