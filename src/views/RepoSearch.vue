<template>
    <div class="flex justify-center">
        <el-container class="max-w-7xl">
            <el-main>
                <div class="mt-6">
                    <div v-if="repos.length == 0">未找到</div>
                    <template v-for="(repo, idx) in repos" :key="idx">
                        <div>
                            <el-link :href="`/${repo.ownerName}/${repo.repoName}`">{{ repo.repoName }}
                            </el-link>
                            <el-tag style="margin-left: 12px">{{ repo.public ? "public" : "private" }}</el-tag>
                        </div>
                        <el-divider />
                    </template>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { baseUrl } from "@/stores/configs"
import { handleResponse } from "@/utils/util"
import type { RepoDesc } from "@/utils/api"

export default defineComponent({
    data() {
        return {
            repos: Array<RepoDesc>()
        }
    },
    created() {
        this.$watch(() => this.$route.query.q,
            (now: string) => {
                if (now == "") return
                this.axios.post(`${baseUrl}/api/repo/search/`, { keyword: now }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => handleResponse(res, false))
                    .then(data => {
                        console.log(data)
                        this.repos = data
                    })
            },
            { immediate: true }
        )
    }
})
</script>
