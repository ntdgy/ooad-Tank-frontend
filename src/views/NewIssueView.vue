<template>
    <div class="new-issue-main">
        <IssueEditor :show-title="true" v-model:title="title" v-model:content="content" @submit="submit" />
    </div>
</template>

<script lang="ts">
import IssueEditor from "@/components/repo/issue/IssueEditor.vue"
import { defineComponent } from "vue"
import { baseUrl } from "@/stores/configs"

export default defineComponent({
    data() {
        return {
            title: "",
            content: ""
        }
    },
    methods: {
        submit() {
            this.axios.post(`${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/issue/create`,
                {
                    title: this.title,
                    contents: [{
                        content: this.content
                    }]
                },
                {
                    withCredentials: true
                })
                .then(data => {
                    console.log(data)
                }).catch(e => {
                    console.error(e)
                })
        }
    },
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
