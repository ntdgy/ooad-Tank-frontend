<template>
  <el-row class="settings" style="width:100%;">
    <el-col class="text-settings" :span="16">
      Configure page status
      <el-divider />
      <el-form :model="form" label-width="120px">
        <el-form-item label="Enabled">
          <el-switch v-model="form.enabled" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateEnabled">Update</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"
import { ElMessage } from "element-plus"

import { baseUrl } from "@/stores/configs"
import { handleResponse } from "@/utils/util"
import type { Metadata } from "@/utils/api"

export default defineComponent({
    props: {
        metadata: Object as PropType<Metadata>
    },
    emits: ['updateMetadata'],
    data() {
        return {
            old_enabled: false,
            form: {
                enabled: false
            }
        }
    },
    methods: {
        mount() {
            this.old_enabled = this.metadata?.hasPage!
            this.form.enabled = this.old_enabled
        },
        updateEnabled() {
            const formData = new FormData()
            formData.append('status', this.form.enabled.toString())
            this.axios.post(`${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/pages`, formData, {
                withCredentials: true
            }).then(res => handleResponse(res))
                .then(() => {
                    ElMessage.success('Status updated')
                    this.$emit('updateMetadata')
                })
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
