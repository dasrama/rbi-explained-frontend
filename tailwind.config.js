/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          base: '#0b0f19',
          light: '#f8fafc',
        },
        surface: {
          base: '#0f172a',
          card: '#111827',
          active: '#1e293b',
          light: '#ffffff',
          'light-card': '#f1f5f9',
          'light-active': '#e2e8f0',
        },
        border: {
          subtle: '#334155',
          light: '#cbd5e1',
        },
        sovereign: {
          blue: '#3b82f6',
          'blue-dark': '#1e40af',
          'blue-glow': '#60a5fa',
          emerald: '#10b981',
          'emerald-glow': '#34d399',
          ruby: '#ef4444',
          'ruby-glow': '#f87171',
          amber: '#f59e0b',
          'amber-glow': '#fbbf24',
        },
        financial: {
          navy: '#0b0f19',
          panel: '#0f172a',
          elevated: '#1e293b',
          divider: '#334155',
          primary: '#f8fafc',
          muted: '#94a3b8',
          secondary: '#cbd5e1',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '9999px', // allowed for pills if specified
      },
    },
  },
  plugins: [],
}
