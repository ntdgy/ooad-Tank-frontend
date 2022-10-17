
<template>
    <div>
        <RepoFileList :dir="dir" :default-branch="defaultBranch" />
        <Space />
        <RepoMDViewer :url="readmeUrl" />
    </div>
    <!-- <el-aside style="background-color: aqua;">About</el-aside> -->
</template>

<script lang="ts">
import RepoFileList from "@/components/repo/RepoFileList.vue"
import RepoMDViewer from "@/components/repo/RepoMDViewer.vue"
import Space from "@/components/common/Space.vue"
import { defineComponent } from "vue"

import { baseUrl } from "@/stores/configs"

export default defineComponent({
    props: ['defaultBranch'],
    data() {
        return {
            readmeUrl: "https://raw.githubusercontent.com/Fros1er/Fros1er/main/README.md",
            dir: undefined
        }
    },
    components: {
        RepoFileList,
        RepoMDViewer,
        Space
    },
    created() {
        this.$watch(
            () => [this.defaultBranch, this.$route.params.branch, this.$route.params.path],
            (params: any) => {
                this.getData(params)
            }
        )
    },
    beforeRouteEnter(_to, _from, next) {
        next((vm: any) => {
            vm.getData([vm.defaultBranch, vm.$route.params.branch, vm.$route.params.path])
        })
    },
    methods: {
        getData(params: any) {
            if (!params[0]) return
            let branch = params[1] ?? params[0]
            let path = params[2] ?? []
            if (path == "") path = []
            this.axios.get(`${baseUrl}/api/git/${this.$route.params.username}/${this.$route.params.reponame}/tree/${branch}/${path.join('/')}`, {
                withCredentials: true
            })
                .then((res: any) => res.data.data)
                .then((data: any) => {
                    this.dir = data
                })
        }
    }
})
</script>
