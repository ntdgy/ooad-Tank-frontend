<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>{{ user }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ repo }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider />
    <Toolbar>
      <template #left> </template>
    </Toolbar>

    <!--buttons-->
    <Toolbar>
      <template #left>
        <el-select v-model="value" filterable>
          <el-option-group label="type to search">
            <el-option
              v-for="branch in branches"
              :key="branch.value"
              :label="branch.label"
              :value="branch.value"
            />
          </el-option-group>
        </el-select>
      </template>
      <template #right>
        <el-button
          >Add File&nbsp;<el-icon><Plus /></el-icon
        ></el-button>
        <el-button type="primary"
          >Clone&nbsp;<el-icon><ArrowDown /></el-icon
        ></el-button>
        <!--TODO: use dropdown here-->
      </template>
    </Toolbar>
    <el-divider />
  </div>
</template>

<script lang="ts">
import Toolbar from "../common/Toolbar.vue"
export default {
    components: {
        Toolbar
    },
    data() {
        let branches = []
        for (let branch of ["master", "dev", "trash"]) {
            branches.push({ value: branch, label: branch })
        }
        return {
            user: "ooad-Tank",
            repo: "ooad-Tank-frontend",
            branches: branches,
            value: branches[0].value
        }
    }
}
</script>
