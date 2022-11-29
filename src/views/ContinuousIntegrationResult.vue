<template>
  <div class="flex flex-col flex-auto issue-main">
    <div>
      <div
        class="flex justify-between items-center text-8 mt-8 whitespace-normal"
      >
        <div>
          <span class="ml-4">{{ name }}</span>
          <span class="font-100 ml-4">#{{ id }}</span>
        </div>
      </div>
      <div class="border border-menu-color border-rd px-4" v-html="taskResult" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { handleResponse, repoApi } from '@/utils/util'
import MarkdownIt from "markdown-it"
import highlightjs from "markdown-it-highlightjs"
const md = MarkdownIt().use(highlightjs, { inline: true })
export default defineComponent({
    data() {
        this.reload(this.$route.params.taskId)
        return {
            id: this.$route.params.taskId,
            name: "",
            taskResult: ""
        }
    },
    created() {
        this.$watch(
            () => this.$route.params.taskID,
            (taskId: any) => {
                if (!taskId) return
                this.reload(taskId)
            },
            { immediate: true }
        )
    },
    methods: {
        reload(taskId: any) {
            this.axios
                .get(`${repoApi()}/ci/${taskId}/log`, {
                    withCredentials: true
                })
                .then((res) => handleResponse(res))
                .then((data) => {
                    this.id = taskId
                    this.name = "Task Result"
                    this.taskResult = md.render(data)
                })
        }
    }
})
</script>

<style>
.issue-main .el-timeline-item__wrapper {
  top: -5px;
}
</style>
