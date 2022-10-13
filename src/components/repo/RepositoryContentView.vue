<template>
    <el-main>
        <RepoHeader />
        <RepoFileList :dir="dir" />
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

import { baseUrl } from "@/stores/configs"
import { repoPath } from "@/stores/utils"

export default defineComponent({
    data() {
        return {
            branches: [],
            currentPath: "",
            head: undefined,
            tags: undefined,
            readmeUrl: "https://raw.githubusercontent.com/Fros1er/Fros1er/main/README.md",
            dir: undefined
        }
    },
    components: {
        RepoHeader,
        RepoFileList,
        RepoMDViewer,
        Space
    },
    watch: {
        currentPath(path) {
            if (!path) return
            this.axios.get(`${baseUrl}/api/git/${repoPath().path}/tree/${path}/`, {
                withCredentials: true
            })
                .then(res => res.data.data)
                .then(data => {
                    this.dir = data
                    console.log(data)
                })
        }
    },
    created() {
        /*
curl https://ooad.dgy.ac.cn/api/git/yuki/yuki-public
{"status":{"code":200,"message":""},"data":{"branches":["refs/heads/main","refs/heads/test_branch"],"tags":[],"default_branch":"master","head":null}}
curl https://ooad.dgy.ac.cn/api/git/yuki/yuki-public/tree/main
{"status":{"code":200,"message":""},"data":[{"name":"hellow","folder":false},{"name":"test_dir/","folder":true}]}
curl https://ooad.dgy.ac.cn/api/git/yuki/yuki-public/tree/main/test_dir
{"status":{"code":200,"message":""},"data":[{"name":"file_1","folder":false},{"name":"test_dir_2/","folder":true}]}
curl https://ooad.dgy.ac.cn/api/git/yuki/yuki-public/tree/main/test_dir/test_dir_2
{"status":{"code":200,"message":""},"data":[{"name":"file_2","folder":false}]}
curl https://ooad.dgy.ac.cn/api/git/yuki/yuki-public/blob/main/hellow
{"status":{"code":200,"message":""},"data":"Hello XYNHub\n"}      
        */
        this.$watch(
            () => [this.$route.params.username, this.$route.params.reponame],
            (toParams: any) => {
                repoPath().set(toParams[0], toParams[1])
                this.axios.get(`${baseUrl}/api/git/${repoPath().path}/`, {
                    withCredentials: true
                })
                    .then(res => res.data.data)
                    .then(data => {
                        this.branches = data.branches
                        this.currentPath = data.default_branch
                        this.head = data.head
                        this.tags = data.tags
                    }).catch(e => console.error(e))
            },
            {
                immediate: true
            }
        )
    }
})
</script>
