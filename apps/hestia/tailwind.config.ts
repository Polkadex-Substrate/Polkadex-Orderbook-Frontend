/** @type {import('tailwindcss').Config} */

import { themeConfig } from "../../themeConfig";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  ...themeConfig,
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    preflight: false,
  },
};
export default config;
