<template>
    <el-menu default-active="0">
        <template v-for="(item, idx) in menus" :key="item">
            <el-menu-item :index="idx.toString()">
                <template #title>
                    <span>{{item}}</span>
                </template>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script lang="ts">
export default {
    data() {
        return {
            menus: ["Code", "Issues", "Pull requests"]
        }
    }
}
</script>

<style scoped>
.el-menu-item.is-active {
    background-color: #409eff1a;
}
</style>
