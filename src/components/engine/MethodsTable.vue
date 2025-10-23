<!-- @ts-ignore -->
<script lang="ts">
import { Component, Prop } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

interface Method {
  id: number
  code: string
  label: string
  description: string
  type: 'global' | 'risk' | 'insurer'
  insurer?: { id: number; name: string; slug: string } | null
  showInDetails: boolean
  requirements: string[]
}

interface Insurer {
  id: number
  name: string
  slug: string
  logo?: string
}

@Component({
  name: 'MethodsTable'
})
export default class MethodsTable extends Vue {
  @Prop({ required: true })
  methods!: Method[]

  @Prop({ type: String, default: 'global' })
  type!: string

  @Prop({ type: Object, default: () => ({}) })
  insurers!: Record<number, Insurer>

  @Prop({ type: Boolean, default: false })
  isLoading!: boolean

  // Methods
  onMethodClick(methodId: number) {
    this.$emit('method-click', methodId)
  }

  onEditMethod(method: Method) {
    this.$emit('edit-method', method)
  }

  onDeleteMethod(methodId: number) {
    this.$emit('delete-method', methodId)
  }

  onToggleShowInDetails(method: Method) {
    this.$emit('toggle-show-details', method)
  }

  onDuplicateMethod(methodId: number, insurerId: number) {
    this.$emit('duplicate-method', { methodId, insurerId })
  }

  getInsurerName(insurerId: number): string {
    return this.insurers[insurerId]?.name || 'Unknown'
  }
}
</script>

