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
        <!-- <RepoIssueList /> -->
    </el-main>
    <!-- <el-aside style="background-color: aqua;">About</el-aside> -->
</template>

<script lang="ts">
import { defineComponent } from "vue"
// import RepoIssueList from "@/components/repo/issue/RepoIssueList.vue"
import Space from "@/components/common/Space.vue"
import RepoIssuePrToolbar from "@/components/repo/RepoIssuePrToolbar.vue"

export default defineComponent({
    data() {
        return {
            search: "",
            select: ""
        }
    },
    methods: {
        onClear() {
            this.search = "aaa"
        }
    },
    components: {
        // RepoIssueList,
        Space,
        RepoIssuePrToolbar
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
