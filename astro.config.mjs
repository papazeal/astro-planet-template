// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import clerk from "@clerk/astro";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    // server: {
    //   watch: {
    //     ignored: ["**/content/**"],
    //   },
    // },
  },
  integrations: [clerk(), svelte()],
  output: "server",
  adapter: vercel({
    imageService: true,
    isr: {},
  }),
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
});
