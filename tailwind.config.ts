import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontSize: {
      "h1-mobile": ["32px", "40px"],
      "h2-mobile": ["20px", "28px"],
      "h3-mobile": ["14px", "20px"],
      "h1-desktop": ["40px", "48px"],
      "h2-desktop": ["24px", "32px"],
      "h3-desktop": ["20px", "28px"],
      "body-m": ["16px", "20px"],
      "body-s": ["14px", "18px"],
      "detail-s": ["12px", "16px"],
      "detail-xs": ["10px", "14px"],
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      bold: "700",
    },
  },
  plugins: [],
};
export default config;
