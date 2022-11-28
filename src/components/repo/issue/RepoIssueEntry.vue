<template>
    <li class="issue-list-item">
        <div class="main-info">
            <el-link class="title" @click="$router.push({name: 'issue', params: {issueId: issue?.repo_issue_id}})">{{ issue?.title }}</el-link>
            <div class="comment">
                #{{issue?.repo_issue_id}} opened {{getDeltaTimeString(issue?.created_at)}} ago by&nbsp;
                <UserLink :username="issue?.issuer.name" />
            </div>
        </div>
        <div class="meta">
            <div class="icons">
                <el-icon>
                    <ChatLineSquare />
                </el-icon>
                <span>{{issue?.comment_count}}</span>
            </div>
            <div class="meta-comment">
                <span>updated {{getDeltaTimeString(issue?.updated_at)}} ago</span>
            </div>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"

import { getDeltaTimeString } from "@/libs/times"
import UserLink from "../../common/UserLink.vue"
import type { Issue } from "@/utils/api"

export default defineComponent({
    props: {
        issue: Object as PropType<Issue>
    },
    methods: {
        getDeltaTimeString: getDeltaTimeString
    },
    components: { UserLink }
})
</script>

<style scoped>
.issue-list-item {
    /* padding: 1rem 2rem; */
    display: flex;
    border-top: solid;
    border-top-width: 1px;
    border-color: var(--el-menu-border-color);
    line-height: 1.5;
}

.issue-list-item:nth-child(1) {
    border-top: none;
}

.main-info {
    padding: 8px;
    flex: auto;
}

.main-info a {
    text-decoration: none;
    font-weight: 600;
    vertical-align: middle;
    color: var(--el-text-color-primary);
}

.main-info .title {
    font-size: var(--el-font-size-medium);
}

.comment {
    display: flex;
    font-size: var(--el-font-size-small);
    margin-top: 0.25rem;
    color: var(--el-text-color-regular);
    align-items: center;
}

.meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: end;
    flex: 1 0 auto;
    padding: 8px;
    color: var(--el-text-color-regular);
}

.icons {
    display: flex;
    align-items: center;
}

.icons span {
    margin-left: 0.2rem;
    font-size: var(--el-font-size-small);
}

.meta-comment {
    font-size: var(--el-font-size-small);
}
</style>
