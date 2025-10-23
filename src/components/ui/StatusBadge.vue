<script lang="ts">
import { Component, Prop } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";
import type { Status } from "@/types/common";

@Component({
  name: "StatusBadge",
})
export default class StatusBadge extends Vue {
  @Prop({ required: true })
  status!: Status | string;

  @Prop({ default: undefined })
  label?: string;

  statusConfig: Record<string, { variant: string; label: string }> = {
    active: { variant: "success", label: "Actif" },
    inactive: { variant: "secondary", label: "Inactif" },
    pending: { variant: "warning", label: "En attente" },
    archived: { variant: "dark", label: "Archivé" },
    completed: { variant: "success", label: "Terminé" },
    cancelled: { variant: "danger", label: "Annulé" },
    draft: { variant: "secondary", label: "Brouillon" },
    sent: { variant: "info", label: "Envoyé" },
    paid: { variant: "success", label: "Payé" },
    overdue: { variant: "danger", label: "En retard" },
  };

  get config() {
    return (
      this.statusConfig[this.status] || {
        variant: "secondary",
        label: this.status,
      }
    );
  }

  get displayLabel() {
    return this.label || this.config.label;
  }
}
</script>

<template>
  <span class="badge" :class="`bg-${config.variant}`">
    {{ displayLabel }}
  </span>
</template>

<style scoped>
.badge {
  font-weight: 500;
  text-transform: capitalize;
}
</style>
