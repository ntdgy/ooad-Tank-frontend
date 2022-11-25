import axios from 'axios'
import { defineStore } from "pinia"

import { baseUrl } from "@/stores/configs"

export const userStore = defineStore("user", {
    state: (): {username?: string} => {
        return {
            username: undefined
        }
    },
    getters: {
        hasLogin: (state) => !!state.username
    },
    actions: {
        fillName() {
            return axios.get(`${baseUrl}/api/user/check-login`, { withCredentials: true })
                .then(res => res.data.data)
                .then(data => {
                    if (data) {
                        userStore().username = data.name
                    }
                })
        }
    }
})
