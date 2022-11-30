<template>
    <el-main>
        <div class="flex">
            <el-input v-model="search" placeholder="Search" clearable @clear="$emit('onClear')">
            </el-input>
            <el-button style="margin-left: 1rem" type="primary" @click="newIssue">
                New {{ isIssue ? "issue" : "pull request" }}
            </el-button>
        </div>
        <Space />
        <div class="issue-tabs">
            <el-tabs v-model="filterName">
                <el-tab-pane label="Open" name="open" />
                <el-tab-pane label="Closed" name="closed" />
                <el-tab-pane label="All" name="all" />
            </el-tabs>
        </div>
        <ul>
            <RepoIssueEntry v-for="issue in filteredIssue" :issue="issue" :key="issue.repo_issue_id" />
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
            issues: Array<Issue>(),
            isIssue: true,
            filterName: "open"
        }
    },
    computed: {
        filteredIssue() {
            return this.issues.filter(i => {
                switch (this.filterName) {
                case "open":
                    if (i.status != 'open') return false
                    break
                case "closed":
                    if (i.status == 'open') return false
                    break
                }
                if (!this.search) return true
                return i.issuer.name.includes(this.search) || i.title.includes(this.search)
            })
        }
    },
    methods: {
        newIssue() {
            if (checkLogin()) {
                this.$router.push({ name: this.isIssue ? "newIssue" : "newPull" })
            }
        },
        update(route: RouteLocationNormalized) {
            this.isIssue = route.name == "issues"
            this.axios.get(`${repoApi(route)}/${this.isIssue ? "issue" : "pull"}`, {
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
