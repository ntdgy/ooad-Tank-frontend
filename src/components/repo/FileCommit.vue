<template>
    <el-card>
        <el-form>
            <h1 class="mt-0 mb-3">Commit changes</h1>
            <el-form-item>
                <el-input v-model="subjectInner" :placeholder="subjectPlaceHolder"></el-input>
            </el-form-item>
            <!-- <el-form-item>
                <el-input v-model="bodyInner" :rows="5" type="textarea"
                    placeholder="Add an optional extended description." />
            </el-form-item> -->
        </el-form>
        <div class="flex justify-end mt-4">
            <el-button type="primary" @click="$emit('cancel')">Cancel</el-button>
            <el-button type="success" @click="$emit('commit')">Commit</el-button>
        </div>
    </el-card>

</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    data() {
        return {}
    },
    props: {
        subject: String,
        body: String,
        subjectPlaceHolder: String
    },
    emits: ["update:subject", "update:body", "commit", "cancel"],
    computed: {
        subjectInner: {
            get() {
                return this.subject
            },
            set(value: string) {
                this.$emit("update:subject", value)
            }
        },
        bodyInner: {
            get() {
                return this.body
            },
            set(value: string) {
                this.$emit("update:body", value)
            }
        }
    }
})
</script>
