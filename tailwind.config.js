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
          blue: '#1E88FF',       // Electric Blue
          cyan: '#00C2FF',       // Cyan Blue
          dark: '#050816',       // Deep Navy Black
          slate: '#0B1220',      // Dark Slate
          card: '#111827',       // Soft Dark
          textPrimary: '#F8FAFC',// Primary Text
          textSecondary: '#94A3B8', // Secondary Text
          border: '#1E293B',     // Soft Blue Gray
          highlight: '#C7D2FE',  // Silver Blue
        },
        slate: {
          950: '#050506',
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
