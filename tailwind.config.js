/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF0EC",
        "cream-dark": "#F5E4DC",
        maroon: {
          DEFAULT: "#8A2A1D",
          dark: "#6E2016",
          light: "#B3543F",
        },
        forest: {
          DEFAULT: "#1F3D2E",
          light: "#2C5443",
        },
        gold: {
          DEFAULT: "#C99A4A",
          light: "#E7D3A8",
        },
        ink: "#2B211D",
        "ink-muted": "#6B5F58",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Helvetica Neue", "Arial", "sans-serif"],
      },
      borderRadius: {
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};