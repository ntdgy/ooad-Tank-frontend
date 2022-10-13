import { defineStore } from "pinia"

export const repoPath = defineStore("repoPath", {
    state: () => ({ path: '' }),
    actions: {
        set(user: string, repo: string) {
            this.path = `${user}/${repo}`
        }
    }
})
