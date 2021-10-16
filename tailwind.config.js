const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        sm: ["0.875rem", "1"],
        base: ["0.875rem", "1"],
        lg: ["1.25rem", "2"],
        xl: [
          "1.56rem",
          {
            letterSpacing: "-0.02em",
            lineHeight: "2",
          },
        ],
        "2xl": ["3.25rem", "2"],
      },
    },
    colors: {
      ...colors,
      primary: "#e3bd00",
      accent: "#333808",
      secondary: "#ff0000",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
