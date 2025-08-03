/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1A5D1A',
        'secondary': '#F2C94C',
        'background': '#F7F6F2',
        'text-main': '#333333',
        'text-light': '#666666',
        'accent': '#FF6B6B',
      },
      fontFamily: {
        sans: ['"Pretendard"', 'sans-serif'],
      },
      fontSize: {
        'hero': '3.5rem',
        'h1': '2.5rem',
        'h2': '2rem',
        'h3': '1.75rem',
        'body': '1rem',
        'caption': '0.875rem',
      },
    },
  },
  plugins: [],
}
