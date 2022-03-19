import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/TreeView.vue'),

  },
  {
    path: '/tree',
    name: 'Tree',
    component: () => import('@/components/Tree.vue')
  },
  {
    path: '/outline',
    name: 'Outline',
    component: () => import('@/views/Outline.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
