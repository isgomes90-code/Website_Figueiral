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
        cream: "#F6F1EA",
        paper: "#F3EEE7",
        sand: "#EFE7DD",
        linen: "#DDD0C1",
        sage: "#7A8471",
        olive: "#DDD0C1",
        charcoal: "#2B211B",
        walnut: "#6E6257",
        gold: "#A67C52",
        wine: "#5A1F2E"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        luxury: "0 24px 70px rgba(80, 56, 38, 0.12)"
      },
      backgroundImage: {
        "radial-gold": "radial-gradient(circle at top, rgba(166, 124, 82, 0.16), transparent 34rem)",
        "olive-glow": "linear-gradient(135deg, rgba(243, 238, 231, 0.95), rgba(239, 231, 221, 0.98))"
      }
    }
  },
  plugins: []
};

export default config;
