import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  preset: "vercel",
  serveStatic: true,
  noAnalyze: true,
  routeRules: {
    "/**": { cache: false },
  },
});
