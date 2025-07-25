import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    VitePWA({
      // Automatically register the service worker
      registerType: "autoUpdate",
      // Enable injection of the registration script into index.html
      injectRegister: "auto",
      // Define what to include in the precache
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
      },
      manifest: {
        short_name: "Foodinator",
        name: "Foodinator - Weekly Meal & Grocery Planner",
        description: "Plan your weekly meals and automatically generate grocery lists. Works offline!",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        start_url: ".",
        display: "standalone",
        orientation: "portrait-primary",
        theme_color: "#DE6052",
        background_color: "#F5F4F4",
        categories: ["food", "lifestyle", "productivity"],
        scope: "/",
      },
    }),
  ],
  base: "/foodinator/",
});
