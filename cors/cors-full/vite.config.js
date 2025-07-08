import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    }
  },
  plugins: [vue()],
  // build: {
  //   outDir: '../server/static' //default is dist folder
  // },

  //setttings base url(http://localhost:3000) and cors policy
  //if you use server block you dont need axios base url and cors policy in nodejs
  // server:{
  //   proxy:{
  //     '/api':{
  //       target:'http://localhost:3000'
  //     }
  //   }
  // }
})
