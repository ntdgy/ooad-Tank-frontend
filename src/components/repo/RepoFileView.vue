<template>
    <RepoCodeViewer :code="code" v-if="isText" />
    <div v-else class="flex items-center">
        The file is not text file.
        <el-link :href="downloadUrl" class="ml-1">Download</el-link>
    </div>
</template>

<script lang="ts">
import RepoCodeViewer from "@/components/repo/RepoCodeViewer.vue"
import { defineComponent } from "vue"
import { handleResponse } from "@/utils/util"

export default defineComponent({
    props: {
        url: String,
        downloadUrl: String
    },
    data() {
        return {
            code: "",
            isText: true,
            size: 0
        }
    },
    watch: {
        url(url) {
            if (!url) return
            this.axios.get(url, {
                withCredentials: true
            }).then(res => handleResponse(res))
                .then(data => {
                    this.code = data.content
                    this.isText = data.isText
                    this.size = data.size
                }).catch(err => {
                    console.error(err)
                    this.code = ""
                })
        }
    },
    components: {
        RepoCodeViewer
    }
})
</script>
