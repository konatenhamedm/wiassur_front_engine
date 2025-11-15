<!-- src/components/engine/MethodLinesManager.vue -->
<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import type { EngineMethod, MethodLine, Place, ConditionGroup, Condition, Argument } from '@/types/engine';
import Button from '@/components/ui/Button.vue';
import LineProperties from './LineProperties.vue';
import PlacesManagement from './PlacesManagement.vue';
import ConditionsManagement from './ConditionsManagement.vue';
import VersionsHistory from './VersionsHistory.vue';

@Component({
  name: 'MethodLinesManager',
  components: {
    Button,
    LineProperties,
    PlacesManagement,
    ConditionsManagement,
    VersionsHistory
  }
})
export default class MethodLinesManager extends Vue {
  @Prop({ required: true }) method!: EngineMethod;

  public isLoading = false;
  public methodLines: MethodLine[] = [];
  public selectedLine: MethodLine | null = null;
  public activeTab: string = 'properties';

  // Données pour les formulaires
  public places: Place[] = [];
  public conditionGroups: ConditionGroup[] = [];
  public arguments: Argument[] = [];
  
  public operators = [
    { value: '=', label: 'Égal (=)' },
    { value: '!=', label: 'Différent (!=)' },
    { value: '>', label: 'Supérieur (>)' },
    { value: '<', label: 'Inférieur (<)' },
    { value: '>=', label: 'Supérieur ou égal (>=)' },
    { value: '<=', label: 'Inférieur ou égal (<=)' },
    { value: 'AND', label: 'ET logique (AND)' },
    { value: 'OR', label: 'OU logique (OR)' },
    { value: '+', label: 'Addition (+)' },
    { value: '-', label: 'Soustraction (-)' },
    { value: '*', label: 'Multiplication (*)' },
    { value: '/', label: 'Division (/)' },
    { value: 'IN', label: 'Dans (IN)' },
    { value: 'NOT_IN', label: 'Pas dans (NOT IN)' }
  ];

  public isSaving = false;
  public hasChanges = false;

  async mounted() {
    await this.loadMethodLines();
    await this.loadArguments();
  }

