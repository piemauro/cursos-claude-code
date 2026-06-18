import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base e pasta de saída parametrizáveis (v1 = /cursos/ -> dist ; v2 = /cursosv2/ -> dist-v2)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.BASE_PATH || '/cursos/',
  build: { outDir: process.env.OUT_DIR || 'dist' },
})
