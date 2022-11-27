<template>
  <el-row class="settings" style="width:100%;">
    <el-col class="text-settings" :span="16">
      Change email
      <el-divider />
      <el-form :model="formEmail" label-width="120px">
        <el-form-item label="Email">
          <el-input v-model="formEmail.email" :placeholder="old_email" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateEmail">Update</el-button>
        </el-form-item>
      </el-form>
      Change password
      <el-divider />
      <el-form :model="formPassword" label-width="120px">
        <el-form-item label="New password">
          <el-input v-model="formPassword.password" show-password="true"/>  
        </el-form-item>
        <el-form-item label="Confirm password">
          <el-input v-model="formPassword.password2" show-password="true"/>  
        </el-form-item>
        <el-form-item label="Verification code">
          <el-input v-model="formPassword.code" />  
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
import { userStore } from "@/stores/user"
import { handleResponse } from "@/utils/util"

export default defineComponent({
    data() {
        return {
            old_email: '',
            formEmail: {
                email: ''
            },
            formPassword: {
                password: '',
                password2: '',
                code: ''
            }
        }
    },
    methods: {
        mount() {
            if (userStore().username == undefined) {
                userStore().fillName().then(() => {
                    this.fillOldUserinfo()
                })
            } else {
                this.fillOldUserinfo()
            }
        },
        fillOldUserinfo() {
            this.axios.get(`${baseUrl}/api/user/${userStore().username}`)
                .then(res => res.data.data)
                .then(data => {
                    console.log(data)
                    this.old_email = data.email
                })
        },
        updateEmail() {
            if (this.formEmail.email) {
                const emailFormData = new FormData()
                emailFormData.append('email', this.formEmail.email)
                this.axios.post(`${baseUrl}/api/user/updateEmail`, emailFormData, {
                    withCredentials: true
                }).then(data => {
                    console.log('update email: ')
                    console.log(data.data)
                    if (data.data.status.code == 200) {
                        this.old_email = this.formEmail.email
                    } else {
                        console.log('update email failed')
                    }
                })
            }
        }, 
        updatePassword() {
            if (this.formPassword.password) {
              if (this.formPassword.password !== this.formPassword.password2) {
                ElMessage.warning('The two entered passwords do not match')
                return
              } else if (!this.formPassword.code) {
                ElMessage.warning('Verification code should not be empty')
                return
              }
              const pwFormData = new FormData()
              pwFormData.append('email', this.old_email)
              pwFormData.append('code', this.formPassword.code)
              pwFormData.append('password', this.formPassword.password)
              this.axios.post(`${baseUrl}/api/user/resetPassword`, pwFormData, {
                  withCredentials: true
              }).then(res => handleResponse(res))
                .then(() => ElMessage.success('Password changed'))
            }
        },
        sendCode() {
            const codeFormData = new FormData()
            codeFormData.append('email', this.old_email)
            this.axios.post(`${baseUrl}/api/user/sendResetPasswordEmail`, codeFormData, {
                withCredentials: true
            }).then(res => handleResponse(res))
              .then(() => ElMessage.success('Verification code sent to your email'))
        }
    },
    beforeMount() {
        this.mount()
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
