<template>
    <div class="header">
        <div class="title">
            <div>
                <span>Aaaaaa aaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
                <span class="id">#1185</span>
            </div>
            <div>
                <el-button type="primary">New issue</el-button>
            </div>
        </div>
        <div class="desc">
            <el-tag type="success" size="large">Open</el-tag>
            <div>
                <a>Froster</a> opened this issue 8 days ago - 1 comment    
            </div>
        </div>
    </div>
</template>

<style scoped>
/* .header {
    display: flex;
    flex-direction: column;
} */

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
    margin-top: 2rem;
    white-space: initial;
}

.desc {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-left: 1rem;
    color: var(--el-text-color-regular);
    font-size: var(--el-font-size-base);
}
.desc .el-tag{
    margin-right: 1rem;
}

.desc a {
  font-weight: 600;
  vertical-align: bottom;
}

.title span {
    margin-left: 1rem;
}

.id {
    font-weight: lighter;
}
</style>