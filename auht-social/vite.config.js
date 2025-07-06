import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // build: {
  //   outDir: '../server/static' //default is dist folder
  // },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    }
  },
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000'
      }
    }
  }
})
