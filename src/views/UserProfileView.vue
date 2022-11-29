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
        <el-button
          @click="$router.push({ name: 'userSettings' })"
          v-if="isMe()"
        >
          Edit Profile
        </el-button>
      </el-aside>
      <el-main>
        <el-menu
          class="mb-4"
          mode="horizontal"
          :default-active="defaultMenuIndex"
          @select="handleSelect"
        >
          <!-- <el-menu-item index="overview">Overview</el-menu-item> -->
          <el-menu-item index="repositories">Repositories</el-menu-item>
          <el-menu-item v-if="isMe()" index="suggest">For You</el-menu-item>
          <el-menu-item index="stars">Stars</el-menu-item>
        </el-menu>
        <div class="mt-6" v-if="indexConditions['repositories']()">
          <div v-if="isMe()">
            <Toolbar>
              <template #right>
                <el-button type="primary" @click="newRepo"> New </el-button>
              </template>
            </Toolbar>
            <el-divider />
          </div>
          <template v-for="(repo, idx) in repos" :key="idx">
            <Toolbar>
              <template #left>
                <el-link :href="`/${repo.ownerName}/${repo.repoName}`"
                  >{{ repo.repoName }}
                </el-link>
                <el-tag style="margin-left: 12px">{{
                  repo.public ? "public" : "private"
                }}</el-tag>
              </template>
              <template #right>
                <el-button>Star</el-button>
              </template>
            </Toolbar>
            <el-divider />
          </template>
        </div>
        <div class="mt-6" v-if="indexConditions['suggest']()">
          <template v-for="(repo, idx) in suggests" :key="idx">
            <Toolbar>
              <template #left>
                <el-link :href="`/${repo.ownerName}/${repo.repoName}`"
                  >{{ repo.repoName }}
                </el-link>
                <el-tag style="margin-left: 12px">{{
                  repo.public ? "public" : "private"
                }}</el-tag>
              </template>
              <template #right>
                <el-button>Star</el-button>
              </template>
            </Toolbar>

            <el-divider />
          </template>
          <Toolbar>
            <template #right>
              <el-button type="primary" @click="suggest"> Let's Roll </el-button>
            </template>
          </Toolbar>
          <el-divider />
        </div>
        <div class="mt-6" v-if="indexConditions['stars']()">
          <div v-if="stars.length == 0">暂无</div>
          <template v-for="(repo, idx) in stars" :key="idx">
            <Toolbar>
              <template #left>
                <el-link :href="`/${$route.params.username}/${repo.repoName}`"
                  >{{ repo.repoName }}
                </el-link>
                <el-tag style="margin-left: 12px">{{
                  repo.public ? "public" : "private"
                }}</el-tag>
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
import { defineComponent } from "vue";

import { userStore } from "@/stores/user";
import { baseUrl } from "@/stores/configs";
import { notFound, handleResponse, errorPopup } from "@/utils/util";
import type { RepoDesc } from "@/utils/api";
import Toolbar from "../components/common/Toolbar.vue";
import Avatar from "@/components/common/Avatar.vue";
import type { RouteLocationNormalized } from "vue-router";
import { ElNotification } from "element-plus";

export default defineComponent({
  data() {
    return {
      indexConditions: {
        repositories: () => {
          return (
            this.$route.query.tab == "repositories" || !this.$route.query.tab
          );
        },
        stars: () => {
          return this.$route.query.tab == "stars";
        },
        suggest: () => {
          return this.$route.query.tab == "suggest";
        },
      },
      defaultMenuIndex: "repositories",
      repos: Array<RepoDesc>(),
      stars: Array<RepoDesc>(),
      username: userStore().username,
      bio: "",
      url: "",
      suggests: Array<RepoDesc>(),
    };
  },
  methods: {
    handleSelect(index: string) {
      this.$router.push({ name: "profile", query: { tab: index } });
    },
    getAvatarSrc() {
      return userStore().username == undefined
        ? ""
        : `${baseUrl}/api/userinfo/${this.$route.params.username}/avatar`;
    },
    isMe() {
      return userStore().username == this.$route.params.username;
    },
    async reload(route: RouteLocationNormalized) {
      if (userStore().username == undefined) {
        await userStore().fillName();
      }

      if (this.isMe()) {
        this.axios
          .get(`${baseUrl}/api/repo/suggest`, {
            withCredentials: true,
          })
          .then((res) => handleResponse(res, false))
          .then((data) => {
            var flag = true;
            for (var i = 0; i < this.suggests.length; i++) {
              if (this.suggests[i].name == data.name) {
                flag = false;
                break;
              }
            }
            if (flag) {
              this.suggests.push(data);
            }
          });
      }

      if (this.indexConditions["repositories"]()) {
        this.defaultMenuIndex = "repositories";
      } else if (this.indexConditions["stars"]()) {
        this.defaultMenuIndex = "stars";
      } else if (this.indexConditions["suggest"]()) {
        this.defaultMenuIndex = "suggest";
      } else {
        this.$router.push({ name: "profile" });
      }
      console.log(this.defaultMenuIndex);

      const listUrl = this.isMe()
        ? `${baseUrl}/api/repo/list_self`
        : `${baseUrl}/api/repo/list_pub/${route.params.username}`;
      Promise.all([
        this.axios
          .get(listUrl, {
            withCredentials: true,
          })
          .then((res) => handleResponse(res, false))
          .then((data) => {
            this.repos = data;
          }),
        this.axios
          .get(`${baseUrl}/api/userinfo/${route.params.username}`)
          .then((res) => handleResponse(res, false))
          .then((data) => {
            this.bio = data.bio;
            this.url = data.home_page_url;
          }),
        this.axios
          .get(`${baseUrl}/api/user/${route.params.username}/stars`)
          .then((res) => handleResponse(res, false))
          .then((data) => {
            this.stars = data;
          }),
      ]).catch((code) => {
        errorPopup(code);
        notFound();
      });
    },
    newRepo() {
      this.$router.push({ name: "newRepo" });
    },
    suggest() {
      this.axios
        .get(`${baseUrl}/api/repo/suggest`, {
          withCredentials: true,
        })
        .then((res) => handleResponse(res, false))
        .then((data) => {
          var flag = true;
          for (var i = 0; i < this.suggests.length; i++) {
            if (this.suggests[i].name == data.name) {
              flag = false;
              break;
            }
          }
          if (flag) {
            this.suggests.push(data);
          } else {
            ElNotification({
              title: "Oops",
              message: "Not lucy today~ Try again later",
              type: "success",
            });
          }
        });
    },
  },
  beforeRouteEnter(to, _from, next) {
    next((vm) => (vm as any).reload(to));
  },
  beforeRouteUpdate(to) {
    this.reload(to);
  },
  components: { Toolbar, Avatar },
});
</script>
