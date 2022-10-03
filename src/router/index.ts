import { createRouter, createWebHistory } from "vue-router"
import RepositoryView from "@/views/RepositoryView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/repo",
            name: "repo",
            component: RepositoryView
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/LoginView.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("@/views/RgeisterView.vue")
        },
        {
            path: "/issue",
            name: "issue",
            component: () => import("@/views/IssueListView.vue")
        },
        {
            path: "/pulls",
            name: "pulls",
            component: () => import("@/views/PRListView.vue")
        },
        {
            path: "/file",
            name: "file",
            component: () => import("@/views/FileView.vue")
        },
        {
            path: "/issuetest",
            name: "issuetest",
            component: () => import("@/views/IssueView.vue")
        }
    ]
})

export default router
