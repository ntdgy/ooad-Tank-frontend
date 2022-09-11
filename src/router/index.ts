import { createRouter, createWebHistory } from "vue-router"
import RepositoryView from "../components/RepositoryView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/repo",
            name: "repo",
            component: RepositoryView,
        },
        {
            path: "/issue",
            name: "issue",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../components/IssueView.vue"),
        },
    ],
})

export default router
