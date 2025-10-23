<template>
  <div class="dashboard-content">
    <div class="container-fluid py-4">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="h2 mb-1">Tableau de bord</h1>
          <p class="text-muted">
            <span v-if="isAuthenticated && user">
              Bienvenue, <strong>{{ user.firstName || user.username }}</strong>
              <span v-if="tenant" class="ms-2">
                <i class="fas fa-building me-1"></i>{{ tenant.name }}
              </span>
            </span>
            <span v-else>Vue d'ensemble de votre activite</span>
          </p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="text-muted mb-1">Devis</p>
                  <h3 class="mb-0">--</h3>
                </div>
                <div class="icon-box bg-primary bg-opacity-10 text-primary">
                  <i class="fas fa-file-invoice"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="text-muted mb-1">Contrats</p>
                  <h3 class="mb-0">--</h3>
                </div>
                <div class="icon-box bg-success bg-opacity-10 text-success">
                  <i class="fas fa-file-contract"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="text-muted mb-1">Clients</p>
                  <h3 class="mb-0">--</h3>
                </div>
                <div class="icon-box bg-info bg-opacity-10 text-info">
                  <i class="fas fa-users"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="text-muted mb-1">CA du mois</p>
                  <h3 class="mb-0">--</h3>
                </div>
                <div class="icon-box bg-warning bg-opacity-10 text-warning">
                  <i class="fas fa-chart-line"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <h5 class="card-title mb-3">Actions rapides</h5>
              <div class="d-flex gap-2 flex-wrap">
                <button class="btn btn-primary">
                  <i class="fas fa-plus me-2"></i>
                  Nouveau devis
                </button>
                <button class="btn btn-outline-primary">
                  <i class="fas fa-user-plus me-2"></i>
                  Nouveau client
                </button>
                <button class="btn btn-outline-primary">
                  <i class="fas fa-file-invoice me-2"></i>
                  Voir les devis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Placeholder Info -->
      <div class="row">
        <div class="col-12">
          <div class="alert alert-info">
            <i class="fas fa-info-circle me-2"></i>
            <strong>Tableau de bord en développement</strong>
            <p class="mb-0 mt-2">
              Les statistiques et données seront affichées ici une fois les services API connectés.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Computed properties pour accéder aux infos de l'utilisateur connecté
const user = computed(() => authStore.user)
const tenant = computed(() => authStore.currentTenant)
const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>

<style scoped>
.icon-box {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-size: 1.5rem;
}

.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}
</style>
