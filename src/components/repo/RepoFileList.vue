<template>
    <el-card>
        <el-row v-for="(file, idx) in files">
            <el-col :span="3" class="fs-col">
                <el-icon>
                    <Folder v-if="file.fileType == 'Folder'" />
                    <Document v-else />
                </el-icon>
                <span>{{file.fileName}}</span>
            </el-col>
            <el-col :span="10" :offset="4">
                <span>{{file.message}}</span>
            </el-col>
            <el-col :span="3" :offset="4">
                <span>{{file.time}}</span>
            </el-col>
        </el-row>
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
