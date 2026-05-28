import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [

    react(),

    tailwindcss(),

    // VitePWA({
    //   registerType: 'autoUpdate',

    //   manifest: {

    //     name: 'FlowBank',

    //     short_name: 'FlowBank',

    //     description:
    //       'Banco digital inteligente',

    //     theme_color: '#0f172a',

    //     background_color: '#0f172a',

    //     display: 'standalone',

    //     start_url: '/',

    //     scope: '/',

    //     icons: [
    //       {
    //         src: '/logo.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },

    //       {
    //         src: '/logo.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       }
    //     ]
    //   }
    // })

  ]
})