<template>
    <div>
        <!-- <el-breadcrumb>
            <el-breadcrumb-item>{{ username }}</el-breadcrumb-item>
            <el-breadcrumb-item :to="getRepoRouteTarget()">{{ reponame }}</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(path, idx) in filteredPath" :key="path" :to="getRouteTarget(idx)">{{ path }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider /> -->
        <div>
            <template v-if="showInfo">
                <Toolbar>
                    <template #left>
                        <div class="flex lg-items-center title text-lg">
                            <UserLink :username="username" /> / <el-link>{{ reponame }}</el-link>
                        </div>
                    </template>
                    <template #right>
                        <el-button>Watch</el-button>
                        <el-button>Star: {{ metadata?.star }}</el-button>
                        <el-button @click="fork" :disabled="username == userStore().username">Fork: {{ metadata?.fork }}
                        </el-button>
                    </template>
                </Toolbar>
            </template>
            <div>
                <el-menu mode="horizontal" default-active="repo" @select="onSelect">
                    <template v-for="{ title, index } in menus" :key="index">
                        <el-menu-item :index="index">
                            <template #title>
                                <span>{{ title }}</span>
                            </template>
                        </el-menu-item>
                    </template>
                </el-menu>
            </div>
        </div>

        <div class="my-4" v-if="showRepoBar">
            <!--buttons-->
            <Toolbar>
                <template #left>
                    <el-select v-model="currentBranch" filterable>
                        <el-option-group label="type to search">
                            <el-option v-for="branch of computedBranches" :key="branch" :label="branch"
                                :value="branch" />
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
    </div>
</template>

<script setup lang="ts">
import { CopyDocument } from '@element-plus/icons-vue'
import { userStore } from '@/stores/user'
</script>

<script lang="ts">
import UserLink from "@/components/common/UserLink.vue"
import { defineComponent } from "vue"
import Toolbar from "../common/Toolbar.vue"
import useClipBoard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'
import type { PropType } from 'vue'

import type { Metadata } from "@/libs/api"

export default defineComponent({
    props: {
        username: String,
        reponame: String,
        branches: Array<String>,
        defaultBranch: String,
        metadata: Object as PropType<Metadata>
    },
    components: {
        Toolbar,
        UserLink
    },
    data() {
        // for dev only
        const f = (a: string, b: string) => {
            return {
                title: a,
                index: b
            }
        }
        return {
            computedBranches: [""],
            currentBranch: "",
            menus: [
                f("Repository", "repo"),
                f("Issues", "issues"),
                f("Pull requests", "pulls"),
                f("Actions", "actions"),
                f("Settings", "settings/")
            ]
        }
    },
    computed: {
        filteredPath() {
            if (!this.$route.params.path) return []
            let res = [...this.$route.params.path]
            if (res[res.length - 1] == '') res.pop()
            return res
        },
        showRepoBar() {
            return ['repo', 'tree', 'blob'].includes(this.$route.name as string)
        },
        showInfo() {
            return !(this.$route.params.path?.length) // path is undefined or empty
        }
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
    methods: {
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
        onSelect(index: string) {
            this.$router.push({ name: index })
        },
        fork() {
            this.$router.push({ name: "fork" })
        }
    }
})
</script>

<style scoped>
.title .el-link {
    margin: 0 0.5rem;
    font-weight: normal;
    font-size: var(--el-font-size-large);
    vertical-align: middle !important;
}
</style>
