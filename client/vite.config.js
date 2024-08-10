import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
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
          vendor: ['react', 'react-dom'], // Example: move react and react-dom to a separate chunk
          // Add other modules here as needed
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the limit to 1000 kB
  },
});
