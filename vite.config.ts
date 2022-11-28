import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), Unocss({
        rules: [
            [/^color-el-(\w+)$/, ([, d]) => ({ color: `var(--el-text-color-${d})` })],
            ["nowrap", { "white-space": "nowrap" } ]
        ]
    })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        chunkSizeWarningLimit: 3000
    }
})
