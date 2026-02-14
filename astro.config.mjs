import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://example.github.io',
  base: '/poski/',
  output: 'static',
  integrations: [mdx()]
});
