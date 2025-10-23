import { RouteRecordRaw } from 'vue-router'

 const errorRoutes: RouteRecordRaw[] = [
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/views/Errors/Unauthorized.vue'),
      meta: { 
        requiresAuth: false,
        title: 'Accès non autorisé'
      }
    },
    {
      path: '/403',
      redirect: '/unauthorized'
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/Errors/NotFound.vue'),
      meta: { 
        requiresAuth: false,
        title: 'Page introuvable'
      }
    }
  ]

export default errorRoutes