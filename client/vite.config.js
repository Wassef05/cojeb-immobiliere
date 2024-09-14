import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Écoute sur toutes les interfaces
    port: process.env.PORT || 5173, // Utilise le port fourni par Render ou 5173 par défaut
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false,
      },
    },
  },

  plugins: [react()],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Exemple : séparer react et react-dom en un autre chunk
          // Ajoutez d'autres modules ici si nécessaire
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Augmentez la limite à 1000 kB
  },
});
