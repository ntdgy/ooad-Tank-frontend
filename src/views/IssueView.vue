<template>
    <div class="issue-main">
        <IssueHeader />
        <el-divider />
        <el-timeline>
            <!-- <el-timeline-item timestamp="2018/4/12" placement="top"> -->
            <!-- <RepoMDViewer :url="readmeUrl" /> -->
            <!-- </el-timeline-item> -->
            <el-timeline-item size="large">
                <div class="test">
                    <el-avatar size="small"></el-avatar>
                    <div><a>Froster</a> did something 4 days ago</div>
                </div>
            </el-timeline-item>
            <el-timeline-item size="large">
                <div class="test">
                    <el-avatar size="small"></el-avatar>
                    <div><a>Froster</a> commented 4 days ago</div>
                </div>
                <el-card class="card">
                    <h4>Update Github template</h4>
                    <p>Tom committed 2018/4/2 20:46</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script lang="ts">
// import RepoMDViewer from "@/components/repo/RepoMDViewer.vue"
import IssueHeader from "@/components/repo/issue/IssueHeader.vue"
import { defineComponent } from "vue"

export default defineComponent({
    data() {
        return {
            readmeUrl: "https://raw.githubusercontent.com/Fros1er/Fros1er/main/README.md"
        }
    },
    components: {
        // RepoMDViewer,
        IssueHeader
    }
})
</script>

<style scoped>
.issue-main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.test {
    display:flex;
    align-items: center;
}

.card {
    margin-top: 0.75rem;
}

.test span {
    margin-right: 0.5rem;
}

.test a {
    vertical-align: bottom;
}
</style>

<style>
.issue-main .el-timeline-item__wrapper {
    top: -5px;
}
</style>