<!-- src/components/engine/ConditionsManagement.vue -->
<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import type { ConditionGroup, Argument } from '@/types/engine';
import Button from '@/components/ui/Button.vue';

@Component({
  name: 'ConditionsManagement',
  components: {
    Button
  }
})
export default class ConditionsManagement extends Vue {
  @Prop({ required: true }) conditionGroups!: ConditionGroup[];
  @Prop({ required: true }) arguments!: Argument[];
  @Prop({ required: true }) operators!: any[];
  @Prop({ required: true }) lineId!: number;

  public expandedGroups: Set<number> = new Set();

  declare $emit: (event: 'update' | 'refresh' | 'error', ...args: any[]) => void;

  get sortedGroups() {
    return [...this.conditionGroups].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  toggleGroup(groupId: number) {
    if (this.expandedGroups.has(groupId)) {
      this.expandedGroups.delete(groupId);
    } else {
      this.expandedGroups.add(groupId);
    }
  }

  async addConditionGroup() {
    try {
      const newGroup = {
        line: this.lineId,
        logicOperator: 'AND',
        orderIndex: this.conditionGroups.length + 1
      };

      const response = await fetch('http://localhost:8000/api/condition-groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGroup)
      });

      const res = await response.json();
      
      if (res.code === 200 || res.code === 201) {
        this.$emit('refresh');
        this.$emit('update');
      } else {
        this.$emit('error', res.message || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Erreur création groupe:', error);
      this.$emit('error', 'Erreur réseau');
    }
  }

  async deleteConditionGroup(groupId: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce groupe de conditions ?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/condition-groups/${groupId}`, {
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
      console.error('Erreur suppression groupe:', error);
      this.$emit('error', 'Erreur réseau');
    }
  }

  getConditionCount(group: any) {
    return group.conditions ? group.conditions.length : 0;
  }

  getArgumentName(argumentId: number) {
    const arg = this.arguments.find(a => a.id === argumentId);
    return arg ? `${arg.name} (${arg.label})` : 'Argument inconnu';
  }
}
</script>

<template>
  <div class="conditions-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-1">Groupes de Conditions</h5>
        <p class="text-muted mb-0">
          Définissez les conditions d'exécution de la ligne
        </p>
      </div>
      <Button
        variant="primary"
        @click="addConditionGroup"
      >
        <i class="fas fa-plus me-2"></i>
        Nouveau Groupe
      </Button>
    </div>

    <div v-if="sortedGroups.length === 0" class="text-center py-5 text-muted">
      <i class="fas fa-project-diagram fa-3x mb-3"></i>
      <h5>Aucun groupe de conditions</h5>
      <p class="mb-4">Ajoutez des groupes pour définir les conditions d'exécution</p>
      <Button
        variant="primary"
        @click="addConditionGroup"
      >
        <i class="fas fa-plus me-2"></i>
        Créer un groupe
      </Button>
    </div>

    <div v-else class="condition-groups">
      <div 
        v-for="group in sortedGroups" 
        :key="group.id"
        class="card mb-3"
      >
        <div class="card-header bg-light">
          <div class="d-flex justify-content-between align-items-center">
            <button
              class="btn btn-link text-decoration-none text-dark fw-bold p-0"
              @click="toggleGroup(group.id)"
            >
              <i class="fas me-2" :class="expandedGroups.has(group.id) ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
              Groupe #{{ group.orderIndex }}
              <span class="badge bg-primary ms-2">{{ group.logicOperator }}</span>
              <span class="badge bg-secondary ms-1">{{ getConditionCount(group) }} conditions</span>
            </button>
            
            <div class="btn-group btn-group-sm">
              <Button
                variant="outline-primary"
                size="sm"
                icon="fas fa-plus"
                title="Ajouter une condition"
              />
              <Button
                variant="outline-danger"
                size="sm"
                icon="fas fa-trash"
                @click="deleteConditionGroup(group.id)"
                title="Supprimer le groupe"
              />
            </div>
          </div>
        </div>

        <div v-if="expandedGroups.has(group.id)" class="card-body">
          <div class="mb-3">
            <label class="form-label">Opérateur logique du groupe</label>
            <select class="form-select w-auto d-inline-block ms-2">
              <option value="AND" :selected="group.logicOperator === 'AND'">ET (AND)</option>
              <option value="OR" :selected="group.logicOperator === 'OR'">OU (OR)</option>
            </select>
          </div>

          <div v-if="getConditionCount(group) === 0" class="text-center py-3 text-muted">
            <i class="fas fa-filter fa-2x mb-2"></i>
            <p>Aucune condition dans ce groupe</p>
            <Button
              variant="outline-primary"
              size="sm"
            >
              <i class="fas fa-plus me-1"></i>
              Ajouter une condition
            </Button>
          </div>

          <div v-else class="table-responsive">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th width="80">Ordre</th>
                  <th>Argument gauche</th>
                  <th>Opérateur</th>
                  <th>Valeur droite</th>
                  <th width="100">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="condition in (group as any).conditions" :key="condition.id">
                  <td>
                    <span class="badge bg-secondary">{{ condition.orderIndex }}</span>
                  </td>
                  <td>
                    <span v-if="condition.leftArgument" class="fw-semibold">
                      {{ getArgumentName((condition.leftArgument as any).id) }}
                    </span>
                    <span v-else class="text-muted">-</span>
                  </td>
                  <td>
                    <code>{{ condition.operator }}</code>
                  </td>
                  <td>
                    <span class="font-monospace">{{ condition.rightValue || '-' }}</span>
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        icon="fas fa-edit"
                        title="Modifier"
                      />
                      <Button
                        variant="outline-danger"
                        size="sm"
                        icon="fas fa-trash"
                        title="Supprimer"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-info mt-4">
      <i class="fas fa-lightbulb me-2"></i>
      <strong>Astuce :</strong> Les groupes de conditions permettent de combiner plusieurs conditions avec des opérateurs logiques (ET/OU).
      Une ligne ne s'exécute que si toutes ses conditions sont satisfaites.
    </div>
  </div>
</template>

<style scoped>
.conditions-management {
  max-height: 100%;
  overflow-y: auto;
}

.condition-groups {
  max-height: 600px;
  overflow-y: auto;
}

.card-header {
  cursor: pointer;
}

.card-header:hover {
  background-color: #e9ecef !important;
}

.font-monospace {
  font-family: 'Courier New', monospace;
  font-size: 0.85em;
}

.btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
}
</style>