/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './script.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        sky: {
          300: 'rgba(var(--accent-rgb), <alpha-value>)',
          400: 'rgba(var(--accent-rgb), <alpha-value>)',
          500: 'rgba(var(--accent-rgb), <alpha-value>)',
        },
        blue: {
          400: 'rgba(var(--accent-rgb), <alpha-value>)',
          500: 'rgba(var(--accent-rgb), <alpha-value>)',
        },
      },
    },
  },
};