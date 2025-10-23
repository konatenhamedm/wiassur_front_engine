<!-- @ts-ignore -->
<script lang="ts">
import { Component, Prop } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'Button'
})
export default class Button extends Vue {
  @Prop({ type: String, default: 'primary' })
  variant!: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

  @Prop({ type: String, default: 'solid' })
  type!: 'solid' | 'outline' | 'ghost' | 'link'

  @Prop({ type: String, default: 'md' })
  size!: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  @Prop({ type: Boolean, default: false })
  disabled!: boolean

  @Prop({ type: Boolean, default: false })
  loading!: boolean

  @Prop({ type: Boolean, default: false })
  block!: boolean

  @Prop({ type: Boolean, default: false })
  rounded!: boolean

  @Prop({ type: String, default: '' })
  icon!: string

  @Prop({ type: String, default: '' })
  iconRight!: string

  @Prop({ type: String, default: 'button' })
  nativeType!: 'button' | 'submit' | 'reset'

  get buttonClasses() {
    return {
      [`btn--${this.variant}`]: true,
      [`btn--${this.type}`]: true,
      [`btn--${this.size}`]: true,
      'btn--block': this.block,
      'btn--rounded': this.rounded,
      'btn--loading': this.loading,
      'btn--icon-only': this.icon && !this.$slots.default && !this.iconRight
    }
  }

  get isDisabled() {
    return this.disabled || this.loading
  }

  handleClick(event: Event) {
    if (!this.isDisabled) {
      this.$emit('click', event)
    }
  }
}
</script>

<template>
  <button
    class="btn"
    :class="buttonClasses"
    :type="nativeType"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <span v-if="loading" class="btn__spinner">
      <span class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Chargement...</span>
      </span>
    </span>

    <!-- Left Icon -->
    <i v-if="icon && !loading" :class="['btn__icon', 'btn__icon--left', icon]"></i>

    <!-- Slot Content -->
    <span v-if="$slots.default" class="btn__content">
      <slot></slot>
    </span>

    <!-- Right Icon -->
    <i v-if="iconRight && !loading" :class="['btn__icon', 'btn__icon--right', iconRight]"></i>
  </button>
</template>

<style scoped>
/* ============================================
   BASE BUTTON
   ============================================ */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn--loading {
  pointer-events: none;
}

/* ============================================
   SIZES
   ============================================ */

.btn--xs {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: var(--radius-sm);
  gap: 0.25rem;
}

.btn--sm {
  padding: 0.4rem 0.75rem;
  font-size: 0.85rem;
  border-radius: var(--radius-md);
  gap: 0.35rem;
}

.btn--md {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: var(--radius-md);
}

.btn--lg {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: var(--radius-lg);
  gap: 0.6rem;
}

.btn--xl {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: var(--radius-lg);
  gap: 0.75rem;
}

/* Icon only button */
.btn--icon-only {
  padding: 0.5rem;
  aspect-ratio: 1;
}

.btn--icon-only.btn--xs {
  padding: 0.25rem;
}

.btn--icon-only.btn--sm {
  padding: 0.4rem;
}

.btn--icon-only.btn--lg {
  padding: 0.75rem;
}

.btn--icon-only.btn--xl {
  padding: 1rem;
}

/* ============================================
   BLOCK
   ============================================ */

.btn--block {
  display: flex;
  width: 100%;
}

/* ============================================
   ROUNDED
   ============================================ */

.btn--rounded {
  border-radius: 50px;
}

/* ============================================
   VARIANTS - SOLID
   ============================================ */

.btn--primary.btn--solid {
  background-color: var(--primary);
  border-color: var(--primary);
  color: white;
}

.btn--primary.btn--solid:hover:not(:disabled) {
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
}

.btn--secondary.btn--solid {
  background-color: var(--secondary);
  border-color: var(--secondary);
  color: white;
}

.btn--secondary.btn--solid:hover:not(:disabled) {
  background-color: var(--secondary-dark);
  border-color: var(--secondary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--secondary-rgb), 0.3);
}

.btn--success.btn--solid {
  background-color: var(--bs-success);
  border-color: var(--bs-success);
  color: white;
}

.btn--success.btn--solid:hover:not(:disabled) {
  background-color: #3cb371;
  border-color: #3cb371;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(80, 205, 137, 0.3);
}

.btn--danger.btn--solid {
  background-color: var(--bs-danger);
  border-color: var(--bs-danger);
  color: white;
}

.btn--danger.btn--solid:hover:not(:disabled) {
  background-color: #e91e63;
  border-color: #e91e63;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(241, 65, 108, 0.3);
}

.btn--warning.btn--solid {
  background-color: var(--bs-warning);
  border-color: var(--bs-warning);
  color: var(--text-primary);
}

.btn--warning.btn--solid:hover:not(:disabled) {
  background-color: #ffc947;
  border-color: #ffc947;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 209, 96, 0.3);
}

.btn--info.btn--solid {
  background-color: var(--bs-info);
  border-color: var(--bs-info);
  color: white;
}

.btn--info.btn--solid:hover:not(:disabled) {
  background-color: #9d4eed;
  border-color: #9d4eed;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(114, 57, 234, 0.3);
}

