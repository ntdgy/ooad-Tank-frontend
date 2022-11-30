<template>
    <Toolbar>
        <template #left>
            <img class="logo" src="/sustech-logo-cn.png" @click="$router.push({ name: 'mainpage' })" />
            <el-input @keyup.enter="search" v-model="searchText" style="width: 12.5rem; margin-left: 1rem;" size="large" :placeholder="placeholder">
                <template #append>
                    <el-button @click="search" :icon="Search" />
                </template>
            </el-input>
        </template>
        <template #right>
            <UserDetailEntry v-if="hasLogin"/>
            <Loginentry v-else/>
        </template>
    </Toolbar>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Toolbar from "./Toolbar.vue"
import UserDetailEntry from "./UserDetailEntry.vue"
import Loginentry from "./LoginEntry.vue"

import { userStore } from "@/stores/user"

export default defineComponent({
    components: {
        Toolbar,
        UserDetailEntry,
        Loginentry
    },
    data() {
        return {
            searchText: ""
        }
    },
    computed: {
        hasLogin: () => userStore().hasLogin,
        placeholder() {
            return (this.$route.query.q as string | null) ?? "Search"
        }
    },
    methods: {
        search() {
            if (this.searchText != "") {
                this.$router.push({name: "search", query: {q: this.searchText}})
            }
        }
    }
})
</script>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>

<style scoped>
.logo {
    height: var(--el-component-size-large);
}
</style>
