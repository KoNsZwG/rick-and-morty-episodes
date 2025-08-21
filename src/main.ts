import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { localStoragePlugin } from './plugins/localStoragePlugin'

const app = createApp(App)
const pinia = createPinia()

pinia.use(localStoragePlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
