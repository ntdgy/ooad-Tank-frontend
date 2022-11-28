<template>
    <el-card>
        <pre><code ref="codeEl" v-html="highlighted"></code></pre>
    </el-card>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue"
import type { HLJSApi } from 'highlight.js'

type HLJSLinesApi = HLJSApi & {
    lineNumbersBlock: Function
}

import hljs from 'highlight.js/lib/common'

export default defineComponent({
    props: {
        code: {
            type: String
        }
    },
    computed: {
        highlighted() {
            if (!this.code) return ""
            return hljs.highlightAuto(this.code).value
        }
    },
    watch: {
        async highlighted() {
            await nextTick();
            (hljs as HLJSLinesApi).lineNumbersBlock(this.$refs.codeEl, {
                singleLine: true
            })
        }
    }
})
</script>
