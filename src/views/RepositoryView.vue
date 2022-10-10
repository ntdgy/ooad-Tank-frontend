<template>
    <el-container class="content">
        <el-header>
            <AppHeader />
        </el-header>
        <el-container>
            <el-aside width="200px">
                <RepoAside />
            </el-aside>
            <el-container class="main">
                <router-view :tree="tree" />
            </el-container>
            <!--placeholder-->
            <el-aside width="200px" />
        </el-container>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script lang="ts">
import AppHeader from "@/components/common/AppHeader.vue"
import RepoAside from "@/components/repo/RepoAside.vue"
import { baseUrl } from "@/stores/configs"

export default {
    data() {
        return {
            tree: []
        }
    },
    components: {
        AppHeader,
        RepoAside
    },
    created() {
        this.$watch( // TODO: wrong api
            () => [this.$route.params.username, this.$route.params.reponame],
            (toParams: any) => {
                fetch(`${baseUrl}/api/git/${toParams[0]}/${toParams[1]}/commit_tree`)
                    .then(res => res.json())
                    .then(data => {
                        this.tree = data.data.tree
                        console.log(this.tree)
                    }).catch(e => console.error(e))
            },
            {
                immediate: true
            }
        )
    }
}
</script>

<style scoped>
.el-header {
    background-color: pink;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.el-container.main {
    margin: 0 8rem;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
</style>
