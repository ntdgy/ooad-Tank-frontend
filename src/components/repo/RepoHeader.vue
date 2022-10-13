<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item>{{ username }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ reponame }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider />
        <Toolbar>
            <template #left> </template>
        </Toolbar>

        <!--buttons-->
        <Toolbar>
            <template #left>
                <el-select v-model="currentBranch" filterable>
                    <el-option-group label="type to search">
                        <el-option v-for="branch of computedBranches" :key="branch" :label="branch" :value="branch" />
                    </el-option-group>
                </el-select>
            </template>
            <template #right>
                <el-button>Add File&nbsp;<el-icon>
                        <Plus />
                    </el-icon>
                </el-button>
                <el-button type="primary">Clone&nbsp;<el-icon>
                        <ArrowDown />
                    </el-icon>
                </el-button>
                <!--TODO: use dropdown here-->
            </template>
        </Toolbar>
        <el-divider />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Toolbar from "../common/Toolbar.vue"
export default defineComponent({
    props: ['username', 'reponame', 'branches', 'defaultBranch'],
    components: {
        Toolbar
    },
    data() {
        return {
            computedBranches: [""],
            currentBranch: ""
        }
    },
    watch: {
        branches(now: Array<string>) {
            this.computedBranches = [...now]
            this.currentBranch = this.defaultBranch
        },
        currentBranch(now: string) {
            let target = this.$route.name
            if (now == this.$route.params.branch) return
            if (target == 'repo') {
                if (now == this.defaultBranch) return
                target = 'tree'
            }
            this.$router.push({
                name: target as string,
                params: {
                    branch: now,
                    path: ['']
                }
            })
        }
    }
})
</script>
