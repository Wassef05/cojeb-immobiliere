import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // ou '0.0.0.0'
    port: process.env.PORT || 5173, 
    strictPort: true, // Important pour forcer Vite à utiliser ce port
    proxy: {
      '/api': {
        target: 'https://cogeb-immobiliere-api.onrender.com',
        changeOrigin: true, 
        secure: false,
      },
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
