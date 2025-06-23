import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: true, // Allows access from other devices on the network
    open: true  // Automatically opens browser
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
