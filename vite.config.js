import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️  IMPORTANTE: troque 'pedro-geo' pelo nome exato do seu repositório no GitHub
// Exemplo: se o repo se chamar 'pedro-geografia', coloque '/pedro-geografia/'
export default defineConfig({
  plugins: [react()],
  base: '/pedro-geo/',
})
