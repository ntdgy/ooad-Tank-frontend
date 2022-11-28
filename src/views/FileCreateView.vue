<template>
    <el-container class="mx-32">
        <el-main>
            <div class="flex flex-row items-center">
                <el-breadcrumb class="flex flex-row ml-4 nowrap">
                    <el-breadcrumb-item :to="repoRouteTarget">{{ $route.params.reponame }}</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(path, idx) in filteredPath" :key="path" :to="getRouteTarget(idx)">
                        {{ path }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item></el-breadcrumb-item>
                </el-breadcrumb>
                <el-input v-model="filename" class="w-auto! mr-1"></el-input>
                in
                <el-tag class="ml-1">{{ $route.params.branch }}</el-tag>
            </div>
            <CodeEditor v-model:code="code" class="my-4" />
            <FileCommit v-model:subject="subject" v-model:body="body" @commit="submit" @cancel="cancel" />
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import CodeEditor from "@/components/common/CodeEditor.vue"
import FileCommit from "@/components/repo/FileCommit.vue"
import { userStore } from "@/stores/user"
import { handleResponse, gitApi } from '@/utils/util'
import type { PropType } from 'vue'
import type { Metadata } from "@/utils/api"

export default defineComponent({
    props: {
        defaultBranch: String,
        branches: Array<string>,
        metadata: Object as PropType<Metadata>
    },
    data() {
        return {
            code: "",
            subject: "",
            body: "",
            filename: ""
        }
    },
    computed: {
        repoRouteTarget() {
            if (this.$route.params.branch != this.defaultBranch) {
                return {
                    name: 'tree',
                    params: {
                        branch: this.$route.params.branch,
                        path: ['']
                    }
                }
            }
            return {
                name: 'repo'
            }
        },
        filteredPath() {
            if (!this.$route.params.path) return []
            let res = [...this.$route.params.path]
            if (res[res.length - 1] == '') res.pop()
            return res
        }
    },
    methods: {
        submit() {
            let formData = new FormData()
            formData.append("branch", this.$route.params.branch as string)
            formData.append("committerName", userStore().username ?? "")
            formData.append("committerEmail", userStore().email ?? "")
            formData.append("message", this.subject)
            formData.append("path", this.filteredPath.join('/') + '/')
            formData.append("file", new Blob([this.code], { type: 'text/plain' }))
            this.axios.post(`${gitApi()}/upload`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res)
                    return handleResponse(res)
                })
                .catch(e => {
                    //TODO: login
                    console.error(e)
                })
        },
        cancel() {

        },
        getRouteTarget(index: number) {
            return {
                name: 'tree', params: {
                    path: this.filteredPath.slice(0, index + 1)
                }
            }
        }
    },
    components: {
        CodeEditor,
        FileCommit
    }
})
</script>
