/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // Primary electric blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          accent: '#0066FF',
        },
        navy: {
          950: '#030712',
          900: '#060B18', // Deep space dark navy
          850: '#0B132B',
          800: '#0F1D38',
          700: '#17274D',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        handwriting: ['Caveat', 'Playpen Sans', 'cursive'],
      },
      boxShadow: {
        'glow': '0 0 35px -5px rgba(37, 99, 235, 0.45)',
        'glow-lg': '0 0 60px -10px rgba(37, 99, 235, 0.55)',
        'card': '0 2px 20px -2px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 12px 35px -5px rgba(15, 23, 42, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
