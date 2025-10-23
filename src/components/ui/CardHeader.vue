<!-- @ts-ignore -->
<script lang="ts">
import { Component, Prop } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'CardHeader'
})
export default class CardHeader extends Vue {
  @Prop({ type: String, default: '' })
  title!: string

  @Prop({ type: String, default: '' })
  subtitle!: string

  @Prop({ type: String, default: '' })
  icon!: string

  @Prop({ type: Boolean, default: false })
  bordered!: boolean

  @Prop({ type: String, default: '' })
  gradient!: string // 'primary', 'secondary', 'none'

  get hasTitle() {
    return this.title || this.$slots.title
  }

  get hasActions() {
    return this.$slots.actions
  }
}
</script>

<template>
  <div
    class="card-header"
    :class="{
      'card-header--bordered': bordered,
      'card-header--gradient-primary': gradient === 'primary',
      'card-header--gradient-secondary': gradient === 'secondary'
    }"
  >
    <div class="card-header__content">
      <!-- Title Section -->
      <div v-if="hasTitle" class="card-header__title-section">
        <slot name="title">
          <h2 class="card-header__title">
            <i v-if="icon" :class="['card-header__icon', icon]"></i>
            {{ title }}
          </h2>
          <p v-if="subtitle" class="card-header__subtitle">
            {{ subtitle }}
          </p>
        </slot>
      </div>

      <!-- Default Slot (for custom content) -->
      <slot></slot>
    </div>

    <!-- Actions Slot -->
    <div v-if="hasActions" class="card-header__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style scoped>
/* ============================================
   CARD HEADER
   ============================================ */

.card-header {
  padding: 1.5rem;
  background-color: transparent;
  transition: all var(--transition-theme);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.card-header--bordered {
  border-bottom: 1px solid var(--border-color);
}

.card-header--gradient-primary {
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.03) 0%, transparent 100%);
}

.card-header--gradient-secondary {
  background: linear-gradient(135deg, rgba(var(--secondary-rgb), 0.03) 0%, transparent 100%);
}

/* ============================================
   CONTENT
   ============================================ */

.card-header__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 200px;
}

.card-header__title-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-header__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color var(--transition-theme);
}

.card-header__icon {
  color: var(--primary);
  font-size: 1.25rem;
  transition: color var(--transition-base);
}

.card-header__subtitle {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
  transition: color var(--transition-theme);
}

/* ============================================
   ACTIONS
   ============================================ */

.card-header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  flex: 1;
  min-width: 300px;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 1200px) {
  .card-header__actions {
    min-width: unset;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    align-items: stretch;
  }

  .card-header__content {
    min-width: unset;
  }

  .card-header__actions {
    width: 100%;
    justify-content: stretch;
  }

  .card-header__title {
    font-size: 1.25rem;
  }
}

/* ============================================
   DARK MODE
   ============================================ */

[data-theme="dark"] .card-header--gradient-primary {
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.05) 0%, transparent 100%);
}

[data-theme="dark"] .card-header--gradient-secondary {
  background: linear-gradient(135deg, rgba(var(--secondary-rgb), 0.05) 0%, transparent 100%);
}
</style>
