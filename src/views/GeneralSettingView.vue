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
      <p>Repository name</p>
      <el-form-item prop="name">
        <el-input type="text" v-model="nameForm.name"></el-input>
      </el-form-item>
      <el-button class="button-signin" type="" @click="submit"
        >Rename</el-button
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
          <!--todo: show different choice from repo data-->
        </div>
        <el-form-item class="button">
          <el-button class="button-signin" type="danger" @click="delete_repo"
            >Change Visibility</el-button
          >
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
          <el-button class="button-signin" type="danger" @click="delete_repo"
            >Delete This Repository</el-button
          >
        </el-form-item>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElNotification } from "element-plus";
import { baseUrl } from "@/stores/configs";

export default defineComponent({
  data() {
    return {
      nameForm: {
        name: `${this.$route.params.reponame}`,
      },
      repoForm: {
        name: `${this.$route.params.reponame}`,
      },
      metaData: null,
    };
  },
  methods: {
    reload() {
      this.axios
        .get(
          `${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}`
        )
        .then((res) => res.data.data)
        .then((data) => {
          this.metaData = data;
          console.log(data);
        });
    },
    delete_repo() {
      this.axios
        .post(
          `${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/settings/delete`,{},{
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
            window.location.href= `${baseUrl}/${this.$route.params.username}`;
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
            message: err.code == "ECONNABORTED" ? "超时" : "Fail to delete repo",
            type: "error",
          });
        });
    },
    submit() {
      this.axios
        .post(
          `${baseUrl}/api/repo/${this.$route.params.username}/${this.$route.params.reponame}/updateMetaData`,
          this.nameForm,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => {
          let code = data.data.status.code;
          if (code == 200 || code == -1002) {
            console.log("login success");
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
  display: flex;
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
  order: 2;
}

.general-setting-div .repo-box .general-setting-text {
  width: auto;
}
</style>
