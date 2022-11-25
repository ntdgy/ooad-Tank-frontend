import { userStore } from "@/stores/user"
import router from "@/router"

function checkLogin() {
    if (userStore().hasLogin) return true
    router.push({name: "login"})
    return false
}

export { checkLogin }
