import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    VitePWA({
      // --- General Configuration ---
      registerType: 'autoUpdate', // Automatically updates the SW when there are changes
      injectRegister: 'auto', // Automatically injects the registration script

      // --- Manifest Configuration ---
      manifest: {
        name: 'Fishing Game Dashboard',
        short_name: 'FishingDash',
        description: 'Leaderboard and Market for the Fishing Game',
        theme_color: '#ffffff', // Theme color
        background_color: '#f3f4f6', // Background color before CSS loading (e.g. light gray from Tailwind)
        display: 'standalone', // How the app is displayed (standalone, fullscreen, minimal-ui, browser)
        scope: '/',
        start_url: '/', // URL that opens when starting the PWA
        orientation: 'portrait', // Preferred orientation
        icons: [
          {
            src: '/icons/icon-192x192.png', // Ruta relativa a la carpeta 'public'
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
             src: '/icons/maskable-icon-512x512.png',
             sizes: '512x512',
             type: 'image/png',
             purpose: 'maskable'
          },
          {
            src: "/icons/apple-touch-icon.png", // For iOS
            sizes: "180x180",
            type: "image/png",
            purpose: "apple touch icon"
          }
        ],
      },

      // --- Workbox Configuration ---
      workbox: {
        // Files to be precached (App Shell - HTML, CSS, JS, fonts, icons, etc..)
        // These will be available offline immediately after SW installation.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jsx,ttf,woff,woff2}'],
        cleanupOutdatedCaches: true, // Delete old caches on activation

        // Caching strategies for runtime requests (ej: API)
        runtimeCaching: [
          {
            // Caching game API calls
            urlPattern: /^https:\/\/api-game\.bloque\.app\/game\/.*/i, // Endpoints Regex
            handler: 'StaleWhileRevalidate', // Search network and update cache if there is a connection.
            options: {
              cacheName: 'api-game-cache', // Descriptive name for this cache
              expiration: {
                maxEntries: 50,         // Maximum number of responses to cache
                maxAgeSeconds: 60 * 60, // Cache for 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200], // Caching OK and opaque responses (CORS)
              },
            },
          },
          {
            // Google Fonts font strategy
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 // Cache for 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
             // Estrategia opcional para archivos estáticos de Google Fonts
             urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
             handler: 'CacheFirst',
             options: {
               cacheName: 'google-fonts-webfonts-cache',
               expiration: {
                 maxEntries: 10,
                 maxAgeSeconds: 60 * 60 // Cache for 1 hour
               },
               cacheableResponse: {
                 statuses: [0, 200]
               },
             }
          }
        ],
      },

       // --- Development Settings---
       devOptions: {
         enabled: true, // Enable PWA in development mode (useful for testing)
         type: 'module', // Use type module for the SW under development
       }
    }),
  ],
})
