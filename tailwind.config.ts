import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F6EDDF",
        sand: "#D9C2A3",
        sage: "#78866B",
        olive: "#232D1F",
        charcoal: "#121212",
        walnut: "#5A3825",
        gold: "#B69054",
        wine: "#5A1F2E"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        luxury: "0 24px 80px rgba(0, 0, 0, 0.28)"
      },
      backgroundImage: {
        "radial-gold": "radial-gradient(circle at top, rgba(182, 144, 84, 0.22), transparent 34rem)",
        "olive-glow": "linear-gradient(135deg, rgba(35, 45, 31, 0.95), rgba(18, 18, 18, 0.98))"
      }
    }
  },
  plugins: []
};

export default config;
