<template>
    <div>
        <h1>Select branches</h1>
        <el-card>
            <el-form :model="form" ref="form" label-width="8.5rem">
                <el-form-item label="From Repo:">
                    <el-select v-model="form.selectedRepo">
                        <el-option-group>
                            <el-option v-for="repo of selfRepos" :key="repo.name" :label="repo.name"
                                :value="repo.name" />
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <el-form-item label="Current branch:">
                    <el-select v-model="form.currentBranch">
                        <el-option-group label="type to search">
                            <el-option v-for="branch of branches" :key="branch" :label="branch" :value="branch" />
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <el-form-item label="Incoming Branch:">
                    <el-select v-model="form.incomingBranch" :disabled="form.selectedRepo == ''">
                        <el-option-group>
                            <el-option v-for="branch of incomingBranches" :key="branch" :label="branch"
                                :value="branch" />
                        </el-option-group>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
        <IssueEditor v-model:title="title" v-model:content="content" show-title @submit="submit" class="mt-4"
            submitString="Create" cancelString="Cancel" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { handleResponse, repoApi } from '@/utils/util'
import { baseUrl } from "@/stores/configs"
import type { RepoDesc } from "@/utils/api"
import { userStore } from "@/stores/user"
// import type { FormInstance } from "element-plus"
import IssueEditor from "@/components/repo/issue/IssueEditor.vue"

export default defineComponent({
    props: {
        branches: Array<string>
    },
    data() {
        return {
            title: "",
            content: "",
            selfRepos: Array<RepoDesc>(),
            incomingBranches: Array<string>(),
            form: {
                selectedRepo: undefined,
                incomingBranch: undefined,
                currentBranch: undefined
            }
        }
    },
    methods: {
        reload() {
            this.axios.get(`${baseUrl}/api/repo/list_self`, {
                withCredentials: true
            })
                .then(res => handleResponse(res))
                .then(data => {
                    this.selfRepos = data
                })
        },
        submit() {
            // (this.$refs.form as FormInstance).validate((v, f) => {
            // })
            this.axios.post(`${repoApi()}/pull/create`, {
                title: this.title,
                contents: [{ content: this.content }],
                pull: {
                    from: {
                        name: this.form.selectedRepo,
                        owner: {
                            name: userStore().username
                        }
                    },
                    to: null,
                    from_branch: this.form.incomingBranch,
                    to_branch: this.form.currentBranch
                }
            }, { withCredentials: true })
                .then(res => handleResponse(res))
                .then(data => this.$router.push({name: "pull", params: {issueId: data}}))
        }
    },
    watch: {
        "form.selectedRepo": function (repo: string) {
            if (!repo)
                return
            this.axios.get(`${baseUrl}/api/git/${userStore().username}/${repo}/`, {
                withCredentials: true
            })
                .then(res => handleResponse(res, false))
                .then(data => {
                    this.incomingBranches = data.branches
                })
        }
    },
    beforeRouteEnter(_to, _from, next) {
        next(vm => (vm as any).reload())
    },
    beforeRouteUpdate() {
        this.reload()
    },
    components: { IssueEditor }
})
</script>
