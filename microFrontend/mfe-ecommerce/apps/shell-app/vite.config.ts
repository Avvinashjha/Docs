import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell_app",

      remotes: {
        product_mfe: "http://localhost:5005/assets/remoteEntry.js",
      },

      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    port: 5004,
  },

  build: {
    target: "esnext",
  },
});