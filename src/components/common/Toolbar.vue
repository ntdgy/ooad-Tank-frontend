<template>
    <div class="toolbar">
        <div>
            <slot name="left"></slot>
        </div>
        <div class="content-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style scoped>
.toolbar {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    box-sizing: border-box;
}

.content-right {
    justify-content: flex-end;
    display: flex;
    align-items: center;
    flex: auto;
}
</style>
