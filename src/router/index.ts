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
            path: "/issue",
            name: "issue",
            component: () => import("@/views/IssueListView.vue")
        },
        {
            path: "/pulls",
            name: "pulls",
            component: () => import("@/views/PRListView.vue")
        }
    ]
})

export default router
