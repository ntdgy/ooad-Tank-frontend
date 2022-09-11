<template>
    <div :style="{ margin: `${margin}rem 0` }"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        margin: {
            type: Number,
            default: 1
        }
    }
})
</script>
