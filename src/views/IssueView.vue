<template>
    <div class="flex flex-col flex-auto issue-main">
        <div>
            <div class="flex justify-between items-center text-8 mt-8 whitespace-normal">
                <div>
                    <span class="ml-4">{{ title }}</span>
                    <span class="font-100 ml-4">#{{ id }}</span>
                </div>
                <div v-if="isIssue">
                    <el-button type="primary" @click="$router.push({ name: 'newIssue' })">New issue</el-button>
                </div>
            </div>
            <div class="flex items-center mt-2 ml-4 color-el-regular text-sm">
                <el-tag class="mr-4" :type="isOpen ? 'success' : 'warning'" size="large">{{ status }}</el-tag>
                <div v-if="isIssue">
                    <UserLink :username="issuer" /> opened this issue {{ getDeltaTimeString(createdAt) }} ago -
                    {{ contents.length }}
                    comment
                </div>
                <div v-else class="flex flex-row items-center">
                    <UserLink :username="issuer" class="mr-1" /> wants to merge
                    <el-tag class="mx-1">{{ pull?.from.name }}/{{ pull?.from_branch }} </el-tag>
                    into <el-tag class="mx-1">{{ pull?.to_branch }}</el-tag>
                </div>
            </div>
        </div>
        <el-divider />
        <el-timeline>
            <!-- <el-timeline-item size="large">
                <div class="flex flex-row items-center">
                    <Avatar size="small" :username="issuer" />
                    <div class="ml-2"><a>Froster</a> did something 4 days ago</div>
                </div>
            </el-timeline-item> -->
            <el-timeline-item size="large" v-for="content in contents" :key="content.issue_content_id">
                <div class="flex items-center">
                    <Avatar class="mr-2" :username="content.sender.name" size="small" />
                    <div>
                        <UserLink :username="content.sender.name" /> commented
                        {{ getDeltaTimeString(content.created_at) }} ago
                    </div>
                </div>
                <el-card class="mt-3">
                    <div v-html="md.render(!content.content ? '*No description provided.*' : content.content)"></div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <el-divider></el-divider>


        <el-card class="flex flex-col" v-if="!isIssue && status != 'closed'">
            <template v-if="pullStatus?.status == 'READY'">
                <div class="mb-2">There's no conflict in this pull request.</div>
                <el-input v-model="mergeMessage" placeholder="merge" class="mb-2"></el-input>
                <el-button @click="merge" type="success">Merge</el-button>
            </template>
            <template v-else-if="pullStatus?.status == 'MERGED'">
                <div class="mb-2">The pull request had been merged.</div>
            </template>
            <template v-else>
                <div class="mb-2">The pull request can't be merged automatically due to conflict or other issue.</div>
            </template>
        </el-card>
        <IssueEditor class="mt-4" v-model:content="newContent" @submit="submit" @changeStatus="changeStatus"
            submitString="Comment"
            :cancelString="(isOpen ? 'Close ' : 'Reopen ') + (isIssue ? 'issue' : 'pull request')" />
    </div>
</template>

<script lang="ts">
import MarkdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'
import IssueEditor from "@/components/repo/issue/IssueEditor.vue"
import Avatar from '@/components/common/Avatar.vue'
import { defineComponent } from "vue"

import { getDeltaTimeString } from "@/libs/times"
import { repoApi } from '@/utils/util'
import type { IssueContent, Pull, PullStatus } from "@/utils/api"
import { notFound, handleResponse } from "@/utils/util"
import UserLink from "../components/common/UserLink.vue"
import type { RouteLocationNormalized } from 'vue-router'

export default defineComponent({
    data() {
        return {
            contents: Array<IssueContent>(),
            createdAt: 0,
            issuer: "",
            id: 0,
            status: "",
            tag: [],
            title: "",
            updatedAt: 0,
            md: MarkdownIt().use(highlightjs, { inline: true }),
            newContent: "",
            isIssue: true,
            pull: undefined as Pull | undefined,
            pullStatus: undefined as PullStatus | undefined,
            mergeMessage: ""
        }
    },
    computed: {
        isOpen() {
            return this.status == "open"
        }
    },
    components: {
        // RepoMDViewer,
        IssueEditor,
        UserLink,
        Avatar
    },
    methods: {
        getDeltaTimeString: getDeltaTimeString,
        reload(route: RouteLocationNormalized) {
            if (route.name != "issue") {
                this.isIssue = false
                this.axios.post(`${repoApi(route)}/pull/${route.params.issueId}/checkMerge`, "", { withCredentials: true })
                    .then(res => handleResponse(res))
                    .then(data => {
                        this.pullStatus = data
                        console.log(data)
                    })
            }
            this.axios.get(`${repoApi(route)}/${this.isIssue ? "issue" : "pull"}/${route.params.issueId}`, {
                withCredentials: true
            })
                .then(res => handleResponse(res))
                .then(data => {
                    this.contents = data.contents
                    this.createdAt = data.created_at
                    this.issuer = data.issuer.name
                    this.id = data.repo_issue_id
                    this.status = data.status
                    this.tag = data.tag
                    this.title = data.title
                    this.updatedAt = data.updated_at
                    if (!this.isIssue) {
                        this.pull = data.pull
                    }
                })
                .catch(() => notFound())
        },
        async submit() {
            if (!this.isOpen) {
                await this.changeStatus()
            }
            this.axios.post(`${repoApi()}/${this.isIssue ? "issue" : "pull"}/${this.$route.params.issueId}/addComment`,
                { content: this.newContent },
                { withCredentials: true }
            ).then(res => handleResponse(res)).then(() => this.reload(this.$route))
        },
        changeStatus() {
            return this.axios.post(`${repoApi()}/${this.isIssue ? "issue" : "pull"}/${this.$route.params.issueId}/${this.isOpen ? "close" : "reopen"}`,
                {},
                { withCredentials: true }
            ).then(res => handleResponse(res)).then(() => this.reload(this.$route))
        },
        merge() {
            this.axios.post(`${repoApi()}/pull/${this.$route.params.issueId}/merge`,
                { message: this.mergeMessage },
                { withCredentials: true }
            ).then(res => handleResponse(res)).then(() => this.reload(this.$route))
        }
    },
    beforeRouteEnter(to, _from, next) {
        next(vm => {
            (vm as any).reload(to)
        })
    },
    beforeRouteUpdate(to) {
        this.reload(to)
    }
})
</script>

<style>
.issue-main .el-timeline-item__wrapper {
    top: -5px;
}
</style>
