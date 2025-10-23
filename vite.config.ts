import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: false,
        propsDestructure: false
      }
    })
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
  server: {
    port: 8081,
    host: true,
    open: true
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          'vendor-ui': ['bootstrap', 'bootstrap-vue-next'],
          'vendor-charts': ['apexcharts', 'vue3-apexcharts'],
          'vendor-utils': ['axios', 'crypto-js', 'uuid']
        }
      }
    }
  },
  
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'axios']
  }
})