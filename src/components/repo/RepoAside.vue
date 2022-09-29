<template>
  <el-menu default-active="issue" router>
    <template v-for="{ title, index } in menus" :key="index">
      <el-menu-item :index="index">
        <template #title>
          <span>{{ title }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    data() {
    // for test only
        const f = (a: string, b: string) => {
            return {
                title: a,
                index: b
            }
        }
        return {
            menus: [
                f("Repository", "repo"),
                f("Issues", "issue"),
                f("Pull requests", "pulls"),
                f("Actions", "actions"),
                f("Settings", "settings")
            ]
        }
    }
})
</script>

<style scoped>
.el-menu-item.is-active {
  background-color: #409eff1a;
}
</style>
