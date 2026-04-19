import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/yacht-spa-netlify/', // ← важно: имя репо + слэши с двух сторон!
})
