import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

const pwaOption = {
  workbox: {
    globPatterns: ['**.{js,css,html}', 'assets/**/*.*'],
  },
  manifest: {
    name: 'Tote',
    short_name: 'Tote',
    start_url: '/',
    scope_url: '/',
    display: 'standalone',
    background_color: '#e0f7e0',
    theme_color: '#e0f7e0',
    orientation: 'portrait',
    icons: [
      {
        src: '/img/icons/icon-72x72.png',
        type: 'image/png',
        sizes: '72x72',
      },
      {
        src: '/img/icons/icon-96x96.png',
        type: 'image/png',
        sizes: '96x96',
      },
      {
        src: '/img/icons/icon-128x128.png',
        type: 'image/png',
        sizes: '128x128',
      },
      {
        src: '/img/icons/icon-144x144.png',
        type: 'image/png',
        sizes: '144x144',
      },
    ],
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA(pwaOption)],
  resolve: {
    alias: [{
      find: '@', replacement: path.resolve(__dirname, 'src'),
    }],
    extensions: ['.vue', '.js'],
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
})
