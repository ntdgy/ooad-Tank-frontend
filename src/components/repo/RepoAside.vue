<template>
    <el-menu default-active="repo" @select="onSelect">
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
        // https://github.com/element-plus/element-plus/issues/7897
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
                f("Settings", "settings"),
                f("test_file", "file"),
                f("test_issue", "issuetest")
            ]
        }
    },
    methods: {
        onSelect(index: string) {
            this.$router.push({name: index})
        }
    }
})
</script>

<style scoped>
.el-menu-item.is-active {
    background-color: #409eff1a;
}
</style>
