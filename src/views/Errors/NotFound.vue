<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="error-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 text-center">
          <div class="error-icon mb-4">
            <i class="fas fa-search fa-5x text-warning"></i>
          </div>
          <h1 class="display-1 fw-bold text-warning">404</h1>
          <h2 class="mb-4">Page introuvable</h2>
          <p class="lead mb-4">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div class="d-flex gap-3 justify-content-center">
            <button @click="goBack" class="btn btn-outline-secondary">
              <i class="fas fa-arrow-left me-2"></i>
              Retour
            </button>
            <button @click="goHome" class="btn btn-primary">
              <i class="fas fa-home me-2"></i>
              Accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.error-icon {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.display-1 {
  font-size: 8rem;
  font-weight: 700;
}

.gap-3 {
  gap: 1rem;
}
</style>
