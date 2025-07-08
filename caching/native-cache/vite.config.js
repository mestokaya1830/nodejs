import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // build: {
  //   outDir: '../server/static' //default is dist folder
  // },
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:4000'
      }
    }
  }
})
