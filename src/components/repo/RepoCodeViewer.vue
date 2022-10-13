<template>
    <highlightjs :autodetect="lang == undefined" :language="lang == undefined ? '' : lang" :code="code" />
    <!--autodetect不好用-->
</template>

<script lang="ts">
import { defineComponent } from "vue"

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
                    console.log(newUrl)
                    this.axios.get(newUrl, {
                        withCredentials: true
                    })
                        .then(res => res.data.data)
                        .then(data => {
                            this.code = data.content
                            this.isText = data.isText
                            this.size = data.size
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