import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "2.5rem" },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Schibsted Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: "hsl(var(--ink))",
        graphite: {
          DEFAULT: "hsl(var(--graphite))",
          soft: "hsl(var(--graphite-soft))",
        },
        paper: "hsl(var(--paper))",
        deep: "hsl(var(--brand-blue-deep))",
        brand: {
          blue: "hsl(var(--brand-blue))",
          "blue-light": "hsl(var(--brand-blue-light))",
          orange: "hsl(var(--brand-orange))",
          "orange-ink": "hsl(var(--brand-orange-ink))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        sm: "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;
