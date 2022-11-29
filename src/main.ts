import { createApp } from "vue"
import { createPinia } from "pinia"
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueDiff from 'vue-diff';


import 'uno.css'

import ElementPlus from "element-plus"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "element-plus/dist/index.css"
import "@/assets/main.css"

import '@/libs/highlightjs-line-numbers.js'
import '@/libs/highlightjs-line-numbers.css'
import 'highlight.js/styles/github.css'
import 'vue-diff/dist/index.css';

import App from "./App.vue"
import router from "./router"

import { userStore } from "@/stores/user"

axios.defaults.timeout = 5000

const app = createApp(App)

app.use(createPinia()).use(ElementPlus).use(router).use(VueAxios, axios)
app.use(VueDiff);
for (const [k, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(k, component)
}

app.mount("#app")

userStore().fillName()
