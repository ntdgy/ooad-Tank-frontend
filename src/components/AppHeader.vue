<template>
    <el-row>
        <el-col :span="2">
            <img src="/element-plus-logo.svg" />
        </el-col>
        <div class="content-right">
            <el-input v-model="input1" style="width:12.5rem" size="large" placeholder="Search">
                <template #prefix>
                    <el-icon class="el-input__icon"><Search /></el-icon>
                </template>
            </el-input>
        </div>
    </el-row>
</template>

<script lang="ts">
export default {
    data() {
        return {
            input1: ""
        }
    }
}
</script>

<style scoped>
.content-right {
    justify-content: flex-end;
    display: flex;
    align-items: center;
    flex: auto;
}
</style>
