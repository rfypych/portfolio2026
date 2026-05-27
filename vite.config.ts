import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sitemap from 'vite-plugin-sitemap';
import { robots } from 'vite-plugin-robots';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    sourcemap: true,
    // terserOptions:
    chunkSizeWarningLimit: 1600,
  },
  plugins: [
    tailwindcss(),
    vue(),
    robots(),
    sitemap({
      hostname: 'https://rofikul.vercel.app',
      changefreq: 'weekly',
      priority: 1,
      exclude: ['/google27c845ab1b2a56e0', '/google27c845ab1b2a56e0.html']
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    // watch: {
    //   usePolling: true,
    //   interval: 1000,
    //   ignored: ['!**/src/**/*.{js,ts,jsx,tsx}'],
    // },
  },
  optimizeDeps: {
    exclude: ['@tailwindcss/vite'],
    force: true,
  },
});
