import axios from 'axios'
import { defineStore } from "pinia"

import { baseUrl } from "@/stores/configs"
import { handleResponse } from '@/utils/util'

export const userStore = defineStore("user", {
    state: (): { username?: string, email?: string } => {
        return {
            username: undefined,
            email: undefined
        }
    },
    getters: {
        hasLogin: (state) => !!state.username
    },
    actions: {
        fillName() {
            return axios.get(`${baseUrl}/api/user/check-login`, { withCredentials: true })
                .then(res => handleResponse(res, false))
                .then(data => {
                    this.username = data.name
                    this.email = data.email
                })
        },
        clear() {
            this.username = undefined
            this.email = undefined
        }
    }
})
