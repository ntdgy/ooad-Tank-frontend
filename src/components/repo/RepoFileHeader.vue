<template>
    <div class="my-4">
        <!--buttons-->
        <Toolbar>
            <template #left>
                <el-select v-model="currentBranch" filterable>
                    <el-option-group label="type to search">
                        <el-option v-for="branch of computedBranches" :key="branch" :label="branch" :value="branch" />
                    </el-option-group>
                </el-select>
            </template>
            <template #right>
                <el-dropdown trigger="click">
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>Create new file</el-dropdown-item>
                            <el-dropdown-item>Upload file</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                    <el-button>Add File&nbsp;<el-icon>
                            <Plus />
                        </el-icon>
                    </el-button>
                </el-dropdown>
                <el-popover :width="200" trigger="click">
                    <template #reference>
                        <el-button style="margin-left: 12px" type="primary">Clone&nbsp;<el-icon>
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
import type { Metadata } from "@/libs/api"

export default defineComponent({
    props: {
        branches: Array<string>,
        defaultBranch: String,
        metadata: Object as PropType<Metadata>
    },
    data() {
        return {
            computedBranches: [""],
            currentBranch: ""
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
        }
    }
})
</script>
