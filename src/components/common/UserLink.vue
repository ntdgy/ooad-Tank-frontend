<template>
    <el-link class="font-600 !vertical-btm !color-el-regular" @click="redirect">{{ username }}</el-link>
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
