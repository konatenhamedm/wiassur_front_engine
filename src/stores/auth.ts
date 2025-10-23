import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, Tenant, LoginCredentials } from '@/types/auth'
import type { MenuRole } from '../router/Menu'
import { authApi } from '@/services/api/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const currentTenant = ref<Tenant | null>(null)
  const tenants = ref<Tenant[]>([])
  const isLoading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  
  const userRoles = computed(() => user.value?.roles || [])
  
  const currentTenantCode = computed(() => currentTenant.value?.code || null)

  // Actions
  function initializeAuth() {
    const storedToken = localStorage.getItem('userToken')
    const storedUser = localStorage.getItem('user')
    const storedTenant = localStorage.getItem('currentTenant')
    const storedTenants = localStorage.getItem('tenants')
    const storedRefreshToken = localStorage.getItem('userRefreshToken')

    if (storedToken) token.value = storedToken
    if (storedRefreshToken) refreshToken.value = storedRefreshToken
    if (storedUser) user.value = JSON.parse(storedUser)
    if (storedTenant) currentTenant.value = JSON.parse(storedTenant)
    if (storedTenants) tenants.value = JSON.parse(storedTenants)
  }

  async function login(credentials: LoginCredentials) {
    isLoading.value = true

    try {
      const response = await authApi.login(credentials)

      user.value = response.user
      token.value = response.token
      refreshToken.value = response.refreshToken

      if (response.tenants?.length) {
        tenants.value = response.tenants
        currentTenant.value = response.tenants[0]
      }

      persistAuth()

      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function authenticateWithApiKey(apiKey: string) {
    isLoading.value = true

    try {
      const response = await authApi.validateApiKey(apiKey)

      user.value = response.user
      token.value = response.token
      refreshToken.value = response.refreshToken

      if (response.tenants?.length) {
        tenants.value = response.tenants
        currentTenant.value = response.tenants[0]
      }

      // Persister en localStorage pour que l'authentification survive au rechargement
      persistAuth()

      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      if (token.value) {
        await authApi.logout()
      }
    } finally {
      clearAuth()
    }
  }

  async function refreshAccessToken() {
    if (!refreshToken.value) {
      throw new Error('No refresh token available')
    }

    try {
      const response = await authApi.refresh(refreshToken.value)
      token.value = response.token
      localStorage.setItem('userToken', response.token)
      return response.token
    } catch (error) {
      clearAuth()
      throw error
    }
  }

  function setTenant(tenant: Tenant) {
    currentTenant.value = tenant
    localStorage.setItem('currentTenant', JSON.stringify(tenant))
  }

  function hasRole(role: string): boolean {
    if (!user.value) return false
    
    // Check exact role
    if (userRoles.value.includes(role)) return true
    
    // Check tenant-specific role
    if (currentTenantCode.value) {
      const tenantRole = `${role}_${currentTenantCode.value}`
      if (userRoles.value.includes(tenantRole)) return true
    }
    
    return false
  }

  function hasAnyRole(roles: string[]): boolean {
    return roles.some(role => hasRole(role))
  }

  function hasAllRoles(roles: string[]): boolean {
    return roles.every(role => hasRole(role))
  }

  /**
   * Vérifie si l'utilisateur peut accéder à un menu selon sa logique de rôles
   * Format: [[ROLE_A], [ROLE_B]] = utilisateur doit avoir ROLE_A OU ROLE_B
   */
  function canAccessMenu(menuRoles: MenuRole[][]): boolean {
    if (!user.value) return false
    if (!menuRoles || menuRoles.length === 0) return true
    
    // OR logic: au moins un groupe de rôles doit matcher
    return menuRoles.some(roleGroup => 
      roleGroup.every(role => hasRole(role.code))
    )
  }

  function persistAuth() {
    if (user.value) localStorage.setItem('user', JSON.stringify(user.value))
    if (token.value) localStorage.setItem('userToken', token.value)
    if (refreshToken.value) localStorage.setItem('userRefreshToken', refreshToken.value)
    if (currentTenant.value) localStorage.setItem('currentTenant', JSON.stringify(currentTenant.value))
    if (tenants.value.length) localStorage.setItem('tenants', JSON.stringify(tenants.value))
  }

  function clearAuth() {
    user.value = null
    token.value = null
    refreshToken.value = null
    currentTenant.value = null
    tenants.value = []

    localStorage.removeItem('user')
    localStorage.removeItem('userToken')
    localStorage.removeItem('userRefreshToken')
    localStorage.removeItem('currentTenant')
    localStorage.removeItem('tenants')
  }

  return {
    // State
    user,
    token,
    refreshToken,
    currentTenant,
    tenants,
    isLoading,

    // Getters
    isAuthenticated,
    userRoles,
    currentTenantCode,

    // Actions
    initializeAuth,
    login,
    authenticateWithApiKey,
    logout,
    refreshAccessToken,
    setTenant,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    canAccessMenu,
    clearAuth,
    persistAuth
  }
})