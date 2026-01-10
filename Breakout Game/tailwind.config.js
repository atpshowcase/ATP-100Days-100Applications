/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        neon: {
          pink: '#ff006e',
          cyan: '#00f5ff',
          purple: '#8338ec',
          yellow: '#ffbe0b',
          green: '#06ffa5',
        },
      },
      boxShadow: {
        'neon-pink': '0 0 20px #ff006e, 0 0 40px #ff006e',
        'neon-cyan': '0 0 20px #00f5ff, 0 0 40px #00f5ff',
        'neon-purple': '0 0 20px #8338ec, 0 0 40px #8338ec',
      },
    },
  },
  plugins: [],
}
