import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      Components: path.resolve(__dirname, "src/Components"),
      modules: path.resolve(__dirname, "src/modules"),
      assets: path.resolve(__dirname, "src/assets"),
      contexts: path.resolve(__dirname, "src/contexts"),
    },
  },
});
