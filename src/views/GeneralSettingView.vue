<template>
    <div class="general-setting-div">
        <el-divider content-position="left">
            <div class="div-title">General</div>
        </el-divider>
        <el-form>
            <p>Repository description</p>
            <el-form-item prop="name">
                <el-input type="text" v-model="metaDataForm.description"></el-input>
            </el-form-item>
            <el-button class="button-signin" type="" @click="update_description">Update Description</el-button>
        </el-form>
        <el-divider content-position="left">
            <div class="div-title">Danger Zone</div>
        </el-divider>
        <div class="repo-box">
            <el-card class="new-card" :body-style="{ padding: '20px' }" shadow="hover">
                <div class="general-setting-text">
                    This repository is currently
                    {{ metadata ? (metadata.self.public ? "public" : "private") : "" }}.
                </div>
                <el-form-item class="button">
                    <el-popconfirm confirm-button-text="OK" cancel-button-text="No, Thanks" icon-color="#626AEF"
                        title="Sure to change visibility?" @confirm="change_visibility">
                        <template #reference>
                            <el-button class="button-signin" type="danger">Change Visibility</el-button>
                        </template>
                    </el-popconfirm>
                </el-form-item>
            </el-card>
            <el-card class="new-card" :body-style="{ padding: '20px' }" shadow="hover">
                <div class="general-setting-text">
                    <h3>Delete this repository</h3>
                    Once you delete a repository, there is no going back. Please be
                    certain.
                </div>
                <el-form-item class="button">
                    <el-popconfirm confirm-button-text="OK" cancel-button-text="No, Thanks" icon-color="#626AEF"
                        title="Sure to DELETE repository?" @confirm="delete_repo">
                        <template #reference>
                            <el-button class="button-signin" type="danger">Delete This Repository</el-button>
                        </template>
                    </el-popconfirm>
                </el-form-item>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"
import { ElNotification } from "element-plus"
import { repoApi } from '@/utils/util'
import type { Metadata } from "@/utils/api"

export default defineComponent({
    props: {
        metadata: Object as PropType<Metadata>
    },
    emits: ['updateMetadata'],
    data() {
        return {
            metaDataForm: {
                description: `${this.$route.params.reponame}`
            }
        }
    },
    methods: {
        delete_repo() {
            this.axios
                .post(
                    `${repoApi()}/settings/delete`,
                    {},
                    {
                        withCredentials: true
                    }
                )
                .then((data) => {
                    let code = data.data.status.code
                    if (code == 200) {
                        ElNotification({
                            title: "Success",
                            message: "Delete repo successfully",
                            type: "success"
                        })
                        window.location.href = `/${this.$route.params.username}`
                    } else {
                        ElNotification({
                            title: "Error",
                            message: data.data.status.message,
                            type: "error"
                        })
                    }
                })
                .catch((err) => {
                    ElNotification({
                        title: "Error",
                        message:
                            err.code == "ECONNABORTED" ? "超时" : "Fail to delete repo",
                        type: "error"
                    })
                })
        },
        change_visibility() {
            var url = `${repoApi()}/setPublic`
            if (this.metadata?.self.public) {
                url = `${repoApi()}/setPrivate`
            }
            this.axios
                .post(
                    url,
                    {},
                    {
                        withCredentials: true
                    }
                )
                .then((data) => {
                    let code = data.data.status.code
                    if (code == 200) {
                        ElNotification({
                            title: "Success",
                            message: "Change visibility successfully",
                            type: "success"
                        })
                        this.$emit('updateMetadata')
                    } else {
                        ElNotification({
                            title: "Error",
                            message: data.data.status.message,
                            type: "error"
                        })
                    }
                })
                .catch((err) => {
                    ElNotification({
                        title: "Error",
                        message:
                            err.code == "ECONNABORTED" ? "超时" : "Fail to change visibility",
                        type: "error"
                    })
                })
        },
        update_description() {
            this.axios
                .post(
                    `${repoApi()}/updateMetaData`,
                    this.metaDataForm,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then((data) => {
                    let code = data.data.status.code
                    if (code == 200) {
                        ElNotification({
                            title: "Success",
                            message: "Change description successfully",
                            type: "success"
                        })
                    } else {
                        ElNotification({
                            title: "Error",
                            message: data.data.status.message,
                            type: "error"
                        })
                    }
                })
                .catch((err) => {
                    ElNotification({
                        title: "Error",
                        message: err.code == "ECONNABORTED" ? "更新超时" : "更新失败",
                        type: "error"
                    })
                })
        }
    }
})
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
