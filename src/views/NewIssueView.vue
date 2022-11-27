<template>
    <div class="mt-8 flex flex-col flex-auto">
        <IssueEditor :show-title="true" v-model:title="title" v-model:content="content" @submit="submit" />
    </div>
</template>

<script lang="ts">
import IssueEditor from "@/components/repo/issue/IssueEditor.vue"
import { defineComponent } from "vue"
import { repoApi, handleResponse } from '@/utils/util'

export default defineComponent({
    data() {
        return {
            title: "",
            content: ""
        }
    },
    methods: {
        submit() {
            this.axios.post(`${repoApi()}/issue/create`,
                {
                    title: this.title,
                    contents: [{
                        content: this.content
                    }]
                }, { withCredentials: true })
                .then(res => handleResponse(res))
                .then(data => {
                    console.log(data)
                    this.$router.push({ name: "issue", params: { issueId: data } })
                }).catch(e => {
                    //TODO: login
                    console.error(e)
                })
        }
    },
    components: {
        IssueEditor
    }
})
</script>
