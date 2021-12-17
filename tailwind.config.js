const { colors } = require('@resir014/chungking-core');

/* eslint-disable global-require */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('@resir014/tailwind-preset-chungking')],
  theme: {
    extend: {
      colors: {
        gray: colors.grey,
      },
      boxShadow: {
        'header-inset': `inset 0 -1px ${colors.grey[800]}`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
