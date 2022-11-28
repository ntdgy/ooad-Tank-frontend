<template>
    <div class="flex justify-center">
        <el-container class="max-w-7xl">
            <el-aside class="flex flex-col pt-10">
                <Avatar :size="260" :username="$route.params.username as string" />
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
                <el-menu class="mb-4" mode="horizontal" :default-active="defaultMenuIndex" @select="handleSelect">
                    <!-- <el-menu-item index="overview">Overview</el-menu-item> -->
                    <el-menu-item index="repositories">Repositories</el-menu-item>
                    <el-menu-item index="stars">Stars</el-menu-item>
                </el-menu>
                <div class="mt-6" v-if="indexConditions['repositories']()">
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
                                <el-link :href="`/${repo.ownerName}/${repo.repoName}`">{{ repo.repoName }}
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
                <div class="mt-6" v-if="indexConditions['stars']()">
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
import { notFound, handleResponse, errorPopup } from "@/utils/util"
import type { RepoDesc } from "@/utils/api"
import Toolbar from "../components/common/Toolbar.vue"
import Avatar from "@/components/common/Avatar.vue"

export default defineComponent({
    data() {
        return {
            indexConditions: {
                'repositories': () => { return this.$route.query.tab == 'repositories' || !this.$route.query.tab },
                'stars': () => { return this.$route.query.tab == 'stars' }
            },
            defaultMenuIndex: 'repositories',
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

            if (this.indexConditions['repositories']()) {
                this.defaultMenuIndex = 'repositories'
            } else if (this.indexConditions['stars']()) {
                this.defaultMenuIndex = 'stars'
            } else {
                this.$router.push({ name: "profile" })
            }
            console.log(this.indexConditions['repositories']())
            console.log(this.indexConditions['stars']())
            console.log(this.defaultMenuIndex)
            
            const listUrl = this.isMe() ? `${baseUrl}/api/repo/list_self`
                : `${baseUrl}/api/repo/list_pub/${this.$route.params.username}`
            Promise.all([
                this.axios.get(listUrl, {
                    withCredentials: true
                })
                    .then(res => handleResponse(res, false))
                    .then(data => {
                        this.repos = data
                    }),
                this.axios.get(`${baseUrl}/api/userinfo/${this.$route.params.username}`)
                    .then(res => handleResponse(res, false))
                    .then(data => {
                        this.bio = data.bio
                        this.url = data.home_page_url
                    }),
                this.axios.get(`${baseUrl}/api/user/${this.$route.params.username}/stars`)
                    .then(res => handleResponse(res, false))
                    .then(data => {
                        this.stars = data
                    })
            ]).catch(code => {
                errorPopup(code)
                notFound()
            })
        },
        newRepo() {
            this.$router.push({ name: "newRepo" })
        }
    },
    beforeRouteEnter(_from, _to, next) {
        next(vm => (vm as any).reload())
    },
    components: { Toolbar, Avatar }
})
</script>
