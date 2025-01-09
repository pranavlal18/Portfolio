/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        spinPulse: "spinPulse 2s infinite",
        
      },
      keyframes: {
        spinPulse: {
          "0%, 100%": {
            transform: "rotate(0deg) scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "rotate(180deg) scale(1.2)",
            opacity: "0.8",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

