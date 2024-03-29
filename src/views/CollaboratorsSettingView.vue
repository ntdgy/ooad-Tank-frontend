<template>
    <div class="general-setting-div">
        <el-divider content-position="left">
            <div class="div-title">Who has access</div>
        </el-divider>
        <el-row :gutter="12" type="flex">
            <el-col :span="8">
                <el-card shadow="never" class="visibility">
                    <h3>
                        {{
                                metadata?.self.public
                                    ? "PUBLIC REPOSITORY"
                                    : "PRIVATE REPOSITORY"
                        }}
                    </h3>
                    <p>
                        {{
                                metadata?.self.public
                                    ? "Anyone on the internet can access this repository." //You choose who can commit."
                                    : "Only collaborators can access this repository."
                        }}
                    </p>
                    <el-link class="link-manage" type="primary" href="general">Manage
                    </el-link>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="never" class="visibility">
                    <h3>DIRECT ACCESS</h3>
                    <p>
                        <strong>{{ collaboratorsCount }}</strong> collaborator{{ collaboratorsCount < 2 ? "" : "s" }}
                            have access to this repository. {{ collaboratorsCount == 0
                                    ? "Only you can contribute to this repository." : ""
                            }} </p>
                </el-card>
            </el-col>
        </el-row>
        <el-divider content-position="left">
            <div class="div-title">Manage access</div>
        </el-divider>
        <div class="collabortar-head">
            <el-input :value="modelValue" @input="$emit('update:modelValue', ($event as any).target.value)"
                placeholder="Find a collaborator" class="input-with-select" clearable @clear="$emit('onClear')">
                <template #prepend>
                    <el-select v-model="select" placeholder="Type" style="width: 6rem">
                        <el-option label="All" value="all" />
                        <el-option label="Collaborators" value="collaborator" />
                        <el-option label="Padding Invitations" value="padding" />
                    </el-select>
                </template>
                <template #append>
                    <el-button>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </el-button>
                </template>
            </el-input>
            <el-button style="margin-left: 1rem" type="success" @click="changePopUp">
                Add people
            </el-button>
        </div>
        <br />
        <div class="collabortar-body">
            <CollaboratorEntry v-for="collaborator in collaborators" :user="collaborator.user.name"
                :key="collaborator.user.name" />
        </div>
    </div>
</template>


<script lang="ts">
import CollaboratorEntry from "@/components/repo/settings/CollaboratorEntry.vue"
import type { Collaborator, Metadata } from "@/utils/api"
import { defineComponent, type PropType } from "vue"
import { ElNotification, ElMessageBox } from "element-plus"
import { repoApi } from "@/utils/util"
import type { RouteLocationNormalized } from "vue-router"


export default defineComponent({
    props: {
        modelValue: String,
        metadata: Object as PropType<Metadata>
    },
    emits: ["update:modelValue", "onClear"],
    data() {
        return {
            search: "",
            select: "",
            collaborators: Array<Collaborator>(),
            collaboratorsCount: 0
        }
    },
    methods: {
        changePopUp() {
            ElMessageBox.prompt(
                "Please input name of collaborator",
                "Add a collaborator",
                {
                    confirmButtonText: "Invite",
                    cancelButtonText: "Cancel"
                }
            )
                .then(({ value }) => {
                    this.axios
                        .post(
                            `${repoApi()}/settings/collaborator`,
                            {
                                user: {
                                    name: `${value}`
                                },
                                canWrite: true
                            },
                            {
                                withCredentials: true
                            }
                        )
                        .then((data) => {
                            let code = data.data.status.code
                            if (code == 200) {
                                ElNotification({
                                    title: "Success",
                                    message: "Add collaborator successfully",
                                    type: "success"
                                })
                                setTimeout("self.location.reload();", 1000)
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
                                    err.code == "ECONNABORTED"
                                        ? "超时"
                                        : "Fail to add collaborator",
                                type: "error"
                            })
                        })
                })
                .catch(() => { })
        },
        addPeople() {
            this.$router.push({ name: "newIssue" }) //TODO: 新增协作者，或者直接popup
        },
        onClear() {
            this.search = ""
        },
        update(route: RouteLocationNormalized) {
            this.axios.get(`${repoApi(route)}/settings/collaborator`, { withCredentials: true })
                .then((res) => res.data.data)
                .then((data) => {
                    this.collaborators = data
                    this.collaboratorsCount = data.length
                })
        }
    },
    components: {
        CollaboratorEntry
    },
    beforeRouteEnter(to, _from, next) {
        next((vm) => {
            (vm as any).update(to)
        })
    },
    beforeRouteUpdate(to) {
        this.update(to)
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

.general-setting-div .visibility {
    height: 100%;
}

.general-setting-div .collabortar-head {
    display: flex;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
