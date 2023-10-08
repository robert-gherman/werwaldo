/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"PT Sans"', "sans-serif"],
    },

    extend: {
      colors: {
        cyan: "#28536B",
        yellowGreen: "#E9B824",
        yellowDark: "#6f5506",
      },
    },
  },
  plugins: [require("daisyui")],
};
