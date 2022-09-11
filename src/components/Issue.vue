<template>
    <el-main>
        <div>
            <el-input v-model="search" placeholder="Search all issues & prs" class="input-with-select" clearable
                @clear="onClear">
                <template #prepend>
                    <el-select v-model="select" placeholder="Filters" style="width: 6rem">
                        <el-option label="A" value="1" />
                        <el-option label="B" value="2" />
                        <el-option label="C" value="3" />
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
            <el-button-group style="margin-left:1rem">
                <el-button>Labels</el-button>
                <el-button>Milestones</el-button>
            </el-button-group>
            <el-button style="margin-left:1rem" type="primary">New issue</el-button>
        </div>
        <Space />
        <RepoIssueList />
    </el-main>
    <!-- <el-aside style="background-color: aqua;">About</el-aside> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RepoIssueList from './repo/RepoIssueList.vue';
import Space from "./common/Space.vue"

export default defineComponent({
    data() {
        return {
            search: "",
            select: ""
        };
    },
    methods: {
        onClear() {
            this.search = "aaa";
        }
    },
    components: {
        RepoIssueList, Space
    }
})
</script>

<style scoped>
.el-main div {
    display: flex;
}
</style>
