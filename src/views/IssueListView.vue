<template>
    <el-main>
        <RepoIssuePrToolbar />
        <Space />
        <div class="issue-tabs">
            <el-tabs>
                <el-tab-pane label="Open" />
                <el-tab-pane label="Closed" />
                <el-tab-pane label="All" />
            </el-tabs>
        </div>
        <ul class="issue-list">
            <RepoIssueEntry 
                v-for="issue in issues" 
                :id="issue.repo_issue_id" 
                :title="issue.title" 
                :key="issue.repo_issue_id"
                :issuer="issue.issuer.name"
                :status="issue.status"
                :created-at="issue.created_at"
                :updated-at="issue.updated_at" />
        </ul>
    </el-main>
    <!-- <el-aside style="background-color: aqua;">About</el-aside> -->
</template>

<script lang="ts">
import { defineComponent } from "vue"
import RepoIssueEntry from "@/components/repo/issue/RepoIssueEntry.vue"
import Space from "@/components/common/Space.vue"
import RepoIssuePrToolbar from "../components/repo/RepoIssuePrToolbar.vue"

import { baseUrl } from "@/stores/configs"
import type { Issue } from "@/utils/api"


export default defineComponent({
    data() {
        return {
            search: "",
            select: "",
            issues: Array<Issue>()
        }
    },
    methods: {
        onClear() {
            this.search = ""
        }
    },
    components: {
        RepoIssueEntry,
        Space,
        RepoIssuePrToolbar
    },
    beforeRouteEnter(_to, _from, next) {
        next(vm => {
            vm.axios.get(`${baseUrl}/api/repo/${vm.$route.params.username}/${vm.$route.params.reponame}/issue`, {
                withCredentials: true
            })
                .then(res => res.data.data)
                .then(data => {
                    (vm as any).issues = data
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
</style>
