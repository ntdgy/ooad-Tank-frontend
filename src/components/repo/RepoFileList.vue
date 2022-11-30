<template>
    <el-card>
        <div class="flex flex-auto flex-col">
            <div class="flex items-center p-2 table-item justify-" v-for="row of dir" :key="row.name">
                <div class="md:w-3/7">
                    <el-icon class="text-el-base! font-400" style="vertical-align: middle;">
                        <Folder v-if="row.folder" />
                        <Document v-else />
                    </el-icon>
                    <el-link class="ml-4" @click="navigate(row.name, row.folder)">{{ row.name }}
                    </el-link>
                </div>
                <div class="w-2/7 hidden md:block">
                    <el-link @click="openCommit(row.modify_commit?.commit_hash)">
                        {{ row.modify_commit?.commit_message }}
                    </el-link>
                </div>
                <div class="w-2/7 hidden md:flex justify-end text-el-base font-500 color-el-regular">
                    {{ commitTime(row.modify_commit?.commit_time) }}
                </div>
            </div>
        </div>
    </el-card>
    <Space />
    <RepoMDViewer :url="readmeUrl" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import RepoMDViewer from "@/components/repo/RepoMDViewer.vue"
import Space from "@/components/common/Space.vue"
import { getDeltaTimeStringBySecond } from "@/libs/times"

import { baseUrl } from "@/stores/configs"
import type { FileData } from "@/utils/api"

export default defineComponent({
    props: {
        defaultBranch: String,
        dir: Array<FileData>
    },
    computed: {
        readmeUrl() {
            const username = this.$route.params.username
            const reponame = this.$route.params.reponame
            const branch = this.$route.params.branch ?? this.defaultBranch
            let path = this.$route.params.path
            if (!path) path = []
            if (this.dir?.some(f => f.name == "README.md")) return `${baseUrl}/api/git/${username}/${reponame}/blob/${branch}/${(path as Array<string>).join('/')}/README.md`
            return undefined
        }
    },
    methods: {
        navigate(name: string, isFolder: boolean) {
            let tmp = this.$route.params.path
            let before = (!tmp || tmp == "") ? [] : (tmp as string[]).filter(s => s != '')
            let path = [...before, ...name.split('/')]
            if (isFolder) {
                if (name == '..') {
                    before.pop()
                    path = before
                }
                this.$router.push({
                    name: "tree", params: {
                        branch: this.$route.params.branch ?? this.defaultBranch,
                        path: path
                    }
                })
            } else {
                this.$router.push({
                    name: "blob", params: {
                        branch: this.$route.params.branch ?? this.defaultBranch,
                        path: path
                    }
                })
            }
        },
        openCommit(commit_hash: string) {
            this.$router.push({ name: "commit", params: { commitHash: commit_hash } })
        },
        commitTime(commit_time: number) {
            if (commit_time == undefined) return ""
            return `${getDeltaTimeStringBySecond(commit_time)} ago`
        }
    },
    components: {
        RepoMDViewer,
        Space
    },
    mounted() {
        // addEventListener('resize', () => {
        //     this.$refs.table.doLayout()
        // })
    },
    beforeUnmount() {

    }
})
</script>

<style scoped>
.table-item {
    border-bottom: solid;
    border-width: 1px;
    border-color: var(--el-border-color-lighter);
}
</style>
