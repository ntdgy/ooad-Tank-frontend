import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/:username/:reponame/",
            name: "main",
            component: () => import("@/views/RepositoryView.vue"),
            children: [
                {
                    path: "",
                    name: "repo",
                    component: () => import("@/components/repo/RepositoryContentView.vue")
                },
                {
                    path: "tree/:branch/:path*",
                    name: "tree",
                    component: () => import("@/components/repo/RepositoryContentView.vue")
                },
                {
                    path: "blob/:branch/:path+",
                    name: "blob",
                    component: () => import("@/components/repo/RepoFileView.vue")
                },
                {
                    path: "issues",
                    name: "issues",
                    component: () => import("@/views/IssueListView.vue")
                },
                {
                    path: "issues/:issueId(\\d+)",
                    name: 'issue',
                    component: () => import("@/views/IssueView.vue")
                },
                {
                    path: "issues/new",
                    name: "newIssue",
                    component: () => import("@/views/NewIssueView.vue")
                },
                {
                    path: "pulls",
                    name: "pulls",
                    component: () => import("@/views/PRListView.vue")
                },
                {
                    path: "settings/",
                    name: "settings/",
                    component: () => import("@/views/SettingView.vue"),
                    children: [
                        {
                            path: "general",
                            name: "general",
                            component: () => import("@/views/GeneralSettingView.vue")
                        },
                        {
                            path: "collaborators",
                            name: "collaborators",
                            component: () => import("@/views/GeneralSettingView.vue")
                        },
                        {
                            path: "branches",
                            name: "branches",
                            component: () => import("@/views/GeneralSettingView.vue")
                        }
                    ]
                },
                {
                    path: "*",
                    redirect: '/404'
                }
            ]
        },
        {
            path: "/:username",
            name: "profile",
            component: () => import("@/views/UserProfileView.vue")
        },
        {
            path: "/new",
            name: "newRepo",
            component: () => import("@/views/NewRepoView.vue")
        },
        {
            path: "/settings",
            name: "userSettings",
            component: () => import("@/views/UserSettingsView.vue")
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
