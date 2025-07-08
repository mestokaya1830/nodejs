import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/main.css'
// import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:3000'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
