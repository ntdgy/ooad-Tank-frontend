<template>
    <RepoHeader :username="username" :reponame="reponame" :metadata="metadata" @update-metadata="updateMetadata" />
    <div class="flex justify-center">
        <div class="max-w-7xl mt-4 flex-auto">
            <router-view :branches="branches" :default-branch="defaultBranch" :metadata="metadata" />
        </div>
    </div>
</template>

<script lang="ts">
import RepoHeader from "@/components/repo/RepoHeader.vue"

import { notFound, repoApi, gitApi, handleResponse, errorPopup } from "@/utils/util"

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
            Promise.all(
                [this.axios.get(`${gitApi()}/`, {
                    withCredentials: true
                })
                    .then(res => handleResponse(res, false))
                    .then(data => {
                        this.branches = data.branches
                        this.defaultBranch = data.default_branch
                        this.head = data.head
                        this.tags = data.tags
                    }),
                this.updateMetadata(false)
                ]
            ).catch(code => {
                errorPopup(code)
                notFound()
            })
        },
        updateMetadata(popup = true) {
            return this.axios.get(`${repoApi()}/metaData`, {
                withCredentials: true
            })
                .then(res => handleResponse(res, popup))
                .then(data => {
                    this.metadata = data
                })
        }
    }
}
</script>
