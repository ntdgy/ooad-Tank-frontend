<template>
    <div class="toolbar">
            <el-input 
                :value="modelValue"
                @input="$emit('update:modelValue', ($event as any).target.value)"
                placeholder="Search all issues & prs" class="input-with-select" clearable
                @clear="$emit('onClear')"
                >
                <template #prepend>
                    <el-select v-model="select" placeholder="Filters" style="width: 6rem">
                        <el-option label="A" value="1" />
                        <el-option label="B" value="2" />
                        <el-option label="C" value="3" />
                    </el-select>
                </template>
                <template #append>
                    <el-button>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </el-button>
                </template>
            </el-input>
            <el-button-group style="margin-left: 1rem">
                <el-button>Labels</el-button>
                <el-button>Milestones</el-button>
            </el-button-group>
            
            <el-button style="margin-left: 1rem" type="primary">New issue</el-button>
        </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
    
export default defineComponent({
    props: ['modelValue'],
    emits: ['update:modelValue', 'onClear'],
    data() {
        return {
            select: ""
        }
    }
})
</script>

<style scoped>
.toolbar {
    display: flex;
}

.el-button-group {
    display: flex;
}
</style>
