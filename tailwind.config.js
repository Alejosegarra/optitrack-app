/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#005A9C',
        'brand-blue-light': '#007BCC',
        'brand-gray': {
          '50': '#F7FAFC',
          '100': '#EDF2F7',
          '200': '#E2E8F0',
          '300': '#CBD5E0',
          '400': '#A0AEC0',
          '500': '#718096',
          '600': '#4A5568',
          '700': '#2D3748',
          '800': '#1A202C',
        }
      }
    },
  },
  plugins: [],
}
