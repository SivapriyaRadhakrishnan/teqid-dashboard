import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0EA5E9",
          hover: "#38BDF8",
        },
        sidebar: {
          from: "#1E3A5F",
          to: "#162D4A",
        },
        surface: {
          page: "#F7F9FC",
          card: "#FFFFFF",
        },
        text: {
          primary: "#0A0D14",
          secondary: "#64748B",
          muted: "#94A3B8",
        },
        state: {
          success: "#10B981",
          successBg: "#DCFCE7",
          warning: "#EAB308",
          warningBg: "#FEF9C3",
          error: "#EF4444",
          errorBg: "#FEE2E2",
        },
      },
      boxShadow: {
        soft: "0 1px 4px rgba(15, 23, 42, 0.04)",
        "soft-hover": "0 8px 24px rgba(15, 23, 42, 0.08)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
