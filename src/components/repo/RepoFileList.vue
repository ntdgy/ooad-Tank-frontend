<template>
    <el-card>
        <el-table :data="dir">
            <el-table-column prop="name" label="name">
                <template #default="scope">
                    <div class="filename">
                        <el-icon>
                            <Folder v-if="scope.row.folder" />
                            <Document v-else />
                        </el-icon>
                        <span>{{ scope.row.name }}</span>
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
    props: ["dir"]
})
</script>

<style scoped>
.filename {
    display: flex;
    align-items: center;
}

.filename span {
    margin-left: 1rem;
}
</style>
