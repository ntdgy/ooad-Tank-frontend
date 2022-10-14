<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item>{{ username }}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name: 'repo'}">{{ reponame }}</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(path, idx) in filteredPath" :key="path" :to="getRouteTarget(idx)">{{path}}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider />

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
    computed: {
        filteredPath() {
            if (!this.$route.params.path) return []
            let res = [...this.$route.params.path]
            if (res[res.length - 1] == '') res.pop()
            return res
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
            console.log(now)
            console.log(target)
            this.$router.push({
                name: target as string,
                params: {
                    branch: now,
                    path: ['']
                }
            })
        }
    },
    created() {
        this.$watch(() => this.$route.name,
            (name: string) => {
                console.log(name)
            })
    },
    methods: {
        getRouteTarget(index: number) {
            return index == this.filteredPath.length - 1 ? undefined : {
                name: 'tree', params: {
                    path: this.filteredPath.slice(0, index + 1)
                }
            }
        }
    }
})
</script>
