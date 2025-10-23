// @ts-ignore
<script lang="ts">
import { Component, Prop, Provide, Watch } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'Tabs'
})
export default class Tabs extends Vue {
  @Prop({ default: '' })
  modelValue!: string

  @Prop({ default: 'default' })
  variant!: 'default' | 'pills' | 'underline'

  @Prop({ default: 'md' })
  size!: 'sm' | 'md' | 'lg'

  @Prop({ default: false })
  justified!: boolean

  // State - reactive data property
  activeTab = ''

  // Provide to children
  @Provide('activeTab')
  get providedActiveTab() {
    return this.activeTab
  }

  @Provide('setActiveTab')
  get providedSetActiveTab() {
    return this.setActiveTab.bind(this)
  }

  @Provide('variant')
  get providedVariant() {
    return this.variant
  }

  @Provide('size')
  get providedSize() {
    return this.size
  }

  // Computed
  get tabsClasses(): object {
    return {
      [`tabs--${this.size}`]: true
    }
  }

  get navClasses(): object {
    return {
      'nav-tabs': this.variant === 'default',
      'nav-pills': this.variant === 'pills',
      'nav-underline': this.variant === 'underline',
      'nav-justified': this.justified,
      'mb-4': true
    }
  }

  // Watch modelValue changes from parent
  @Watch('modelValue')
  onModelValueChange(newVal: string) {
    this.activeTab = newVal
  }

  // Methods
  setActiveTab(value: string): void {
    this.activeTab = value
    this.$emit('update:modelValue', value)
    this.$emit('change', value)
  }

  mounted() {
    // Initialize activeTab with modelValue
    this.activeTab = this.modelValue
  }
}
</script>

<template>
  <div class="tabs" :class="tabsClasses">
    <ul class="nav" :class="navClasses" role="tablist">
      <slot name="nav"></slot>
    </ul>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
/* ============================================
   TABS - Enhanced design with animations
   ============================================ */

.tabs {
  position: relative;
}

.tabs :deep(.nav) {
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 0.5rem;
  gap: 0.5rem;
  transition: border-color var(--transition-theme);
  background-color: var(--bg-primary);
  padding: 1rem;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

/* Tab content with animation */
.tabs :deep(.tab-content) {
  background-color: var(--surface);
  transition: background-color var(--transition-theme);
  padding: 1.5rem;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  border: 1px solid var(--border-color);
  border-top: none;
}

.tabs :deep(.tab-pane) {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Size variants - Button component handles most sizing */
.tabs--sm :deep(.button) {
  font-size: 0.875rem;
}

.tabs--lg :deep(.button) {
  font-size: 1.05rem;
}

/* Responsive */
@media (max-width: 768px) {
  .tabs :deep(.nav) {
    padding: 0.75rem;
    gap: 0.25rem;
    flex-wrap: wrap;
  }

  .tabs :deep(.tab-content) {
    padding: 1rem;
  }
}
</style>
