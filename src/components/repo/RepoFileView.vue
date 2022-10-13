<template>
    <RepoCodeViewer :url="codeUrl" lang="js" />
    <!-- <el-aside style="background-color: aqua;">About</el-aside> -->
</template>

<script lang="ts">
import RepoCodeViewer from "@/components/repo/RepoCodeViewer.vue"
import { defineComponent } from "vue"
import { baseUrl } from "@/stores/configs"

export default defineComponent({
    data() {
        return {
            codeUrl: ""
        }
    },
    created() {
        this.$watch(
            () => {
                let params = this.$route.params
                return [params.username, params.reponame, params.branch, params.path]
            },
            (params: any) => {
                if (!params[3]) return
                this.codeUrl = `${baseUrl}/api/git/${params[0]}/${params[1]}/blob/${params[2]}/${params[3].join('/')}`
            },
            {
                immediate: true
            }
        )
    },
    components: {
        RepoCodeViewer
    }
})
</script>
