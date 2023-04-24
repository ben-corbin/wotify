/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx,vue}",
];
export const theme = {
  extend: {},
  fontFamily: {
    'sans': ['Plus Jakarta Text', 'sans-serif'],
    'serif': ['Plus Jakarta Text', 'serif'],
    'mono': ['Plus Jakarta Text', 'monospace'],
    'display': ['Plus Jakarta Text', 'sans-serif'],
  },
};
export const plugins = [];

