<template>
    <Toolbar>
        <template #left>
            <img class="logo" src="/element-plus-logo.svg" @click="$router.push({name: 'mainpage'})" />
            <el-input v-model="input1" style="width: 12.5rem; margin-left: 1rem;" size="large" placeholder="Search">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <Search />
                    </el-icon>
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
import Loginentry from "./Loginentry.vue"

import { userStore } from "@/stores/user"

export default defineComponent({
    components: {
        Toolbar,
        UserDetailEntry,
        Loginentry
    },
    data() {
        return {
            input1: ""
        }
    },
    computed: {
        hasLogin: () => userStore().hasLogin
    }
})
</script>

<style scoped>
.logo {
    height: var(--el-component-size-large);
}
</style>
