<template>
    <RepoCodeViewer :code="code" lang="js" />
    <!-- <el-aside style="background-color: aqua;">About</el-aside> -->
</template>

<script lang="ts">
import RepoCodeViewer from "@/components/repo/RepoCodeViewer.vue"
import { defineComponent } from "vue"
import { gitApi, handleResponse } from "@/utils/util"
import type { RouteLocationNormalized } from "vue-router"

export default defineComponent({
    data() {
        return {
            code: "",
            isText: true,
            size: 0
        }
    },
    beforeRouteUpdate(to) {
        this.updateContent(to)
    },
    beforeRouteEnter(to, _from, next) {
        next(vm => (vm as any).updateContent(to))
    },
    methods: {
        updateContent(route: RouteLocationNormalized) {
            if (!route.params.path) return
            this.axios.get(`${gitApi()}/blob/${route.params.branch}/${(route.params.path as string[]).join('/')}`, {
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
