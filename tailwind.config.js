import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(16, 23, 39, 0.04), 0 1px 3px 0 rgba(16, 23, 39, 0.06)',
        'card-hover': '0 4px 10px -2px rgba(16, 23, 39, 0.10), 0 2px 6px -2px rgba(16, 23, 39, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'rise-in': 'riseIn 0.45s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        riseIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        keenkeeper: {
          primary: '#244D3F',
          'primary-content': '#F8FAFC',
          secondary: '#64748B',
          'secondary-content': '#FFFFFF',
          accent: '#C08A3E',
          'accent-content': '#1F2937',
          neutral: '#1F2937',
          'neutral-content': '#F8FAFC',
          'base-100': '#FFFFFF',
          'base-200': '#F8FAFC',
          'base-300': '#E9E9E9',
          'base-content': '#101727',
          info: '#3B82C4',
          'info-content': '#F8FAFC',
          success: '#1F7A4D',
          'success-content': '#F8FAFC',
          warning: '#C8860A',
          'warning-content': '#1F2937',
          error: '#C0392B',
          'error-content': '#F8FAFC',

          '--rounded-box': '1rem',
          '--rounded-btn': '0.65rem',
          '--rounded-badge': '1.9rem',
          '--tab-radius': '0.65rem',
        },
      },
    ],
    darkTheme: 'keenkeeper',
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
}
