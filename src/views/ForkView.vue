<template>
    <el-container class="mx-32">
        <el-main>
            <h1>Create new fork</h1>
            <el-form :model="form" label-width="8rem">
                <el-form-item label="Repository name" prop="name">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="public">
                    <el-radio-group v-model="form.public">
                        <el-radio :label="true" size="large">Public</el-radio>
                        <el-radio :label="false" size="large">Private</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submit" type="primary">Create</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { baseUrl } from "@/stores/configs"
import { userStore } from "@/stores/user"

export default defineComponent({
    data() {
        return {
            form: {
                name: this.$route.params.reponame,
                public: true
            }
        }
    },
    methods: {
        submit() {
            this.axios.post(`${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/fork`,
                this.form, { withCredentials: true })
                .then(() => this.$router.push({ name: "repo", params: { username: userStore().username, reponame: this.form.name } }))
                .catch(e => {
                    //TODO: login
                    console.error(e)
                })
        }
    }
})
</script>
