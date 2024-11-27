const { colors } = require("@mui/material");

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors:{
        'custom-grey': '#F6F6F6',
      }
    },
  },
  plugins: [],
};
