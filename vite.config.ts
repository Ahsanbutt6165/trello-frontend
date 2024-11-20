import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
dotenv.config()
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target: process.env.VITE_API_URL,
      }
    }
  }
})
