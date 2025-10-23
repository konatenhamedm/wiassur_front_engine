// Configuration Axios et intercepteurs
import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth'

/**
 * Crée une instance Axios configurée
 */
export function createApiClient(baseURL?: string): AxiosInstance {
  const client = axios.create({
    baseURL: baseURL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  // Intercepteur de requête pour ajouter le token
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const authStore = useAuthStore()

      // Vérifier si une API Key est disponible (pour accès moteur de calcul)
      const apiKey = (window as any).__API_KEY__
      if (apiKey) {
        config.headers['X-Api-Key'] = apiKey
      }

      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
      }

      if (authStore.currentTenantCode) {
        config.headers['X-Tenant-Code'] = authStore.currentTenantCode
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Intercepteur de réponse pour gérer les erreurs 401
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config

      // Si erreur 401 et pas déjà retry
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        const authStore = useAuthStore()

        try {
          // Tenter de rafraîchir le token
          await authStore.refreshAccessToken()
          // Réessayer la requête originale
          return client(originalRequest)
        } catch (refreshError) {
          // Échec du refresh, déconnecter l'utilisateur
          authStore.clearAuth()
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    }
  )

  return client
}

// Clients API pré-configurés
export const authClient = createApiClient(import.meta.env.VITE_AUTH_URL)
export const coreClient = createApiClient(import.meta.env.VITE_API_BASE_URL)
export const formClient = createApiClient(import.meta.env.VITE_FORM_URL)
export const crmClient = createApiClient(import.meta.env.VITE_CRM_URL)

// Export du client par défaut
export const apiClient = coreClient
