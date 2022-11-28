<template>
  <div class="settings-main">
    <el-container>
      <el-aside width="200px">
        <SettingToolBar />
      </el-aside>
      <el-container class="main">
        <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import SettingToolBar from "@/components/repo/settings/SettingToolBar.vue"
import { defineComponent } from "vue"

export default defineComponent({
    components: {
        SettingToolBar
    }
})
</script>

<style scoped>
.settings-main {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
