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
                'nokia-green': '#9bc700',
                'nokia-dark': '#0a0e0a',
                'nokia-light': '#c7f464',
            },
            fontFamily: {
                'pixel': ['"Press Start 2P"', 'cursive'],
            },
        },
    },
    plugins: [],
}
