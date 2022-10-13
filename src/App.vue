<template>
    <el-container class="content">
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
