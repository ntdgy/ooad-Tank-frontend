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
                in
                <el-tag class="ml-1">{{ $route.params.branch }}</el-tag>
            </div>
            <el-upload drag :auto-upload="false" :on-change="addFile">
                <el-icon class="el-icon--upload">
                    <upload-filled />
                </el-icon>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
            </el-upload>
            <FileCommit v-model:subject="subject" @commit="submit" @cancel="cancel"
                subject-place-holder="Add files via upload" />
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import FileCommit from "@/components/repo/FileCommit.vue"
import { userStore } from "@/stores/user"
import { handleResponse, gitApi } from '@/utils/util'
import type { PropType } from 'vue'
import type { Metadata } from "@/utils/api"
import { ElNotification, type UploadFile, type UploadFiles } from "element-plus"

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
            // body: "",
            filename: "",
            files: Array<UploadFile>()
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
            formData.append("message", !this.subject ? "Add files via upload" : this.subject)
            let path = this.filteredPath.join('/') + (this.filteredPath.length != 0 ? '/' : '')
            formData.append("path", path)
            for (const file of this.files) {
                formData.append("file", file.raw as File)
            }
            this.axios.post(`${gitApi()}/upload`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => handleResponse(res))
                .then(() => {
                    ElNotification({
                        title: 'Success',
                        message: "Upload successful",
                        type: 'success'
                    })
                    this.$router.push(this.getRouteTarget(this.filteredPath.length - 1))
                })
                .catch(e => {
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
        },
        addFile(_: UploadFile, uploadFiles: UploadFiles) {
            this.files = uploadFiles
        }
    },
    components: {
        FileCommit
    }
})
</script>
