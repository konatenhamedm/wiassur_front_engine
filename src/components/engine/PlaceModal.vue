<!-- src/components/engine/PlaceModal.vue -->
<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import type { Place, Argument } from '@/types/engine';
import Button from '@/components/ui/Button.vue';

@Component({
  name: 'PlaceModal',
  components: {
    Button
  }
})
export default class PlaceModal extends Vue {
  @Prop() place?: Place | null;
  @Prop({ required: true }) arguments!: Argument[];
  @Prop({ required: true }) operators!: any[];

  public formData: any = {
    orderIndex: 1,
    argument: null,
    operator: null,
    literalValue: ''
  };

  declare $emit: (event: 'save' | 'close', ...args: any[]) => void;

  mounted() {
    if (this.place) {
      this.formData = {
        id: this.place.id,
        orderIndex: this.place.orderIndex,
        argument: this.place.argument ? (this.place.argument as any).id : null,
        operator: this.place.operator,
        literalValue: this.place.literalValue || ''
      };
    }
  }

  save() {
    this.$emit('save', this.formData);
  }

  close() {
    this.$emit('close');
  }
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
          <i class="fas fa-puzzle-piece me-2"></i>
          {{ place ? 'Modifier la place' : 'Nouvelle place' }}
        </h5>
        <button type="button" class="btn-close" @click="close"></button>
      </div>
      
      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label">Ordre</label>
          <input
            type="number"
            class="form-control"
            v-model.number="formData.orderIndex"
            min="1"
          >
        </div>

        <div class="mb-3">
          <label class="form-label">Argument</label>
          <select class="form-select" v-model="formData.argument">
            <option :value="null">Sélectionnez un argument</option>
            <option 
              v-for="arg in arguments" 
              :key="arg.id" 
              :value="arg.id"
            >
              {{ arg.name }} - {{ arg.label }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Opérateur</label>
          <select class="form-select" v-model="formData.operator">
            <option :value="null">Sélectionnez un opérateur</option>
            <option 
              v-for="op in operators" 
              :key="op.value" 
              :value="op.value"
            >
              {{ op.label }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Valeur littérale</label>
          <input
            type="text"
            class="form-control"
            v-model="formData.literalValue"
            placeholder="Valeur constante..."
          >
        </div>
      </div>

      <div class="modal-footer">
        <Button variant="secondary" @click="close">
          Annuler
        </Button>
        <Button variant="primary" @click="save">
          <i class="fas fa-save me-1"></i>
          Sauvegarder
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1060;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
}
</style>