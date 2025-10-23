// Alias pour compatibilité avec les anciennes imports (@/store au lieu de @/stores)
import { useAuthStore } from '@/stores'

export * from '@/stores'

// Export default pour import store from '@/store'
export default {
  auth: useAuthStore
}
