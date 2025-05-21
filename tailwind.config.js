/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neutral-850': '#1a1a1a',
        primary: {
          50: '#FFF7E6',
          100: '#FFE5B2',
          200: '#FFD480',
          300: '#FFC14D',
          400: '#FFB01A',
          500: '#E69500', // Gold primary
          600: '#B37400',
          700: '#805300',
          800: '#4D3200',
          900: '#1A1100',
        },
        secondary: {
          50: '#E6F3FF',
          100: '#B2DDFF',
          200: '#80C7FF',
          300: '#4DB1FF',
          400: '#1A9BFF',
          500: '#0077E6', // Blue primary
          600: '#005CB3',
          700: '#004280',
          800: '#00284D',
          900: '#000E1A',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};