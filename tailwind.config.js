/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontSize: {
        md: "16px",
        "3xl": "32px",
        xb: "32px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
      animation: {
        "magnify": "magnify 0.3s ease",
      },
      keyframes: {
        "magnify": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      }
    },
  },
  safelist:[
	  "row-start-1",
	  "row-start-2",
	  "row-start-3",
	  "row-start-4",
	  "row-start-5",
	  "row-start-6",
	  "row-start-7",
	  "row-start-8",
	  "row-start-9",
	  "row-start-10",
	  "row-span-1",
	  "row-span-2",
	  "row-span-3",
	  "row-span-4",
  ],
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

