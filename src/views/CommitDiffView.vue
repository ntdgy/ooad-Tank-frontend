<template>
    <el-main>
        <ul>
            <RepoCommitEntry :commit="commit" :gitRef="commit.commit_hash" @update="update" :key="commit.commit_hash"
                :hideRevert="true" />
        </ul>
        <ul v-for="diff in diffList" :key="diff.file_path">
            <p>Changed: {{ diff.file_path }}</p>
            <code-diff :old-string="diff.origin" :new-string="diff.current" :file-name="diff.file_path"
                :drawFileList="false" output-format="side-by-side" />
            <div v-if="!diff.is_text" style="text-align: center">
                <img v-if="isPathImage(diff.file_path)" v-bind:src="rawUrl(diff.file_path)" style="width: 50%" />
                <el-link :href="rawUrl(diff.file_path)" class="ml-1">Download</el-link>
            </div>
            <br />
        </ul>
        <p v-if="(diffList.length == 0)">No Changes</p>
    </el-main>
</template>

<script lang="ts">
import RepoCommitEntry from "@/components/repo/commit/RepoCommitEntry.vue"
import { CodeDiff } from 'v-code-diff'
import type { Commit } from "@/utils/api"
import type { CommitDiff } from "@/utils/api"
import { gitApi, handleResponse } from "@/utils/util"
import { defineComponent } from "vue"
import type { RouteLocationNormalized } from "vue-router"

export default defineComponent({
    data() {
        return {
            commit: {} as Commit,
            diffList: Array<CommitDiff>()
        }
    },
    methods: {
        update(route: RouteLocationNormalized) {
            if (route.params.commitHash == undefined) {
                return
            }
            this.axios.get(`${gitApi(route)}/commit/${route.params.commitHash}`, {
                withCredentials: true
            })
                .then(res => handleResponse(res))
                .then(data => {
                    this.commit = data
                    this.diffList = data.diffList
                })
        },
        rawUrl(path: string) {
            return `${gitApi(this.$route)}/raw/${this.$route.params.commitHash}/${path}`
        },
        isPathImage(path: string) {
            return path.endsWith(".png") || path.endsWith(".jpg") || path.endsWith(".jpeg") || path.endsWith(".gif")
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
