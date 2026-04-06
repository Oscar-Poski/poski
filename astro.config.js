import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const githubOwner = process.env.GITHUB_REPOSITORY_OWNER;
const site =
  process.env.SITE_URL ??
  (githubOwner ? `https://${githubOwner}.github.io` : 'https://example.com');

export default defineConfig({
  site,
  base: '/poski',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});
