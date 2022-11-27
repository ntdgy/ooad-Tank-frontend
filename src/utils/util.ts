import { userStore } from "@/stores/user"
import { baseUrl } from "@/stores/configs"
import router from "@/router"

import codes from "@/utils/returnCode"
import type { AxiosResponse } from "axios"
import { ElNotification } from 'element-plus'

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

function handleResponse(res: AxiosResponse<any, any>) {
    const code = String(res.data.status.code)
    if (code == "200") {
        return res.data.data
    }
    ElNotification({
        title: 'Error',
        message: codes[code] ?? "未知错误",
        type: 'error'
    })
    throw code
}
//TODO: https://github.com/ntdgy/ooad-Tank-backend/blob/master/src/main/java/tank/ooad/fitgub/utils/ReturnCode.java

export { checkLogin, notFound, repoApi, gitApi, handleResponse }
