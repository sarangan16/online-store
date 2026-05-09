/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#f5e6a3",
          DEFAULT: "#c9a84c",
          dark: "#9a7a30",
        },
        sarans: {
          bg: "#07060d",
          card: "#0f0d1a",
          purple: "#1a1428",
          border: "#2e2050",
          text: "#ede8f5",
          muted: "#7a6a96",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        body: ['"Jost"', "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400% 0" },
          "100%": { backgroundPosition: "400% 0" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201,168,76,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(201,168,76,0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        shimmer: "shimmer 3s infinite linear",
        "slide-down": "slideDown 0.3s ease forwards",
        "pulse-gold": "pulseGold 2s infinite",
        float: "float 4s ease-in-out infinite",
      },
      boxShadow: {
        gold: "0 0 30px rgba(201,168,76,0.15)",
        "gold-lg": "0 0 60px rgba(201,168,76,0.25)",
      },
    },
  },
  plugins: [],
};
