/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // --- BAGIAN ANIMATION ---
      animation: {
        blob: "blob 7s infinite", 
        'scan': 'scan 3s linear infinite', 
        'music-bar': 'music-bar 0.5s ease-in-out infinite alternate', 
      },
      // --- BAGIAN KEYFRAMES ---
      keyframes: {
        blob: { 
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        'music-bar': {
          '0%': { height: '20%' },
          '100%': { height: '100%' },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Plugin sudah digabung disini
  ],
}