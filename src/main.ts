import { createApp } from "vue"
import { createPinia } from "pinia"
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'uno.css'

import ElementPlus from "element-plus"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "element-plus/dist/index.css"
import "@/assets/main.css"

import '@/libs/highlightjs-line-numbers.js'
import '@/libs/highlightjs-line-numbers.css'
import 'highlight.js/styles/github.css'

import App from "./App.vue"
import router from "./router"

import { baseUrl } from "@/stores/configs"
import { userStore } from "@/stores/user"

axios.defaults.timeout = 5000

const app = createApp(App)

app.use(createPinia()).use(ElementPlus).use(router).use(VueAxios, axios)
for (const [k, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(k, component)
}

app.mount("#app")

userStore().fillName()
