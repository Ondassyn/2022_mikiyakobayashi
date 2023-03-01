const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-hiragino)', ...fontFamily.sans],
      },
      keyframes: {
        'slide-down': {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(0%)',
          },
        },
        'slide-up': {
          '0%, 50%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0%)',
          },
        },
      },
      animation: {
        'slide-down': 'slide-down 1s',
        'slide-up': 'slide-up 2s',
      },
    },
  },
  plugins: [],
};
