<template>
    <ul>
        <div>
            <Diff
                :mode="split"
                :theme="light"
                :language="plaintext"
                :prev="diff?.origin"
                :current="diff?.current"
            />
        </div>
    </ul>
</template>
  
<style lang="scss">
.vue-diff-theme-custom {
    @import 'highlight.js/scss/vs2015.scss'; // import theme

    background-color: #000; // Set background color
}
</style>

<script lang="ts">
import type { CommitDiff } from "@/utils/api"
import { gitApi, handleResponse } from "@/utils/util"
import { defineComponent, type PropType } from "vue"
import type { RouteLocationNormalized } from "vue-router"
import VueDiff from 'vue-diff';
import 'vue-diff/dist/index.css';

export default defineComponent({
    props: {
        diff: Object as PropType<CommitDiff>,
    },
    methods: {
        update(route: RouteLocationNormalized) {
            console.log(this.diff);
        }
    },
    components: { VueDiff }
})
</script>
