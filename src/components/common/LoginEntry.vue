<template>
        <el-button
              type="primary"
              @click="githubLogin" plain
            >Sign in</el-button>
        <el-button
              type="primary"
              @click="sign" plain
            >Sign up</el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue"


export default defineComponent({
    data() {
        return {
        }
    },
    methods: {
        githubLogin(){
            window.location.href = "/login"
        },
        sign(){
            window.location.href = "/register"
        }
    }
})
</script>
