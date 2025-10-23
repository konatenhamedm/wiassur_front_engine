// Export centralisé des services API
export { authApi } from './auth'
export { engineApi } from './engine'
export { incomeApi } from './income'
export { crmApi } from './crm'
export { apiClient, coreClient, authClient, formClient, crmClient, createApiClient } from './client'

// Export d'un objet 'api' pour compatibilité avec les anciennes imports
import { authApi } from './auth'
import { engineApi } from './engine'
import { incomeApi } from './income'
import { crmApi } from './crm'
import { coreClient } from './client'

export const api = {
  auth: authApi,
  engine: engineApi,
  income: incomeApi,
  crm: crmApi,
  // Méthodes legacy pour compatibilité
  get core() {
    return coreClient
  },
  get master() {
    return coreClient
  },
  async saveResponse(data: any) {
    return coreClient.post('/responses', data)
  }
}
