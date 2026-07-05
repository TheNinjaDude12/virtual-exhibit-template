import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [mdx(), react(), icon()],
  site: 'https://virtual-exhibit-template.onrender.com',
  base: 'virtual-exhibit-template',
  outDir: './dist',
  vite: {
    assetsInclude: ['**/*.glb'],
  },
});
