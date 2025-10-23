declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<any, any, any>
  export = component
}

// Tous les composants manquants dans views/ utilisent PlaceholderView
declare module '@/views/*' {
  import PlaceholderView from '@/components/PlaceholderView.vue'
  export default PlaceholderView
}

// Types temporaires - à implémenter plus tard
declare module '@/types/auth' {
  export interface User {
    id: string
    uuid?: string
    email?: string
    username: string
    firstName?: string
    lastName?: string
    roles: string[]
    active?: boolean
    createdAt?: string
    updatedAt?: string
  }

  export interface Tenant {
    id?: string
    uuid?: string
    code: string
    name: string
    active?: boolean
  }

  export interface LoginCredentials {
    username: string
    password: string
  }

  export interface LoginResponse {
    user: User
    token: string
    refreshToken: string
    tenants?: Tenant[]
  }
}

// Services temporaires - à implémenter plus tard
declare module '@/services/api/auth' {
  import type { LoginCredentials, LoginResponse } from '@/types/auth'

  export const authApi: {
    login(credentials: LoginCredentials): Promise<LoginResponse>
    logout(): Promise<void>
    refresh(refreshToken: string): Promise<{ token: string }>
  }
}
