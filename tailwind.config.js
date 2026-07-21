/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'spin-grow': {
          from: { transform: 'rotate(0deg) scale(1.1)' },
          to: { transform: 'rotate(360deg) scale(1.1)' },
        },
      },
      animation: {
        'spin-grow': 'spin-grow 3s linear infinite',
      },
    },
  },
  plugins: [],
}