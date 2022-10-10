import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/:username/:reponame/",
            component: () => import("@/views/RepositoryView.vue"),
            children: [
                {
                    path: "issue",
                    name: "issue",
                    component: () => import("@/views/IssueListView.vue")
                },
                {
                    path: "",
                    name: "repo",
                    component: () => import("@/components/repo/RepositoryContentView.vue")
                },
                {
                    path: "pulls",
                    name: "pulls",
                    component: () => import("@/views/PRListView.vue")
                },
                {
                    path: "file",
                    name: "file",
                    component: () => import("@/views/FileView.vue")
                },
                {
                    path: "issuetest",
                    name: "issuetest",
                    component: () => import("@/views/IssueView.vue")
                },
                {
                    path: "*",
                    redirect: '/404'
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/LoginView.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("@/views/RegisterView.vue")
        },
        {
            path: "",
            name: "mainpage",
            component: () => import("@/views/MainPage.vue")
        }
    ]
})

export default router
