import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
        },
        secondary: {
          DEFAULT: "#4f46e5",
          600: "#4f46e5",
          700: "#4338ca",
        },
        brand: {
          text: "#111827",
          border: "#e5e7eb",
          muted: "#6b7280",
          bg: "#ffffff",
          surface: "#f9fafb",
        },
      },
      boxShadow: {
        glass: "0 4px 24px 0 rgba(37,99,235,0.08), 0 1px 4px 0 rgba(0,0,0,0.04)",
        card: "0 2px 16px 0 rgba(0,0,0,0.07), 0 1px 4px 0 rgba(0,0,0,0.04)",
        "card-hover": "0 8px 32px 0 rgba(37,99,235,0.14), 0 2px 8px 0 rgba(0,0,0,0.06)",
        input: "0 0 0 3px rgba(37,99,235,0.12)",
        btn: "0 4px 14px 0 rgba(37,99,235,0.30)",
        "btn-hover": "0 6px 20px 0 rgba(37,99,235,0.40)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
