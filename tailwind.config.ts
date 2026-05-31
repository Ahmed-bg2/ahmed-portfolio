import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#030511",
        "ink-soft": "#081226",
        cyan: {
          aura: "#67e8f9",
          edge: "#22d3ee"
        }
      },
      boxShadow: {
        glow: "0 0 42px rgba(125, 211, 252, 0.24)",
        "glow-strong": "0 0 70px rgba(52, 211, 153, 0.22), 0 0 92px rgba(244, 114, 182, 0.16)"
      },
      backgroundImage: {
        "radial-cyan": "radial-gradient(circle at center, rgba(125, 211, 252, 0.22), rgba(52, 211, 153, 0.08) 38%, transparent 62%)"
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" }
        }
      },
      animation: {
        shimmer: "shimmer 2.6s ease-in-out infinite",
        "spin-slow": "spinSlow 12s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
