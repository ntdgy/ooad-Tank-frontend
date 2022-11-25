<template>
    <div class="wrapper">
        <el-container class="main">
            <el-aside class="aside">
                <el-avatar :size="260" :src="avatarSrc" />
                <div class="name">
                    <h1>{{ $route.params.username }}</h1>
                </div>
                <el-button 
                    @click="$router.push({ name: 'userSettings' })"
                    v-if="isMe"
                >
                    Edit Profile
                </el-button>
            </el-aside>
            <el-main>
                <el-menu class="menu" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="overview">Overview</el-menu-item>
                    <el-menu-item index="repositories">Repositories</el-menu-item>
                    <el-menu-item index="stars">Stars</el-menu-item>
                </el-menu>
                <div v-if="$route.query.tab != 'repositories' && $route.query.tab != 'stars'">
                    <p>
                        bio: {{ bio }}
                    </p>
                    <el-divider />
                    <p>
                        url: {{ url }}
                    </p>
                </div>
                <div class="repolist" v-if="$route.query.tab == 'repositories'">
                    <div v-if="isMe">
                        <Toolbar>
                            <template #right>
                                <el-button 
                                    type="primary" 
                                    @click="newRepo"
                                >
                                    New
                                </el-button>
                            </template>
                        </Toolbar>
                        <el-divider />
                    </div>
                    <div v-for="(repo, idx) in repos" :key="idx">
                        <el-link :href="`/${$route.params.username}/${repo.repoName}`">{{ repo.repoName }}</el-link>
                        <el-tag style="margin-left: 12px">{{ repo.public ? "public" : "private" }}</el-tag>
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

import { userStore } from "@/stores/user"
import { baseUrl } from "@/stores/configs"
import type { RepoDesc } from "@/utils/api"
import Toolbar from "../components/common/Toolbar.vue"

export default defineComponent({
    data() {
        return {
            repos: Array<RepoDesc>(),
            username: userStore().username,
            isMe: userStore().username == this.$route.params.username,
            avatarSrc: `${baseUrl}/api/userinfo/${this.$route.params.username}/avatar`,
            bio: "",
            url: ""
        }
    },
    methods: {
        handleSelect(index: string) {
            this.$router.push({ name: "profile", query: { tab: index } })
        },
        reload() {
            userStore().fillName()
            console.log(userStore().username)
            console.log(this.$route.params.username)
            this.axios.get(`${baseUrl}/api/repo/list_pub/${this.$route.params.username}`, {
                withCredentials: true
            })
                .then(res => res.data.data)
                .then(data => {
                    console.log(data)
                    this.repos = data
                })
            this.axios.get(`${baseUrl}/api/userinfo/${this.$route.params.username}`)
                .then(res => res.data.data)
                .then(data => {
                    console.log(data)
                    this.bio = data.bio
                    this.url = data.home_page_url
                })
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

.menu {
    margin-bottom: 1rem;
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
