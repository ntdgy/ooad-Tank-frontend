<template>
    <el-container>
        <el-header>
            <AppHeader />
        </el-header>
        <router-view />
    </el-container>
</template>

<script lang="ts">
import AppHeader from "@/components/common/AppHeader.vue"
import { defineComponent } from "vue"

export default defineComponent({
    components: {
        AppHeader
    }
})
</script>

<style scoped>
.el-header {
    background-color: pink;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>

<style>
body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    line-height: 1.5;
}
</style>
