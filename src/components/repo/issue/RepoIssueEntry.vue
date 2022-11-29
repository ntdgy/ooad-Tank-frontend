<template>
    <li class="issue-list-item">
        <div class="main-info p-2 flex-auto">
            <el-link class="text-el-medium! decoration-none! font-600! vertical-mid! color-el-primary!" @click="route">
                {{ issue?.title }}</el-link>
            <div class="flex text-el-small mt-1 color-el-regular items-center">
                {{ descString }}&nbsp;
                <UserLink :username="issue?.issuer.name" />
            </div>
        </div>
        <div class="flex flex-col items-end justify-end p-2 color-el-regular">
            <div class="flex items-center">
                <el-icon>
                    <ChatLineSquare />
                </el-icon>
                <span class="ml-1 text-el-small">{{ issue?.comment_count }}</span>
            </div>
            <div class="text-el-small">
                <span>updated {{ getDeltaTimeString(issue?.updated_at) }} ago</span>
            </div>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"

import UserLink from "../../common/UserLink.vue"
import type { Issue } from "@/utils/api"

export default defineComponent({
    props: {
        issue: Object as PropType<Issue>
    },
    computed: {
        descString() {
            if (this.issue?.status == 'open') {
                return `#${this.issue?.repo_issue_id} opened ${getDeltaTimeString(this.issue?.created_at)} ago by`
            }
            return `#${this.issue?.repo_issue_id} closed ${getDeltaTimeString(this.issue?.created_at)} ago, opened by`
        }
    },
    methods: {
        route() {
            this.$router.push({ name: this.$route.name == "issues" ? "issue" : "pull", params: { issueId: this.issue?.repo_issue_id } })
        }
    },
    components: { UserLink }
})
</script>

<script setup lang="ts">
import { getDeltaTimeString } from "@/libs/times"
</script>

<style scoped>
.issue-list-item {
    display: flex;
    border-top: solid;
    border-top-width: 1px;
    border-color: var(--el-menu-border-color);
    line-height: 1.5;
}

.issue-list-item:nth-child(1) {
    border-top: none;
}
</style>
