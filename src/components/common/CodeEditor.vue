<template>
    <el-card>
        <Codemirror :value="code" @update:value="(s) => $emit('update:code', s)" :options="cmOptions" :border="true"
            placeholder="test placeholder" :height="400" />
    </el-card>
</template>
  
<script lang="ts">
import Codemirror from "codemirror-editor-vue3"

export default {
    props: {
        code: String
    },
    emits: ["update:code"],
    data() {
        return {
            cmOptions: {
                mode: "text/javascript", // Language mode
                theme: "dracula", // Theme
                lineNumbers: true, // Show line number
                smartIndent: true, // Smart indent
                indentUnit: 2, // The smart indent unit is 2 spaces in length
                foldGutter: true, // Code folding
                styleActiveLine: true // Display the style of the selected row
            }
        }
    },
    components: { Codemirror }
}
</script>
