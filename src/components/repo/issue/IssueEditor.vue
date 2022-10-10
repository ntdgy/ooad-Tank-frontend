<template>
    <el-card :body-style="{padding: '0.5rem'}">
        <el-form>
            <el-form-item>
                <el-input :value="modelValue" @input="$emit('update:modelValue', 
                ($event as any).target.value)" :rows="5" type="textarea" />
            </el-form-item>
            <!-- <div> -->
            <el-form-item class="editor-footer">
                <el-button type="primary" @click="$emit('submit')">Comment</el-button>
            </el-form-item>
            <!-- </div> -->
        </el-form>
    </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: ['modelValue'],
    emits: ['update:modelValue', 'submit']
})
</script>

<style>
.editor-footer {
    margin-bottom: 0;
}
.editor-footer .el-form-item__content {
    justify-content: end;
}
</style>
