<template>
    <el-avatar :size="size" :src="avatarSrc"></el-avatar>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { baseUrl } from "@/stores/configs"
import type { PropType } from "vue"

type Size = "" | "default" | "small" | "large" | number

export default defineComponent({
    props: {
        username: String,
        size: Object as PropType<Size>
    },
    computed: {
        avatarSrc() {
            return this.username ? `${baseUrl}/api/userinfo/${this.username}/avatar` : ""
        }
    }
})
</script>
