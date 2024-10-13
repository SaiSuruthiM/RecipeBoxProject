/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: "#734060", // You can name this color as you like
      },
      fontFamily: {
        domine: ["Domine", "serif"],
      },
      fontFamily: {
        "great-vibes": ['"Great Vibes"', "cursive"],
      },
    },
  },
  plugins: [],
};
