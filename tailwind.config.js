/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontSize: {
        md: "16px",
        "3xl": "32px"
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          // foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          // foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
        },
        "fit-background": {
          DEFAULT: "rgba(0, 0, 0, 0.5)",
          lighter: "rgba(0, 0, 0, 0.35)",
          darker: "rgba(0, 0, 0, 0.65)",
        },
        modern: {
          DEFAULT: "#455A64",
          secondary: "#B9BBBB"
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

