<template>
    <div class="flex">
            <el-input 
                :value="modelValue"
                @input="$emit('update:modelValue', ($event as any).target.value)"
                placeholder="Search all issues & prs" class="input-with-select" clearable
                @clear="$emit('onClear')"
                >
                <template #prepend>
                    <el-select v-model="select" placeholder="Filters" class="w-20">
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
            <el-button-group class="!flex ml-4">
                <el-button>Labels</el-button>
                <el-button>Milestones</el-button>
            </el-button-group>
            
            <el-button style="margin-left: 1rem" type="primary" @click="newIssue">New issue</el-button>
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
    },
    methods: {
        newIssue() {
            this.$router.push({ name: "newIssue" })
        }
    }
})
</script>
