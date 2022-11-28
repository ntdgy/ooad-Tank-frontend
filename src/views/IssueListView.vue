<template>
    <el-main>
        <div class="flex">
            <el-input v-model="search" placeholder="Search all issues & prs" class="input-with-select" clearable
                @clear="$emit('onClear')">
                <template #append>
                    <el-button>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </el-button>
                </template>
            </el-input>
            <el-button style="margin-left: 1rem" type="primary" @click="newIssue">New issue</el-button>
        </div>
        <Space />
        <div class="issue-tabs">
            <el-tabs>
                <el-tab-pane label="Open" />
                <el-tab-pane label="Closed" />
                <el-tab-pane label="All" />
            </el-tabs>
        </div>
        <ul class="issue-list">
            <RepoIssueEntry v-for="issue in issues" :issue="issue" :key="issue.repo_issue_id"/>
        </ul>
    </el-main>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import RepoIssueEntry from "@/components/repo/issue/RepoIssueEntry.vue"
import Space from "@/components/common/Space.vue"

import type { Issue } from "@/utils/api"
import { handleResponse, checkLogin, repoApi } from "@/utils/util"
import type { RouteLocationNormalized } from "vue-router"


export default defineComponent({
    data() {
        return {
            search: "",
            select: "",
            issues: Array<Issue>()
        }
    },
    methods: {
        newIssue() {
            if (checkLogin()) {
                this.$router.push({ name: "newIssue" })
            }
        },
        update(route: RouteLocationNormalized) {
            this.axios.get(`${repoApi(route)}/issue`, {
                withCredentials: true
            })
                .then(res => handleResponse(res))
                .then(data => {
                    this.issues = data
                })
        }
    },
    components: {
        RepoIssueEntry,
        Space
    },
    beforeRouteEnter(to, _from, next) {
        next(vm => (vm as any).update(to))
    },
    beforeRouteUpdate(to) {
        this.update(to)
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
