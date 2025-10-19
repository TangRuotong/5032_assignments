import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    headers: {
      'Content-Security-Policy': `
      default-src 'self';
      img-src 'self' data: https:;
      connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://api.mapbox.com https://events.mapbox.com https://us-central1-pawerup-92f54.cloudfunctions.net;
      script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://apis.google.com https://www.gstatic.com;
      style-src 'self' 'unsafe-inline' https:;
      worker-src 'self' blob:;
      child-src 'self' blob:;
      frame-src 'self' https://apis.google.com https://accounts.google.com https://*.firebaseapp.com https://*.web.app;
    `
        .replace(/\s{2,}/g, ' ')
        .trim(),
    },
  },
})
