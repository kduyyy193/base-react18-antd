/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'not-found':
          "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
      },
    },
  },
  plugins: [],
};
