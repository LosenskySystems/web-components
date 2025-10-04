import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx({
      // Configure MDX options
      providerImportSource: '@mdx-js/react'
    })
  ],
  // Ensure MDX files are treated as JSX
  optimizeDeps: {
    include: ['@mdx-js/react']
  }
})
