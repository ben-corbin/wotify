/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Plus Jakarta Text', 'sans-serif'],
      'serif': ['Plus Jakarta Text', 'serif'],
      'mono': ['Plus Jakarta Text', 'monospace'],
      'display': ['Plus Jakarta Text', 'sans-serif'],
    },
  },
  plugins: [],
}

