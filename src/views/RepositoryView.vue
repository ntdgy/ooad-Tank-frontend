<template>
    <el-main>
        <RepoHeader />
        <RepoFileList />
        <Space />
        <RepoMDViewer :url="readmeUrl" />
    </el-main>
    <!-- <el-aside style="background-color: aqua;">About</el-aside> -->
</template>

<script lang="ts">
import RepoHeader from "@/components/repo/RepoHeader.vue"
import RepoFileList from "@/components/repo/RepoFileList.vue"
import RepoMDViewer from "@/components/repo/RepoMDViewer.vue"
import Space from "@/components/common/Space.vue"
import { defineComponent } from "vue"
    
export default defineComponent({
    data() {
        return {
            readmeUrl: "https://raw.githubusercontent.com/Fros1er/Fros1er/main/README.md"
        }
    },
    components: {
        RepoHeader,
        RepoFileList,
        RepoMDViewer,
        Space
    }
})
</script>
