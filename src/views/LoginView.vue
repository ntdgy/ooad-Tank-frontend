<template>
  <div class="login-page">
    <div class="login-box">
      <div class="avatar-box">
        <img src="../assets/logo.svg" alt="" />
      </div>
      <h2 class="dynamic-rainbow">Sign up to XYN Hub</h2>
      <el-card
        class="main-card"
        :body-style="{ padding: '20px' }"
        shadow="hover"
      >
        <el-form
          label-width="0px"
          class="login-in"
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
        >
          <p>Username or email address</p>
          <el-form-item prop="name">
            <el-input type="text" v-model="loginForm.name"></el-input>
          </el-form-item>
          <p>
            Password
            <el-link type="primary" href="/forgot" class="link-forget"
              >Forgot password?</el-link
            >
          </p>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <!-- <img src="../assets/icons8-github.svg" alt="" @click="githubLogin"> -->
          <p>Third Party login</p>
          <el-form-item class="button">
            <el-button
              class="button-github"
              type="success"
              @click="githubLogin"
            ></el-button>
          </el-form-item>
          <el-form-item class="button">
            <el-button class="button-signin" type="success" @click="submit"
              >Sign in</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
      <el-card
        class="new-card"
        :body-style="{ padding: '20px' }"
        shadow="hover"
      >
        New to XYN Hub?
        <el-link class="link-login" type="primary" href="/register"
          >Create an account.</el-link
        >
      </el-card>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue"
import { baseUrl } from "@/stores/configs"
import { userStore } from "@/stores/user"
import { handleResponse } from "@/utils/util"

export default defineComponent({
    data() {
        return {
            loginForm: {
                name: "",
                password: ""
            }
        }
    },
    methods: {
        submit() {
            this.axios
                .post(`${baseUrl}/api/user/login`, this.loginForm, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => handleResponse(res))
                .then(() => {
                    userStore().username = this.loginForm.name
                    console.log("login success")
                    window.location.href = "/" + this.loginForm.name
                })
        },
        githubLogin() {
            window.location.href =
        "https://github.com/login/oauth/authorize?client_id=8f71fe35e1823f5f5b87&redirect_uri=https://ooad.dgy.ac.cn/api/oauth/github&scope=user:email"
        }
    }
})
</script>

<style scoped>
.login-page {
  margin: 0 auto;
}

.login-page .login-box {
  left: 50%;
}

.login-page .link-login {
  margin-top: -4px;
}

.login-page .link-forget {
  float: right;
}

.login-page .login-box .button {
  margin-top: -10px;
}

.login-page .login-box .button-signin {
  width: 100%;
}

.login-page .login-box .button-github {
  background: url(../assets/icons8-github.svg) no-repeat;
  font-size: 16px;
  background-size: 40px;
  height: 60px;
  width: 60px;
  /* 没有边框 */
  border: none;
}

.login-page .login-box .forget-pass {
  float: right;
}

.login-page .main-card {
  /*background-image: -webkit-linear-gradient(left, #00aaff, #ff84e0, #ffffff, #ffffff);
    -webkit-background-size: 200% 100%;
    -webkit-animation: maskedAnimation 8s infinite linear;*/
  background-color: aliceblue;
}

.login-page .login-box .new-card {
  margin-top: 10px;
  text-align: center;
  font-size: var(--el-font-size-small);
}

.login-page .login-box .dynamic-rainbow {
  margin-top: 10px;
  background-image: -webkit-linear-gradient(
    left,
    #00aaff,
    #ff84e0,
    #ffffff,
    #ffffff
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-animation: maskedAnimation 8s infinite linear;
  font-size: 32px;
}
</style>
