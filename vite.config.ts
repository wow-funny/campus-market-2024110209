import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/trades': 'http://localhost:3000',
      '/lostFounds': 'http://localhost:3000',
      '/groupBuys': 'http://localhost:3000',
      '/errands': 'http://localhost:3000',
    },
  },
})
