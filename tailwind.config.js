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
          blue: '#4F46E5',       // Electric Indigo
          cyan: '#89ceff',       // Luminous Cyan
          dark: '#0b1326',       // Dark Midnight / Surface
          slate: '#131b2e',      // Surface container low
          card: '#171f33',       // Surface container
          textPrimary: '#dae2fd',// On-surface
          textSecondary: '#c7c4d8', // On-surface-variant
          border: '#464555',     // Outline-variant
          highlight: '#c3c0ff',  // Luminous primary
        },
        slate: {
          950: '#060e20',        // Surface container lowest
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-slow': 'marquee 35s linear infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // To loop infinitely, the content is duplicated.
        },
        glow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(40px)' },
          '50%': { opacity: '0.9', filter: 'blur(60px)' },
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
