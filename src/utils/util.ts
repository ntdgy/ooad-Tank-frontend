import { userStore } from "@/stores/user"
import { baseUrl } from "@/stores/configs"
import router from "@/router"

const route = router.currentRoute

function checkLogin() {
    if (userStore().hasLogin) return true
    router.push({ name: "login" })
    return false
}

function notFound() {
    router.push({
        name: 'NotFound',
        params: { pathMatch: route.value.path.substring(1).split('/') },
        query: route.value.query,
        hash: route.value.hash
    })
}

function repoApi() {
    return `${baseUrl}/api/repo/${route.value.params.username}/${route.value.params.reponame}`
}

function gitApi() {
    return `${baseUrl}/api/git/${route.value.params.username}/${route.value.params.reponame}`
}

//TODO: https://github.com/ntdgy/ooad-Tank-backend/blob/master/src/main/java/tank/ooad/fitgub/utils/ReturnCode.java

export { checkLogin, notFound, repoApi, gitApi }
