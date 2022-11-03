<template>
    <el-form ref="ruleFormRef" :model="form" status-icon label-width="120px" class="demo-ruleForm">
        <el-form-item label="Password" prop="pass">
            <el-input v-model="form.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
            <el-input v-model="form.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Age" prop="age">
            <el-input v-model.number="form.age" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary">Submit</el-button>
            <el-button>Reset</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { defineComponent } from "vue"
// import { baseUrl } from "@/stores/configs"

export default defineComponent({
    data() {
        return {
            form: {
                pass: "",
                checkPass: "",
                age: 0
            }
        }
    },
    methods: {
    }
})
</script>

<style scoped>

</style>

<!-- /api/repo/create
{
	"name": "sdfasd",
	"visible": 0
} -->
