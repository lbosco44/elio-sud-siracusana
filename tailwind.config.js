/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E8671A',
          dark: '#C8540F',
          light: '#FFA46A',
          50: '#FFF4EC',
          100: '#FFE3CF',
        },
        ink: '#1C1C1E',
        cream: '#FAF8F4',
        muted: '#6B6B6B',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(28, 28, 30, 0.15)',
        cardHover: '0 25px 45px -15px rgba(28, 28, 30, 0.25)',
        nav: '0 6px 20px -10px rgba(28, 28, 30, 0.15)',
      },
      transitionTimingFunction: {
        'smooth-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
