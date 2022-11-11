<template>
  <div class="general-setting-div">
    <span>What you are you do not see, what you see is your shadow. </span>
    <el-divider content-position="left">Rabindranath Tagore</el-divider>
    <span
      >My wishes are fools, they shout across thy song, my Master. Let me but
      listen.</span
    >
    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>
    <span>I cannot choose the best. The best chooses me.</span>
    <el-divider content-position="right">Rabindranath Tagore</el-divider>
  </div>
</template>

<script lang="ts" setup>
import { StarFilled } from "@element-plus/icons-vue"
</script>

<style scoped>
.general-setting-div {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
