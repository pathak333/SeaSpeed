/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        IbColor: "#2C77CF",
        inputBorderColor: "#C7C7C7",
        activeIconColor: "#0075FF",
        bodyBackground: "#1E1E1E",
        textGrey: "#A5A5A5",
      },
    },
  },
  plugins: [],
};
