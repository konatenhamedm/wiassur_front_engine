<!-- src/components/engine/MethodActionsCell.vue -->
<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import Button from '@/components/ui/Button.vue';

@Component({
  name: 'MethodActionsCell',
  components: {
    Button
  }
})
export default class MethodActionsCell extends Vue {
  @Prop({ required: true })
  method!: any;

  @Prop({ default: () => [] })
  insurers!: any[];

  @Prop({ default: false })
  showDuplicate!: boolean;

  // Événements pour le parent
  declare $emit: (event: 'editMethod' | 'updateMethod' | 'deleteMethod' | 'toggleDetails' | 'duplicateToInsurer' | 'manageLines' | 'detailsMethod', ...args: any[]) => void;

  goToEditor() {
    this.$emit('editMethod', this.method.id);
  }

  update() {
    this.$emit('updateMethod', this.method);
  }

  remove() {
    this.$emit('deleteMethod', this.method.id);
  }

  toggleDetails() {
    this.$emit('toggleDetails', this.method);
  }

  duplicateTo(insurerId: number) {
    this.$emit('duplicateToInsurer', this.method.id, insurerId);
  }

  showMethodDetails() {
    this.$emit('detailsMethod', this.method);
  }

  manageLines() {
    this.$emit('manageLines', this.method);
  }
}
</script>

<template>
  <div class="d-flex justify-content-end gap-1 align-items-center">
    <!-- Toggle details switch -->
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        :checked="method.showInDetails"
        @change="toggleDetails"
        title="Afficher dans les détails"
      />
    </div>

    <!-- Bouton Détails -->
    <Button
      variant="outline-info"
      size="sm"
      icon="fas fa-eye"
      @click="showMethodDetails"
      title="Voir les détails"
    />

    <!-- Bouton Édition -->
    <Button
      variant="outline-primary"
      size="sm"
      icon="fas fa-edit"
      @click="update"
      title="Modifier la méthode"
    />

    <!-- Bouton Gestion des lignes (uniquement pour méthodes d'assureur) -->
    <Button
      v-if="!method.isGlobal"
      variant="outline-warning"
      size="sm"
      icon="fas fa-list-check"
      @click="manageLines"
      title="Gérer les lignes de calcul"
    />

    <!-- Bouton Dupliquer (dropdown) -->
    <div v-if="showDuplicate && insurers.length > 0" class="dropdown">
      <button
        class="btn btn-sm btn-outline-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        title="Dupliquer vers un assureur"
      >
        <i class="fas fa-copy"></i>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li v-for="insurer in insurers" :key="insurer.id">
          <a
            class="dropdown-item"
            href="#"
            @click.prevent="duplicateTo(insurer.id)"
          >
            <i class="fas fa-building me-2"></i>
            {{ insurer.name }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Bouton Supprimer -->
    <Button
      variant="outline-danger"
      size="sm"
      icon="fas fa-trash"
      @click="remove"
      title="Supprimer la méthode"
    />

    <!-- Slot pour actions supplémentaires -->
    <slot name="extra-actions"></slot>
  </div>
</template>

<style scoped>
.form-check-input {
  cursor: pointer;
}

.dropdown-menu {
  min-width: 200px;
}

.btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>