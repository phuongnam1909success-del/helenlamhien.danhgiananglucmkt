/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brandCyan: '#5ce1e6',
        brandTeal: '#0c4348',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        title: ['Roboto', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
