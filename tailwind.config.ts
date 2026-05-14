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
          bg: "#fdf0f5",
          card: "#f8dced",
          accent: "#d4688f",
          "accent-light": "#e8a8c0",
          text: "#3a1828",
          muted: "#b07090",
          secondary: "#7a4060",
        },
        offwhite: {
          bg: "#faf5f8",
          card: "#f2e4ec",
          accent: "#b05878",
          "accent-light": "#cea0b5",
          text: "#2a1820",
          muted: "#9a7085",
          secondary: "#6a4055",
        },
      },
    },
  },
  plugins: [],
};
export default config;
