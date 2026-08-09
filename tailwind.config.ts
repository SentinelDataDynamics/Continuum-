import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0E1A2B",
          soft: "#16263C",
          faint: "#22344C",
        },
        parchment: {
          DEFAULT: "#F7F3EA",
          dim: "#EFE9DA",
          line: "#DED5C0",
        },
        signet: {
          DEFAULT: "#B4823D",
          bright: "#CB9A52",
          dim: "#8C6529",
        },
        verdigris: {
          DEFAULT: "#3F5449",
          bright: "#54705F",
        },
        stone: {
          DEFAULT: "#8C8577",
          light: "#B7B0A0",
        },
        rust: {
          DEFAULT: "#A1503A",
          bright: "#BC6448",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "42rem",
        content: "72rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
