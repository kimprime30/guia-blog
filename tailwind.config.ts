import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enable dark mode via class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        darkBackground: "#1a202c",
      },
    },
  },
  plugins: [],
};

export default config;
