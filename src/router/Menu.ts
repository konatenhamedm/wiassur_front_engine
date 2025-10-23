/**
 * Menu.ts - Source de vérité pour:
 * - Structure de navigation
 * - Permissions d'accès (rôles requis)
 * - Labels et icônes
 */

export interface MenuRole {
    code: string
  }
  
  export interface MenuItem {
    name: string
    path: string
    label: string
    icon?: string
    roles?: MenuRole[][]  // OR logic: [[ROLE_A], [ROLE_B]] = A OR B
    subMenus?: MenuItem[]
  }
  
  // ============================================
  // MENUS PRINCIPAUX
  // ============================================
  
  export const menus: MenuItem[] = [
    // ============================================
    // DASHBOARD
    // ============================================
    {
      name: 'dashboard',
      path: '/dashboard',
      label: 'Tableau de bord',
      icon: 'fa fa-home',
      roles: [] // Accessible à tous les utilisateurs connectés
    },
  
    // ============================================
    // CONFIGURATION (Moteur inclus)
    // ============================================
    {
      name: 'configuration-index',
      path: '/configuration',
      label: 'Configuration',
      icon: 'fad fa-cog',
      roles: [
        [{ code: 'ROLE_ADMIN' }],
        [{ code: 'ROLE_MANAGER' }]
      ],
      subMenus: [
        // Moteur de calcul
        {
          name: 'engine-index',
          path: '/configuration/engine',
          label: 'Moteur de calcul',
          icon: 'fad fa-calculator',
          roles: [
            [{ code: 'ROLE_ADMIN' }],
            [{ code: 'ROLE_MANAGER' }]
          ],
          subMenus: [
            {
              name: 'engine-configuration',
              path: '/configuration/engine/configuration',
              label: 'Configuration',
              icon: 'fad fa-sliders-h'
            },
            {
              name: 'engine-test',
              path: '/configuration/engine/test',
              label: 'Test',
              icon: 'fad fa-vial'
            }
          ]
        },
        // Branches
        {
          name: 'branch-list',
          path: '/configuration/branches',
          label: 'Branches',
          icon: 'fad fa-sitemap',
          roles: [
            [{ code: 'ROLE_ADMIN' }],
            [{ code: 'ROLE_MANAGER' }]
          ]
        },
        // Assureurs
        {
          name: 'insurer-list',
          path: '/configuration/insurers',
          label: 'Assureurs',
          icon: 'fad fa-building',
          roles: [
            [{ code: 'ROLE_ADMIN' }],
            [{ code: 'ROLE_MANAGER' }]
          ]
        },
        // Formulaires
        {
          name: 'survey-list',
          path: '/configuration/surveys',
          label: 'Formulaires',
          icon: 'fad fa-clipboard-list',
          roles: [
            [{ code: 'ROLE_ADMIN' }],
            [{ code: 'ROLE_MANAGER' }]
          ]
        },
        // Types de données
        {
          name: 'data-type-manager',
          path: '/configuration/data-types',
          label: 'Types de données',
          icon: 'fad fa-database',
          roles: [
            [{ code: 'ROLE_ADMIN' }]
          ]
        },
        // Tags
        {
          name: 'tag-manager',
          path: '/configuration/tags',
          label: 'Tags',
          icon: 'fad fa-tags',
          roles: [
            [{ code: 'ROLE_ADMIN' }],
            [{ code: 'ROLE_MANAGER' }]
          ]
        }
      ]
    },
  
    // ============================================
    // PRODUCTION (Income)
    // ============================================
    {
      name: 'income-index',
      path: '/income',
      label: 'Production',
      icon: 'fad fa-shopping-bag',
      roles: [
        [{ code: 'ROLE_PRODUCTEUR' }],
        [{ code: 'ROLE_COMMERCIAL' }],
        [{ code: 'ROLE_PARTNER' }]
      ],
      subMenus: [
        {
          name: 'quotation-list',
          path: '/income/quotations',
          label: 'Devis',
          icon: 'fad fa-file-invoice-dollar'
        },
        {
          name: 'contract-list',
          path: '/income/contracts',
          label: 'Contrats',
          icon: 'fad fa-file-contract'
        },
        {
          name: 'customer-list',
          path: '/income/customers',
          label: 'Clients',
          icon: 'fad fa-users'
        },
        {
          name: 'avenant-list',
          path: '/income/avenants',
          label: 'Avenants',
          icon: 'fad fa-file-signature'
        },
        {
          name: 'invoice-list',
          path: '/income/invoices',
          label: 'Factures',
          icon: 'fad fa-receipt'
        },
        {
          name: 'payment-list',
          path: '/income/payments',
          label: 'Paiements',
          icon: 'fad fa-credit-card'
        }
      ]
    },
  
    // ============================================
    // CRM
    // ============================================
    {
      name: 'crm-index',
      path: '/crm',
      label: 'CRM',
      icon: 'fad fa-address-book',
      roles: [
        [{ code: 'ROLE_COMMERCIAL' }],
        [{ code: 'ROLE_MANAGER' }]
      ],
      subMenus: [
        {
          name: 'crm-contacts',
          path: '/crm/contacts',
          label: 'Contacts',
          icon: 'fad fa-user'
        },
        {
          name: 'crm-companies',
          path: '/crm/companies',
          label: 'Entreprises',
          icon: 'fad fa-building'
        },
        {
          name: 'crm-deals',
          path: '/crm/deals',
          label: 'Opportunités',
          icon: 'fad fa-handshake'
        },
        {
          name: 'crm-campaigns',
          path: '/crm/campaigns',
          label: 'Campagnes',
          icon: 'fad fa-bullhorn'
        }
      ]
    },
  
    // ============================================
    // ADMIN
    // ============================================
    {
      name: 'admin-index',
      path: '/admin',
      label: 'Administration',
      icon: 'fad fa-shield-alt',
      roles: [
        [{ code: 'ROLE_ADMIN' }]
      ],
      subMenus: [
        {
          name: 'admin-users',
          path: '/admin/users',
          label: 'Utilisateurs',
          icon: 'fad fa-users-cog'
        },
        {
          name: 'admin-roles',
          path: '/admin/roles',
          label: 'Rôles',
          icon: 'fad fa-user-shield'
        },
        {
          name: 'admin-tenants',
          path: '/admin/tenants',
          label: 'Tenants',
          icon: 'fad fa-network-wired'
        },
        {
          name: 'admin-menus',
          path: '/admin/menus',
          label: 'Menus',
          icon: 'fad fa-bars'
        }
      ]
    },
  
    // ============================================
    // PARTENAIRES
    // ============================================
    {
      name: 'partner-list',
      path: '/partners',
      label: 'Partenaires',
      icon: 'fad fa-handshake-alt',
      roles: [
        [{ code: 'ROLE_ADMIN' }],
        [{ code: 'ROLE_MANAGER' }]
      ],
      subMenus: [
        {
          name: 'partner-hierarchy',
          path: '/partners/hierarchy',
          label: 'Hiérarchie',
          icon: 'fad fa-sitemap'
        }
      ]
    },
  
    // ============================================
    // COMPTABILITÉ
    // ============================================
    {
      name: 'accounting-index',
      path: '/accounting',
      label: 'Comptabilité',
      icon: 'fad fa-calculator-alt',
      roles: [
        [{ code: 'ROLE_ADMIN' }],
        [{ code: 'ROLE_COMPTABLE' }]
      ],
      subMenus: [
        {
          name: 'accounting-operations',
          path: '/accounting/operations',
          label: 'Opérations',
          icon: 'fad fa-exchange-alt'
        },
        {
          name: 'accounting-accounts',
          path: '/accounting/accounts',
          label: 'Comptes',
          icon: 'fad fa-wallet'
        },
        {
          name: 'accounting-reports',
          path: '/accounting/reports',
          label: 'Rapports',
          icon: 'fad fa-chart-line'
        }
      ]
    }
  ]
  
  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  
  /**
   * Recherche récursive d'une route dans le menu par son nom
   */
  export function getMenu(routeName: string): MenuItem | null {
    function search(items: MenuItem[]): MenuItem | null {
      for (const item of items) {
        if (item.name === routeName) {
          return item
        }
        
        if (item.subMenus) {
          const found = search(item.subMenus)
          if (found) return found
        }
      }
      return null
    }
    
    return search(menus)
  }
  
  /**
   * Récupère tous les menus accessibles pour un utilisateur
   * selon ses rôles
   */
  export function getAccessibleMenus(userRoles: string[]): MenuItem[] {
    function filterMenus(items: MenuItem[]): MenuItem[] {
      return items.filter(item => {
        // Pas de restriction de rôles = accessible à tous
        if (!item.roles || item.roles.length === 0) {
          if (item.subMenus) {
            item.subMenus = filterMenus(item.subMenus)
          }
          return true
        }
        
        // Vérifier si l'utilisateur a au moins un des rôles requis (OR logic)
        const hasAccess = item.roles.some(roleGroup => 
          roleGroup.some(role => userRoles.includes(role.code))
        )
        
        if (hasAccess && item.subMenus) {
          item.subMenus = filterMenus(item.subMenus)
        }
        
        return hasAccess
      })
    }
    
    return filterMenus(JSON.parse(JSON.stringify(menus))) // Deep clone
  }
  
  export default menus