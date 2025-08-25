import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import ViteSitemapPlugin from "vite-plugin-sitemap";
import {VITE_BASE_URL} from "./src/env.ts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteSitemapPlugin({
      hostname: VITE_BASE_URL, // ganti sesuai domain
      outDir: "dist",
      dynamicRoutes: ["/", "/login", "/register"], // tambahin routes
    }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
