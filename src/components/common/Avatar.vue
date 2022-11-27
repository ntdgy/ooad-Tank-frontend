<template>
    <el-avatar :size="size" :src="avatarSrc"></el-avatar>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { baseUrl } from "@/stores/configs"

export default defineComponent({
    props: {
        username: String,
        size: Number
    },
    computed: {
        avatarSrc() {
            return this.username ? `${baseUrl}/api/userinfo/${this.username}/avatar` : ""
        }
    }
})
</script>
