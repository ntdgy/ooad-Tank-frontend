<template>
    <div class="wrapper">
        <el-container class="main">
            <el-aside class="aside">
                <el-avatar :size="260" />
                <div class="name">
                    <h1>{{$route.params.username}}</h1>
                </div>
                <el-button @click="$router.push({name: 'userSettings'})">
                    Edit Profile
                </el-button>
            </el-aside>
            <el-main>
                <el-menu mode="horizontal" @select="handleSelect">
                    <el-menu-item index="overview">Overview</el-menu-item>
                    <el-menu-item index="repositories">Repositories</el-menu-item>
                    <el-menu-item index="stars">Stars</el-menu-item>
                </el-menu>
                <div v-if="$route.query.tab != 'repositories' && $route.query.tab != 'stars'">
                    {{$route.params.username}}
                    <el-divider />
                    不知道该放点啥
                </div>
                <div class="repolist" v-if="$route.query.tab == 'repositories'">
                    <Toolbar>
                        <template #right>
                            <el-button type="primary" @click="newRepo">New</el-button>
                        </template>
                    </Toolbar>
                    <el-divider />
                    <div v-for="(repo, idx) in repos" :key="idx">
                        <el-link :href="`/${$route.params.username}/${repo.repoName}`">{{repo.repoName}}</el-link>
                        <el-tag style="margin-left: 12px">{{repo.public ? "public" : "private"}}</el-tag>
                        <el-divider />
                    </div>
                </div>
                <div v-if="$route.query.tab == 'stars'">
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
import Toolbar from "../components/common/Toolbar.vue"

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
        },
        newRepo() {
            this.$router.push({name: "newRepo"})
        }
    },
    beforeRouteEnter(_from, _to, next) {
        next(vm => (vm as any).reload())
    },
    components: { Toolbar }
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
