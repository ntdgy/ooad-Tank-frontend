<template>
  <li class="issue-list-item">
    <!--from github-->
    <div class="main-info">
      <a :href="url">{{ title }}</a>
      <div class="comment">
        <span
          >#114514 opened 4 days ago by
          <a>李田所</a>
        </span>
      </div>
    </div>
    <div class="meta">
      <div class="icons">
        <el-icon>
          <ChatLineSquare />
        </el-icon>
        <span>0</span>
      </div>
      <div class="meta-comment">
        <span>updated 2 hours ago</span>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
})
</script>

<style scoped>
.issue-list-item {
  /* padding: 1rem 2rem; */
  display: flex;
  border-top: solid;
  border-top-width: 1px;
  border-color: var(--el-menu-border-color);
  line-height: 1.5;
}

.issue-list-item:nth-child(1) {
  border-top: none;
}

.main-info {
  padding: 8px;
  flex: auto;
}

.main-info a {
  text-decoration: none;
  font-weight: 600;
  vertical-align: middle;
  color: var(--el-text-color-primary);
}

.comment {
  display: flex;
  font-size: var(--el-font-size-small);
  margin-top: 0.25rem;
  color: var(--el-text-color-regular);
}

.comment a {
  color: var(--el-text-color-regular);
  vertical-align: bottom;
}

.meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: end;
  flex: 1 0 auto;
  padding: 8px;
  color: var(--el-text-color-regular);
}

.icons {
  display: flex;
  align-items: center;
}

.icons span {
  margin-left: 0.2rem;
  font-size: var(--el-font-size-small);
}

.meta-comment {
  font-size: var(--el-font-size-small);
}
</style>
