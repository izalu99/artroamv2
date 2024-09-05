import type { Config } from "tailwindcss";
import daisyui from "daisyui";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [daisyui],
  daisyui:{
    themes: [
      {
        'mytheme': {
          'primary': '#00FFFF',  // Neon Cyan
          'secondary': '#FF00FF',  // Neon Magenta
          'accent': '#00FF00',  // Neon Green
          'neutral': '#1A1A1A',  // Dark Gray/Almost Black
          'base-100': '#000000',  // Pure Black
          'info': '#0F52BA',  // Vivid Blue
          'success': '#7CFC00',  // Lawn Green
          'warning': '#FFD700',  // Gold
          'error': '#FF4500',  // Orange Red
        },

      },
    ]
  }
};
export default config;
