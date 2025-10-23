<!-- @ts-ignore -->
<script lang="ts">
import { Component, Prop } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'MethodsTableHeader'
})
export default class MethodsTableHeader extends Vue {
  @Prop({ type: String, required: true })
  searchValue!: string

  @Prop({ type: String, default: '' })
  placeholder!: string

  @Prop({ type: String, default: 'Créer' })
  createButtonLabel!: string

  @Prop({ type: Boolean, default: false })
  isCreating!: boolean

  onSearchInput(value: string) {
    this.$emit('search-input', value)
  }

  onCreateClick() {
    this.$emit('create-click')
  }
}
</script>

<template>
  <div class="methods-table-header">
    <div class="methods-table-header__search">
      <div class="methods-table-header__search-wrapper">
        <i class="fas fa-search methods-table-header__search-icon"></i>
        <input
          type="text"
          class="methods-table-header__search-input form-control"
          :value="searchValue"
          @input="onSearchInput(($event.target as HTMLInputElement).value)"
          :placeholder="placeholder"
        />
      </div>
    </div>

    <button
      class="btn btn-primary btn-sm methods-table-header__create-btn"
      @click="onCreateClick"
      :disabled="isCreating"
    >
      <i class="fas fa-plus me-2"></i>
      {{ createButtonLabel }}
    </button>
  </div>
</template>

<style scoped>
/* ============================================
   LAYOUT
   ============================================ */

.methods-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

/* ============================================
   SEARCH
   ============================================ */

.methods-table-header__search {
  flex: 1;
  min-width: 200px;
}

.methods-table-header__search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.methods-table-header__search-icon {
  position: absolute;
  left: 0.75rem;
  color: var(--text-secondary);
  pointer-events: none;
  font-size: 0.9rem;
}

.methods-table-header__search-input {
  padding-left: 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--surface);
  color: var(--text-primary);
  transition: all var(--transition-base);
}

.methods-table-header__search-input::placeholder {
  color: var(--text-muted);
}

.methods-table-header__search-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  background-color: var(--surface);
}

/* ============================================
   CREATE BUTTON
   ============================================ */

.methods-table-header__create-btn {
  background-color: var(--primary);
  border-color: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
  white-space: nowrap;
}

.methods-table-header__create-btn:hover:not(:disabled) {
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
}

.methods-table-header__create-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .methods-table-header {
    flex-direction: column;
    align-items: stretch;
  }

  .methods-table-header__search {
    min-width: unset;
    width: 100%;
  }

  .methods-table-header__create-btn {
    width: 100%;
    justify-content: center;
  }
}

/* ============================================
   DARK MODE
   ============================================ */

[data-theme="dark"] .methods-table-header__search-input {
  background-color: var(--surface);
  color: var(--text-primary);
}
</style>
