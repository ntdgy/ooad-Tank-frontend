import { createRouter, createWebHistory } from 'vue-router'
import Repository from '../components/Repository.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/repo',
      name: 'repo',
      component: Repository
    },
    {
      path: '/issue',
      name: 'issue',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/Issue.vue')
    }
  ]
})

export default router
