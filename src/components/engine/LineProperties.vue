<!-- src/components/engine/LineProperties.vue -->
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';
import type { MethodLine } from '@/types/engine';
import Button from '@/components/ui/Button.vue';

@Component({
  name: 'LineProperties',
  components: {
    Button
  }
})
export default class LineProperties extends Vue {
  @Prop({ required: true }) line!: MethodLine;

  declare $emit: (event: 'update' | 'error', ...args: any[]) => void;

  // Copie locale pour éviter de modifier directement la prop
  public localLine: MethodLine = { ...this.line };

  get lineTypes() {
    return [
      { value: 'calculation', label: 'Calcul' },
      { value: 'condition', label: 'Condition' },
      { value: 'assignment', label: 'Assignation' }
    ];
  }

  @Watch('line', { immediate: true, deep: true })
  onLineChanged(newLine: MethodLine) {
    // Mettre à jour la copie locale quand la prop change
    this.localLine = { ...newLine };
  }

  @Watch('localLine', { deep: true })
  onLocalLineChanged() {
    // Émettre les changements quand la copie locale change
    this.$emit('update');
  }

  updateField(field: keyof MethodLine, value: any) {
    this.localLine[field] = value;
    this.$emit('update');
  }

  getLineTypeLabel(type: string) {
    const typeObj = this.lineTypes.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  }
}
</script>

<template>
  <div class="line-properties">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-1">Propriétés de la ligne</h5>
        <p class="text-muted mb-0">
          Configurez les paramètres généraux de cette ligne de méthode
        </p>
      </div>
      <div class="badge bg-primary">
        Ligne #{{ localLine.orderIndex }}
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-label">Type de ligne</label>
          <select 
            class="form-select" 
            v-model="localLine.lineType"
            @change="$emit('update')"
          >
            <option 
              v-for="type in lineTypes" 
              :key="type.value" 
              :value="type.value"
            >
              {{ type.label }}
            </option>
          </select>
          <div class="form-text">
            Définit le comportement de la ligne dans le calcul
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-label">Ordre d'exécution</label>
          <input
            type="number"
            class="form-control"
            v-model.number="localLine.orderIndex"
            @input="$emit('update')"
            min="1"
          >
          <div class="form-text">
            Détermine l'ordre dans lequel cette ligne sera exécutée
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-label">Variable de résultat</label>
          <input
            type="text"
            class="form-control"
            v-model="localLine.resultVariable"
            @input="$emit('update')"
            placeholder="Ex: resultat_calcul"
          >
          <div class="form-text">
            Nom de la variable qui stockera le résultat de cette ligne
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-label">Date de création</label>
          <input
            type="text"
            class="form-control"
            :value="new Date(localLine.createdAt).toLocaleString('fr-FR')"
            disabled
          >
          <div class="form-text">
            Date de création de cette ligne
          </div>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">
        Expression
        <span class="text-muted">(Formule de calcul ou condition)</span>
      </label>
      <textarea
        class="form-control font-monospace"
        v-model="localLine.expression"
        @input="$emit('update')"
        rows="6"
        placeholder="Entrez l'expression de calcul ou la condition..."
      ></textarea>
      <div class="form-text">
        Utilisez les variables disponibles, opérateurs et fonctions supportées.
        Exemple: <code>(prix_base * taux) + frais_fixes</code>
      </div>
    </div>

    <div class="mb-3" v-if="localLine.metadata && Object.keys(localLine.metadata).length > 0">
      <label class="form-label">Métadonnées</label>
      <pre class="bg-light p-3 rounded small json-view"><code>{{ JSON.stringify(localLine.metadata, null, 2) }}</code></pre>
      <div class="form-text">
        Informations supplémentaires stockées avec cette ligne
      </div>
    </div>

    <div class="alert alert-info mt-4">
      <i class="fas fa-info-circle me-2"></i>
      <strong>Informations sur les types de ligne :</strong>
      <ul class="mb-0 mt-2">
        <li><strong>Calcul :</strong> Exécute une opération mathématique ou logique</li>
        <li><strong>Condition :</strong> Détermine si une condition est vraie ou fausse</li>
        <li><strong>Assignation :</strong> Affecte une valeur à une variable</li>
      </ul>
    </div>

    <div class="alert alert-warning" v-if="localLine.lineType === 'condition'">
      <i class="fas fa-exclamation-triangle me-2"></i>
      <strong>Attention :</strong> Les lignes de condition doivent retourner une valeur booléenne (true/false).
      Utilisez les opérateurs de comparaison comme =, !=, >, <, etc.
    </div>
  </div>
</template>

<style scoped>
.line-properties {
  max-height: 100%;
  overflow-y: auto;
  padding: 1px; /* Pour éviter le débordement des bordures */
}

.font-monospace {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.4;
}

.json-view {
  max-height: 200px;
  overflow-y: auto;
  font-size: 0.8em;
  background-color: #f8f9fa !important;
  border: 1px solid #e9ecef;
}

.alert {
  border-left: 4px solid;
  font-size: 0.9em;
}

.alert-info {
  border-left-color: #0dcaf0;
  background-color: #d1ecf1;
}

.alert-warning {
  border-left-color: #ffc107;
  background-color: #fff3cd;
}

code {
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 3px;
  color: #d63384;
  font-family: 'Courier New', monospace;
  font-size: 0.85em;
}

.form-text {
  font-size: 0.8em;
  color: #6c757d;
}

.badge {
  font-size: 0.75em;
  padding: 0.5em 0.75em;
}

/* Styles pour améliorer l'apparence des formulaires */
.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}

.form-control, .form-select {
  border-radius: 0.375rem;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus, .form-select:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .line-properties {
    padding: 0.5rem;
  }
  
  .row {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }
  
  .col-md-6 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>