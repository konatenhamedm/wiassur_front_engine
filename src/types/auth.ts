// Types d'authentification et autorisation

export interface User {
  id: string
  uuid: string
  email: string
  username: string
  firstName?: string
  lastName?: string
  roles: string[]
  active: boolean
  createdAt?: string
  updatedAt?: string
  phone?: string
  avatar?: string
}

export interface Tenant {
  id: string
  uuid: string
  code: string
  name: string
  active: boolean
  description?: string
  logo?: string
  settings?: Record<string, any>
}

export interface LoginCredentials {
  username: string
  password: string
  tenantCode?: string
}

export interface LoginResponse {
  user: User
  token: string
  refreshToken: string
  tenants?: Tenant[]
  expiresIn?: number
}

export interface RefreshTokenResponse {
  token: string
  expiresIn?: number
}

export interface Role {
  id: string
  uuid: string
  code: string
  name: string
  description?: string
  permissions?: Permission[]
}

export interface Permission {
  id: string
  code: string
  name: string
  resource?: string
  action?: string
}
