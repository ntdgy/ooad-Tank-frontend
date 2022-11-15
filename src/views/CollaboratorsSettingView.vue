<template>
  <div class="general-setting-div">
    <el-divider content-position="left"
      ><div class="div-title">Who has access</div></el-divider
    >
    <span> 1.提醒状态 2.提醒目前有的collaborators </span>
    <el-divider content-position="left"
      ><div class="div-title">Manage access</div></el-divider
    >
    <div class="collabortar-head">
      <el-input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event as any).target.value)"
        placeholder="Find a collaborator"
        class="input-with-select"
        clearable
        @clear="$emit('onClear')"
      >
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
      <el-button style="margin-left: 1rem" type="success" @click="addPeople"
        >Add people</el-button
      >
    </div>
    <br />
    <div class="collabortar-body">
      <CollaboratorEntry
        v-for="issue in issues"
        :id="issue.repo_issue_id"
        :title="issue.title"
        :key="issue.repo_issue_id"
        :issuer="issue.issuer.name"
        :status="issue.status"
        :created-at="issue.created_at"
        :updated-at="issue.updated_at"
      />
    </div>
  </div>
</template>


<script lang="ts">
import CollaboratorEntry from "@/components/repo/settings/CollaboratorEntry.vue"
import { baseUrl } from "@/stores/configs"
import type { Issue } from "@/libs/api"
import { defineComponent } from "vue"

export default defineComponent({
    props: ["modelValue"],
    emits: ["update:modelValue", "onClear"],
    data() {
        return {
            search: "",
            select: "",
            issues: Array<Issue>()
        }
    },
    methods: {
        addPeople() {
            this.$router.push({ name: "newIssue" }) //TODO: 新增协作者，或者直接popup
        },
        onClear() {
            this.search = ""
        }
    },
    components: {
        CollaboratorEntry
    },
    beforeRouteEnter(_to, _from, next) {
        next((vm) => {
            vm.axios
                .get(
                    `${baseUrl}/api/repo/${vm.$route.params.username}/${vm.$route.params.reponame}/settings/collaborator`,
                    {
                        withCredentials: true
                    }
                )
                .then((res) => res.data.data)
                .then((data) => {
                    (vm as any).issues = data
                })
        })
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
</style>
