<template>
    <el-main>
        <ul>
            <RepoCommitEntry v-for="commit in commits" :commit="commit" :gitRef="branch" @update="update" :key="commit.commit_hash" />
        </ul>
    </el-main>
</template>

<script lang="ts">
import RepoCommitEntry from "@/components/repo/commit/RepoCommitEntry.vue"
import type { Commit } from "@/utils/api"
import { gitApi, handleResponse } from "@/utils/util"
import { defineComponent } from "vue"
import type { RouteLocationNormalized } from "vue-router"

export default defineComponent({
    data() {
        return {
            branch: "master",
            commits: Array<Commit>()
        }
    },
    methods: {
        update(route: RouteLocationNormalized) {
            this.branch = route.params.branch as string
            this.axios.get(`${gitApi(route)}/commits/${this.branch}`, {
                withCredentials: true
            })
                .then(res => handleResponse(res))
                .then(data => {
                    this.commits = data
                    console.log(this.commits)
                })
        }
    },
    beforeRouteEnter(to, _from, next) {
        next(vm => (vm as any).update(to))
    },
    beforeRouteUpdate(to) {
        this.update(to)
    },
    components: { RepoCommitEntry }
})
</script>
