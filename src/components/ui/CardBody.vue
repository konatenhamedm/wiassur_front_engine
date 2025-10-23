<!-- @ts-ignore -->
<script lang="ts">
import { Component, Prop } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'CardBody'
})
export default class CardBody extends Vue {
  @Prop({ type: String, default: '' })
  padding!: string

  get bodyStyles() {
    if (this.padding) {
      return { padding: this.padding }
    }
    return {}
  }
}
</script>

<template>
  <div class="card-body" :style="bodyStyles">
    <slot></slot>
  </div>
</template>

<style scoped>
/* ============================================
   CARD BODY
   ============================================ */

.card-body {
  padding: 1.5rem;
  background-color: var(--surface);
  transition: background-color var(--transition-theme);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .card-body {
    padding: 1rem;
  }
}

/* ============================================
   DARK MODE
   ============================================ */

[data-theme="dark"] .card-body {
  background-color: var(--surface);
}
</style>
