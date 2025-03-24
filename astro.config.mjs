// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import clerk from "@clerk/astro";

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [clerk({
     appearance: {
      elements: {
        footer: 'hidden!'
      }
    }
  }), svelte()],
  output: 'server',
  adapter: vercel(),
});