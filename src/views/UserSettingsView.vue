<template>
    <div>
      <el-container>
        <el-aside class="aside">
            <UserSettingAside />
        </el-aside>
        <el-container class="main">
            <router-view />
        </el-container>
      </el-container>
    </div>
  </template>
  
<script lang="ts">
import { defineComponent } from "vue"
import UserSettingAside from "@/components/user/UserSettingAside.vue"

export default defineComponent({
    components: { UserSettingAside }
})

</script>
  
<style scoped>

.aside {
  width: 200px;
  margin-left: 20px;
}

.main {
  
}

</style>
