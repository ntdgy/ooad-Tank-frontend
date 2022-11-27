<template>
    <el-card>
        <template #header> README.md </template>
        <div v-html="renderedMarkdown" />
    </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { handleResponse } from "@/utils/util"
import MarkdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'
const md = MarkdownIt().use(highlightjs, { inline: true })

export default defineComponent({
    props: {
        url: {
            type: String
        }
    },
    data() {
        return {
            renderedMarkdown: ""
        }
    },
    watch: {
        url: {
            handler(newUrl) {
                if (newUrl) {
                    this.axios.get(newUrl, {
                        withCredentials: true
                    })
                        .then((res) => handleResponse(res))
                        .then(data => {
                            this.renderedMarkdown = md.render(data.content)
                        })
                        .catch(err => {
                            console.log(err)
                            this.renderedMarkdown = ""
                        })
                } else {
                    this.renderedMarkdown = ""
                }
            },
            immediate: true
        }
    }
})
</script>
