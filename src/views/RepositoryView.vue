<template>
    <RepoHeader :username="username" :reponame="reponame" :metadata="metadata" />
    <div class="flex justify-center">
        <div class="max-w-7xl mt-4 flex-auto">
            <router-view :branches="branches" :default-branch="defaultBranch" :metadata="metadata" />
        </div>
    </div>
</template>

<script lang="ts">
import RepoHeader from "@/components/repo/RepoHeader.vue"

import { baseUrl } from "@/stores/configs"

export default {
    components: {
        RepoHeader
    },
    data() {
        return {
            branches: [],
            username: "",
            reponame: "",
            defaultBranch: "",
            head: undefined,
            tags: undefined,
            metadata: undefined
        }
    },
    created() {
        // TODO: 点左边导航栏不加载
        this.$watch(
            () => this.$route.params.username + '|' + this.$route.params.reponame,
            this.repoChangeHandler,
            { immediate: true }
        )
    },
    methods: {
        repoChangeHandler() {
            this.username = this.$route.params.username as string
            this.reponame = this.$route.params.reponame as string
            this.axios.get(`${baseUrl}/api/git/${this.username}/${this.reponame}/`, {
                withCredentials: true
            })
                .then(res => res.data.data)
                .then(data => {
                    console.log(data)
                    this.branches = data.branches
                    this.defaultBranch = data.default_branch
                    this.head = data.head
                    this.tags = data.tags
                }).catch(e => console.error(e))

            this.axios.get(`${baseUrl}/api/repo/${this.username}/${this.reponame}/metaData`, {
                withCredentials: true
            })
                .then(res => res.data.data)
                .then(data => {
                    this.metadata = data
                })
        }
    }
}
</script>
