<template>
    <div class="wrapper">
        <el-container class="main">
            <el-aside class="aside">
                <el-avatar :size="260" />
                <div class="name">
                    <h1>{{$route.params.username}}</h1>
                </div>
            </el-aside>
            <el-main>
                <el-menu mode="horizontal" @select="handleSelect">
                    <el-menu-item index="">Overview</el-menu-item>
                    <el-menu-item index="2">Repositories</el-menu-item>
                    <el-menu-item index="3">Stars</el-menu-item>
                </el-menu>
                <div v-if="$route.query.tab == ''">
                    {{$route.params.username}}
                    <el-divider />
                    不知道该放点啥
                </div>
                <div class="repolist" v-if="$route.query.tab == '2'">
                    <div v-for="(repo, idx) in repos" :key="idx">
                        <el-link :href="`/${$route.params.username}/${repo.repoName}`">{{repo.repoName}}</el-link>
                        <el-tag>{{repo.public ? "public" : "private"}}</el-tag>
                        <el-divider />
                    </div>
                </div>
                <div v-if="$route.query.tab == '3'">
                    没写
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { baseUrl } from "@/stores/configs"
import type { RepoDesc } from "@/libs/api"

export default defineComponent({
    data() {
        return {
            repos: Array<RepoDesc>()
        }
    },
    methods: {
        handleSelect(index: string) {
            this.$router.push({ name: "profile", query: { tab: index } })
        },
        reload() {
            this.axios.get(`${baseUrl}/api/repo/list_pub/${this.$route.params.username}`, {
                withCredentials: true
            })
                .then(res => res.data.data)
                .then(data => {
                    console.log(data)
                    this.repos = data
                })
        }
    },
    beforeRouteEnter(_from, _to, next) {
        next(vm => (vm as any).reload())
    }
})
</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
}

.aside {
    display: flex;
    flex-direction: column;
    padding-top: 2.5rem;
}

.name {
    margin: 1rem 0;
}

.name h1 {
    font-size: 1.5rem;
    line-height: 1.25;
    font-weight: 600;
}

.main {
    max-width: 1280px;
}

.repolist {
    margin-top: 24px;
}
</style>
