<template>
    <el-main>
        <ul><RepoCommitEntry :commit="commit" :gitRef="commit.commit_hash" @update="update" :key="commit.commit_hash" :hideRevert="true"/></ul>
        <ul v-for="diff in diffList">
            <p>Changed: {{diff.file_path}}</p>
            <code-diff
                :old-string="diff.origin"
                :new-string="diff.current"
                :file-name="diff.file_path"
                :drawFileList="false"
                output-format="side-by-side"/>
        </ul>
        <p v-if="(diffList.length == 0)">No Changes</p>
    </el-main>
</template>

<script lang="ts">
import RepoCommitEntry from "@/components/repo/commit/RepoCommitEntry.vue"
import {CodeDiff} from 'v-code-diff'
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
            if (route.params.commitHash == undefined) {
                return;
            }
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
    components: { RepoCommitEntry, CodeDiff }
})
</script>
