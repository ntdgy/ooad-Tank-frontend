<template>
  <el-row class="setting-navi">
    <el-col>
      <h5 class="mb-2">XYN Settings</h5>
      <el-menu :default-active="defaultMenuIndex" class="el-menu-vertical-demo" router>
        <el-menu-item index="general">
          <el-icon><MenuIcon /></el-icon>
          <span>General</span>
        </el-menu-item>
        <el-menu-item-group title="Access">
          <el-menu-item index="collaborators">
            <el-icon><MenuIcon /></el-icon>
            <span>Collaborators</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Code and automation">
          <el-menu-item index="pages">
            <el-icon><MenuIcon /></el-icon>
            <span>Pages</span>
          </el-menu-item>
        </el-menu-item-group>

        <!-- el-menu-item-group title="Code and automation">
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
        </el-menu-item-group -->
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
    },
    data() {
        return {
            defaultMenuIndex: 'general'
        }
    },
    methods: {
        mount() {
            const pathPortions = window.location.pathname.split('/').filter(s => s)
            const lastPortion = pathPortions[pathPortions.length - 1]
            if (lastPortion == 'settings' || lastPortion == 'general') {
                this.defaultMenuIndex = 'general'
            } else if (lastPortion == 'collaborators') {
                this.defaultMenuIndex = 'collaborators'
            } else if (lastPortion == 'pages') {
                this.defaultMenuIndex = 'pages'
            } else {
                this.defaultMenuIndex = 'general'
                console.log('can not determine menu index by url path, please check the code')
            }
        }
    }, beforeMount() {
        this.mount()
    }
})
</script>

<style scoped>
.setting-navi {
  margin-right: 3rem;
  /* height: 100%; */
  /* width: 15em; */
  /* margin-left: -100px; */
  /* position: fixed; */
  /* z-index: 50; */
}
</style>
