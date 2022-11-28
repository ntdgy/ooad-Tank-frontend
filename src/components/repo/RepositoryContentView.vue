
<template>
    <div class="flex flex-row flex-auto">
        <div class="min-w-0 flex-auto m-r-6">
            <RepoFileHeader :branches="branches" :default-branch="defaultBranch" :metadata="metadata" />
            <RepoFileList :dir="dir" :default-branch="defaultBranch" v-if="isPath" />
            <RepoFileView :url="url" v-else />
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

import type { FileData, Metadata } from "@/utils/api"
import { handleResponse, gitApi } from "@/utils/util"
import type { RouteLocationNormalized } from "vue-router"

export default defineComponent({
    props: {
        defaultBranch: String,
        branches: Array<string>,
        metadata: Object as PropType<Metadata>
    },
    data() {
        return {
            dir: Array<FileData>(),
            url: ""
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
    beforeRouteEnter(_to, _from, next) {
        next((vm: any) => {
            vm.getData(_to)
        })
    },
    beforeRouteUpdate(to) {
        this.getData(to)
    },
    watch: {
        defaultBranch() {
            this.getData(this.$route)
        }
    },
    methods: {
        getData(route: RouteLocationNormalized) {
            if (!this.defaultBranch) return
            if (route.name == "blob") {
                this.url = `${gitApi(route)}/blob/${route.params.branch}/${(route.params.path as string[]).join('/')}`
                return
            }
            let branch = route.params.branch ?? this.defaultBranch
            let path = route.params.path ?? []
            if (path == "") path = []
            this.axios.get(`${gitApi()}/tree/${branch}/${(path as string[]).join('/')}`, {
                withCredentials: true
            })
                .then((res) => handleResponse(res))
                .then((data) => {
                    if (route.params.path && route.params.path.length != 0) {
                        data = [{ name: "..", folder: true }, ...(data ?? [])]
                    }
                    this.dir = data
                })
        }
    }
})
</script>
