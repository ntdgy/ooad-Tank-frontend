import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import '@/assets/main.css'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia()).use(ElementPlus)
for (const [k, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(k, component)
}

app.mount('#app')
