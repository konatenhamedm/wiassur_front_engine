import type { RouteRecordRaw } from 'vue-router'

const prefix = '/admin'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: `${prefix}/users`,
    name: 'admin-users',
    component: () => import('@/views/Admin/User/List.vue'),
    meta: { title: 'Utilisateurs' }
  },
  {
    path: `${prefix}/roles`,
    name: 'admin-roles',
    component: () => import('@/views/Admin/Role/List.vue'),
    meta: { title: 'Rôles & Permissions' }
  },
  {
    path: `${prefix}/tenants`,
    name: 'admin-tenants',
    component: () => import('@/views/Admin/Tenant/List.vue'),
    meta: { title: 'Tenants' }
  },
  {
    path: `${prefix}/menus`,
    name: 'admin-menus',
    component: () => import('@/views/Admin/Menu/Manager.vue'),
    meta: { title: 'Menus' }
  }
]

export default adminRoutes