import { RouteRecordRaw } from 'vue-router'

const accountingPrefix = '/accounting'

 const accountingRoutes: RouteRecordRaw[] = [
  {
    path: accountingPrefix,
    name: 'accounting-index',
    redirect: `${accountingPrefix}/operations`
  },
  {
    path: `${accountingPrefix}/operations`,
    name: 'accounting-operations',
    component: () => import('@/views/Accounting/Operations.vue'),
    meta: { title: 'Opérations comptables' }
  },
  {
    path: `${accountingPrefix}/accounts`,
    name: 'accounting-accounts',
    component: () => import('@/views/Accounting/Accounts.vue'),
    meta: { title: 'Comptes' }
  },
  {
    path: `${accountingPrefix}/reports`,
    name: 'accounting-reports',
    component: () => import('@/views/Accounting/Reports.vue'),
    meta: { title: 'Rapports comptables' }
  }
]

export default accountingRoutes