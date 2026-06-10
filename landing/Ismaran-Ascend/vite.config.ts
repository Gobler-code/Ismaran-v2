import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite"; // <-- Correct internal path
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    react(),
    nitro({
      preset: "vercel", // Bypasses Cloudflare lock-in completely
    }),
  ],
});