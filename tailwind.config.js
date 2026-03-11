/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e6ecf5",
          100: "#b3c4de",
          200: "#809cc8",
          300: "#4d74b1",
          400: "#264da1",
          500: "#003591",
          600: "#002f82",
          700: "#002669",
          800: "#001d50",
          900: "#001337",
        },
      },
    },
  },
  plugins: [],
};
