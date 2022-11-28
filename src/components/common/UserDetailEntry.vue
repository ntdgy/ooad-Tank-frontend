<template>
    <el-dropdown trigger="click">
        <span class="flex items-center">
            <Avatar :size="36" :username="username"></Avatar>
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="$router.push({ name: 'profile', params: { username: username } })">
                    Profile
                </el-dropdown-item>
                <el-dropdown-item
                    @click="$router.push({ name: 'profile', params: { username: username }, query: { tab: 'repositories' } })">
                    Repositories
                </el-dropdown-item>
                <el-dropdown-item
                    @click="$router.push({ name: 'profile', params: { username: username }, query: { tab: 'stars' } })">
                    Stars
                </el-dropdown-item>
                <el-dropdown-item @click="$router.push({ name: 'userSettings' })" divided>
                    Settings
                </el-dropdown-item>
                <el-dropdown-item divided @click="logout">Sign out</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { userStore } from "@/stores/user"
import { baseUrl } from "@/stores/configs"
import { handleResponse } from "@/utils/util"
import Avatar from "@/components/common/Avatar.vue"

export default defineComponent({
    data() {
        return {
            input1: "",
            username: userStore().username
        }
    },
    methods: {
        logout() {
            this.axios.post(`${baseUrl}/api/user/logout`, {}, {
                withCredentials: true
            }).then(res => handleResponse(res)).then(() => {
                userStore().clear()
                this.$router.push({ name: "mainpage" })
            })
        },
        reload() {
            if (userStore().username == undefined) {
                userStore().fillName()
            }
        }
    },
    beforeRouteEnter(_from, _to, next) {
        next(vm => (vm as any).reload())
    },
    components: { Avatar }
})
</script>
