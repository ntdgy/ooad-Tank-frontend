<template>
  <Toolbar>
    <template #left>
      <img class="logo" src="/element-plus-logo.svg" />
      <el-input 
        v-model="input1"
        style="width: 12.5rem; margin-left: 1rem;"
        size="large"
        placeholder="Search"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <Search />
          </el-icon>
        </template>
      </el-input>
    </template>
    <template #right>
      <UserDetailEntry />
    </template>
  </Toolbar>
</template>

<script lang="ts">
import Toolbar from "./Toolbar.vue"
import UserDetailEntry from "./UserDetailEntry.vue"
export default {
    components: {
        Toolbar,
        UserDetailEntry
    },
    data() {
        return {
            input1: ""
        }
    }
}
</script>

<style scoped>
.logo {
  height: var(--el-component-size-large);
}
</style>
