<!-- src/components/engine/PlacesManagement.vue -->
<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import type { Place, Argument } from '@/types/engine';
import Button from '@/components/ui/Button.vue';

@Component({
  name: 'PlacesManagement',
  components: {
    Button
  }
})
export default class PlacesManagement extends Vue {
  @Prop({ required: true }) places!: Place[];
  @Prop({ required: true }) arguments!: Argument[];
  @Prop({ required: true }) operators!: any[];
  @Prop({ required: true }) lineId!: number;

  public showPlaceModal = false;
  public editingPlace: Place | null = null;
  public localPlaces: Place[] = [];

  declare $emit: (event: 'update' | 'refresh' | 'error', ...args: any[]) => void;

  mounted() {
    this.localPlaces = [...this.places];
  }

  get sortedPlaces() {
    return [...this.localPlaces].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  openAddPlace() {
    this.editingPlace = null;
    this.showPlaceModal = true;
  }

  openEditPlace(place: Place) {
    this.editingPlace = { ...place };
    this.showPlaceModal = true;
  }

  async savePlace(placeData: any) {
    try {
      const url = placeData.id 
        ? `http://localhost:8000/api/places/${placeData.id}`
        : 'http://localhost:8000/api/places';
      
      const method = placeData.id ? 'PUT' : 'POST';
      
      const payload = {
        ...placeData,
        line: this.lineId
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const res = await response.json();
      
      if (res.code === 200 || res.code === 201) {
        this.showPlaceModal = false;
        this.$emit('refresh');
        this.$emit('update');
      } else {
        this.$emit('error', res.message || 'Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur sauvegarde place:', error);
      this.$emit('error', 'Erreur réseau');
    }
  }

  async deletePlace(placeId: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette place ?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/places/${placeId}`, {
        method: 'DELETE'
      });

      const res = await response.json();
      
      if (res.code === 200) {
        this.$emit('refresh');
        this.$emit('update');
      } else {
        this.$emit('error', res.message || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur suppression place:', error);
      this.$emit('error', 'Erreur réseau');
    }
  }

  getArgumentName(argumentId: number) {
    const arg = this.arguments.find(a => a.id === argumentId);
    return arg ? `${arg.name} (${arg.label})` : 'Argument inconnu';
  }
}
</script>

<template>
  <div class="places-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-1">Gestion des Places</h5>
        <p class="text-muted mb-0">
          Définissez les arguments et opérateurs utilisés dans les expressions
        </p>
      </div>
      <Button
        variant="primary"
        @click="openAddPlace"
      >
        <i class="fas fa-plus me-2"></i>
        Nouvelle Place
      </Button>
    </div>

    <div v-if="sortedPlaces.length === 0" class="text-center py-5 text-muted">
      <i class="fas fa-puzzle-piece fa-3x mb-3"></i>
      <h5>Aucune place configurée</h5>
      <p class="mb-4">Commencez par ajouter des places pour construire vos expressions</p>
      <Button
        variant="primary"
        @click="openAddPlace"
      >
        <i class="fas fa-plus me-2"></i>
        Ajouter la première place
      </Button>
    </div>

    <div v-else class="table-responsive">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th width="80">Ordre</th>
            <th>Argument</th>
            <th>Opérateur</th>
            <th>Valeur littérale</th>
            <th width="120">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="place in sortedPlaces" :key="place.id">
            <td>
              <span class="badge bg-secondary">{{ place.orderIndex }}</span>
            </td>
            <td>
              <span v-if="place.argument" class="fw-semibold">
                {{ getArgumentName((place.argument as any).id) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td>
              <code v-if="place.operator">{{ place.operator }}</code>
              <span v-else class="text-muted">-</span>
            </td>
            <td>
              <span v-if="place.literalValue" class="font-monospace">
                {{ place.literalValue }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <Button
                  variant="outline-primary"
                  size="sm"
                  icon="fas fa-edit"
                  @click="openEditPlace(place)"
                  title="Modifier"
                />
                <Button
                  variant="outline-danger"
                  size="sm"
                  icon="fas fa-trash"
                  @click="deletePlace(place.id)"
                  title="Supprimer"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modale d'édition de place -->
    <PlaceModal
      v-if="showPlaceModal"
      :place="editingPlace"
      :arguments="arguments"
      :operators="operators"
      @save="savePlace"
      @close="showPlaceModal = false"
    />
  </div>
</template>

<style scoped>
.places-management {
  max-height: 100%;
  overflow-y: auto;
}

.table {
  font-size: 0.9em;
}

.font-monospace {
  font-family: 'Courier New', monospace;
  font-size: 0.85em;
}

.btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
}
</style>