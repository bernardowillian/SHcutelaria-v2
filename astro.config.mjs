import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  site: process.env.SITE_URL || 'https://shcutelaria.com.br',
  trailingSlash: 'always',
  build: { format: 'directory' }
});
