import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-alt": "rgb(var(--surface-alt) / <alpha-value>)",
        "surface-soft": "rgb(var(--surface-soft) / <alpha-value>)",
        "surface-strong": "rgb(var(--surface-strong) / <alpha-value>)",
        outline: "rgb(var(--outline) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        charcoal: "rgb(var(--charcoal) / <alpha-value>)",
        "editorial-highlight": "rgb(var(--editorial-highlight) / <alpha-value>)",
        focus: "rgb(var(--focus) / <alpha-value>)",
      },
      maxWidth: {
        container: "1280px",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        flat: "0 0 0 1px rgba(79,68,69,0.14)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(26px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
