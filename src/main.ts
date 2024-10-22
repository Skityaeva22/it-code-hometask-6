import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { router } from '@/providers'

const app = createApp(App)

app.use(createPinia()).use(router)

app.mount('#app')
