/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-green-800',
    'hover:scale-110',
  ],
  theme: {
    extend: {
      animation: {
          bounce200: 'bounce 1s infinite 200ms',
          bounce400: 'bounce 1s infinite 400ms',
          linear: 'scroll 40s linear infinite',
          fall: "fall 10s linear infinite",
          sway: "sway 5s ease-in-out infinite",
          glow: "glow 1.5s infinite",
      },
      boxShadow: {
        'full': '0 0px 10px 1px rgba(0, 0, 0, 0.3)',
      },
      dropShadow: {
        'full': '0 0px 10px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        'back-color': '#F4F6FA',
        'txt-color': '#2A3256',
        christmasRed: "#D72638",
        christmasGreen: "#04A777",
      },
      keyframes: {
        fall: {
          "0%": { transform: "translateY(-100px)" },
          "100%": { transform: "translateY(100vh)" },
        },
        sway: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(20px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px #D72638, 0 0 20px #04A777" },
          "50%": { boxShadow: "0 0 20px #D72638, 0 0 30px #04A777" },
        },
      },
      
  },
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   'facebook': '#3b5998',
    //   'google': '#dd4b36',
    // },
  },
  plugins: [],
}

