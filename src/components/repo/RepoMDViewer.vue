<template>
    <el-card>
        <template #header> README.md </template>
        <div v-html="renderedMarkdown" />
    </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue"
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
                console.log(newUrl)
                if (newUrl) {
                    fetch(newUrl).then(res=>res.text()).then(txt=>{
                        this.renderedMarkdown = md.render(txt)
                    }).catch(err => {
                        console.error(err)
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