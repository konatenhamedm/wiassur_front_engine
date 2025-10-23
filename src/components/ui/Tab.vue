<script lang="ts">
import { Component, Prop, Inject } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";
import Button from "./Button.vue";

@Component({
  name: "Tab",
  components: {
    Button,
  },
})
export default class Tab extends Vue {
  @Prop({ required: true })
  value!: string;

  @Prop({ required: true })
  label!: string;

  @Prop({ default: undefined })
  icon?: string;

  @Prop({ default: false })
  disabled!: boolean;

  @Prop({ default: undefined })
  badge?: string | number;

  // Inject from parent
  @Inject({ from: "activeTab", default: null })
  activeTab!: any;

  @Inject({ from: "setActiveTab", default: null })
  setActiveTab!: any;

  @Inject({ from: "variant", default: "default" })
  variant!: string;

  @Inject({ from: "size", default: "md" })
  size!: string;

  // Computed
  get isActive(): boolean {
    return this.activeTab === this.value;
  }

  get buttonVariant(): "primary" | "secondary" | "light" {
    if (this.isActive) return "primary";
    return "light";
  }

  get buttonType(): "solid" | "outline" | "ghost" {
    if (this.variant === "pills") {
      return this.isActive ? "solid" : "outline";
    }
    return "ghost";
  }

  get buttonSize(): "xs" | "sm" | "md" | "lg" {
    if (this.size === "sm") return "sm";
    if (this.size === "lg") return "lg";
    return "md";
  }

  get tabClasses(): string {
    return this.isActive ? "tab--active" : "";
  }

  get badgeClass(): string {
    return this.isActive ? "bg-light text-primary" : "bg-secondary";
  }

  // Methods
  handleClick(): void {
    if (!this.disabled && this.setActiveTab) {
      this.setActiveTab(this.value);
    }
  }
}
</script>

<template>
  <li class="nav-item tab-wrapper" role="presentation" :class="tabClasses">
    <Button
      :variant="buttonVariant"
      :type="buttonType"
      :size="buttonSize"
      :disabled="disabled"
      :icon="icon"
      @click="handleClick"
      class="tab-button"
      nativeType="button"
    >
      {{ label }}
      <span v-if="badge" class="badge rounded-pill ms-2" :class="badgeClass">{{
        badge
      }}</span>
    </Button>
  </li>
</template>

<style scoped>
/* ============================================
   TAB - Enhanced design with borders
   ============================================ */

.tab-wrapper {
  list-style: none;
  position: relative;
}

.tab-wrapper :deep(.tab-button) {
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  position: relative;
  border: 2px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Active tab - border style */
.tab-wrapper.tab--active :deep(.tab-button) {
  border-color: var(--primary);
  background: linear-gradient(
    135deg,
    rgba(var(--primary-rgb), 0.1) 0%,
    rgba(var(--primary-rgb), 0.05) 100%
  );
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.15);
  transform: translateY(-2px);
}

/* Active indicator bar at bottom */
.tab-wrapper.tab--active :deep(.tab-button)::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 3px 3px 0 0;
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effect for non-active tabs */
.tab-wrapper:not(.tab--active):hover :deep(.tab-button) {
  border-color: var(--border-color);
  background-color: rgba(var(--primary-rgb), 0.05);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Animation for bottom bar */
@keyframes slideIn {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

/* Pulse animation on tab change */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.tab-wrapper.tab--active :deep(.tab-button) {
  animation: pulse 0.5s ease-in-out;
}
</style>
