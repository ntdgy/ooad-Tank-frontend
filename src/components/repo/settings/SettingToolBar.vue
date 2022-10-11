<template>
  <el-row class="setting-navi">
    <el-col>
      <h5 class="mb-2">XYN Settings</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
       router>
        <el-menu-item index="">
          <el-icon><icon-menu /></el-icon>
          <span>General</span>
        </el-menu-item>
        <el-menu-item-group title="Access">
          <el-menu-item index="collaborators">
            <el-icon><icon-menu /></el-icon>
            <span>Collaborators</span>
          </el-menu-item>
          <el-sub-menu :index="access">
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
            <el-icon><icon-menu /></el-icon>
            <span>Branches</span>
          </el-menu-item>
          <el-menu-item index="tag">
            <el-icon><icon-menu /></el-icon>
            <span>Tags</span>
          </el-menu-item>
          <el-menu-item index="action">
            <el-icon><icon-menu /></el-icon>
            <span>Actions</span>
          </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group title="Security">
          <el-menu-item index="secrtiry">
            <el-icon><icon-menu /></el-icon>
            <span>Code security and analysis</span>
          </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group title="Integrations">
          <el-menu-item index="integrations">
            <el-icon><icon-menu /></el-icon>
            <span>Email notifications</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {};
const handleClose = (key: string, keyPath: string[]) => {};
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