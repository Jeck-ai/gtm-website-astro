import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// Determine if we're in development or production mode
const isDev = process.env.NODE_ENV === 'development';

// https://astro.build/config
export default defineConfig({
  // For production (GitHub Pages)
  site: isDev ? "http://localhost:4321" : "https://jeck-ai.github.io",
  // Only add the base path for production, not for development
  base: isDev ? "" : "/gtm-website-astro",
  integrations: [mdx(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  // Add image configuration to ensure assets are processed correctly
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
