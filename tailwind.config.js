/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F2137',
          light: '#172840',
          muted: '#8FA3BB',
        },
        cream: {
          DEFAULT: '#F8F5F0',
          dark: '#F0EDE8',
          border: '#E8E4DC',
        },
        brand: {
          DEFAULT: '#2563EB',
          light: '#EEF3FF',
          hover: '#1D4ED8',
        },
      },
    },
  },
  plugins: [],
}
