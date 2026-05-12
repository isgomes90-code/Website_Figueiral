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
        dusk: "#2A221D",
        ember: "#3A312A",
        cream: "#F8F3EC",
        paper: "#F6F1EA",
        sand: "#F0E7DC",
        linen: "#DFD1C0",
        sage: "#7A8471",
        olive: "#DFD1C0",
        charcoal: "#2D251F",
        walnut: "#6F6459",
        gold: "#9C7957",
        wine: "#5A1F2E"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        luxury: "0 22px 58px rgba(80, 56, 38, 0.1)"
      },
      backgroundImage: {
        "radial-gold": "radial-gradient(circle at top, rgba(156, 121, 87, 0.14), transparent 34rem)",
        "olive-glow": "linear-gradient(135deg, rgba(243, 238, 231, 0.95), rgba(239, 231, 221, 0.98))"
      }
    }
  },
  plugins: []
};

export default config;
