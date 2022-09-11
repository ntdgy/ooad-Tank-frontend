<template>
  <ul class="issue-list">
    <RepoIssueEntry
      v-for="issue in issues"
      :url="issue.url"
      :title="issue.title"
      :key="issue.id"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import RepoIssueEntry from "./RepoIssueEntry.vue"

export default defineComponent({
    data() {
        let testIssues = []
        for (let i = 0; i < 5; i++) {
            let r = Math.random()
            testIssues.push({
                issueType: r > 0.6 ? "open" : r > 0.3 ? "solved" : "closed",
                title: (Math.random() + 1).toString(36).substring(2),
                id: i,
                user: (Math.random() + 1).toString(36).substring(2),
                url: "www.baidu.com",
                time: "29 Feb"
            })
        }
        return {
            issues: testIssues
        }
    },
    components: { RepoIssueEntry }
})
</script>

<style scoped>
.issue-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
