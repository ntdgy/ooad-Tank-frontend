<template>
  <li class="issue-list-item">
    <div class="main-info">
      <UserLink :username="user" />
      <br />
      Collaborator
      <!--todo 用户头像-->
    </div>
    <div class="meta">
      <el-button text @click="remove"> Remove </el-button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { getDeltaTimeString } from "@/libs/times";
import UserLink from "../../common/UserLink.vue";
import { repoApi } from "@/utils/util";
import { ElNotification, ElMessageBox } from "element-plus";

export default defineComponent({
  props: ["user"],
  methods: {
    getDeltaTimeString: getDeltaTimeString,
    remove() {
      this.axios
        .post(
          `${repoApi()}/settings/collaborator?delete=1`,
          {
            user: {
              name: `${this.user}`,
            },
            canWrite: true,
          },
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          let code = data.data.status.code;
          if (code == 200) {
            ElNotification({
              title: "Success",
              message: "Delete collaborator successfully",
              type: "success",
            });
            setTimeout("self.location.reload();", 1000);
          } else {
            ElNotification({
              title: "Error",
              message: data.data.status.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          ElNotification({
            title: "Error",
            message:
              err.code == "ECONNABORTED" ? "超时" : "Fail to delete collaborator",
            type: "error",
          });
        });
    },
  },
  components: { UserLink },
});
</script>

<style scoped>
.issue-list-item {
  /* padding: 1rem 2rem; */
  display: flex;
  border-top: solid;
  border-top-width: 1px;
  border-color: var(--el-menu-border-color);
  line-height: 1.5;
}

.issue-list-item:nth-child(1) {
  border-top: none;
}

.main-info {
  padding: 8px;
  flex: auto;
}

.main-info a {
  text-decoration: none;
  font-weight: 600;
  vertical-align: middle;
  color: var(--el-text-color-primary);
}

.main-info .title {
  font-size: var(--el-font-size-medium);
}

.comment {
  display: flex;
  font-size: var(--el-font-size-small);
  margin-top: 0.25rem;
  color: var(--el-text-color-regular);
  align-items: center;
}

.meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: end;
  flex: 1 0 auto;
  padding: 8px;
  color: var(--el-text-color-regular);
}

.icons {
  display: flex;
  align-items: center;
}

.icons span {
  margin-left: 0.2rem;
  font-size: var(--el-font-size-small);
}

.meta-comment {
  font-size: var(--el-font-size-small);
}
</style>
