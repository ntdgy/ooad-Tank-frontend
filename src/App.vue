<template>
    <el-container class="content">
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
        <el-aside width="200px" />
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
</template>

<script lang="ts">
import AppHeader from "./components/common/AppHeader.vue"
import RepoAside from "./components/repo/RepoAside.vue"

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

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
