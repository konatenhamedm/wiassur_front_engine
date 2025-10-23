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
            <i class="fas fa-ban fa-5x text-danger"></i>
          </div>
          <h1 class="display-1 fw-bold text-danger">403</h1>
          <h2 class="mb-4">Accès non autorisé</h2>
          <p class="lead mb-4">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.error-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
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
