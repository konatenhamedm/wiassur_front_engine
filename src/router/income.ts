import type { RouteRecordRaw } from 'vue-router'

const prefix = '/income'

const incomeRoutes: RouteRecordRaw[] = [
  // Index
  {
    path: prefix,
    name: 'income-index',
    redirect: `${prefix}/quotations`
  },

  // ============================================
  // QUOTATIONS (Cotations/Devis)
  // ============================================
  {
    path: `${prefix}/quotations`,
    name: 'quotation-list',
    component: () => import('@/views/Income/Quotation/List.vue'),
    meta: { title: 'Devis' }
  },
  {
    path: `${prefix}/quotations/create`,
    name: 'quotation-create',
    component: () => import('@/views/Income/Quotation/Form.vue'),
    meta: { title: 'Nouveau devis' }
  },
  {
    path: `${prefix}/quotations/:uuid`,
    name: 'quotation-detail',
    component: () => import('@/views/Income/Quotation/Detail.vue'),
    meta: { title: 'Détail devis' }
  },
  {
    path: `${prefix}/quotations/:uuid/edit`,
    name: 'quotation-edit',
    component: () => import('@/views/Income/Quotation/Form.vue'),
    meta: { title: 'Modifier devis' }
  },

  // ============================================
  // CONTRACTS
  // ============================================
  {
    path: `${prefix}/contracts`,
    name: 'contract-list',
    component: () => import('@/views/Income/Contract/List.vue'),
    meta: { title: 'Contrats' }
  },
  {
    path: `${prefix}/contracts/:uuid`,
    name: 'contract-detail',
    component: () => import('@/views/Income/Contract/Detail.vue'),
    meta: { title: 'Détail contrat' }
  },
  {
    path: `${prefix}/contracts/:uuid/:tab?`,
    name: 'contract-detail-tab',
    component: () => import('@/views/Income/Contract/Detail.vue'),
    meta: { title: 'Détail contrat' }
  },

  // ============================================
  // CUSTOMERS (Clients/Assurés)
  // ============================================
  {
    path: `${prefix}/customers`,
    name: 'customer-list',
    component: () => import('@/views/Income/Customer/List.vue'),
    meta: { title: 'Clients' }
  },
  {
    path: `${prefix}/customers/:id`,
    name: 'customer-detail',
    component: () => import('@/views/Income/Customer/Detail.vue'),
    meta: { title: 'Détail client' }
  },

  // ============================================
  // AVENANTS (Endorsements)
  // ============================================
  {
    path: `${prefix}/avenants`,
    name: 'avenant-list',
    component: () => import('@/views/Income/Avenant/List.vue'),
    meta: { title: 'Avenants' }
  },
  {
    path: `${prefix}/avenants/create`,
    name: 'avenant-create',
    component: () => import('@/views/Income/Avenant/Form.vue'),
    meta: { title: 'Créer un avenant' }
  },

  // ============================================
  // INVOICES & PAYMENTS
  // ============================================
  {
    path: `${prefix}/invoices`,
    name: 'invoice-list',
    component: () => import('@/views/Income/Invoice/List.vue'),
    meta: { title: 'Factures' }
  },
  {
    path: `${prefix}/payments`,
    name: 'payment-list',
    component: () => import('@/views/Income/Payment/List.vue'),
    meta: { title: 'Paiements' }
  },

  // ============================================
  // IMPORTS & REPORTS
  // ============================================
  {
    path: `${prefix}/import`,
    name: 'income-import',
    component: () => import('@/views/Income/Import/Index.vue'),
    meta: { title: 'Import de données' }
  },
  {
    path: `${prefix}/reports`,
    name: 'income-reports',
    component: () => import('@/views/Income/Reports/Index.vue'),
    meta: { title: 'États & Rapports' }
  }
]

export default incomeRoutes