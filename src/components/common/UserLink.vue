<template>
    <el-link class="link">{{username}}</el-link>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: ["username"]
})
</script>

<style scoped>
.link {
    color: var(--el-text-color-regular) !important;
    vertical-align: bottom !important;
    font-weight: 600;
}
</style>
