const { colors } = require("@mui/material");

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors:{
        customBlue: "#2E3195",
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
