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
                <el-container>
                    <el-main>
                        <RepoFileList />
                        <div style="margin:1rem 0"></div>
                        <RepoMDViewer />
                    </el-main>
                </el-container>
            </el-container>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>
  
<script lang="ts">
import AppHeader from './components/AppHeader.vue';
import RepoAside from "./components/repo/RepoAside.vue"
import RepoFileList from "./components/repo/RepoFileList.vue"
import RepoMDViewer from "./components/repo/RepoMDViewer.vue"
export default {
    components: {
        AppHeader,
        RepoAside,
        RepoFileList,
        RepoMDViewer
    }
}
</script>
