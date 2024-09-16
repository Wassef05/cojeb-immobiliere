import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // ou '0.0.0.0'
    port: process.env.PORT || 5173, // Port fourni par Render ou 5173 par défaut
    strictPort: true, // Important pour forcer Vite à utiliser ce port
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true, // Ajouté pour éviter les problèmes de CORS
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
