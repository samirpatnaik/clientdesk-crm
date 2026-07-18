// AI assisted development
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f8f5',
          100: '#eef0ea',
          200: '#d8ddd0',
          500: '#5c6b5a',
          700: '#3d4a3c',
          800: '#2c362c',
          900: '#1a211a',
        },
        moss: {
          500: '#4a7c59',
          600: '#3d684a',
          700: '#32553d',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Segoe UI', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
