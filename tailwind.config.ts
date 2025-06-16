import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        prompt: "rgb(86, 104, 175)",
      },
    },
  },
};

export default config;
