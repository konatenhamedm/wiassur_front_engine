<!-- @ts-ignore -->
<script lang="ts">
import { Component, Prop } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'StatCard'
})
export default class StatCard extends Vue {
  @Prop({ type: String, required: true })
  title!: string

  @Prop({ type: [String, Number], required: true })
  value!: string | number

  @Prop({ type: String, default: '' })
  icon!: string

  @Prop({ type: String, default: 'primary' })
  color!: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'

  @Prop({ type: String, default: '' })
  trend!: string // '+12%', '-5%', etc.

  @Prop({ type: Boolean, default: false })
  loading!: boolean

  get cardClasses() {
    return `stat-card--${this.color}`
  }

  get trendClasses() {
    if (!this.trend) return ''

    const isPositive = this.trend.startsWith('+')
    return {
      'stat-card__trend--positive': isPositive,
      'stat-card__trend--negative': !isPositive
    }
  }
}
</script>

<template>
  <div class="stat-card" :class="cardClasses">
    <!-- Loading State -->
    <div v-if="loading" class="stat-card__loading">
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="stat-card__content">
      <!-- Icon -->
      <div v-if="icon" class="stat-card__icon-wrapper">
        <i :class="['stat-card__icon', icon]"></i>
      </div>

      <!-- Stats -->
      <div class="stat-card__stats">
        <div class="stat-card__header">
          <h3 class="stat-card__title">{{ title }}</h3>
          <span v-if="trend" class="stat-card__trend" :class="trendClasses">
            {{ trend }}
          </span>
        </div>
        <p class="stat-card__value">{{ value }}</p>
      </div>
    </div>

    <!-- Footer Slot -->
    <div v-if="$slots.footer" class="stat-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
/* ============================================
   BASE STAT CARD
   ============================================ */

.stat-card {
  background-color: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* ============================================
   LOADING STATE
   ============================================ */

.stat-card__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
  color: var(--text-secondary);
}

/* ============================================
   CONTENT
   ============================================ */

.stat-card__content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.stat-card__icon-wrapper {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--transition-base);
}

.stat-card__icon {
  font-size: 1.75rem;
  color: white;
}

.stat-card__stats {
  flex: 1;
  min-width: 0;
}

.stat-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stat-card__title {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color var(--transition-theme);
}

.stat-card__value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
  transition: color var(--transition-theme);
}

.stat-card__trend {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-card__trend--positive {
  background-color: rgba(80, 205, 137, 0.1);
  color: var(--bs-success);
}

.stat-card__trend--positive::before {
  content: '↑';
}

.stat-card__trend--negative {
  background-color: rgba(241, 65, 108, 0.1);
  color: var(--bs-danger);
}

.stat-card__trend--negative::before {
  content: '↓';
}

/* ============================================
   FOOTER
   ============================================ */

.stat-card__footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* ============================================
   COLOR VARIANTS
   ============================================ */

.stat-card--primary .stat-card__icon-wrapper {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
}

.stat-card--primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
}

.stat-card--secondary .stat-card__icon-wrapper {
  background: linear-gradient(135deg, var(--secondary) 0%, var(--secondary-light) 100%);
}

.stat-card--secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--secondary) 0%, var(--secondary-light) 100%);
}

.stat-card--success .stat-card__icon-wrapper {
  background: linear-gradient(135deg, var(--bs-success) 0%, #3cb371 100%);
}

.stat-card--success::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--bs-success) 0%, #3cb371 100%);
}

.stat-card--danger .stat-card__icon-wrapper {
  background: linear-gradient(135deg, var(--bs-danger) 0%, #e91e63 100%);
}

.stat-card--danger::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--bs-danger) 0%, #e91e63 100%);
}

.stat-card--warning .stat-card__icon-wrapper {
  background: linear-gradient(135deg, var(--bs-warning) 0%, #ffc947 100%);
}

.stat-card--warning::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--bs-warning) 0%, #ffc947 100%);
}

.stat-card--info .stat-card__icon-wrapper {
  background: linear-gradient(135deg, var(--bs-info) 0%, #9d4eed 100%);
}

.stat-card--info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--bs-info) 0%, #9d4eed 100%);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .stat-card {
    padding: 1rem;
  }

  .stat-card__icon-wrapper {
    width: 3rem;
    height: 3rem;
  }

  .stat-card__icon {
    font-size: 1.5rem;
  }

  .stat-card__value {
    font-size: 1.75rem;
  }

  .stat-card__title {
    font-size: 0.8rem;
  }
}

/* ============================================
   DARK MODE
   ============================================ */

[data-theme="dark"] .stat-card {
  background-color: var(--surface);
  border-color: var(--border-color);
}
</style>
