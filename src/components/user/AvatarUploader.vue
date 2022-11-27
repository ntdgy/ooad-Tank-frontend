<!-- reference: https://element-plus.gitee.io/zh-CN/component/upload.html#%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F -->
<template>
  <el-upload
    class="avatar-uploader"
    ref="upload"
    :limit="1"
    :action="actionUrl"
    name="avatar"
    :with-credentials="true"
    :show-file-list="true"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :auto-upload="false"
  >
    <el-avatar v-if="imageUrl" :size="240" :src="imageUrl"></el-avatar>
    <el-avatar v-else :size="240" :src="avatarSrc"></el-avatar>
    <br />
    <template #tip>
      <div class="el-upload__tip">  
        Click avatar to select file to submit
      </div>
    </template>
  </el-upload>
  <br />
  <el-button type="success" @click="submitAvatar">
    Submit avatar
  </el-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'

import type { UploadInstance, UploadProps } from 'element-plus'

import { baseUrl } from '@/stores/configs'
import { userStore } from '@/stores/user'

const imageUrl = ref('')
const upload = ref<UploadInstance>()
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    console.log('upload avatar success')
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.warning('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.warning('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

export default defineComponent({
    setup() {
        return {
            upload,
            imageUrl,
            handleAvatarSuccess,
            beforeAvatarUpload
        }
    },
    data() {
        return {
            avatarSrc: `${baseUrl}/api/userinfo/${userStore().username}/avatar`,
            actionUrl: `${baseUrl}/api/userinfo/${userStore().username}/setAvatar`
        }
    },
    methods: {
        mount() {
            if (userStore().username == undefined) {
                userStore().fillName().then(() => {
                    this.avatarSrc = `${baseUrl}/api/userinfo/${userStore().username}/avatar`
                    this.actionUrl = `${baseUrl}/api/userinfo/${userStore().username}/setAvatar`
                })
            }
        },
        submitAvatar() {
      upload.value!.submit()
        }
    },
    beforeMount() {
        this.mount()
    }
})

</script>

<style scoped>

.avatar-uploader {
  flex: auto;
  flex-direction: column;
}

</style>
