// @ts-ignore
<script lang="ts">
import { Component, Prop, Inject } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'TabPane'
})
export default class TabPane extends Vue {
  @Prop({ required: true })
  value!: string

  @Prop({ default: false })
  lazy!: boolean

  // Inject from parent
  @Inject({ from: 'activeTab', default: null })
  activeTab!: any

  // Track if pane was ever shown (for lazy loading)
  hasBeenShown = false

  // Computed
  get isActive(): boolean {
    return this.activeTab === this.value
  }

  get wasShown(): boolean {
    if (!this.lazy) return true

    // Once shown, always keep rendered
    if (this.isActive) {
      this.hasBeenShown = true
    }

    return this.hasBeenShown
  }
}
</script>

<template>
  <div
    v-show="isActive"
    class="tab-pane fade"
    :class="{ 'show active': isActive }"
    role="tabpanel"
  >
    <div v-if="wasShown">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
/* Bootstrap fade + show/active classes handle everything */
</style>
