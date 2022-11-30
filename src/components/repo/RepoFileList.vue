<template>
    <el-card>
        <el-table :data="dir">
            <el-table-column prop="name" label="name">
                <template #default="scope">
                    <div class="flex lg-items-center">
                        <el-icon>
                            <Folder v-if="scope.row.folder" />
                            <Document v-else />
                        </el-icon>
                        <el-link class="ml-4" @click="navigate(scope.row.name, scope.row.folder)">{{ scope.row.name }}
                        </el-link>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="message" label="commit">
                <template #default="scope">
                    <el-link class="" @click="openCommit(scope.row?.modify_commit?.commit_hash)">
                        {{scope.row?.modify_commit?.commit_message}}
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="time" width="130">
                <template #default="scope">
                    {{commitTime(scope.row?.modify_commit?.commit_time)}}
                </template>
            </el-table-column>
        </el-table>
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
        navigate(name: string, isFolder: string) {
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
            return `${getDeltaTimeStringBySecond(commit_time)} ago`
        }
    },
    components: {
        RepoMDViewer,
        Space
    }
})
</script>