.btn--light.btn--solid {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

.btn--light.btn--solid:hover:not(:disabled) {
  background-color: var(--surface-hover);
  border-color: var(--primary);
}

.btn--dark.btn--solid {
  background-color: var(--text-primary);
  border-color: var(--text-primary);
  color: var(--bg-primary);
}

.btn--dark.btn--solid:hover:not(:disabled) {
  background-color: var(--text-secondary);
  border-color: var(--text-secondary);
  transform: translateY(-2px);
}

/* ============================================
   VARIANTS - OUTLINE
   ============================================ */

.btn--primary.btn--outline {
  background-color: transparent;
  border-color: var(--primary);
  color: var(--primary);
}

.btn--primary.btn--outline:hover:not(:disabled) {
  background-color: var(--primary);
  color: white;
}

.btn--secondary.btn--outline {
  background-color: transparent;
  border-color: var(--secondary);
  color: var(--secondary);
}

.btn--secondary.btn--outline:hover:not(:disabled) {
  background-color: var(--secondary);
  color: white;
}

.btn--success.btn--outline {
  background-color: transparent;
  border-color: var(--bs-success);
  color: var(--bs-success);
}

.btn--success.btn--outline:hover:not(:disabled) {
  background-color: var(--bs-success);
  color: white;
}

.btn--danger.btn--outline {
  background-color: transparent;
  border-color: var(--bs-danger);
  color: var(--bs-danger);
}

.btn--danger.btn--outline:hover:not(:disabled) {
  background-color: var(--bs-danger);
  color: white;
}

.btn--warning.btn--outline {
  background-color: transparent;
  border-color: var(--bs-warning);
  color: var(--bs-warning);
}

.btn--warning.btn--outline:hover:not(:disabled) {
  background-color: var(--bs-warning);
  color: var(--text-primary);
}

.btn--info.btn--outline {
  background-color: transparent;
  border-color: var(--bs-info);
  color: var(--bs-info);
}

.btn--info.btn--outline:hover:not(:disabled) {
  background-color: var(--bs-info);
  color: white;
}

.btn--light.btn--outline {
  background-color: transparent;
  border-color: var(--border-color);
  color: var(--text-primary);
}

.btn--light.btn--outline:hover:not(:disabled) {
  background-color: var(--bg-secondary);
}

.btn--dark.btn--outline {
  background-color: transparent;
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.btn--dark.btn--outline:hover:not(:disabled) {
  background-color: var(--text-primary);
  color: var(--bg-primary);
}

/* ============================================
   VARIANTS - GHOST
   ============================================ */

.btn--ghost {
  background-color: transparent;
  border-color: transparent;
}

.btn--primary.btn--ghost {
  color: var(--primary);
}

.btn--primary.btn--ghost:hover:not(:disabled) {
  background-color: rgba(var(--primary-rgb), 0.1);
}

.btn--secondary.btn--ghost {
  color: var(--secondary);
}

.btn--secondary.btn--ghost:hover:not(:disabled) {
  background-color: rgba(var(--secondary-rgb), 0.1);
}

.btn--success.btn--ghost {
  color: var(--bs-success);
}

.btn--success.btn--ghost:hover:not(:disabled) {
  background-color: rgba(80, 205, 137, 0.1);
}

.btn--danger.btn--ghost {
  color: var(--bs-danger);
}

.btn--danger.btn--ghost:hover:not(:disabled) {
  background-color: rgba(241, 65, 108, 0.1);
}

.btn--warning.btn--ghost {
  color: var(--bs-warning);
}

.btn--warning.btn--ghost:hover:not(:disabled) {
  background-color: rgba(255, 209, 96, 0.1);
}

.btn--info.btn--ghost {
  color: var(--bs-info);
}

.btn--info.btn--ghost:hover:not(:disabled) {
  background-color: rgba(114, 57, 234, 0.1);
}

.btn--light.btn--ghost {
  color: var(--text-secondary);
}

.btn--light.btn--ghost:hover:not(:disabled) {
  background-color: var(--bg-secondary);
}

.btn--dark.btn--ghost {
  color: var(--text-primary);
}

.btn--dark.btn--ghost:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0.05);
}

/* ============================================
   VARIANTS - LINK
   ============================================ */

.btn--link {
  background-color: transparent;
  border-color: transparent;
  text-decoration: underline;
  padding-left: 0;
  padding-right: 0;
}

.btn--primary.btn--link {
  color: var(--primary);
}

.btn--primary.btn--link:hover:not(:disabled) {
  color: var(--primary-dark);
}

.btn--secondary.btn--link {
  color: var(--secondary);
}

.btn--secondary.btn--link:hover:not(:disabled) {
  color: var(--secondary-dark);
}

/* ============================================
   LOADING STATE
   ============================================ */

.btn__spinner {
  display: inline-flex;
  align-items: center;
}

.btn--loading .btn__content {
  opacity: 0.7;
}

/* ============================================
   ICONS
   ============================================ */

.btn__icon {
  font-size: 0.9em;
  line-height: 1;
}

.btn__icon--left {
  margin-right: -0.25rem;
}

.btn__icon--right {
  margin-left: -0.25rem;
}

.btn--icon-only .btn__icon {
  margin: 0;
}

/* ============================================
   DARK MODE
   ============================================ */

[data-theme="dark"] .btn--light.btn--solid {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

[data-theme="dark"] .btn--dark.btn--solid {
  background-color: var(--text-primary);
  color: var(--bg-primary);
}
</style>
