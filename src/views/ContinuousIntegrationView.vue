<template>
    <el-main>
        <Space />
        
        <el-divider content-position="left">
            <div class="div-title">Task Config</div>
        </el-divider>
        <el-divider content-position="left">
            <div class="div-title">Task List</div>
        </el-divider>
        <ul class="issue-list">
            <CIEntry 
                v-for="task in tasks" 
                :id="task.id" 
                :name="task.ciName" 
                :time="task.createTime" 
                :key="task.id" />
        </ul>
    </el-main>
    <!-- <el-aside style="background-color: aqua;">About</el-aside> -->
</template>

<script lang="ts">
import { defineComponent } from "vue"
import CIEntry from "@/components/repo/ci/CIEntry.vue"
import Space from "@/components/common/Space.vue"

import { baseUrl } from "@/stores/configs"
import type { CITaskData } from "@/utils/api"
import { handleResponse } from "@/utils/util"


export default defineComponent({
    data() {
        return {
            search: "",
            select: "",
            tasks: Array<CITaskData>()
        }
    },
    methods: {
        onClear() {
            this.search = ""
        }
    },
    components: {
        CIEntry,
        Space
    },
    beforeRouteEnter(_to, _from, next) {
        next(vm => {
            vm.axios.get(`${baseUrl}/api/repo/${vm.$route.params.username}/${vm.$route.params.reponame}/ci/list`, {
                withCredentials: true
            })
                .then(res => handleResponse(res))
                .then(data => {
                    (vm as any).tasks = data
                    console.log(data)
                })
        })
    }
})
</script>

<style>
.issue-tabs .el-tabs__nav-wrap {
    padding-left: 1rem;
}

.issue-tabs .el-tabs__header {
    margin: 0;
}

.div-title {
    font-size: 1.5rem;
}

</style>
