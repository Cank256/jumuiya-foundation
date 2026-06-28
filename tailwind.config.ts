import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors derived from Jumuiya Development Foundation logo
        paper: "#f4f7f9",        // cool off-white background
        navy: "#1a3a52",         // deep navy — circle outline & primary text
        gold: "#e8a830",         // amber — Venn bottom-left circle
        teal: "#4a9db5",         // teal — Venn bottom-right circle
        primary: "#3a6f8a",      // steel blue — Venn top circle, buttons & links
        "primary-dark": "#2d5a72", // darker steel blue — hover states
      },
      fontFamily: {
        serif: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
