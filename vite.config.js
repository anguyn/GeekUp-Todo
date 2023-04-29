import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import html from "vite-plugin-html";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
