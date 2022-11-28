<template>
  <el-main>
    <Space />

    <el-divider content-position="left">
      <div class="div-title">Task Config</div>
    </el-divider>
    <el-card>
      <el-table :data="files">
        <el-table-column prop="name" label="name">
          <template #default="scope">
            <div class="flex lg-items-center">
              <el-icon>
                <Document />
              </el-icon>
              <el-link class="ml-4" @click="navigate(scope.row.name)"
                >{{ scope.row.name }}
              </el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="action" align="right">
            <template #default="scope">
              <el-button type="primary" @click="run(scope.row.name)">Run</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Space />
    <el-divider content-position="left">
      <div class="div-title">Task List</div>
    </el-divider>
    <ul class="issue-list">
      <CIEntry
        v-for="task in tasks"
        :id="task.id"
        :name="task.ciName"
        :time="task.createTime"
        :key="task.id"
      />
    </ul>
  </el-main>
  <!-- <el-aside style="background-color: aqua;">About</el-aside> -->
</template>

<script lang="ts">
import { defineComponent } from "vue"
import CIEntry from "@/components/repo/ci/CIEntry.vue"
import Space from "@/components/common/Space.vue"

import type { CITaskData, FileData } from "@/utils/api"
import { handleResponse, gitApi, repoApi } from "@/utils/util"

export default defineComponent({
    data() {
        return {
            search: "",
            select: "",
            tasks: Array<CITaskData>(),
            files: Array<FileData>()
        }
    },
    methods: {
        navigate(name: string) {
            let tmp = this.$route.params.path
            let before =
        !tmp || tmp == "" ? [] : (tmp as string[]).filter((s) => s != "")
            let path = [...before, ...name.split("/")]
            this.$router.push({
                name: "blob",
                params: {
                    branch: this.$route.params.branch ?? "master",
                    path: path
                }
            })
        },
        run(name: string) {
            this.axios.post(`${repoApi()}/ci/run`, {
                ref:  this.$route.params.branch ?? "master",
                //ciName: "test222", 
                path: name
            },{
                withCredentials: true
            }).then((res) => handleResponse(res)).then(data => console.log(data))
        }
    },
    components: {
        CIEntry,
        Space
    },
    beforeRouteEnter(_to, _from, next) {
        next((vm) => {
            vm.axios
                .get(
                    `${repoApi()}/ci/list`,
                    {
                        withCredentials: true
                    }
                )
                .then((res) => handleResponse(res))
                .then((data) => {
                    (vm as any).tasks = data
                })
            let branch = vm.$route.params.branch ?? "master"
            vm.axios
                .get(`${gitApi()}/tree/${branch}/.xynhub/`, {
                    withCredentials: true
                })
                .then((res) => handleResponse(res))
                .then((data) => {
                    for(var i = 0; i < data.length; i++) {
                        if(!data[i].folder) {
                            (vm as any).files.push(data[i])
                        }
                    }
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
