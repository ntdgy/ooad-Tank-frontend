<template>
    <el-dropdown trigger="click">
        <span class="flex items-center">
            <el-avatar :size="36" :src="getAvatarSrc()"></el-avatar>
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="$router.push({ name: 'profile', params: { username: username } })">
                        Profile
                </el-dropdown-item>
                <el-dropdown-item @click="$router.push({ name: 'profile', params: { username: username }, query: { tab: 'repositories' } })">
                        Repositories
                </el-dropdown-item>
                <el-dropdown-item @click="$router.push({ name: 'profile', params: { username: username }, query: { tab: 'stars' } })">
                        Stars
                </el-dropdown-item>
                <el-dropdown-item @click="$router.push({name: 'userSettings'})" divided>
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
            }).then(data => {
                if (data.data.status.code == 200) {
                    userStore().username = undefined
                    this.$router.push({ name: "mainpage" })
                }
            })
        },
        reload() {
            if (userStore().username == undefined) {
                userStore().fillName()
            }
        },
        getAvatarSrc() {
            return userStore().username == undefined ? "" : `${baseUrl}/api/userinfo/${userStore().username}/avatar` 
        }
    },
    beforeRouteEnter(_from, _to, next) {
        next(vm => (vm as any).reload())
    }
})
</script>
