/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          green: '#22c55e',
          amber: '#d4af37',
          red: '#ef4444',
        },
        gallery: {
          gold: '#d4af37',
          bronze: '#cd7f32',
          silver: '#c0c0c0',
        }
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotate 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'terminal-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(212 175 55 / 0.5)' },
          '100%': { boxShadow: '0 0 20px rgb(212 175 55 / 0.8)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};