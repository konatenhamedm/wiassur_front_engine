<script lang="ts">
import { Component, Prop } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";

@Component({
  name: "LoadingSpinner",
})
export default class LoadingSpinner extends Vue {
  @Prop({ default: "md" })
  size!: "sm" | "md" | "lg";

  @Prop({ default: false })
  overlay!: boolean;

  @Prop({ default: undefined })
  message?: string;

  get sizeClass() {
    const classes = {
      sm: "spinner-border-sm",
      md: "",
      lg: "spinner-border-lg",
    };
    return classes[this.size];
  }
}
</script>

<template>
  <div class="loading-spinner" :class="{ 'loading-overlay': overlay }">
    <div class="spinner-content">
      <div class="spinner-border" :class="sizeClass" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <p v-if="message" class="loading-message mt-2">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.spinner-content {
  text-align: center;
  color: var(--bs-primary);
}

.loading-overlay .spinner-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.loading-message {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}
</style>
