import type { Config } from 'tailwindcss'

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
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: {
          1: 'rgb(var(--color-secondary-1) / <alpha-value>)',
          2: 'rgb(var(--color-secondary-2) / <alpha-value>)',
          3: 'rgb(var(--color-secondary-3) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
        },
        success: 'rgb(var(--color-success) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        force: 'rgb(var(--color-force) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        pen: 'rgb(var(--color-pen-primary) / <alpha-value>)'
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        blink: {
          '0%, 50%': { visibility: 'hidden' },
          '51%, 100%': { visibility: 'visiable' },
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