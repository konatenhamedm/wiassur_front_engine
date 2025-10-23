import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: AuthLayout,
    meta: {
      requiresAuth: false,
      title: 'Connexion'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/Auth/Login.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DefaultLayout,
    meta: {
      title: 'Tableau de bord'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/Dashboard/Index.vue')
      }
    ]
  }
]

export default defaultRoutes