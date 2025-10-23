import { RouteRecordRaw } from 'vue-router'

const partnerPrefix = '/partners'

const partnerRoutes: RouteRecordRaw[] = [
  {
    path: partnerPrefix,
    name: 'partner-list',
    component: () => import('@/views/Partner/List.vue'),
    meta: { title: 'Partenaires' }
  },
  {
    path: `${partnerPrefix}/:id`,
    name: 'partner-detail',
    component: () => import('@/views/Partner/Detail.vue'),
    meta: { title: 'Détail partenaire' }
  },
  {
    path: `${partnerPrefix}/hierarchy`,
    name: 'partner-hierarchy',
    component: () => import('@/views/Partner/Hierarchy.vue'),
    meta: { title: 'Hiérarchie partenaires' }
  },
  {
    path: '/partner/login',
    name: 'partner-login',
    component: () => import('@/views/Auth/PartnerLogin.vue'),
    meta: { 
      requiresAuth: false,
      title: 'Connexion Partenaire' 
    }
  }
]

export default partnerRoutes