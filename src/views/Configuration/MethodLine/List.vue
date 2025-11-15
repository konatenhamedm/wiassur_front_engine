<template>
  <div class="container-fluid p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center gap-3">
        <button
          class="btn btn-light rounded-circle shadow-sm"
          style="width: 45px; height: 45px"
          @click="$router.go(-1)"
        >
          <i class="fas fa-arrow-left"></i>
        </button>
        <div>
          <h3 class="mb-0 fw-bold">
            <i class="fas fa-list-alt text-primary me-2"></i>
            Lignes de la méthode
          </h3>
          <p class="text-muted mb-0 small">
            Gestion des lignes pour la méthode: <strong>{{ methodName }}</strong>
          </p>
        </div>
      </div>
    </div>

    <!-- Contenu de la liste des lignes -->
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <p>Ici vous allez lister les lignes de la méthode.</p>
        <!-- Vous pouvez ajouter un tableau ou une grille pour afficher les lignes -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  name: 'MethodLinesList'
})
export default class MethodLinesList extends Vue {
  declare $route: any;

  public methodName: string = '';

  mounted() {
    // Récupérer l'ID de la méthode depuis les paramètres de route
    const methodId = this.$route.params.methodId;
    // Ici, vous pouvez appeler une API pour récupérer les détails de la méthode et ses lignes
    // Pour l'instant, on affiche juste l'ID
    this.methodName = `Méthode #${methodId}`;
  }
}
</script>

<style scoped>
/* Styles si nécessaires */
</style>