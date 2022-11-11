<template>
  <el-row class="setting-navi">
    <el-col>
      <h5 class="mb-2">XYN Settings</h5>
      <el-menu default-active="2" class="el-menu-vertical-demo" router>
        <el-menu-item index="general">
          <el-icon><MenuIcon /></el-icon>
          <span>General</span>
        </el-menu-item>
        <el-menu-item-group title="Access">
          <el-menu-item index="collaborators">
            <el-icon><MenuIcon /></el-icon>
            <span>Collaborators</span>
          </el-menu-item>
          <el-sub-menu index="access">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Moderation options</span>
            </template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-sub-menu>
        </el-menu-item-group>

        <el-menu-item-group title="Code and automation">
          <el-menu-item index="branch">
            <el-icon><MenuIcon /></el-icon>
            <span>Branches</span>
          </el-menu-item>
          <el-menu-item index="tag">
            <el-icon><MenuIcon /></el-icon>
            <span>Tags</span>
          </el-menu-item>
          <el-menu-item index="action">
            <el-icon><MenuIcon /></el-icon>
            <span>Actions</span>
          </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group title="Security">
          <el-menu-item index="secrtiry">
            <el-icon><MenuIcon /></el-icon>
            <span>Code security and analysis</span>
          </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group title="Integrations">
          <el-menu-item index="integrations">
            <el-icon><MenuIcon /></el-icon>
            <span>Email notifications</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Menu as MenuIcon } from '@element-plus/icons-vue'

export default defineComponent({
    components: {
        MenuIcon
    }
})
</script>

<style scoped>
.setting-navi {
  height: 100%;
  width: 15em;
  margin-left: -100px;
  position: fixed;
  z-index: 50;
}
</style>
