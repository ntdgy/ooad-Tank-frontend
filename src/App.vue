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
                    <el-main>
                        <RepoHeader />
                        <RepoFileList />
                        <div style="margin:1rem 0"></div>
                        <RepoMDViewer />
                    </el-main>
                    <!-- <el-aside style="background-color: aqua;">About
                    </el-aside> -->
                </el-container>
                <!--placeholder-->
                <el-aside width="200px"/>
            </el-container>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>
  
<script lang="ts">
import AppHeader from './components/common/AppHeader.vue';
import RepoAside from "./components/repo/RepoAside.vue"
import RepoFileList from "./components/repo/RepoFileList.vue"
import RepoMDViewer from "./components/repo/RepoMDViewer.vue"
import RepoHeader from "./components/repo/RepoHeader.vue"
export default {
    components: {
        AppHeader,
        RepoAside,
        RepoFileList,
        RepoMDViewer,
        RepoHeader
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
    margin: 0 2rem;
}
</style>