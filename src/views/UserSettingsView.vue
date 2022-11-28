<template>
    <div>
        <el-container>
            <el-aside class="aside">
                <UserSettingAside />
            </el-aside>
            <el-container class="main">
                <router-view />
            </el-container>
        </el-container>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue"

import { userStore } from "@/stores/user"

import UserSettingAside from "@/components/user/UserSettingAside.vue"
import { ElMessage } from "element-plus"

export default defineComponent({
    components: { UserSettingAside },
    methods: {
        reload() {
            if (userStore().username == undefined) {
                
                userStore().fillName().catch(err => {
                    console.log(err)
                    if (err == '-2')
                        ElMessage.warning('Login to access setting page')
                    this.$router.push({ name: 'login' })
                }).then(() => {
                    console.log("navigating to setting page for user " + userStore().username)
                })
            } else {
                console.log("navigating to setting page for user " + userStore().username)
            }
        }
    },
    beforeRouteEnter(_from, _to, next) {
        next(vm => (vm as any).reload())
    }
})

</script>
  
<style scoped>
.aside {
    width: 200px;
    margin-left: 20px;
}

.main {}
</style>
