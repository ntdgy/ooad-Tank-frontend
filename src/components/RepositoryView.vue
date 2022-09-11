<template>
  <el-main>
    <RepoHeader />
    <RepoFileList />
    <Space />
    <RepoMDViewer />
  </el-main>
  <!-- <el-aside style="background-color: aqua;">About</el-aside> -->
</template>

<script lang="ts">
import RepoHeader from "./repo/RepoHeader.vue"
import RepoFileList from "./repo/RepoFileList.vue"
import RepoMDViewer from "./repo/RepoMDViewer.vue"
import Space from "./common/Space.vue"

export default {
    components: {
        RepoHeader,
        RepoFileList,
        RepoMDViewer,
        Space
    }
}
</script>
