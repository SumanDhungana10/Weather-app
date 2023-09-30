import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://sumandhungana10.github.io/Weather-app/",
  plugins: [react()],
})
