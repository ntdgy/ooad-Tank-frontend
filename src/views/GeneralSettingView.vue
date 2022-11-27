<template>
  <div class="general-setting-div">
    <el-divider content-position="left">
      <div class="div-title">General</div>
    </el-divider>
    <el-form
      label-nameForm="0px"
      ref="loginForm"
      :model="nameForm"
      :rules="rules"
    >
      <p>Repository description</p>
      <el-form-item prop="name">
        <el-input type="text" v-model="metaDataForm.description"></el-input>
      </el-form-item>
      <el-button class="button-signin" type="" @click="update_description"
        >Update Description</el-button
      >
    </el-form>
    <el-divider content-position="left">
      <div class="div-title">Danger Zone</div>
    </el-divider>
    <div class="repo-box">
      <el-card
        class="new-card"
        :body-style="{ padding: '20px' }"
        shadow="hover"
      >
        <div class="general-setting-text">
          This repository is currently
          {{ metaData ? (metaData.public ? "public" : "private") : "" }}.
        </div>
        <el-form-item class="button">
          <el-popconfirm
            confirm-button-text="OK"
            cancel-button-text="No, Thanks"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="Sure to change visibility?"
            @confirm="change_visibility"
          >
            <template #reference>
              <el-button class="button-signin" type="danger"
                >Change Visibility</el-button
              >
            </template>
          </el-popconfirm>
        </el-form-item>
      </el-card>
      <el-card
        class="new-card"
        :body-style="{ padding: '20px' }"
        shadow="hover"
      >
        <div class="general-setting-text">
          <h3>Delete this repository</h3>
          Once you delete a repository, there is no going back. Please be
          certain.
        </div>
        <el-form-item class="button">
          <el-popconfirm
            confirm-button-text="OK"
            cancel-button-text="No, Thanks"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="Sure to DELETE repository?"
            @confirm="delete_repo"
          >
            <template #reference>
              <el-button
                class="button-signin"
                type="danger"
                >Delete This Repository</el-button
              >
            </template>
          </el-popconfirm>
        </el-form-item>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElNotification } from "element-plus";
import { baseUrl } from "@/stores/configs";
import { InfoFilled } from "@element-plus/icons-vue";

export default defineComponent({
  data() {
    return {
      metaDataForm: {
        description: `${this.$route.params.reponame}`,
      },
      metaData: null,
    };
  },
  methods: {
    reload() {
      this.axios
        .get(
          `${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data.data)
        .then((data) => {
          this.metaData = data;
        });
      this.axios
        .get(
          `${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/metaData`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data.data)
        .then((data) => {
          this.metaDataForm.description = data.description;
        });
    },
    delete_repo() {
      this.axios
        .post(
          `${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/settings/delete`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          let code = data.data.status.code;
          if (code == 200) {
            ElNotification({
              title: "Success",
              message: "Delete repo successfully",
              type: "success",
            });
            window.location.href = `${baseUrl}/${this.$route.params.username}`;
          } else {
            ElNotification({
              title: "Error",
              message: "Fail to delete repo",
              type: "error",
            });
          }
        })
        .catch((err) => {
          ElNotification({
            title: "Error",
            message:
              err.code == "ECONNABORTED" ? "超时" : "Fail to delete repo",
            type: "error",
          });
        });
    },
    change_visibility() {
      var url = `${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/setPublic`;
      if (this.metaData && this.metaData.public) {
        url = `${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/setPrivate`;
      }
      this.axios
        .post(
          url,
          {},
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          let code = data.data.status.code;
          if (code == 200) {
            ElNotification({
              title: "Success",
              message: "Change visibility successfully",
              type: "success",
            });
            setTimeout("self.location.reload();", 1000);
          } else {
            ElNotification({
              title: "Error",
              message: "Fail to change visibility",
              type: "error",
            });
          }
        })
        .catch((err) => {
          ElNotification({
            title: "Error",
            message:
              err.code == "ECONNABORTED" ? "超时" : "Fail to change visibility",
            type: "error",
          });
        });
    },
    update_description() {
      this.axios
        .post(
          `${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/updateMetaData`,
          this.metaDataForm,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => {
          let code = data.data.status.code;
          if (code == 200) {
            ElNotification({
              title: "Success",
              message: "Change description successfully",
              type: "success",
            });
          } else if (code == -1003) {
            ElNotification({
              title: "Error",
              message: "更新失败",
              type: "error",
            });
          }
        })
        .catch((err) => {
          ElNotification({
            title: "Error",
            message: err.code == "ECONNABORTED" ? "更新超时" : "更新失败",
            type: "error",
          });
        });
    },
  },
  beforeRouteEnter(_from, _to, next) {
    next((vm) => (vm as any).reload());
  },
});
</script>

<style scoped>
.toolbar {
  display: flex;
}

.el-button-group {
  display: flex;
}
.general-setting-div {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.general-setting-div .div-title {
  font-size: 1.5rem;
}
.general-setting-div .collabortar-head {
  display: flex;
}

.general-setting-div .repo-box {
  width: 50%;
}

.general-setting-div .repo-box .el-card {
  align-items: center !important;
  border-color: rgb(231, 138, 138);
}
/*
todo: make button and text in the same line
text should be on the left
button must on right
*/
.general-setting-div .repo-box .el-button {
  margin-left: auto;
  margin-top: 5px;
}

.general-setting-div .repo-box .el-popconfirm {
  width: 150%;
}

.general-setting-div .repo-box .general-setting-text {
  width: auto;
}
</style>
