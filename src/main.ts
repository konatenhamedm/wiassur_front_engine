import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Bootstrap Vue Next
import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

// Global Styles
import './assets/styles/main.css'

// Create Vue App
const app = createApp(App)

// Pinia Store
const pinia = createPinia()
app.use(pinia)

// Initialize Auth Store (pour restaurer l'authentification depuis localStorage)
const authStore = useAuthStore()
authStore.initializeAuth()

// Router
app.use(router)

// Bootstrap Vue
app.use(createBootstrap())

// Global Error Handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.error('Component:', instance)
  console.error('Info:', info)
}

// Performance monitoring (dev only)
if (import.meta.env.DEV) {
  app.config.performance = true
}

// Mount App
app.mount('#app')

// Hot Module Replacement
if (import.meta.env.DEV && import.meta.hot) {
  import.meta.hot.accept()
}