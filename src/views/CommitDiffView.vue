<template>
    <el-main>
        <!-- <RepoCommitEntry :commit="commit" :gitRef="commit.commit_hash" /> -->
        <ul >
            <CommitDiffEntry v-for="diff in diffList" :key="diff.file_path" :diff="diff"/>
        </ul>
    </el-main>
</template>

<script lang="ts">
import RepoCommitEntry from "@/components/repo/commit/RepoCommitEntry.vue"
import CommitDiffEntry from "@/components/repo/commit/CommitDiffEntry.vue"
import type { Commit } from "@/utils/api"
import type { CommitDiff } from "@/utils/api"
import { gitApi, handleResponse } from "@/utils/util"
import { defineComponent, type PropType } from "vue"
import type { RouteLocationNormalized } from "vue-router"

export default defineComponent({
    data() {
        return {
            commit: {} as Commit,
            diffList: Array<CommitDiff>()
        };
    },
    created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.update(this.$route);
      },
      { immediate: true }
    )
  },
    methods: {
        update(route: RouteLocationNormalized) {
            console.log("updated");
            this.axios.get(`${gitApi(route)}/commit/${route.params.commitHash}`, {
                withCredentials: true
            })
            .then(res => handleResponse(res))
            .then(data => {
                console.log(data);
                this.commit = data;
                this.diffList = data.diffList;
                console.log(this.commit);
                console.log(this.diffList);
            })
        }
    },
    beforeRouteEnter(to, _from, next) {
        next(vm => (vm as any).update(to))
    },
    beforeRouteUpdate(to) {
        this.update(to)
    },
    components: { RepoCommitEntry, CommitDiffEntry }
})
</script>
