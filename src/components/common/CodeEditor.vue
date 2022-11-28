<template>
    <el-card>
        <Codemirror v-model:value="codeInner" :options="cmOptions" :border="true" placeholder="test placeholder"
            :height="400" />
    </el-card>
</template>
  
<script lang="ts">
import Codemirror from "codemirror-editor-vue3"

//TODO: fix import

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
    }, computed: {
        codeInner: {
            get() {
                return this.code
            },
            set(value: string) {
                this.$emit("update:code", value)
            }
        }
    },
    components: { Codemirror }
}
</script>
