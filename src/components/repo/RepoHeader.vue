<template>
    <div>
        <Toolbar class="m-3">
            <template #left>
                <div class="flex lg-items-center title text-lg">
                    <UserLink :username="username" /> / <el-link>{{ reponame }}</el-link>
                </div>
            </template>
            <template #right>
                <el-button @click="watch">{{metadata?.watched ? "Watched" : "Watch" }} {{ metadata?.watch }}</el-button>
                <el-button @click="star">{{metadata?.starred ? "Starred" : "Star" }} {{ metadata?.star }}</el-button>
                <el-button @click="fork" :disabled="username == userStore().username">Fork: {{ metadata?.fork }}
                </el-button>
            </template>
        </Toolbar>
        <div>
            <!-- <el-menu mode="horizontal" :default-active="defaultMenuIndex" @select="onSelect">
                <template v-for="{ title, index } in menus" :key="index">
                    <el-menu-item :index="index">
                        <template #title>
                            <span>{{ title }}</span>
                        </template>
                    </el-menu-item>
                </template>
            </el-menu> -->
            <el-menu mode="horizontal" :default-active="defaultMenuIndex" @select="onSelect">
                <el-menu-item index="repo">Repository</el-menu-item>
                <el-menu-item index="issues">Issues</el-menu-item>
                <el-menu-item index="pulls">Pull requests</el-menu-item>
                <el-menu-item index="commits">Commits</el-menu-item>
                <el-menu-item index="ci">Actions</el-menu-item>
                <el-menu-item v-if="showSettings()" index="settings">Settings</el-menu-item>
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
        return {
            defaultMenuIndex: 'repo'
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
                this.axios.get(this.metadata?.watched ? `${repoApi()}/action/unWatch` : `${repoApi()}/action/watch`,
                    { withCredentials: true }
                ).then(res => handleResponse(res)).then(() => {
                    this.$emit("updateMetadata")
                })
            }
        },
        mount() {
            this.defaultMenuIndex = this.$route.name as string
        },
        showSettings() {
            return userStore()?.hasInited && userStore().username === this.metadata?.owner?.name
        }
    },
    beforeMount() {
        this.mount()
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
