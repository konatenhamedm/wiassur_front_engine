import type { RouteRecordRaw } from 'vue-router'

const prefix = '/crm'

const crmRoutes: RouteRecordRaw[] = [
  {
    path: prefix,
    name: 'crm-index',
    redirect: `${prefix}/contacts`
  },

  // ============================================
  // CONTACTS
  // ============================================
  {
    path: `${prefix}/contacts`,
    name: 'crm-contacts',
    component: () => import('@/views/CRM/Contact/List.vue'),
    meta: { title: 'Contacts' }
  },
  {
    path: `${prefix}/contacts/:id`,
    name: 'crm-contact-detail',
    component: () => import('@/views/CRM/Contact/Detail.vue'),
    meta: { title: 'Détail contact' }
  },

  // ============================================
  // COMPANIES
  // ============================================
  {
    path: `${prefix}/companies`,
    name: 'crm-companies',
    component: () => import('@/views/CRM/Company/List.vue'),
    meta: { title: 'Entreprises' }
  },
  {
    path: `${prefix}/companies/:id`,
    name: 'crm-company-detail',
    component: () => import('@/views/CRM/Company/Detail.vue'),
    meta: { title: 'Détail entreprise' }
  },

  // ============================================
  // DEALS (Opportunités)
  // ============================================
  {
    path: `${prefix}/deals`,
    name: 'crm-deals',
    component: () => import('@/views/CRM/Deal/List.vue'),
    meta: { title: 'Opportunités' }
  },
  {
    path: `${prefix}/deals/:id`,
    name: 'crm-deal-detail',
    component: () => import('@/views/CRM/Deal/Detail.vue'),
    meta: { title: 'Détail opportunité' }
  },

  // ============================================
  // HANDSHAKES (Prises de contact)
  // ============================================
  {
    path: `${prefix}/handshakes`,
    name: 'crm-handshakes',
    component: () => import('@/views/CRM/Handshake/List.vue'),
    meta: { title: 'Prises de contact' }
  },
  {
    path: `${prefix}/handshakes/form/:uuid?`,
    name: 'crm-handshake-form',
    component: () => import('@/views/CRM/Handshake/Form.vue'),
    meta: { title: 'Prise de contact' }
  },

  // ============================================
  // CAMPAIGNS
  // ============================================
  {
    path: `${prefix}/campaigns`,
    name: 'crm-campaigns',
    component: () => import('@/views/CRM/Campaign/List.vue'),
    meta: { title: 'Campagnes' }
  },

  // ============================================
  // TOOLS
  // ============================================
  {
    path: `${prefix}/extractor`,
    name: 'crm-extractor',
    component: () => import('@/views/CRM/Tools/Extractor.vue'),
    meta: { title: 'Extracteur de données' }
  },
  {
    path: `${prefix}/url-shortener`,
    name: 'crm-url-shortener',
    component: () => import('@/views/CRM/Tools/UrlShortener.vue'),
    meta: { title: 'Réduction d\'URL' }
  }
]

export default crmRoutes