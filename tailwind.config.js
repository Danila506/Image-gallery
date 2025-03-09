export default {
    content: ["./index.html", "./src/**/*.{html,js}"],
    theme: {
      extend: {
        animation: {
          "gradient-shift": "gradientShift 3s ease infinite",
        },
        keyframes: {
          gradientShift: {
            "0%, 100%": { "background-position": "0% 50%" },
            "50%": { "background-position": "100% 50%" },
          },
        },
      },
    },
    plugins: [],
  };