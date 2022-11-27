import { userStore } from "@/stores/user"
import router from "@/router"

function checkLogin() {
    if (userStore().hasLogin) return true
    router.push({ name: "login" })
    return false
}

function notFound() {
    const route = router.currentRoute.value
    router.push({
        name: 'NotFound',
        params: { pathMatch: route.path.substring(1).split('/') },
        query: route.query,
        hash: route.hash
    })
}

export { checkLogin, notFound }
