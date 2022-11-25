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
            <Toolbar v-if="showInfo" class="m-3">
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
    </div>
</template>

<script setup lang="ts">
import { userStore } from '@/stores/user'
</script>

<script lang="ts">
import UserLink from "@/components/common/UserLink.vue"
import { defineComponent } from "vue"
import Toolbar from "../common/Toolbar.vue"
import type { PropType } from 'vue'

import type { Metadata } from "@/libs/api"

export default defineComponent({
    props: {
        username: String,
        reponame: String,
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
        showInfo() {
            return !(this.$route.params.path?.length) // path is undefined or empty
        }
    },
    methods: {
        // getRouteTarget(index: number) {
        //     return index == this.filteredPath.length - 1 ? undefined : {
        //         name: 'tree', params: {
        //             path: this.filteredPath.slice(0, index + 1)
        //         }
        //     }
        // },
        // getRepoRouteTarget() {
        //     if (this.currentBranch != this.defaultBranch) {
        //         return {
        //             name: 'tree',
        //             params: {
        //                 branch: this.currentBranch,
        //                 path: ['']
        //             }
        //         }
        //     }
        //     return {
        //         name: 'repo'
        //     }
        // },
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
