/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [
    // optional, useful for nicer form inputs:
    // require('@tailwindcss/forms')
  ],
};
