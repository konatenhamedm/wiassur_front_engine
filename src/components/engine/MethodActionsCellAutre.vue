<!-- src/components/engine/MethodActionsCell.vue -->
<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import type { EngineMethod } from '@/types';

@Component({
  name: 'MethodActionsCell'
})
export default class MethodActionsCellAutre extends Vue {
  @Prop({ required: true }) method!: EngineMethod;
  
  declare $emit: (event: 'manageLines' | 'edit' | 'details') => void;

  onManageLines() {
    this.$emit('manageLines');
  }

  onEdit() {
    this.$emit('edit');
  }

  onDetails() {
    this.$emit('details');
  }
}
</script>

<template>
  <div class="btn-group btn-group-sm">
    <!-- Bouton Détails -->
    <button
      class="btn btn-outline-info"
      @click="onDetails"
      title="Voir les détails"
    >
      <i class="fas fa-eye"></i>
    </button>

    <!-- Bouton Édition -->
    <button
      class="btn btn-outline-primary"
      @click="onEdit"
      title="Éditer la méthode"
    >
      <i class="fas fa-edit"></i>
    </button>

    <!-- Bouton Gestion des lignes (uniquement pour les méthodes d'assureur) -->
    <button
      v-if="!method.isGlobal"
      class="btn btn-outline-warning"
      @click="onManageLines"
      title="Gérer les lignes"
    >
      <i class="fas fa-list-check"></i>
    </button>
  </div>
</template>

<style scoped>
.btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>