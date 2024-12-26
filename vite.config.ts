import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
console.log('build')
console.log(import.meta.env.VITE_APP_BASE_URL) // Для Node.js
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
  },
  base: process.env.VITE_APP_BASE_URL || '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@entities': resolve(__dirname, 'src/entities')
    }
  }
})
