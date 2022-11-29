<template>
    <li class="commit-list-item">
        <div class="main-info p-2 flex-auto">
            <el-link class="text-el-medium! decoration-none! font-600! vertical-mid! color-el-primary!">
            <!-- <el-link class="text-el-medium! decoration-none! font-600! vertical-mid! color-el-primary!" @click="route"> -->
                {{ commit?.commit_message }}</el-link>
            <div class="flex text-el-small mt-1 color-el-regular items-center">
                <UserLink :username="commit?.author.name" />
                &nbsp;
                {{ descString }}
            </div>
        </div>
        <div class="flex flex-col items-end justify-end p-2 color-el-regular">
            <div class="flex items-center">
                <el-button>
                    Revert
                </el-button>
            </div>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"
import { getDeltaTimeStringBySecond } from "@/libs/times"
import UserLink from "../../common/UserLink.vue"
import type { Commit } from "@/utils/api"

export default defineComponent({
    props: {
        // issue: Object as PropType<Issue>,
        commit: Object as PropType<Commit>
    },
    computed: {
        descString() {
            console.log(this.commit?.commit_time)
            return `committed ${getDeltaTimeStringBySecond(this.commit?.commit_time)} ago`
        }
    },
    methods: {
        // route() {
        //     this.$router.push({ name: this.$route.name == "issues" ? "issue" : "pull", params: { issueId: this.issue?.repo_issue_id } })
        // }
    },
    components: { UserLink }
})
</script>

<style scoped>
.commit-list-item {
    display: flex;
    border-top: solid;
    border-top-width: 1px;
    border-color: var(--el-menu-border-color);
    line-height: 1.5;
}

.commit-list-item:nth-child(1) {
    border-top: none;
}
</style>
