<template>
    <el-link class="link" @click="redirect">{{ username }}</el-link>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: ["username"],
    methods: {
        redirect() {
            this.$router.push({ name: "profile", params: { username: this.username } })
        }
    }
})
</script>

<style scoped>
.link {
    color: var(--el-text-color-regular) !important;
    vertical-align: bottom !important;
    font-weight: 600;
}
</style>
