import type { RouteRecordRaw } from 'vue-router'

const comparatorPrefix = '/comparateur'

const comparatorRoutes: RouteRecordRaw[] = [
  {
    path: comparatorPrefix,
    name: 'comparator-home',
    component: () => import('@/views/Comparator/Home.vue'),
    meta: { 
      requiresAuth: false,
      title: 'Comparateur d\'assurance' 
    }
  },
  {
    path: `${comparatorPrefix}/branches`,
    name: 'comparator-branches',
    component: () => import('@/views/Comparator/Branches.vue'),
    meta: { 
      requiresAuth: false,
      title: 'Nos produits' 
    }
  },
  {
    path: `${comparatorPrefix}/:branchSlug`,
    name: 'comparator-branch',
    component: () => import('@/views/Comparator/BranchDetail.vue'),
    meta: { 
      requiresAuth: false,
      title: 'Devis en ligne' 
    }
  },
  {
    path: `${comparatorPrefix}/questionnaire/:surveySlug/:rgUuid?`,
    name: 'comparator-questionnaire',
    component: () => import('@/views/Comparator/Questionnaire.vue'),
    meta: { 
      requiresAuth: false,
      title: 'Questionnaire' 
    }
  },
  {
    path: `${comparatorPrefix}/results/:rgUuid`,
    name: 'comparator-results',
    component: () => import('@/views/Comparator/Results.vue'),
    meta: { 
      requiresAuth: false,
      title: 'Résultats' 
    }
  },
  {
    path: `${comparatorPrefix}/souscription/:uuid`,
    name: 'comparator-subscription',
    component: () => import('@/views/Comparator/Subscription.vue'),
    meta: { 
      requiresAuth: false,
      title: 'Souscription' 
    }
  }
]

export default comparatorRoutes