<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item>{{ username }}</el-breadcrumb-item>
            <el-breadcrumb-item :to="getRepoRouteTarget()">{{ reponame }}</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(path, idx) in filteredPath" :key="path" :to="getRouteTarget(idx)">{{path}}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider />

        <template v-if="showRepoBar">
            <!--buttons-->
            <Toolbar>
                <template #left>
                    <el-select v-model="currentBranch" filterable>
                        <el-option-group label="type to search">
                            <el-option v-for="branch of computedBranches" :key="branch" :label="branch"
                                :value="branch" />
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
        </template>
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
        },
        showRepoBar() {
            return ['repo', 'tree', 'blob'].includes(this.$route.name as string)
        }
    },
    watch: {
        branches(now: Array<string>) {
            this.computedBranches = [...now]
            this.currentBranch = this.defaultBranch
        },
        currentBranch(now: string) {
            let target = this.$route.name
            if (now == this.$route.params.branch || ['tree', 'repo', 'blob'].indexOf(target as string) == -1) return
            if (target == 'repo') {
                if (now == this.defaultBranch) return
                target = 'tree'
            }
            this.$router.push({
                name: target as string,
                params: {
                    branch: now
                }
            })
        }
    },
    methods: {
        getRouteTarget(index: number) {
            return index == this.filteredPath.length - 1 ? undefined : {
                name: 'tree', params: {
                    path: this.filteredPath.slice(0, index + 1)
                }
            }
        },
        getRepoRouteTarget() {
            if (this.currentBranch != this.defaultBranch) {
                return {
                    name: 'tree',
                    params: {
                        branch: this.currentBranch,
                        path: ['']
                    }
                }
            }
            return {
                name: 'repo'
            }
        }
    }
})
</script>
