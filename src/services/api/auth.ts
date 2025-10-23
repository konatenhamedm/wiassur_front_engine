// API d'authentification
import type { LoginCredentials, LoginResponse, RefreshTokenResponse } from '@/types/auth'
import { authClient } from './client'

export const authApi = {
  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await authClient.post<LoginResponse>('/auth/login', credentials)
    return response.data
  },

  /**
   * Déconnexion utilisateur
   */
  async logout(): Promise<void> {
    await authClient.post('/auth/logout')
  },

  /**
   * Rafraîchissement du token
   */
  async refresh(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await authClient.post<RefreshTokenResponse>('/auth/refresh', {
      refreshToken
    })
    return response.data
  },

  /**
   * Récupérer les informations du profil actuel
   */
  async me(): Promise<any> {
    const response = await authClient.get('/auth/me')
    return response.data
  },

  /**
   * Mettre à jour le profil
   */
  async updateProfile(data: any): Promise<any> {
    const response = await authClient.put('/auth/profile', data)
    return response.data
  },

  /**
   * Changer le mot de passe
   */
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await authClient.post('/auth/change-password', {
      oldPassword,
      newPassword
    })
  },

  /**
   * Valider une clé API et obtenir un token
   */
  async validateApiKey(apiKey: string): Promise<LoginResponse> {
    const response = await authClient.post<LoginResponse>('/auth/manager/validate-api-key', {
      apiKey
    })
    return response.data
  }
}
