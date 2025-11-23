import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use a configurable base so we can point GitHub Pages builds at the repo path
// while keeping production (e.g., Vercel) at the root.
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  base,
})
