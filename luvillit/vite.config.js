import path from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/For-gllit/',
  build: {
    // Target modern browsers — smaller, faster output
    target: 'es2020',
    // Inline small assets (< 8KB) thành base64 để giảm requests
    assetsInlineLimit: 8192,
    // Tách CSS theo chunk — chỉ load CSS cần thiết
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Tách vendor libraries thành chunks riêng để browser cache tốt hơn
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})
