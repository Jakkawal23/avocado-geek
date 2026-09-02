import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette lifted from the Avocado Geek design file.
        cream: "#FBFAF6",
        beige: "#F3F1E8",
        border: "#E7E4D9",
        avocado: {
          DEFAULT: "#2D5F2E",
          dark: "#1F4420",
          light: "#70B75C",
          pale: "#EAF3E6",
          paler: "#CFE2CB",
        },
        pit: {
          DEFAULT: "#F5A623",
          light: "#FFB846",
          dark: "#3A2A00",
        },
        ink: {
          DEFAULT: "#2C2C2C",
          soft: "#4A4A42",
          muted: "#666666",
          faint: "#7A7A70",
          fainter: "#9A9A90",
        },
      },
      fontFamily: {
        sans: ["var(--font-sarabun)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-sarabun)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "'Courier New'", "monospace"],
      },
      borderRadius: {
        xl2: "20px",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
