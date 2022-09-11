<template>
    <el-card>
        <el-table :data="files">
            <el-table-column prop="fileName" label="name"/>
            <el-table-column prop="message" label="commit"/>
            <el-table-column prop="time" label="time" width="130"/>
        </el-table>
    </el-card>
</template>

<script lang="ts">

export default {
    data() {
        let testFiles = []
        for (let i = 0; i < 25; i++) {
            testFiles.push({
                fileType: Math.random() > 0.6 ? "Folder" : "File",
                fileName: (Math.random() + 1).toString(36).substring(2),
                message: (Math.random() + 1).toString(36).substring(2),
                time: "11 months ago"
            })

        }
        return {
            files: testFiles
        }
    }
}
</script>

<style scoped>
.el-row {
    border-top: 1px solid var(--el-border-color);
    padding: 0.5rem 0rem;
}

.el-row:nth-child(1) {
    border-top: none;
}

.el-col.fs-col {
    display: flex;
    align-items: center;
}

.el-col.fs-col span {
    display: inline-flex;
    align-items: center;
    margin-left: 15px;
}
</style>
