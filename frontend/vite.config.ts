import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: { manifest: true,
    outDir:'../dist',
    emptyOutDir:true,
  },
  server:{
    port:3000,
  },
  base: process.env.mode === "dev" ? "/" : "/static/",
  plugins: [react()],
  root: './src',
  resolve:{
    extensions: ['.js','.ts','.tsx'],
  }
})
