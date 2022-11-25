
<template>
    <div class="flex flex-row flex">
        <div class="flex-auto m-r-6">
            <RepoFileHeader :branches="branches" :default-branch="defaultBranch" :metadata="metadata" />
            <RepoFileList :dir="dir" :default-branch="defaultBranch" />
            <Space />
            <RepoMDViewer :url="readmeUrl" />
        </div>
        <div class="">
            <h2 class="mb-4 mt-0 text-4">About</h2>
            <div class="my-4">{{ metadata?.description }}</div>
            <p>Readme</p>
            <p>liscense</p>
            <p>{{ metadata?.star }} stars</p>
            <p>{{ metadata?.watch }} watching</p>
            <p>{{ metadata?.fork }} forks</p>
            <p>{{ metadata?.contibutors?.at(0)?.name }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import RepoFileHeader from "./RepoFileHeader.vue"
import RepoFileList from "@/components/repo/RepoFileList.vue"
import RepoMDViewer from "@/components/repo/RepoMDViewer.vue"
import Space from "@/components/common/Space.vue"
import { defineComponent } from "vue"
import type { PropType } from 'vue'

import { baseUrl } from "@/stores/configs"
import type { FileData, Metadata } from "@/libs/api"

export default defineComponent({
    props: {
        defaultBranch: String,
        branches: Array<String>,
        metadata: Object as PropType<Metadata>
    },
    data() {
        return {
            dir: Array<FileData>()
        }
    },
    computed: {
        readmeUrl() {
            const username = this.$route.params.username
            const reponame = this.$route.params.reponame
            const branch = this.$route.params.branch ?? this.defaultBranch
            let path = this.$route.params.path
            if (!path) path = []
            if (this.dir.some(f => f.name == "README.md")) return `${baseUrl}/api/git/${username}/${reponame}/blob/${branch}/${(path as Array<string>).join('/')}/README.md`
            return undefined
        }
    },
    components: {
        RepoFileList,
        RepoMDViewer,
        Space,
        RepoFileHeader
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
