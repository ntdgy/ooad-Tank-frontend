<template>
    <el-card>
    </el-card>
</template>

<script lang="ts">

export default {
    data() { // for test only
        let testIssues = []
        for (let i = 0; i < 25; i++) {
            let r = Math.random()
            testIssues.push({
                issueType: r > 0.6 ? "open" : (r > 0.3 ? "solved" : "closed"),
                title: (Math.random() + 1).toString(36).substring(2),
                id: 9999,
                user: (Math.random() + 1).toString(36).substring(2),
                time: "29 Feb"
            })
        }
        return {
            issues: testIssues
        }
    }
}
</script>

<style scoped>
.el-row {
    border-top: 1px solid var(--el-border-color);
    padding: 0.5rem 0rem;
}

.el-row:nth-child(1) {
    border-top: none;
}

.el-col.fs-col {
    display: flex;
    align-items: center;
}

.el-col.fs-col span {
    display: inline-flex;
    align-items: center;
    margin-left: 15px;
}
</style>
