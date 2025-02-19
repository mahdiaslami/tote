import type { Config } from 'tailwindcss'

// ## Colors
// - white
// - black
// - slate
// - emerald
// - rose
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    fontFamily: {
      default: ['Vazirmatn', 'Noto Color Emoji'],
    },

    extend: {
      colors: {
        force: 'rgb(var(--color-force) / <alpha-value>)',
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        blink: {
          '0%, 50%': { visibility: 'hidden' },
          '51%, 100%': { visibility: 'visible' },
        }
      },

      animation: {
        wiggle: 'wiggle 0.2s ease-in-out infinite',
        blink: 'blink 1s infinite'
      },

      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '18': '4.5rem',
      },

      fontSize: {
        '2.5xl': ['1.6875rem', '2.125rem'],
      }
    },
  },
  plugins: [],
} satisfies Config