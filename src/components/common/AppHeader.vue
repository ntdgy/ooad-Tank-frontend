<template>
    <Toolbar>
        <template #left>
            <img src="/element-plus-logo.svg" />
        </template>
        <template #right>
            <el-input v-model="input1" style="width:12.5rem" size="large" placeholder="Search">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </template>
    </Toolbar>
</template>

<script lang="ts">
import Toolbar from "./Toolbar.vue"
export default {
    components: {
        Toolbar
    },
    data() {
        return {
            input1: ""
        }
    }
}
</script>

<style scoped>
.toolbar img {
    height: var(--el-component-size-large);
}
</style>