/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sage: '#7C9E8A',
        accent: '#D4875A',
        destructive: '#C97C5D',
        success: '#84A98C',
        light: {
          bg: '#F9FAFB',
          card: '#FFFFFF',
          text: '#1F2937',
          muted: '#6B7280',
          border: '#E5E7EB',
        },
        dark: {
          bg: '#1A1E24',
          card: '#2D333B',
          text: '#E6EDF3',
          muted: '#ADBAC7',
          border: '#404448',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
