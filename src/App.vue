<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <AppHeader />
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <RepoAside />
                </el-aside>
                <el-container class="main">
                    <router-view />
                </el-container>
                <!--placeholder-->
                <el-aside width="200px"/>
            </el-container>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>
  
<script lang="ts">
import AppHeader from './components/common/AppHeader.vue'
import RepoAside from "./components/repo/RepoAside.vue"
import Repository from "./components/Repository.vue"

const routes = [{path: '/repo', component: Repository}]

export default {
    components: {
        AppHeader,
        RepoAside
    }
}
</script>

<style scoped>
.el-header {
    background-color: pink;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.el-container.main {
    margin: 0 8rem;
}
</style>