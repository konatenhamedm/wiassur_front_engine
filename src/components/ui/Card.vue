<!-- @ts-ignore -->
<script lang="ts">
import { Component, Prop } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";

@Component({
  name: "Card",
})
export default class Card extends Vue {
  @Prop({ type: String, default: "default" })
  variant!: "default" | "elevated" | "outlined" | "flat";

  @Prop({ type: Boolean, default: true })
  shadow!: boolean;

  @Prop({ type: Boolean, default: false })
  hoverable!: boolean;

  @Prop({ type: String, default: "" })
  padding!: string;

  @Prop({ type: String, default: "" })
  gradient!: string; // 'primary', 'secondary', 'none'

  @Prop({ type: String, default: "" })
  classAdded!: string;

  get cardClasses() {
    return {
      "card--elevated": this.variant === "elevated",
      "card--outlined": this.variant === "outlined",
      "card--flat": this.variant === "flat",
      "card--shadow": this.shadow,
      "card--hoverable": this.hoverable,
      "card--gradient-primary": this.gradient === "primary",
      "card--gradient-secondary": this.gradient === "secondary",
    };
  }

  get cardStyles() {
    if (this.padding) {
      return { padding: this.padding };
    }
    return {};
  }
}
</script>

<template>
  <div class="card" :class="cardClasses + ' ' + classAdded" :style="cardStyles">
    <slot></slot>
  </div>
</template>

<style scoped>
/* ============================================
   BASE CARD
   ============================================ */

.card {
  background-color: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  overflow: hidden;
  position: relative;
}

/* ============================================
   VARIANTS
   ============================================ */

.card--elevated {
  box-shadow: var(--shadow-md);
  border: none;
}

.card--elevated:hover {
  box-shadow: var(--shadow-lg);
}

.card--outlined {
  border: 2px solid var(--border-color);
  box-shadow: none;
}

.card--flat {
  border: none;
  box-shadow: none;
  background-color: transparent;
}

/* ============================================
   STATES
   ============================================ */

.card--shadow {
  box-shadow: var(--shadow-sm);
}

.card--hoverable:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
  transform: translateY(-2px);
}

/* ============================================
   GRADIENTS
   ============================================ */

.card--gradient-primary::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--primary) 0%,
    var(--primary-light) 100%
  );
}

.card--gradient-secondary::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--secondary) 0%,
    var(--secondary-light) 100%
  );
}

/* ============================================
   DARK MODE
   ============================================ */

[data-theme="dark"] .card {
  background-color: var(--surface);
  border-color: var(--border-color);
}

[data-theme="dark"] .card--outlined {
  border-color: var(--border-color);
}
</style>
