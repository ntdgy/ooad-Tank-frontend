<template>
    <el-card>
        <el-table :data="computedDir">
            <el-table-column prop="name" label="name">
                <template #default="scope">
                    <div class="filename">
                        <el-icon>
                            <Folder v-if="scope.row.folder" />
                            <Document v-else />
                        </el-icon>
                        <el-link @click="navigate(scope.row.name, scope.row.folder)">{{ scope.row.name }}</el-link>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="message" label="commit" />
            <el-table-column prop="time" label="time" width="130" />
        </el-table>
    </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: ["dir", "defaultBranch"],
    computed: {
        computedDir() {
            if (!this.dir || !this.$route.params.path || this.$route.params.path.length == 0) return this.dir
            return [{ name: "..", folder: true }, ...(this.dir ?? [])]
        }
    },
    methods: {
        navigate(name: string, isFolder: string) {
            let tmp = this.$route.params.path
            let before = (!tmp || tmp == "") ? [] : (tmp as string[]).filter(s => s != '')
            let path = [...before, ...name.split('/')]
            if (isFolder) {
                if (name == '..') {
                    before.pop()
                    path = before
                }
                this.$router.push({
                    name: "tree", params: {
                        branch: this.$route.params.branch ?? this.defaultBranch,
                        path: path
                    }
                })
            } else {
                this.$router.push({
                    name: "blob", params: {
                        branch: this.$route.params.branch ?? this.defaultBranch,
                        path: path
                    }
                })
            }
        }
    }
})
</script>

<style scoped>
.filename {
    display: flex;
    align-items: center;
}

.filename a {
    margin-left: 1rem;
}
</style>
