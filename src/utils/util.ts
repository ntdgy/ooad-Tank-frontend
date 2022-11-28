import { userStore } from "@/stores/user"
import { baseUrl } from "@/stores/configs"
import router from "@/router"

import codes from "@/utils/returnCode"
import type { AxiosResponse } from "axios"
import { ElNotification } from 'element-plus'

function checkLogin() {
    if (userStore().hasLogin) return true
    router.push({ name: "login" })
    return false
}

function notFound(route = router.currentRoute.value) {
    router.push({
        name: 'NotFound',
        params: { pathMatch: route.path.substring(1).split('/') },
        query: route.query,
        hash: route.hash
    })
}

function repoApi(route = router.currentRoute.value) {
    return `${baseUrl}/api/repo/${route.params.username}/${route.params.reponame}`
}

function gitApi(route = router.currentRoute.value) {
    return `${baseUrl}/api/git/${route.params.username}/${route.params.reponame}`
}

function handleResponse(res: AxiosResponse<any, any>, popup = true) {
    const code = String(res.data.status.code)
    if (code == "200") {
        return res.data.data
    }
    if (popup) {
        errorPopup(code)
    }
    throw code
}

function errorPopup(code: string) {
    ElNotification({
        title: 'Error',
        message: codes[code] ?? "未知错误",
        type: 'error'
    })
}
//TODO: https://github.com/ntdgy/ooad-Tank-backend/blob/master/src/main/java/tank/ooad/fitgub/utils/ReturnCode.java

export { checkLogin, notFound, repoApi, gitApi, handleResponse, errorPopup }
