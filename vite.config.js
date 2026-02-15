import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss' // <--- CAMBIA ESTO
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // <--- AÑADE LOS PARÉNTESIS ()
        autoprefixer(),
      ],
    },
  },
  base: '/DataStories_1/',
})