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
      colors: {
        "neon-cyan": "#00FFFF",
        "neon-magenta": "#FF00FF",
        "neon-green": "#00FF00",
        "dark-gray": "#1A1A1A",
        "pure-black": "#000000",
        "vivid-blue": "#0F52BA",
        "lawn-green": "#7CFC00",
        "gold": "#FFD700",
        "orange-red": "#FF4500",
        "neon-green-500": "#39ff14",
        "neon-pink": "#ff007f",
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
