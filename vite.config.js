import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/quant-finance/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: {
        name: 'Learn Quant Finance — India-Focused Quantitative Finance',
        short_name: 'QuantFinance',
        description: 'Comprehensive interactive learning resource for quantitative finance with Indian market focus.',
        theme_color: '#6366f1',
        background_color: '#0f172a',
        display: 'standalone',
        scope: '/quant-finance/',
        start_url: '/quant-finance/',
        orientation: 'any',
        categories: ['education', 'finance'],
        icons: [
          { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ],
        navigateFallback: '/quant-finance/index.html',
        navigateFallbackDenylist: [/^\/quant-finance\/api/]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts') || id.includes('d3')) return 'vendor-charts'
            if (id.includes('framer-motion')) return 'vendor-motion'
            if (id.includes('katex')) return 'vendor-katex'
            if (id.includes('react-router')) return 'vendor-router'
            return 'vendor'
          }
          const subjectMatch = id.match(/subjects\/([\d]+-[^/]+)/)
          if (subjectMatch) return `subject-${subjectMatch[1]}`
        }
      }
    }
  }
})
