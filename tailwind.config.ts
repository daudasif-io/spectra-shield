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
        "orano-yellow": "#F5C800",
        "orano-dark": "#0A0C0F",
        "orano-mid": "#111418",
        "orano-wire": "#1E2530",
        "orano-text": "#C8CDD4",
      },
      fontFamily: {
        mono: ["'Courier New'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
        display: ["'Rajdhani'", "sans-serif"],
      },
      letterSpacing: {
        ultrawide: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;