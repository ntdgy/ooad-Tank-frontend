<template>
    <el-dropdown trigger="click">
        <span class="el-dropdown-link">
            <el-avatar :size="36"></el-avatar>
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <router-link to="/username">
                    <el-dropdown-item>Profile</el-dropdown-item>
                </router-link>
                <!-- TODO: add route to repositories page -->
                <el-dropdown-item>Repositories</el-dropdown-item>
                <!-- TODO: add route to stars page -->
                <el-dropdown-item>Stars</el-dropdown-item>
                <!-- TODO: add route to settings page -->
                <el-dropdown-item divided>Settings</el-dropdown-item>
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
            input1: ""
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
        }
    }
})
</script>

<style scoped>
/* 
'router-view' element would be converted to 'a' element 
ref: https://stackoverflow.com/questions/44808474/vue-router-how-to-remove-underline-from-router-link
*/
a {
    text-decoration: none;
}

.el-dropdown-link {
    display: flex;
    align-items: center;
}
</style>
