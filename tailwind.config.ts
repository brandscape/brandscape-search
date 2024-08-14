import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xxl: { max: "1920px" },
      xl: { max: "1440px" },
      lg: { max: "1280px" },
      md: { max: "992px" },
      sm: { max: "768px" },
      xs: { max: "608px" },
      xxs: { max: "512px" },
    },
    extend: {
      colors: {
        "primary-normal": "rgba(46, 102, 216, 1)",
        "primary-most": "rgba(5, 23, 61, 1)",
        "primary-strong": "rgba(26, 77, 182, 1)",
        "text-normal": "rgba(71, 74, 78, 1)",
        "text-inverse": "rgba(255, 255, 255, 1)",
        "text-minor": "rgba(207, 213, 220, 1)",
      },
      backgroundImage: {
        "brandscape-logo": "",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        color: "color",
        right: "right",
      },
      boxShadow: {
        "tab-shadow":
          "0px 2px 4px 0px rgba(54, 54, 55, 0.06), 0px 4px 8px 0px rgba(54, 54, 55, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
