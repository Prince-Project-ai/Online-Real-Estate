/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        tada: "tada 1s ease-in-out",
        slideDown: "slideDown 0.5s ease-in-out",
        bounce: "bounce 1s ease-in-out",
      },
      keyframes: {
        tada: {
          "0%": { transform: "scale(1)" },
          "10%, 20%": { transform: "scale(0.9) rotate(-3deg)" },
          "30%, 50%, 70%, 90%": { transform: "scale(1.1) rotate(3deg)" },
          "40%, 60%, 80%": { transform: "scale(1.1) rotate(-3deg)" },
          "100%": { transform: "scale(1) rotate(0)" },
        },
        slideDown: {
          "0%": {
            transform: "translateY(-50%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-20px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        heading: ["Lobster", "serif"],
        description: ["Libre Franklin", "sans-serif"],
        inter: ["Inter", "serif"],
      },

      colors: {
        dark: "#17191b",
      },
      backgroundColor: {
        body: "white",
        dark: "#17191b",
        secondary: "#EEEEEE",
      },
      backgroundImage: {
        "grid-pattern": `linear-gradient(to right, #e0e0e0 1px, transparent 1px),
                         linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)`,
      },
      backgroundSize: {
        "grid-size": "20px 20px", // Adjusted grid spacing for better visibility
      },
    },
  },
  plugins: [],
};

// 'heading': ['Vast Shadow', 'cursive'],
