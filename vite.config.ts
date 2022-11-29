import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Unocss from 'unocss/vite'
import pluginRewriteAll from 'vite-plugin-rewrite-all'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), Unocss({
        rules: [
            [/^color-el-(\w+)$/, ([, d]) => ({ color: `var(--el-text-color-${d})` })],
            [/^text-el-(\w+)$/, ([, d]) => ({ "font-size": `var(--el-font-size-${d})` })],
            ["nowrap", { "white-space": "nowrap" }],
            ["border-menu-color", {"border-color": "var(--el-menu-border-color)"}]
        ]
    }), pluginRewriteAll()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        chunkSizeWarningLimit: 3000
    }
})
