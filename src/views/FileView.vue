<template>
    <el-main>
        <RepoHeader />
        <RepoCodeViewer :url="codeUrl" lang="js"/>
    </el-main>
    <!-- <el-aside style="background-color: aqua;">About</el-aside> -->
</template>

<script lang="ts">
import RepoHeader from "@/components/repo/RepoHeader.vue"
import RepoCodeViewer from "@/components/repo/RepoCodeViewer.vue"
import { defineComponent } from "vue"
    
export default defineComponent({
    data() {
        return {
            codeUrl: "https://raw.githubusercontent.com/Fros1er/SUSTechTISHelper/master/SUSTechTISHelper.js"
        }
    },
    components: {
        RepoHeader,
        RepoCodeViewer
    }
})
</script>
