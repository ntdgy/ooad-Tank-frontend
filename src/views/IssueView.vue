<template>
    <div class="flex flex-col flex-auto issue-main">
        <div>
            <div class="flex justify-between items-center text-8 mt-8 whitespace-normal">
                <div>
                    <span class="ml-4">{{ title }}</span>
                    <span class="font-100 ml-4">#{{ id }}</span>
                </div>
                <div>
                    <el-button type="primary" @click="$router.push({ name: 'newIssue' })">New issue</el-button>
                </div>
            </div>
            <div class="flex items-center mt-2 ml-4 color-el-regular text-sm">
                <el-tag class="mr-4" :type="isOpen ? 'success' : 'warning'" size="large">{{status}}</el-tag>
                <div>
                    <UserLink :username="issuer" /> opened this issue {{ getDeltaTimeString(createdAt) }} ago -
                    {{ contents.length }}
                    comment
                </div>
            </div>
        </div>
        <el-divider />
        <el-timeline>
            <!-- <el-timeline-item timestamp="2018/4/12" placement="top"> -->
            <!-- <RepoMDViewer :url="readmeUrl" /> -->
            <!-- </el-timeline-item> -->
            <!-- <el-timeline-item size="large">
                <div class="item-desc">
                    <el-avatar size="small"></el-avatar>
                    <div><a>Froster</a> did something 4 days ago</div>
                </div>
            </el-timeline-item> -->
            <el-timeline-item size="large" v-for="content in contents" :key="content.issue_content_id">
                <div class="flex items-center">
                    <el-avatar class="mr-2" size="small"></el-avatar>
                    <div>
                        <UserLink :username="content.sender.name" /> commented
                        {{ getDeltaTimeString(content.created_at) }} ago
                    </div>
                </div>
                <el-card class="mt-3">
                    <div v-html="md.render(content.content)"></div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <el-divider></el-divider>
        <IssueEditor v-model:content="newContent" @submit="submit" @changeStatus="changeStatus" :closed="!isOpen"/>
    </div>
</template>

<script lang="ts">
import MarkdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'
import IssueEditor from "@/components/repo/issue/IssueEditor.vue"
import { defineComponent } from "vue"

import { getDeltaTimeString } from "@/libs/times"
import { repoApi } from '@/utils/util'
import type { IssueContent } from "@/utils/api"
import { notFound } from "@/utils/util"
import UserLink from "../components/common/UserLink.vue"

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
            newContent: ""
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
        UserLink
    },
    created() {
        this.$watch(
            () => this.$route.params.issueId,
            (id: any) => {
                if (!id) return
                this.reload(id)
            },
            { immediate: true }
        )
    },
    methods: {
        getDeltaTimeString: getDeltaTimeString,
        reload(id: any) {
            this.axios.get(`${repoApi()}/issue/${id}`, {
                withCredentials: true
            })
                .then(res => res.data.data)
                .then(data => {
                    this.contents = data.contents
                    this.createdAt = data.created_at
                    this.issuer = data.issuer.name
                    this.id = data.repo_issue_id
                    this.status = data.status
                    this.tag = data.tag
                    this.title = data.title
                    this.updatedAt = data.updated_at
                })
                .catch(() => notFound())
        },
        submit() {
            this.axios.post(`${repoApi()}/issue/${this.$route.params.issueId}/addComment`,
                { content: this.newContent },
                { withCredentials: true }
            ).then(res => console.log(res))
        },
        changeStatus() {
            this.axios.post(`${repoApi()}/issue/${this.$route.params.issueId}/${this.isOpen ? "close" : "reopen"}`,
                {},
                { withCredentials: true }
            ).then(res => console.log(res))
        }
    }
})
</script>

<style>
.issue-main .el-timeline-item__wrapper {
    top: -5px;
}
</style>
