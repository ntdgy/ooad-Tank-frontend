
<template>
    <div class="flex flex-row flex-auto">
        <div class="min-w-0 flex-auto m-r-6">
            <RepoFileHeader :branches="branches" :default-branch="defaultBranch" :metadata="metadata" />
            <RepoFileList :dir="dir" :default-branch="defaultBranch" v-if="isPath"/>
            <RepoFileView v-else />
        </div>
        <div class="flex-auto w-48" v-if="showAside">
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
import RepoFileView from "@/components/repo/RepoFileView.vue"
import { defineComponent } from "vue"
import type { PropType } from 'vue'

import { baseUrl } from "@/stores/configs"
import type { FileData, Metadata } from "@/utils/api"

export default defineComponent({
    props: {
        defaultBranch: String,
        branches: Array<string>,
        metadata: Object as PropType<Metadata>
    },
    data() {
        return {
            dir: Array<FileData>()
        }
    },
    computed: {
        isPath() {
            return ['tree', 'repo'].includes(this.$route.name as string)
        },
        showAside() {
            return !(this.$route.params.path?.length)
        }
    },
    components: {
        RepoFileList,
        RepoFileHeader,
        RepoFileView
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
                    if (this.$route.params.path && this.$route.params.path.length != 0) {
                        data = [{ name: "..", folder: true }, ...(data ?? [])]
                    }
                    this.dir = data
                })
        }
    }
})
</script>
