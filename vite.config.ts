import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "recharts",
              test: /node_modules[\\/]recharts/,
            },
            {
              name: "react-vendor",
              test: /node_modules[\\/](react|react-dom|react-router|scheduler)/,
            },
            {
              name: "i18n",
              test: /node_modules[\\/](i18next|react-i18next)/,
            },
          ],
        },
      },
    },
  },
});
