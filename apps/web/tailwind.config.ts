/** @type {import('tailwindcss').Config} */

import { themeConfig } from "../../themeConfig";

export const config = {
  ...themeConfig,
  content: [
    "./src/pages/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/ui/**/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx,md}",
  ],

  plugins: [require("tailwindcss-animate")],
};
export default config;
