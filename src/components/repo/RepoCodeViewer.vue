<template>
    <el-card>
        <pre><code ref="codeEl" v-html="highlighted"></code></pre>
    </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue"
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
    data() {
        return {
            highlighted: ""
        }
    },
    watch: {
        code(now) {
            if (now) {
                this.highlighted = hljs.highlightAuto(now).value;
                (hljs as HLJSLinesApi).lineNumbersBlock(this.$refs.codeEl, {
                    singleLine: true
                })
            }
            this.highlighted = ""
        }
    }
})
</script>
