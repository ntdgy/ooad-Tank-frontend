<template>
    <el-row class="settings" style="width:100%;">
        <el-col class="text-settings" :span="16">
            <el-form :model="form" label-width="120px">
                <el-form-item label="Email Address">
                    <el-input v-model="form.email" />  
                </el-form-item>
                <el-form-item label="Verification code">
                    <el-input v-model="form.code" />  
                </el-form-item>
                <el-form-item label="New password">
                    <el-input v-model="form.password" :show-password="true"/>
                </el-form-item>
                <el-form-item label="Confirm password">
                    <el-input v-model="form.password2" :show-password="true"/>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="updatePassword">Update</el-button>
                <el-button type="primary" @click="sendCode">Send verification code</el-button>
            </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="8"></el-col>
    </el-row>
</template>
  
<script lang="ts">
import { defineComponent } from "vue"
import { ElMessage } from "element-plus"
  
import { baseUrl } from "@/stores/configs"
import { handleResponse } from "@/utils/util"
  
export default defineComponent({
    data() {
        return {
            form: {
                email: '',
                password: '',
                password2: '',
                code: ''
            }
        }
    },
    methods: {
        updatePassword() {
            if (!this.form.password) {
                ElMessage.warning('Input new password first')
                return
            }
            if (this.form.password !== this.form.password2) {
                ElMessage.warning('The two entered passwords do not match')
                return
            } 
            if (!this.form.code) {
                ElMessage.warning('Verification code should not be empty')
                return
            }
            const pwFormData = new FormData()
            pwFormData.append('email', this.form.email)
            pwFormData.append('code', this.form.code)
            pwFormData.append('password', this.form.password)
            this.axios.post(`${baseUrl}/api/user/resetPassword`, pwFormData, {
                withCredentials: true
            }).then(res => handleResponse(res))
                .then(() => {
                    ElMessage.success('Password changed')
                    this.$router.push({name: 'login'})
                })
        },
        sendCode() {
            if (!this.form.email) {
                ElMessage.warning('Input your email address first')
                return
            }
            const regex = /([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})/
            if (!this.form.email.match(regex)) {
                ElMessage.warning('Invalid email address')
                return
            }
            const codeFormData = new FormData()
            codeFormData.append('email', this.form.email)
            this.axios.post(`${baseUrl}/api/user/sendResetPasswordEmail`, codeFormData, {
                withCredentials: true
            }).then(res => handleResponse(res))
                .then(() => ElMessage.success('Verification code sent to your email'))
        }
    }
})
  
</script>
    
  <style scoped>
  
  .settings {
    margin: 2rem;
    display: flex;
    flex-direction: column;
  }
  
  .text-settings {
    margin-right: 2rem;
  }
  
  </style>
  