<template>
  <div class="methods-table">
    <div class="methods-table__container table-responsive">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th class="methods-table__header-cell">
              <i class="fas fa-function me-2"></i>
              Calcul
            </th>
            <th class="methods-table__header-cell">Entrées</th>
            <th class="methods-table__header-cell text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="method in methods"
            :key="method.id"
            class="methods-table__row"
          >
            <!-- Method Info -->
            <td class="methods-table__cell">
              <div class="methods-table__method-info">
                <div class="methods-table__method-title">
                  <span class="badge bg-light-primary me-2">{{ method.id }}</span>
                  <strong>{{ method.label }}</strong>
                </div>
                <div class="methods-table__method-description">
                  {{ method.description }}
                </div>
                <div
                  v-if="method.code"
                  class="methods-table__method-code"
                >
                  <small class="text-muted">
                    <i class="fas fa-code me-1"></i>
                    {{ method.code }}
                  </small>
                </div>
              </div>
            </td>

            <!-- Requirements -->
            <td class="methods-table__cell">
              <div class="methods-table__requirements">
                <span
                  v-for="req in method.requirements"
                  :key="req"
                  class="badge bg-light-danger"
                  :title="req"
                >
                  {{ req }}
                </span>
              </div>
            </td>

            <!-- Actions -->
            <td class="methods-table__cell methods-table__cell--actions">
              <div class="methods-table__actions">
                <!-- Toggle Show in Details -->
                <div class="methods-table__action-item">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="`show-details-${method.id}`"
                      :checked="method.showInDetails"
                      @change="onToggleShowInDetails(method)"
                      title="Afficher dans les détails"
                    />
                    <label
                      class="form-check-label"
                      :for="`show-details-${method.id}`"
                    >
                      <span class="visually-hidden">Afficher dans les détails</span>
                    </label>
                  </div>
                </div>

                <!-- Editor Button -->
                <button
                  class="btn btn-sm btn-success methods-table__btn"
                  @click="onMethodClick(method.id)"
                  title="Ouvrir l'éditeur"
                >
                  <i class="fas fa-code"></i>
                  <span class="visually-hidden">Éditeur</span>
                </button>

                <!-- Edit Button -->
                <button
                  class="btn btn-sm btn-primary methods-table__btn"
                  @click="onEditMethod(method)"
                  title="Modifier"
                >
                  <i class="fas fa-edit"></i>
                  <span class="visually-hidden">Modifier</span>
                </button>

                <!-- Delete Button -->
                <button
                  class="btn btn-sm btn-danger methods-table__btn"
                  @click="onDeleteMethod(method.id)"
                  title="Supprimer"
                >
                  <i class="fas fa-trash"></i>
                  <span class="visually-hidden">Supprimer</span>
                </button>

                <!-- Duplicate Insurer Dropdown (for risk methods only) -->
                <div
                  v-if="type === 'risk' && Object.keys(insurers).length > 0"
                  class="dropdown"
                >
                  <button
                    class="btn btn-sm btn-warning dropdown-toggle methods-table__btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    title="Dupliquer pour assureur"
                  >
                    <i class="fas fa-crosshairs"></i>
                    <span class="visually-hidden">Dupliquer pour assureur</span>
                  </button>
                  <ul class="dropdown-menu">
                    <li
                      v-for="(insurer, insurerId) in insurers"
                      :key="insurerId"
                    >
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="onDuplicateMethod(method.id, Number(insurerId))"
                      >
                        {{ insurer.name }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="methods.length === 0">
            <td colspan="3" class="methods-table__empty">
              <div class="methods-table__empty-content">
                <i class="fas fa-inbox"></i>
                <p>Aucune méthode trouvée</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="methods-table__loading">
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================================
   TABLE STRUCTURE
   ============================================ */

.methods-table {
  position: relative;
  width: 100%;
}

.methods-table__container {
  border-radius: var(--radius-md);
  overflow: hidden;
}

.methods-table__row {
  transition: all var(--transition-fast);
}

.methods-table__row:hover {
  background-color: var(--surface-hover);
}

/* ============================================
   TABLE CELLS
   ============================================ */

.methods-table__header-cell {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  padding: 1rem 1.25rem;
  transition: all var(--transition-theme);
}

.methods-table__cell {
  border-color: var(--border-color);
  padding: 1rem 1.25rem;
  color: var(--text-primary);
  transition: all var(--transition-theme);
}

.methods-table__cell--actions {
  text-align: end;
}

/* ============================================
   METHOD INFO
   ============================================ */

.methods-table__method-info {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.methods-table__method-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.methods-table__method-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: color var(--transition-theme);
}

.methods-table__method-code {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
}

/* ============================================
   REQUIREMENTS
   ============================================ */

.methods-table__requirements {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.methods-table__requirements .badge {
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: all var(--transition-base);
}

.methods-table__requirements .badge:hover {
  transform: translateY(-2px);
}

/* ============================================
   ACTIONS
   ============================================ */

.methods-table__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.methods-table__action-item {
  display: flex;
  align-items: center;
}

.methods-table__btn {
  transition: all var(--transition-base);
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
}

.methods-table__btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

/* ============================================
   EMPTY STATE
   ============================================ */

.methods-table__empty {
  text-align: center;
  padding: 3rem 1.5rem !important;
}

.methods-table__empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--text-secondary);
}

.methods-table__empty-content i {
  font-size: 2.5rem;
  opacity: 0.5;
}

.methods-table__empty-content p {
  margin: 0;
  font-size: 1.1rem;
}

/* ============================================
   LOADING STATE
   ============================================ */

.methods-table__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: var(--text-secondary);
}

/* ============================================
   FORM ELEMENTS
   ============================================ */

.form-check {
  margin: 0;
}

.form-check-input {
  cursor: pointer;
  transition: all var(--transition-base);
}

.form-check-input:checked {
  background-color: var(--primary);
  border-color: var(--primary);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .methods-table__cell {
    padding: 0.75rem;
  }

  .methods-table__header-cell {
    padding: 0.75rem;
    font-size: 0.75rem;
  }

  .methods-table__method-description,
  .methods-table__method-code {
    display: none;
  }

  .methods-table__actions {
    gap: 0.25rem;
  }

  .methods-table__btn {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .methods-table__actions {
    flex-direction: column;
  }

  .methods-table__btn {
    width: 100%;
  }
}

/* ============================================
   DARK MODE
   ============================================ */

[data-theme="dark"] .methods-table__requirements .badge {
  background-color: rgba(241, 65, 108, 0.15);
}
</style>
