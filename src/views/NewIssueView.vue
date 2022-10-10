<template>
    <div class="new-issue-main">
        <IssueEditor />
    </div>
</template>

<script lang="ts">
import IssueEditor from "@/components/repo/issue/IssueEditor.vue"
import { defineComponent } from "vue"

export default defineComponent({
    components: {
        IssueEditor
    }
})
</script>

<style scoped>
.new-issue-main {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
</style>
