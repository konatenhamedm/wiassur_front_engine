// @ts-ignore
<script lang="ts">
import { Component, Prop } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'
import Button from '@/components/ui/Button.vue'

@Component({
  name: 'MethodActionsCell',
  components: {
    Button
  }
})
export default class MethodActionsCell extends Vue {
  @Prop({ required: true })
  method!: any

  @Prop({ default: () => [] })
  insurers!: any[]

  @Prop({ default: false })
  showDuplicate!: boolean

  goToEditor() {
    this.$emit('edit-method', this.method.id)
  }

  update() {
    this.$emit('update-method', this.method)
  }

  remove() {
    this.$emit('delete-method', this.method.id)
  }

  toggleDetails() {
    this.$emit('toggle-details', this.method)
  }

  duplicateTo(insurerId: number) {
    this.$emit('duplicate-to-insurer', this.method.id, insurerId)
  }
}
</script>

<template>
  <div class="d-flex justify-content-end gap-1 align-items-center">
    <!-- Toggle details switch -->
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        :checked="method.showInDetails"
        @change="toggleDetails"
        title="Afficher dans les détails"
      />
    </div>

    <!-- Editor button -->
    <Button
      variant="success"
      size="sm"
      icon="fas fa-code"
      @click="goToEditor"
      title="Éditeur"
    />

    <!-- Edit button -->
    <Button
      variant="primary"
      size="sm"
      icon="fas fa-edit"
      @click="update"
      title="Modifier"
    />

    <!-- Delete button -->
    <Button
      variant="danger"
      size="sm"
      icon="fas fa-trash"
      @click="remove"
      title="Supprimer"
    />

    <!-- Duplicate dropdown (for risk methods) -->
    <div v-if="showDuplicate && insurers.length > 0" class="dropdown">
      <button
        class="btn btn-sm btn-warning dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        <i class="fas fa-crosshairs"></i>
      </button>
      <ul class="dropdown-menu">
        <li v-for="insurer in insurers" :key="insurer.id">
          <a
            class="dropdown-item"
            href="#"
            @click.prevent="duplicateTo(insurer.id)"
          >
            {{ insurer.name }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Extra actions slot for dropdown, etc. -->
    <slot name="extra-actions"></slot>
  </div>
</template>
