<template>
    <div class="login-page">
        <div class="login-box">
            <div class="avatar-box">
                <img src="../assets/logo.svg" alt="">
            </div>
            <h2 class="dynamic-rainbow">Sign in to XYN Hub</h2>
            <el-card class="main-card" :body-style="{ padding: '20px' }" shadow="hover">
                <el-form label-width="0px" class="login-in" ref="loginForm" :model="loginForm" :rules="rules">
                    <p>Username</p>
                    <el-form-item prop="userName">
                        <el-input type="text" v-model="loginForm.userName"></el-input>
                    </el-form-item>
                    <p>Email address</p>
                    <el-form-item prop="userName">
                        <el-input type="text" v-model="loginForm.userEmail"></el-input>
                    </el-form-item>
                    <p>Password</p>
                    <el-form-item prop="passWord">
                        <el-input type="password" v-model="loginForm.passWord"></el-input>
                    </el-form-item>
                    <p>Cpnform password</p>
                    <el-form-item prop="passWord">
                        <el-input type="password" v-model="loginForm.passWordConform"></el-input>
                    </el-form-item>
                    <el-form-item class="button">
                        <el-button class="button-signin" type="success">Sign up</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card class="new-card" :body-style="{ padding: '20px' }" shadow="hover">
                Already a XYN? <a href="/login">Login now!</a>
            </el-card>
        </div>
    </div>
</template>
  
<script lang="ts">
export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                userName: '',
                userEmail: '',
                passWord: '',
                passWordConform: ''
            }
        }
    }
}
</script>

<style scoped>
.login-page {
    margin: 0 auto;
}

.login-page .login-box .button {
    margin-top: -10px;
}

.login-page .login-box .button-signin {
    width: 100%;
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
    background-image: -webkit-linear-gradient(left, #00aaff, #ff84e0, #ffffff, #ffffff);
    -webkit-text-fill-color: transparent;
    -webkit-background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-animation: maskedAnimation 8s infinite linear;
    font-size: 32px;
}
</style>