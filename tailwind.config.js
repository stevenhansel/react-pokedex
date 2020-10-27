module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      screens: {
        xs: { max: "400px" },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#E3350D",
        primaryGray: "#919191",
        secondaryGray: "#F2F1F0",
        primaryYellow: "",
        primaryBlue: "",
        primaryGreen: "",
      },
    },
  },
};
