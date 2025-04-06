// @ts-check
import { defineConfig } from "astro/config";
// import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import clerk from "@clerk/astro";
import svelte from "@astrojs/svelte";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [clerk(), svelte()],
  output: "server",
  adapter: cloudflare(),
});
