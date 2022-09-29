import { createApp } from "vue"
import { createPinia } from "pinia"

import ElementPlus from "element-plus"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "element-plus/dist/index.css"
import "@/assets/main.css"

import 'highlight.js/styles/github.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from "@highlightjs/vue-plugin"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia()).use(ElementPlus).use(router).use(hljsVuePlugin)
for (const [k, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(k, component)
}

app.mount("#app")
