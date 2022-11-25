import { defineStore } from "pinia"

export const repoStore = defineStore("repo", {
    state: (): {currentBranch?: string} => {
        return {
            currentBranch: undefined
        }
    }
})
