<template>
  <el-card :body-style="{ padding: '0.5rem' }">
    <el-form>
      <el-form-item v-if="showTitle">
        <!-- <el-input :value="title" @input="$emit('update:title', ($event as any).target.value)"
                    placeholder="Title" /> -->
        <el-input v-model="titleinner" placeholder="Title" />
      </el-form-item>

      <el-tabs type="card">
        <el-tab-pane label="Write">
          <el-form-item>
            <el-input
              v-model="contentinner"
              :rows="5"
              type="textarea"
              placeholder="Leave a comment"
            />
          </el-form-item>
          <!-- <div> -->
        </el-tab-pane>
        <el-tab-pane label="Preview">
          <div v-html="markdownToHtml" />
        </el-tab-pane>
      </el-tabs>
      <el-form-item class="editor-footer">
        <el-button v-if="!showTitle" type="primary" @click="$emit('close')"
          >Close Issue</el-button
        >
        <el-button type="success" @click="$emit('submit')">Comment</el-button>
      </el-form-item>

      <!-- </div> -->
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import MarkdownIt from "markdown-it"
import highlightjs from "markdown-it-highlightjs"
const md = MarkdownIt().use(highlightjs, { inline: true })

export default defineComponent({
    data() {
        return {}
    },
    props: ["showTitle", "content", "title"],
    emits: ["update:title", "update:content", "submit", "close"],
    computed: {
        titleinner: {
            get() {
                return this.title
            },
            set(value: string) {
                this.$emit("update:title", value)
            }
        },
        markdownToHtml() {
            return md.render(this.contentinner)
        },
        contentinner: {
            get() {
                return this.content
            },
            set(value: string) {
                this.$emit("update:content", value)
            }
        }
    }
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
