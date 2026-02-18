import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sanity/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["ui-serif", "Georgia", "Times New Roman", "serif"],
        sans: ["ui-sans-serif", "system-ui", "Inter", "Arial", "sans-serif"],
      },
      letterSpacing: {
        wide2: "0.18em",
      },
    },
  },
  plugins: [],
} satisfies Config;
