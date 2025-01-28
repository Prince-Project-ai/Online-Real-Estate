/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        tada: "tada 1s ease-in-out",
      },
      keyframes: {
        tada: {
          "0%": { transform: "scale(1)" },
          "10%, 20%": { transform: "scale(0.9) rotate(-3deg)" },
          "30%, 50%, 70%, 90%": { transform: "scale(1.1) rotate(3deg)" },
          "40%, 60%, 80%": { transform: "scale(1.1) rotate(-3deg)" },
          "100%": { transform: "scale(1) rotate(0)" },
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
