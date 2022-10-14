
<template>
    <div>
        <RepoFileList :dir="dir" :default-branch="defaultBranch" />
        <Space />
        <RepoMDViewer :url="readmeUrl" />
    </div>
    <!-- <el-aside style="background-color: aqua;">About</el-aside> -->
</template>

<script lang="ts">
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

import RepoFileList from "@/components/repo/RepoFileList.vue"
import RepoMDViewer from "@/components/repo/RepoMDViewer.vue"
import Space from "@/components/common/Space.vue"
import { defineComponent } from "vue"

import { baseUrl } from "@/stores/configs"

export default defineComponent({
    props: ['defaultBranch'],
    data() {
        return {
            readmeUrl: "https://raw.githubusercontent.com/Fros1er/Fros1er/main/README.md",
            dir: undefined
        }
    },
    components: {
        RepoFileList,
        RepoMDViewer,
        Space
    },
    created() {
        this.$watch(
            () => [this.defaultBranch, this.$route.params.branch, this.$route.params.path],
            (params: any) => {
                this.getData(params)
            }
        )
    },
    beforeRouteEnter(_to, _from, next) {
        next((vm: any) => {
            vm.getData([vm.defaultBranch, vm.$route.params.branch, vm.$route.params.path])
        })
    },
    methods: {
        getData(params: any) {
            if (!params[0]) return
            let branch = params[1] ?? params[0]
            let path = params[2] ?? []
            if (path == "") path = []
            this.axios.get(`${baseUrl}/api/git/${this.$route.params.username}/${this.$route.params.reponame}/tree/${branch}/${path.join('/')}`, {
                withCredentials: true
            })
                .then((res: any) => res.data.data)
                .then((data: any) => {
                    this.dir = data
                })
        }
    }
})
</script>
