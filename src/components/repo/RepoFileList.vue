<template>
    <el-card>
        <el-table :data="tree">
            <el-table-column prop="name" label="name" />
            <el-table-column prop="message" label="commit" />
            <el-table-column prop="time" label="time" width="130" />
        </el-table>
    </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: ["tree"]
})
</script>
