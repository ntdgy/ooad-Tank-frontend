<template>
    <el-card>
        <pre><code ref="codeEl" v-html="code"></code></pre>
    </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import type { HLJSApi } from 'highlight.js'
import { handleResponse } from "@/utils/util"

type HLJSLinesApi = HLJSApi & {
    lineNumbersBlock: Function
}

import hljs from 'highlight.js/lib/common'

export default defineComponent({
    props: {
        url: {
            type: String
        },
        lang: {
            type: String
        }
    },
    data() {
        return {
            code: "",
            isText: true,
            size: 0
        }
    },
    watch: {
        url: {
            handler(newUrl) {
                if (newUrl && newUrl != "") {
                    this.axios.get(newUrl, {
                        withCredentials: true
                    })
                        .then(res => handleResponse(res))
                        .then(data => {
                            this.isText = data.isText
                            this.size = data.size
                            if (data.content != "") {
                                let res = hljs.highlightAuto(data.content)
                                this.code = res.value;
                                (hljs as HLJSLinesApi).lineNumbersBlock(this.$refs.codeEl, {
                                    singleLine: true
                                })
                            } else {
                                this.code = ""
                            }
                        }).catch(err => {
                            console.error(err)
                            this.clear()
                        })
                } else {
                    this.clear()
                }
            },
            immediate: true
        }
    },
    methods: {
        clear() {
            this.code = ""
            this.isText = true
            this.size = 0
        }
    }
})
</script>
