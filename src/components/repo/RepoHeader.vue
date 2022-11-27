<template>
    <div>
        <Toolbar class="m-3">
            <template #left>
                <div class="flex lg-items-center title text-lg">
                    <UserLink :username="username" /> / <el-link>{{ reponame }}</el-link>
                </div>
            </template>
            <template #right>
                <el-button @click="watch">Watch</el-button>
                <el-button @click="star">{{                                                                                                     metadata?.starred ? "Starred" : "Star"                                                                                                     }} {{ metadata?.star }}</el-button>
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
</template>

<script setup lang="ts">
import { userStore } from '@/stores/user'
</script>

<script lang="ts">
import UserLink from "@/components/common/UserLink.vue"
import { defineComponent } from "vue"
import Toolbar from "../common/Toolbar.vue"
import type { PropType } from 'vue'

import type { Metadata } from "@/utils/api"
import { checkLogin, repoApi, handleResponse } from '@/utils/util'

export default defineComponent({
    props: {
        username: String,
        reponame: String,
        metadata: Object as PropType<Metadata>
    },
    emits: ["updateMetadata"],
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
    methods: {
        onSelect(index: string) {
            this.$router.push({ name: index })
        },
        fork() {
            if (checkLogin()) {
                this.$router.push({ name: "fork" })
            }
        },
        star() {
            if (checkLogin()) {
                this.axios.get(this.metadata?.starred ? `${repoApi()}/action/unStar` : `${repoApi()}/action/star`,
                    { withCredentials: true }
                ).then(res => handleResponse(res)).then(() => {
                    this.$emit("updateMetadata")
                })
            }
        },
        watch() {
            if (checkLogin()) {
                this.axios.get(this.metadata?.starred ? `${repoApi()}/action/unStar` : `${repoApi()}/action/sssstar`,
                    { withCredentials: true }
                ).then(res => handleResponse(res)).then(() => {
                    this.$emit("updateMetadata")
                })
            }
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
