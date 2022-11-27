<template>
    <div class="flex justify-center">
        <el-container class="max-w-7xl">
            <el-aside class="flex flex-col pt-10">
                <el-avatar :size="260" :src="getAvatarSrc()" />
                <div class="my-4">
                    <div class="py-4">
                        <h1 class="my-0 text-6 font-600">{{ $route.params.username }}</h1>
                    </div>
                    <div class="mb-4">
                        {{ bio }}
                    </div>
                    <div class="flex flex-row items-center">
                        <el-icon class="mr-1">
                            <Link />
                        </el-icon>
                        <el-link :href="url">{{ url }}</el-link>
                    </div>
                </div>
                <el-button @click="$router.push({ name: 'userSettings' })" v-if="isMe()">
                    Edit Profile
                </el-button>
            </el-aside>
            <el-main>
                <el-menu class="mb-4" mode="horizontal" @select="handleSelect">
                    <!-- <el-menu-item index="overview">Overview</el-menu-item> -->
                    <el-menu-item index="repositories">Repositories</el-menu-item>
                    <el-menu-item index="stars">Stars</el-menu-item>
                </el-menu>
                <div class="mt-6" v-if="$route.query.tab == 'repositories' || !$route.query.tab">
                    <div v-if="isMe()">
                        <Toolbar>
                            <template #right>
                                <el-button type="primary" @click="newRepo">
                                    New
                                </el-button>
                            </template>
                        </Toolbar>
                        <el-divider />
                    </div>
                    <template v-for="(repo, idx) in repos" :key="idx">
                        <Toolbar>
                            <template #left>
                                <el-link :href="`/${$route.params.username}/${repo.repoName}`">{{ repo.repoName }}
                                </el-link>
                                <el-tag style="margin-left: 12px">{{ repo.public ? "public" : "private" }}</el-tag>
                            </template>
                            <template #right>
                                <el-button>Star</el-button>
                            </template>
                        </Toolbar>
                        <el-divider />
                    </template>
                </div>
                <div class="mt-6" v-if="$route.query.tab == 'stars'">
                    <div v-if="stars.length == 0">暂无</div>
                    <template v-for="(repo, idx) in stars" :key="idx">
                        <Toolbar>
                            <template #left>
                                <el-link :href="`/${$route.params.username}/${repo.repoName}`">{{ repo.repoName }}
                                </el-link>
                                <el-tag style="margin-left: 12px">{{ repo.public ? "public" : "private" }}</el-tag>
                            </template>
                            <template #right>
                                <el-button>Starred</el-button>
                            </template>
                        </Toolbar>
                        <el-divider />
                    </template>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { userStore } from "@/stores/user"
import { baseUrl } from "@/stores/configs"
import { notFound } from "@/utils/util"
import type { RepoDesc } from "@/utils/api"
import Toolbar from "../components/common/Toolbar.vue"

export default defineComponent({
    data() {
        return {
            repos: Array<RepoDesc>(),
            stars: Array<RepoDesc>(),
            username: userStore().username,
            bio: "",
            url: ""
        }
    },
    methods: {
        handleSelect(index: string) {
            this.$router.push({ name: "profile", query: { tab: index } })
        },
        getAvatarSrc() {
            return userStore().username == undefined ? "" : `${baseUrl}/api/userinfo/${this.$route.params.username}/avatar`
        },
        isMe() {
            return userStore().username == this.$route.params.username
        },
        reload() {
            if (userStore().username == undefined) {
                userStore().fillName().then(() => {
                    console.log(this.isMe())
                    console.log(userStore().username)
                    console.log(this.$route.params.username)
                })
            } else {
                console.log(this.isMe())
                console.log(userStore().username)
                console.log(this.$route.params.username)
            }
            const listUrl = this.isMe() ? `${baseUrl}/api/repo/list_self`
                : `${baseUrl}/api/repo/list_pub/${this.$route.params.username}`
            Promise.all([
                this.axios.get(listUrl, {
                    withCredentials: true
                })
                    .then(res => {
                        if (res.data.status.code == -1000) throw 404
                        return res.data.data
                    })
                    .then(data => {
                        this.repos = data
                    }),
                this.axios.get(`${baseUrl}/api/userinfo/${this.$route.params.username}`)
                    .then(res => {
                        if (res.data.status.code == -1000) throw 404
                        return res.data.data
                    })
                    .then(data => {
                        this.bio = data.bio
                        this.url = data.home_page_url
                    }),
                this.axios.get(`${baseUrl}/api/user/${this.$route.params.username}/stars`)
                    .then(res => {
                        if (res.data.status.code == -1000) throw 404
                        return res.data.data
                    })
                    .then(data => {
                        this.stars = data
                    })
            ]).catch(() => notFound())
        },
        newRepo() {
            this.$router.push({ name: "newRepo" })
        }
    },
    beforeRouteEnter(_from, _to, next) {
        next(vm => (vm as any).reload())
    },
    components: { Toolbar }
})
</script>
