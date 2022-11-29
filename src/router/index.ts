import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import("@/views/404.vue") },
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
                    component: () => import("@/components/repo/RepositoryContentView.vue")
                },
                {
                    path: "new/:branch/:path*",
                    name: "newFile",
                    component: () => import("@/views/FileCreateView.vue")
                },
                {
                    path: "upload/:branch/:path*",
                    name: "uploadFile",
                    component: () => import("@/views/FileUploadView.vue")
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
                    component: () => import("@/views/IssueListView.vue")
                },
                {
                    path: "pulls/new",
                    name: "newPull",
                    component: () => import("@/views/NewPullView.vue")
                },
                {
                    path: "pulls/:issueId(\\d+)",
                    name: 'pull',
                    component: () => import("@/views/IssueView.vue")
                },
                {
                    path: "commits",
                    name: "commits",
                    component: () => import("@/views/CommitHistoryView.vue")
                },
                {
                    path: "fork",
                    name: "fork",
                    component: () => import("@/views/ForkView.vue")
                },
                {
                    path: "ci",
                    name: "ci",
                    component: () => import("@/views/ContinuousIntegrationView.vue")
                },
                {
                    path: "ci/:taskId(\\d+)",
                    name: 'ciTask',
                    component: () => import("@/views/ContinuousIntegrationResult.vue")
                },
                {
                    path: "settings/",
                    name: "settings",
                    component: () => import("@/views/SettingView.vue"),
                    redirect: { name: "general" },
                    children: [
                        {
                            path: "general",
                            name: "general",
                            component: () => import("@/views/GeneralSettingView.vue")
                        },
                        {
                            path: "collaborators",
                            name: "collaborators",
                            component: () => import("@/views/CollaboratorsSettingView.vue")
                        },
                        {
                            path: "pages",
                            name: "RepoSettingsPages",
                            component: () => import("@/views/RepoPagesSettingsView.vue")
                        }
                        // {
                        //     path: "branches",
                        //     name: "branches",
                        //     component: () => import("@/views/GeneralSettingView.vue")
                        // }
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
            component: () => import("@/views/UserSettingsView.vue"),
            redirect: '/settings/profile',
            children: [
                {
                    path: "profile",
                    name: "userProfileSettings",
                    component: () => import("@/views/UserProfileSettingsView.vue")
                },
                {
                    path: "security",
                    name: "userSecuritySettings",
                    component: () => import("@/views/UserSecuritySettingsView.vue")
                }
            ]
        },
        {
            path: "/forgot",
            name: "forgotPassword",
            component: () => import("@/views/ForgotPasswordView.vue")
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
            path: "/search",
            name: "search",
            component: () => import("@/views/RepoSearch.vue")
        },
        {
            path: "",
            name: "mainpage",
            component: () => import("@/views/MainPage.vue")
        }
    ]
})

export default router
