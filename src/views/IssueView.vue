<template>
    <div class="issue-main">
        <div>
            <div class="issue-title">
                <div>
                    <span>{{ title }}</span>
                    <span class="id">#{{ id }}</span>
                </div>
                <div>
                    <el-button type="primary" @click="$router.push({ name: 'newIssue' })">New issue</el-button>
                </div>
            </div>
            <div class="desc">
                <el-tag type="success" size="large">Open</el-tag>
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
                <div class="item-desc">
                    <el-avatar size="small"></el-avatar>
                    <div>
                        <UserLink :username="content.sender.name" /> commented
                        {{ getDeltaTimeString(content.created_at) }} ago
                    </div>
                </div>
                <el-card class="card">
                    <div v-html="md.render(content.content)"></div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <el-divider></el-divider>
        <IssueEditor v-model:content="newContent" @submit="submit" @close="close" />
    </div>
</template>

<script lang="ts">
import MarkdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'
import IssueEditor from "@/components/repo/issue/IssueEditor.vue"
import { defineComponent } from "vue"

import { getDeltaTimeString } from "@/libs/times"
import { baseUrl } from "@/stores/configs"
import type { IssueContent } from "@/libs/api"
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
            this.axios.get(`${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/issue/${id}`, {
                withCredentials: true
            })
                .then(res => res.data.data)
                .then(data => {
                    console.log(data)
                    this.contents = data.contents
                    this.createdAt = data.created_at
                    this.issuer = data.issuer.name
                    this.id = data.repo_issue_id
                    this.status = data.status
                    this.tag = data.tag
                    this.title = data.title
                    this.updatedAt = data.updated_at
                })
        },
        submit() {
            this.axios.post(`${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/issue/${this.$route.params.issueId}/addComment`,
                { content: this.newContent },
                { withCredentials: true }
            ).then(res => console.log(res))
        },
        close() {
            this.axios.post(`${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/issue/${this.$route.params.issueId}/close`,
                {},
                { withCredentials: true }
            ).then(res => console.log(res))
        }
    }
})
</script>

<style scoped>
.issue-main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.issue-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
    margin-top: 2rem;
    white-space: initial;
}

.desc {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-left: 1rem;
    color: var(--el-text-color-regular);
    font-size: var(--el-font-size-base);
}

.desc .el-tag {
    margin-right: 1rem;
}

.issue-title span {
    margin-left: 1rem;
}

.id {
    font-weight: lighter;
}

.item-desc {
    display: flex;
    align-items: center;
}

.card {
    margin-top: 0.75rem;
}

.item-desc span {
    margin-right: 0.5rem;
}
</style>

<style>
.issue-main .el-timeline-item__wrapper {
    top: -5px;
}
</style>