import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "product_mfe",

      filename: "remoteEntry.js",

      exposes: {
        "./ProductPage": "./src/ProductPage.tsx",
      },

      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    port: 5005,
  },

  preview: {
    port: 5005,
    strictPort: true,
  },

  build: {
    target: "esnext",
    // Default minify runs before the plugin can rewrite `__v__css__` markers in remoteEntry (Vite 8 + esbuild).
    minify: false,
  },
});