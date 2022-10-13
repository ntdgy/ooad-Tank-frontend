<template>
    <el-container>
        <el-aside width="200px">
            <RepoAside />
        </el-aside>
        <el-container class="main">
            <router-view />
        </el-container>
        <!--placeholder-->
        <el-aside width="200px" />
    </el-container>
    <el-footer>Footer</el-footer>
</template>

<script lang="ts">
import RepoAside from "@/components/repo/RepoAside.vue"

export default {
    components: {
        RepoAside
    }
}
</script>

<style scoped>
.el-container.main {
    margin: 0 8rem;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
</style>
