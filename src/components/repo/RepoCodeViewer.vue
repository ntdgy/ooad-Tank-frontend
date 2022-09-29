<template>
    <highlightjs
        :autodetect="lang == undefined"
        :language="lang == undefined ? '' : lang" 
        :code="code"
    />
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
            code: ""
        }
    },
    watch: {
        url: {
            handler(newUrl) {
                if (newUrl) {
                    fetch(newUrl).then(res=>res.text()).then(txt=>{
                        this.code = txt
                    }).catch(err => {
                        console.error(err)
                        this.code = ""
                    })
                } else {
                    this.code = ""
                }
            },
            immediate: true
        }
    }
})
</script>