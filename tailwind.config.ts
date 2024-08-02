import type { Config } from "tailwindcss"

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   daisyui: {
      themes: [
         {
            dark: {
               primary: "#928BF9",
               secondary: "#f5f5f5", // for text
               accent: "#180161", // secondary primary
               neutral: "#3d4451",
               "base-100": "#000000",
            },
         },
         {
            light: {
               primary: "#928BF9",
               secondary: "#36454F", // for text
               accent: "#180161",
               neutral: "#3d4451",
               "base-100": "#FFFFFF",
            },
         },
      ],
   },
   plugins: [require("daisyui")],
}
export default config