  async loadMethodLines() {
    this.isLoading = true;
    try {
      const response = await fetch(`http://localhost:8000/api/methods/${this.method.id}/lines`);
      const res = await response.json();
      
      if (res.code === 200) {
        this.methodLines = res.data;
        this.methodLines.sort((a, b) => a.orderIndex - b.orderIndex);
        
        if (this.methodLines.length > 0) {
          this.selectedLine = this.methodLines[0];
          await this.loadLineDetails(this.methodLines[0].id);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des lignes:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async loadArguments() {
    try {
      const response = await fetch('http://localhost:8000/api/arguments');
      const res = await response.json();
      if (res.code === 200) {
        this.arguments = res.data;
      }
    } catch (error) {
      console.error('Erreur lors du chargement des arguments:', error);
    }
  }

  async loadLineDetails(lineId: number) {
    if (!lineId) return;
    
    await Promise.all([
      this.loadPlaces(lineId),
      this.loadConditionGroups(lineId)
    ]);
  }

  async loadPlaces(lineId: number) {
    try {
      const response = await fetch(`http://localhost:8000/api/lines/${lineId}/places`);
      const res = await response.json();
      if (res.code === 200) {
        this.places = res.data;
        this.places.sort((a, b) => a.orderIndex - b.orderIndex);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des places:', error);
    }
  }

  async loadConditionGroups(lineId: number) {
    try {
      const response = await fetch(`http://localhost:8000/api/lines/${lineId}/condition-groups`);
      const res = await response.json();
      if (res.code === 200) {
        this.conditionGroups = res.data;
        this.conditionGroups.sort((a, b) => a.orderIndex - b.orderIndex);
        
        for (const group of this.conditionGroups) {
          await this.loadConditions(group.id);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des groupes de conditions:', error);
    }
  }

  async loadConditions(groupId: number) {
    try {
      const response = await fetch(`http://localhost:8000/api/condition-groups/${groupId}/conditions`);
      const res = await response.json();
      if (res.code === 200) {
        const group = this.conditionGroups.find(g => g.id === groupId);
        if (group) {
          (group as any).conditions = res.data.sort((a: Condition, b: Condition) => a.orderIndex - b.orderIndex);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des conditions:', error);
    }
  }

  selectLine(line: MethodLine) {
    this.selectedLine = line;
    this.activeTab = 'properties';
    this.loadLineDetails(line.id);
  }

  async addNewLine() {
    try {
      const newLine = {
        method: this.method.id,
        orderIndex: this.methodLines.length + 1,
        lineType: 'calculation',
        expression: '',
        resultVariable: ''
      };

      const response = await fetch('http://localhost:8000/api/method-lines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLine)
      });

      const res = await response.json();
      if (res.code === 200 || res.code === 201) {
        this.methodLines.push(res.data);
        this.selectLine(res.data);
        this.hasChanges = true;
      }
    } catch (error) {
      console.error('Erreur lors de la création de la ligne:', error);
    }
  }

  async saveAllChanges() {
    this.isSaving = true;
    try {
      for (const line of this.methodLines) {
        await this.saveLine(line);
      }
      
      this.hasChanges = false;
      alert('Toutes les modifications ont été sauvegardées !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      this.isSaving = false;
    }
  }

  async saveLine(line: MethodLine) {
    try {
      const response = await fetch(`http://localhost:8000/api/method-lines/${line.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(line)
      });
      
      return await response.json();
    } catch (error) {
      console.error('Erreur sauvegarde ligne:', error);
      throw error;
    }
  }

  closeModal() {
    if (this.hasChanges) {
      if (confirm('Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?')) {
        this.$emit('close');
      }
    } else {
      this.$emit('close');
    }
  }
}
</script>

<template>
  <div class="modal-overlay fullscreen">
    <div class="modal-content fullscreen">
      <div class="modal-header bg-dark text-white">
        <div class="d-flex align-items-center">
          <i class="fas fa-list-check me-2"></i>
          <div>
            <h5 class="modal-title mb-0">Gestion des lignes de méthode</h5>
            <small class="text-light opacity-75">{{ method.name }} - {{ method.code }}</small>
          </div>
        </div>
        <button type="button" class="btn-close btn-close-white" @click="closeModal" :disabled="isSaving"></button>
      </div>
      
      <div class="modal-body">
        <div class="row h-100">
          <!-- Sidebar des lignes -->
          <div class="col-md-3 border-end bg-light">
            <div class="d-flex justify-content-between align-items-center mb-3 p-3 border-bottom">
              <h6 class="mb-0">Lignes de méthode</h6>
              <Button 
                variant="success"
                size="sm"
                icon="fas fa-plus"
                @click="addNewLine"
                :disabled="isLoading || isSaving"
                title="Ajouter une nouvelle ligne"
              />
            </div>
            
            <div class="lines-sidebar">
              <div v-if="isLoading" class="text-center py-3">
                <i class="fas fa-spinner fa-spin me-2"></i>
                Chargement...
              </div>
              
              <div v-else class="list-group list-group-flush">
                <button
                  v-for="(line, index) in methodLines"
                  :key="line.id"
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
                  :class="{ 
                    'active': selectedLine?.id === line.id,
                    'has-changes': hasChanges
                  }"
                  @click="selectLine(line)"
                  :disabled="isSaving"
                >
                  <div class="flex-grow-1">
                    <div class="fw-bold d-flex align-items-center">
                      <i class="fas fa-grip-lines text-muted me-2"></i>
                      Ligne {{ index + 1 }}
                    </div>
                    <div class="small text-muted mt-1">
                      <span class="badge bg-secondary me-1">#{{ line.orderIndex }}</span>
                      <span class="text-capitalize">{{ line.lineType }}</span>
                      <span v-if="line.resultVariable" class="d-block text-truncate">
                        → {{ line.resultVariable }}
                      </span>
                    </div>
                  </div>
                  <i v-if="selectedLine?.id === line.id" class="fas fa-chevron-right text-primary"></i>
                </button>
                
                <div v-if="methodLines.length === 0" class="text-center text-muted py-4">
                  <i class="fas fa-inbox fa-2x mb-3"></i>
                  <p class="mb-2">Aucune ligne configurée</p>
                  <Button 
                    variant="outline-primary"
                    size="sm"
                    @click="addNewLine"
                    :disabled="isSaving"
                  >
                    <i class="fas fa-plus me-1"></i>
                    Créer la première ligne
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Éditeur de ligne -->
          <div class="col-md-9 d-flex flex-column">
            <div v-if="!selectedLine" class="d-flex flex-column justify-content-center align-items-center text-muted py-5 flex-grow-1">
              <i class="fas fa-arrow-left fa-3x mb-3 opacity-50"></i>
              <h4>Sélectionnez une ligne</h4>
              <p class="text-center">Choisissez une ligne dans la liste de gauche <br>pour commencer l'édition</p>
            </div>
            
            <div v-else class="flex-grow-1 d-flex flex-column">
              <!-- Navigation par onglets -->
              <ul class="nav nav-tabs nav-tabs-line mb-0">
                <li class="nav-item">
                  <button
                    class="nav-link"
                    :class="{ 'active': activeTab === 'properties' }"
                    @click="activeTab = 'properties'"
                  >
                    <i class="fas fa-sliders-h me-2"></i>
                    Propriétés
                  </button>
                </li>
                <li class="nav-item">
                  <button
                    class="nav-link"
                    :class="{ 'active': activeTab === 'places' }"
                    @click="activeTab = 'places'"
                  >
                    <i class="fas fa-puzzle-piece me-2"></i>
                    Places
                    <span v-if="places.length > 0" class="badge bg-primary ms-1">{{ places.length }}</span>
                  </button>
                </li>
                <li class="nav-item">
                  <button
                    class="nav-link"
                    :class="{ 'active': activeTab === 'conditions' }"
                    @click="activeTab = 'conditions'"
                  >
                    <i class="fas fa-project-diagram me-2"></i>
                    Conditions
                    <span v-if="conditionGroups.length > 0" class="badge bg-primary ms-1">{{ conditionGroups.length }}</span>
                  </button>
                </li>
                <li class="nav-item">
                  <button
                    class="nav-link"
                    :class="{ 'active': activeTab === 'versions' }"
                    @click="activeTab = 'versions'"
                  >
                    <i class="fas fa-history me-2"></i>
                    Versions
                  </button>
                </li>
              </ul>
              
              <!-- Contenu des onglets -->
              <div class="tab-content flex-grow-1 border-start border-end border-bottom p-4">
                <!-- Propriétés -->
                <div v-if="activeTab === 'properties'" class="tab-pane fade show active h-100">
                  <LineProperties 
                    :line="selectedLine"
                    @update="hasChanges = true"
                  />
                </div>
                
                <!-- Places -->
                <div v-if="activeTab === 'places'" class="tab-pane fade show active h-100">
                  <PlacesManagement 
                    :places="places"
                    :arguments="arguments"
                    :operators="operators"
                    :lineId="selectedLine.id"
                    @update="hasChanges = true"
                    @refresh="loadPlaces(selectedLine.id)"
                  />
                </div>
                
                <!-- Conditions -->
                <div v-if="activeTab === 'conditions'" class="tab-pane fade show active h-100">
                  <ConditionsManagement
                    :conditionGroups="conditionGroups"
                    :arguments="arguments"
                    :operators="operators"
                    :lineId="selectedLine.id"
                    @update="hasChanges = true"
                    @refresh="loadConditionGroups(selectedLine.id)"
                  />
                </div>
                
                <!-- Versions -->
                <div v-if="activeTab === 'versions'" class="tab-pane fade show active h-100">
                  <VersionsHistory 
                    :lineId="selectedLine.id"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <div class="d-flex justify-content-between align-items-center w-100">
          <div class="text-muted small">
            <span v-if="hasChanges" class="text-warning">
              <i class="fas fa-exclamation-circle me-1"></i>
              Modifications non sauvegardées
            </span>
          </div>
          
          <div class="d-flex gap-2">
            <Button
              variant="secondary"
              @click="closeModal"
              :disabled="isSaving"
            >
              <i class="fas fa-times me-1"></i>
              Fermer
            </Button>
            
            <Button
              variant="primary"
              @click="saveAllChanges"
              :disabled="isSaving || !hasChanges"
              :loading="isSaving"
            >
              <i class="fas fa-save me-1"></i>
              {{ isSaving ? 'Sauvegarde...' : 'Sauvegarder tout' }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fullscreen {
  width: 100vw;
  height: 100vh;
  max-width: none;
  margin: 0;
}

.modal-overlay.fullscreen {
  align-items: stretch;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content.fullscreen {
  border-radius: 0;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
}

.modal-body {
  flex: 1;
  overflow: hidden;
  padding: 0;
}

.lines-sidebar {
  height: calc(100vh - 200px);
  overflow-y: auto;
}

.nav-tabs-line {
  border-bottom: 1px solid #dee2e6;
}

.nav-tabs-line .nav-link {
  border: none;
  border-bottom: 3px solid transparent;
  font-weight: 500;
  padding: 12px 20px;
  color: #6c757d;
}

.nav-tabs-line .nav-link.active {
  border-bottom-color: #0d6efd;
  color: #0d6efd;
  background: none;
  font-weight: 600;
}

.nav-tabs-line .nav-link:hover {
  border-bottom-color: #adb5bd;
  color: #495057;
}

.tab-content {
  min-height: 400px;
}

.list-group-item.has-changes {
  border-left: 3px solid #ffc107;
}

.list-group-item.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.bg-light {
  background-color: #f8f9fa !important;
}
</style>