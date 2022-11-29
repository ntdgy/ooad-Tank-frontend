<template>
    <div class="my-4">
        <!--buttons-->
        <Toolbar>
            <template #left>
                <el-select v-model="currentBranch" filterable class="w-36">
                    <el-option-group label="type to search">
                        <el-option v-for="branch of computedBranches" :key="branch" :label="branch" :value="branch" />
                    </el-option-group>
                </el-select>
                <el-breadcrumb v-if="filteredPath.length != 0" class="flex flex-row ml-4">
                    <el-breadcrumb-item :to="getRepoRouteTarget()">{{ $route.params.reponame }}</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(path, idx) in filteredPath" :key="path" :to="getRouteTarget(idx)">
                        {{ path }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </template>
            <template #right>
                <el-button v-if="!!downloadUrl" @click="download">Download</el-button>
                <el-dropdown class="ml-3" trigger="click" v-if="$route.name != 'blob'">
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="createFile">Create new file</el-dropdown-item>
                            <el-dropdown-item @click="uploadFile">Upload file</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                    <el-button>Add File&nbsp;<el-icon>
                            <Plus />
                        </el-icon>
                    </el-button>
                </el-dropdown>
                <el-popover :width="200" trigger="click">
                    <template #reference>
                        <el-button class="ml-3" type="primary">Clone&nbsp;<el-icon>
                                <ArrowDown />
                            </el-icon>
                        </el-button>
                    </template>
                    <div class="flex flex-col">
                        <div class="flex flex-col mb-2 font-medium">
                            Clone with HTTPS
                            <el-input class="mt-2" :value="metadata?.gitUrl" readonly>
                                <template #append>
                                    <el-button :icon="CopyDocument" @click="toClipBoard(metadata?.gitUrl)" />
                                </template>
                            </el-input>
                        </div>
                        <el-button>Download zip</el-button>
                    </div>
                </el-popover>
            </template>
        </Toolbar>
    </div>
</template>

<script setup lang="ts">
import { CopyDocument } from '@element-plus/icons-vue'
</script>

<script lang="ts">
import Toolbar from "../common/Toolbar.vue"
import { defineComponent } from "vue"
import useClipBoard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'
import { repoStore } from '@/stores/repoNavi'

import type { PropType } from 'vue'
import type { Metadata } from "@/utils/api"

export default defineComponent({
    props: {
        branches: Array<string>,
        defaultBranch: String,
        metadata: Object as PropType<Metadata>,
        downloadUrl: String
    },
    data() {
        return {
            computedBranches: [""],
            currentBranch: ""
        }
    },
    computed: {
        filteredPath() {
            if (!this.$route.params.path) return []
            let res = [...this.$route.params.path]
            if (res[res.length - 1] == '') res.pop()
            return res
        }
    },
    mounted() {
        if (this.branches?.length) {
            this.computedBranches = [...this.branches]
            this.currentBranch = repoStore().currentBranch ?? (this.defaultBranch as string)
        }
    },
    beforeUnmount() {
        repoStore().currentBranch = this.currentBranch
    },
    watch: {
        branches(now: Array<string>) {
            console.log(now)
            this.computedBranches = [...now]
            this.currentBranch = (this.defaultBranch as string)
        },
        currentBranch(now: string) {
            let target = this.$route.name
            if (now == this.$route.params.branch || ['tree', 'repo', 'blob'].indexOf(target as string) == -1) return
            if (target == 'repo') {
                if (now == this.defaultBranch) return
                target = 'tree'
            }
            this.$router.push({
                name: target as string,
                params: {
                    branch: now
                }
            })
        }
    },
    components: {
        Toolbar
    },
    methods: {
        toClipBoard(text: string | undefined) {
            if (!text) return
            useClipBoard().toClipboard(text)
                .then(() => {
                    ElMessage({
                        message: '复制成功',
                        type: 'success'
                    })
                })
        },
        getRouteTarget(index: number) {
            return index == this.filteredPath.length - 1 ? undefined : {
                name: 'tree', params: {
                    path: this.filteredPath.slice(0, index + 1)
                }
            }
        },
        getRepoRouteTarget() {
            if (this.currentBranch != this.defaultBranch) {
                return {
                    name: 'tree',
                    params: {
                        branch: this.currentBranch,
                        path: ['']
                    }
                }
            }
            return {
                name: 'repo'
            }
        },
        uploadFile() {
            this.$router.push({ name: "uploadFile", params: { branch: this.currentBranch, path: this.$route.params.path } })
        },
        createFile() {
            this.$router.push({ name: "newFile", params: { branch: this.currentBranch, path: this.$route.params.path } })
        },
        download() {
            if (this.downloadUrl) {
                window.location.assign(this.downloadUrl)
            }
        }
    }
})
</script>
