<template>
  <el-row class="settings" style="width:100%;">
    <el-col class="text-settings" :span="16">
      <el-form :model="form" label-width="120px">
        <el-form-item label="Bio">
          <el-input v-model="form.bio" :placeholder="old_bio" type="textarea" />
        </el-form-item>
        <el-form-item label="Url">
          <el-input v-model="form.url" :placeholder="old_url" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update">Update</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col class="avatar-settings" :span="8">
      <AvatarUploader />
    </el-col>
  </el-row>
</template>
  
<script lang="ts">
import { defineComponent } from "vue"
import { ElMessage } from 'element-plus'

import { baseUrl } from "@/stores/configs"
import { userStore } from "@/stores/user"
import { handleResponse } from "@/utils/util"

import AvatarUploader from "@/components/user/AvatarUploader.vue"

export default defineComponent({
    components: {
        AvatarUploader
    },
    data() {
        return {
            old_bio: '',
            old_url: '',
            form: {
                bio: '',
                url: ''
            }
        }
    },
    methods: {
        mount() {
            console.log("mount")
            if (userStore().username == undefined) {
                userStore().fillName().then(() => {
                    this.fillOldUserinfo()
                })
            } else {
                this.fillOldUserinfo()
            }
        },
        fillOldUserinfo() {
            this.axios.get(`${baseUrl}/api/userinfo/${userStore().username}`)
                .then(res => handleResponse(res))
                .then(data => {
                    console.log(data)
                    this.old_bio = data.bio
                    this.old_url = data.home_page_url
                })
        },
        getAvatarSrc() {
            return userStore().username == undefined ? '' : `${baseUrl}/api/userinfo/${userStore().username}/avatar`
        },
        update() {
            if (this.form.url && !this.form.url.includes('.')) {
                ElMessage.warning('Url not empty but invalid')
                return
            }
            if (this.form.bio) {
                const bioFormData = new FormData()
                bioFormData.append('bio', this.form.bio)
                this.axios.post(`${baseUrl}/api/userinfo/updateBio`, bioFormData, {
                    withCredentials: true
                })
                    .then(res => handleResponse(res))
                    .then(() => {
                        this.old_bio = this.form.bio
                        this.form.bio = ''
                        ElMessage.success('Update bio success')
                    })
            }
            if (this.form.url) {
                const urlFormData = new FormData()
                urlFormData.append('url', this.form.url)
                this.axios.post(`${baseUrl}/api/userinfo/updateUrl`, urlFormData, {
                    withCredentials: true
                }).then(res => handleResponse(res))
                    .then(() => {
                        this.old_url = this.form.url
                        this.form.url = ''
                        ElMessage.success('Update url success')
                    })
            }
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
  
