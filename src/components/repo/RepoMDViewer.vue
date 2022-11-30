<template>
    <el-card class="markdown-card">
        <template #header> README.md </template>
        <div class="markdown" v-html="renderedMarkdown" />
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
                        .then((res) => handleResponse(res, false))
                        .then(data => {
                            this.renderedMarkdown = md.render(data.content)
                        })
                        .catch(() => {
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

<style>
@media (max-width: 639.9px) {
    .markdown-card .el-card__body {
        padding-right: 0.5rem;
    }
}

.markdown pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}

.markdown img {
    width: auto;
    max-width: 100%;
    height: auto;
}
</style>
