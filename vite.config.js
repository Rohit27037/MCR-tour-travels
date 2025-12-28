import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MCR-tour-travels/',
  plugins: [react()],
})