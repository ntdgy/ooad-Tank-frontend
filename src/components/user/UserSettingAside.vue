<template>
    <h2>Personal Settings</h2>
        <el-menu
            default-active="profile"
            class="el-menu-vertical-demo"
            router
        >
        <el-menu-item index="profile">
            <el-icon><document /></el-icon>
            <span>Profile</span>
        </el-menu-item>
        <el-menu-item index="security">
            <el-icon><setting /></el-icon>
            <span>Security</span>
        </el-menu-item>
        </el-menu>
</template>
  
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
})

</script>
  
