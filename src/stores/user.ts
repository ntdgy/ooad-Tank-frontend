import { defineStore } from "pinia"

export const userStore = defineStore("user", {
    state: (): {username?: string} => {
        return {
            username: undefined
        }
    },
    getters: {
        hasLogin: (state) => !!state.username
    }
})
