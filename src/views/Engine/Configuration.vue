// @ts-ignore
<script lang="ts">
import { Component } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardBody from "@/components/ui/CardBody.vue";
import Button from "@/components/ui/Button.vue";
import Tabs from "@/components/ui/Tabs.vue";
import Tab from "@/components/ui/Tab.vue";
import TabPane from "@/components/ui/TabPane.vue";
import TanStackDataTable from "@/components/ui/TanStackDataTable.vue";
import FormInput from "@/components/ui/FormInput.vue";
import MethodLabelCell from "@/components/engine/MethodLabelCell.vue";
import MethodRequirementsCell from "@/components/engine/MethodRequirementsCell.vue";
import MethodActionsCell from "@/components/engine/MethodActionsCell.vue";
import type { ColumnDef } from "@tanstack/vue-table";
// @ts-ignore
import { h } from "vue";

@Component({
  name: "EngineConfiguration",
  components: {
    Card,
    CardHeader,
    CardBody,
    Button,
    Tabs,
    Tab,
    TabPane,
    TanStackDataTable,
    FormInput,
    MethodLabelCell,
    MethodRequirementsCell,
    MethodActionsCell,
  },
})
export default class EngineConfiguration extends Vue {
  declare $router: any;

  // Engine configuration
  engine = {
    id: 1,
    name: "Moteur Principal",
    description: "Configuration du moteur de calcul des primes",
    version: "1.0.0",
    active: true,
  };

  isEditingEngine = false;
  engineForm = { ...this.engine };

  // Versions
  versions = [
    {
      id: 1,
      name: "Version 1.0",
      version: "1.0.0",
      active: true,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Version 0.9",
      version: "0.9.0",
      active: false,
      createdAt: "2023-12-01",
    },
  ];

  selectedVersionId = 1;

  // Methods
  methods = [
    // Global methods
    {
      id: 1,
      code: "CALC_BASE",
      label: "Calcul de base",
      description: "Calcul de la prime de base",
      type: "global",
      insurer: null,
      showInDetails: true,
      requirements: ["age", "capital"],
    },
    {
      id: 2,
      code: "CALC_TAX",
      label: "Calcul des taxes",
      description: "Calcul des taxes applicables",
      type: "global",
      insurer: null,
      showInDetails: false,
      requirements: ["prime"],
    },

    // Risk-specific methods
    {
      id: 3,
      code: "CALC_AUTO_BASE",
      label: "Prime auto de base",
      description: "Calcul prime automobile",
      type: "risk",
      insurer: null,
      showInDetails: true,
      requirements: ["puissance", "zone"],
    },
    {
      id: 4,
      code: "CALC_AUTO_BONUS",
      label: "Bonus malus",
      description: "Application du coefficient bonus-malus",
      type: "risk",
      insurer: null,
      showInDetails: true,
      requirements: ["historique"],
    },

    // Insurer-specific methods
    {
      id: 5,
      code: "CALC_AXA_PREMIUM",
      label: "Prime AXA spécifique",
      description: "Méthode de calcul spécifique AXA",
      type: "insurer",
      insurer: { id: 1, name: "AXA", slug: "axa" },
      showInDetails: true,
      requirements: ["age", "zone"],
    },
    {
      id: 6,
      code: "CALC_ALLIANZ_DISCOUNT",
      label: "Réduction Allianz",
      description: "Calcul des réductions Allianz",
      type: "insurer",
      insurer: { id: 2, name: "Allianz", slug: "allianz" },
      showInDetails: false,
      requirements: ["anciennete"],
    },
  ];

  insurers = [
    { id: 1, name: "AXA", slug: "axa", logo: "" },
    { id: 2, name: "Allianz", slug: "allianz", logo: "" },
    { id: 3, name: "NSIA", slug: "nsia", logo: "" },
  ];

  isLoading = false;
  activeTab = "global";
  searchQueries = {
    global: "",
    risk: "",
    insurers: {} as Record<number, string>,
  };

  // Computed
  get globalMethods() {
    return this.methods.filter(
      (m) =>
        m.type === "global" &&
        m.label.toLowerCase().includes(this.searchQueries.global.toLowerCase())
    );
  }

  get riskMethods() {
    return this.methods.filter(
      (m) =>
        m.type === "risk" &&
        !m.insurer &&
        m.label.toLowerCase().includes(this.searchQueries.risk.toLowerCase())
    );
  }

  get currentVersion() {
    return this.versions.find((v) => v.id === this.selectedVersionId);
  }

  get isCurrentVersionActive() {
    return this.currentVersion?.active || false;
  }

  get versionOptions() {
    return this.versions.map(v => ({
      value: v.id,
      label: `${v.name} - v.${v.version}${v.active ? ' ★' : ''}`
    }))
  }

  // Table columns definition for GLOBAL methods
  get methodsColumns(): ColumnDef<any>[] {
    return [
      {
        accessorKey: "label",
        header: "Calcul",
        cell: (info) => h(MethodLabelCell, { method: info.row.original }),
      },
      {
        accessorKey: "requirements",
        header: "Entrées",
        cell: (info) =>
          h(MethodRequirementsCell, {
            requirements: info.row.original.requirements,
          }),
        enableSorting: false,
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) =>
          h(MethodActionsCell, {
            method: info.row.original,
            onEditMethod: this.goToMethodEditor,
            onUpdateMethod: this.editMethod,
            onDeleteMethod: this.deleteMethod,
            onToggleDetails: this.toggleShowInDetails,
          }),
        enableSorting: false,
      },
    ];
  }

  // Table columns definition for RISK methods (with duplicate button)
  get riskMethodsColumns(): ColumnDef<any>[] {
    return [
      {
        accessorKey: "label",
        header: "Calcul",
        cell: (info) => h(MethodLabelCell, { method: info.row.original }),
      },
      {
        accessorKey: "requirements",
        header: "Entrées",
        cell: (info) =>
          h(MethodRequirementsCell, {
            requirements: info.row.original.requirements,
          }),
        enableSorting: false,
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) =>
          h(MethodActionsCell, {
            method: info.row.original,
            insurers: this.insurers,
            showDuplicate: true,
            onEditMethod: this.goToMethodEditor,
            onUpdateMethod: this.editMethod,
            onDeleteMethod: this.deleteMethod,
            onToggleDetails: this.toggleShowInDetails,
            onDuplicateToInsurer: this.duplicateMethodToInsurer,
          }),
        enableSorting: false,
      },
    ];
  }

  // Table columns definition for INSURER methods (with code display)
  get insurerMethodsColumns(): ColumnDef<any>[] {
    return [
      {
        accessorKey: "label",
        header: "Calcul",
        cell: (info) =>
          h(MethodLabelCell, {
            method: info.row.original,
            showCode: true,
          }),
      },
      {
        accessorKey: "requirements",
        header: "Entrées",
        cell: (info) =>
          h(MethodRequirementsCell, {
            requirements: info.row.original.requirements,
          }),
        enableSorting: false,
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) =>
          h(MethodActionsCell, {
            method: info.row.original,
            onEditMethod: this.goToMethodEditor,
            onUpdateMethod: this.editMethod,
            onDeleteMethod: this.deleteMethod,
            onToggleDetails: this.toggleShowInDetails,
          }),
        enableSorting: false,
      },
    ];
  }

  // Methods
  getInsurerMethods(insurerId: number) {
    const query = this.searchQueries.insurers[insurerId] || "";
    return this.methods.filter(
      (m) =>
        m.insurer?.id === insurerId &&
        m.label.toLowerCase().includes(query.toLowerCase())
    );
  }

  editEngineConfig() {
    this.engineForm = { ...this.engine };
    this.isEditingEngine = true;
  }

  saveEngineConfig() {
    this.engine = { ...this.engineForm };
    this.isEditingEngine = false;
    // TODO: API call
  }

  cancelEditEngine() {
    this.isEditingEngine = false;
  }

  onVersionChange() {
    // Update engine info when version changes
    const version = this.versions.find((v) => v.id === this.selectedVersionId);
    if (version) {
      this.engine.version = version.version;
      this.engine.name = version.name;
      // TODO: Load methods for this version
    }
  }

  setActiveVersion(versionId: number) {
    if (confirm("Voulez-vous définir cette version comme version active ?")) {
      this.versions.forEach((v) => (v.active = v.id === versionId));
      // TODO: API call
    }
  }

  createVersion() {
    // TODO: Open modal to create new version
    console.log("Create version");
  }

  deleteVersion(versionId: number) {
    const version = this.versions.find((v) => v.id === versionId);
    if (version?.active) {
      alert("Impossible de supprimer la version active");
      return;
    }

    if (
      confirm(
        `Êtes-vous sûr de vouloir supprimer la version "${version?.name}" ?`
      )
    ) {
      this.versions = this.versions.filter((v) => v.id !== versionId);
      if (this.selectedVersionId === versionId) {
        this.selectedVersionId =
          this.versions.find((v) => v.active)?.id || this.versions[0]?.id || 1;
      }
      // TODO: API call
    }
  }

  generateEngine() {
    // TODO: API call to generate engine
    console.log("Generate engine");
  }

  goToMethodEditor(methodId: number) {
    this.$router.push({
      name: "engine-method-detail",
      params: { id: methodId },
    });
  }

  createMethod(type: string, insurerId?: number) {
    // TODO: Open modal or navigate to create method
    console.log("Create method", type, insurerId);
  }

  editMethod(method: any) {
    // TODO: Open modal to edit method
    console.log("Edit method", method);
  }

  deleteMethod(methodId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette méthode ?")) {
      this.methods = this.methods.filter((m) => m.id !== methodId);
      // TODO: API call
    }
  }

  toggleShowInDetails(method: any) {
    method.showInDetails = !method.showInDetails;
    // TODO: API call
  }

  duplicateMethodToInsurer(methodId: number, insurerId: number) {
    // TODO: API call to duplicate method for specific insurer
    console.log("Duplicate method", methodId, "to insurer", insurerId);
  }

  mounted() {
    // TODO: Load data from API
  }
}
</script>

<template>
  <div class="engine-config-container">
    <!-- Engine Info Card -->
    <Card :hoverable="true" :shadow="true" variant="elevated" classAdded="mb-3">
      <CardHeader
        :title="engine.name"
        :subtitle="engine.description"
        icon="fas fa-cogs"
        :bordered="isEditingEngine"
        gradient="primary"
      >
        <template #actions>
          <div class="engine-card__controls">
            <!-- Version Selector -->
            <div class="engine-card__version-selector">
              <FormInput
                v-model="selectedVersionId"
                label="Version"
                type="select"
                size="sm"
                :options="versionOptions"
                @change="onVersionChange"
              />
            </div>

            <!-- Version Actions -->
            <Button
              variant="success"
              size="sm"
              icon="fas fa-check"
              @click="setActiveVersion(selectedVersionId)"
              :disabled="isCurrentVersionActive"
              title="Définir comme version active"
            />
            <Button
              variant="primary"
              size="sm"
              icon="fas fa-plus"
              @click="createVersion"
              title="Nouvelle version"
            />
            <Button
              variant="danger"
              size="sm"
              icon="fas fa-trash"
              @click="deleteVersion(selectedVersionId)"
              :disabled="isCurrentVersionActive"
              title="Supprimer cette version"
            />

            <span class="engine-card__divider"></span>

            <!-- Engine Actions -->
            <Button
              variant="warning"
              size="sm"
              icon="fas fa-cogs"
              @click="generateEngine"
              title="Générer le moteur"
            >
              Générer
            </Button>
            <Button
              v-if="!isEditingEngine"
              variant="primary"
              size="sm"
              icon="fas fa-edit"
              @click="editEngineConfig"
              title="Modifier le moteur"
            />
          </div>
        </template>
      </CardHeader>

      <CardBody v-if="isEditingEngine">
        <div class="engine-card__form">
          <FormInput
            v-model="engineForm.name"
            label="Nom"
            type="text"
            placeholder="Nom du moteur"
          />
          <FormInput
            v-model="engineForm.description"
            label="Description"
            type="textarea"
            :rows="2"
            placeholder="Description du moteur"
          />
        </div>
        <div class="engine-card__form-actions">
          <Button
            variant="success"
            icon="fas fa-save"
            @click="saveEngineConfig"
          >
            Enregistrer
          </Button>
          <Button variant="light" icon="fas fa-times" @click="cancelEditEngine">
            Annuler
          </Button>
        </div>
      </CardBody>
    </Card>

    <!-- Methods by Type (Tabs) -->
    <Card :shadow="true" variant="elevated">
      <CardHeader title="Méthodes de calcul" :bordered="true" />

      <CardBody>
        <Tabs v-model="activeTab" variant="underline" size="md">
          <template #nav>
            <Tab value="global" label="GLOBAL" icon="fas fa-globe" />
            <Tab
              value="risk"
              label="PAR RISQUE"
              icon="fas fa-exclamation-triangle"
            />
            <Tab
              v-for="insurer in insurers"
              :key="'tab-' + insurer.id"
              :value="'insurer-' + insurer.id"
              :label="insurer.name.toUpperCase()"
              icon="fas fa-building"
            />
          </template>

          <!-- Tab Content: GLOBAL -->
          <TabPane value="global">
            <div class="methods-toolbar">
              <div class="methods-toolbar__search">
                <FormInput
                  v-model="searchQueries.global"
                  type="search"
                  icon="fas fa-search"
                  placeholder="Rechercher une méthode globale..."
                />
              </div>
              <div class="methods-toolbar__actions">
                <Button
                  variant="primary"
                  size="sm"
                  icon="fas fa-plus"
                  @click="createMethod('global')"
                >
                  Créer un calcul
                </Button>
              </div>
            </div>

            <div class="methods-table-container">
              <TanStackDataTable
                :data="globalMethods"
                :columns="methodsColumns"
                :page-size="10"
                :hover="true"
                size="md"
              />
            </div>
          </TabPane>

          <!-- Tab Content: PAR RISQUE -->
          <TabPane value="risk">
            <div class="methods-toolbar">
              <div class="methods-toolbar__search">
                <FormInput
                  v-model="searchQueries.risk"
                  type="search"
                  icon="fas fa-search"
                  placeholder="Rechercher une méthode par risque..."
                />
              </div>
              <div class="methods-toolbar__actions">
                <Button
                  variant="primary"
                  size="sm"
                  icon="fas fa-plus"
                  @click="createMethod('risk')"
                >
                  Créer un calcul
                </Button>
              </div>
            </div>

            <div class="methods-table-container">
              <TanStackDataTable
                :data="riskMethods"
                :columns="riskMethodsColumns"
                :page-size="10"
                :hover="true"
                size="md"
              />
            </div>
          </TabPane>

          <!-- Tab Content: PAR ASSUREUR -->
          <TabPane
            v-for="insurer in insurers"
            :key="'pane-' + insurer.id"
            :value="'insurer-' + insurer.id"
          >
            <div class="methods-toolbar">
              <div class="methods-toolbar__search">
                <FormInput
                  v-model="searchQueries.insurers[insurer.id]"
                  type="search"
                  icon="fas fa-search"
                  :placeholder="'Rechercher pour ' + insurer.name + '...'"
                />
              </div>
              <div class="methods-toolbar__actions">
                <Button
                  variant="primary"
                  size="sm"
                  icon="fas fa-plus"
                  @click="createMethod('insurer', insurer.id)"
                >
                  Créer un calcul
                </Button>
              </div>
            </div>

            <div class="methods-table-container">
              <TanStackDataTable
                :data="getInsurerMethods(insurer.id)"
                :columns="insurerMethodsColumns"
                :page-size="10"
                :hover="true"
                size="md"
              />
            </div>
          </TabPane>
        </Tabs>
      </CardBody>
    </Card>
  </div>
</template>

<style scoped>
/* ============================================
   LAYOUT & SPACING
   ============================================ */

.engine-config-container {
  padding: 1.5rem;
  background-color: var(--bg-primary);
  transition: background-color var(--transition-theme);
  min-height: 100vh;
}

/* ============================================
   HEADER
   ============================================ */

.engine-config-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--border-color);
  transition: border-color var(--transition-theme);
}

.engine-config-header__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.engine-config-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: color var(--transition-theme);
}

.engine-config-title__icon {
  color: var(--primary);
  font-size: 1.75rem;
  transition: color var(--transition-base);
}

.engine-config-subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
  transition: color var(--transition-theme);
}

/* ============================================
   ENGINE CARD
   ============================================ */

.engine-card {
  background-color: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;
  transition: all var(--transition-base);
  overflow: hidden;
}

.engine-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}

.engine-card__header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
  background: linear-gradient(
    135deg,
    rgba(var(--primary-rgb), 0.03) 0%,
    transparent 100%
  );
  transition: all var(--transition-theme);
}

.engine-card__title-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 200px;
}

.engine-card__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color var(--transition-theme);
}

.engine-card__icon {
  color: var(--primary);
  font-size: 1.25rem;
  transition: color var(--transition-base);
}

.engine-card__description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: color var(--transition-theme);
}

.engine-card__controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  flex: 1;
  min-width: 300px;
}

.engine-card__version-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Version selector now uses FormInput component */

/* Divider for button groups */
.engine-card__divider {
  width: 1px;
  height: 1.5rem;
  background-color: var(--border-color);
  margin: 0 0.25rem;
}

.engine-card__form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Form inputs now use FormInput component */

.engine-card__form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  align-items: center;
}

/* ============================================
   TABS NAVIGATION
   ============================================ */

.nav-tabs {
  border-bottom: 2px solid var(--border-color);
  transition: border-color var(--transition-theme);
}

.nav-tabs .nav-link {
  color: var(--text-secondary);
  border: none;
  border-bottom: 3px solid transparent;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all var(--transition-base);
  position: relative;
}

.nav-tabs .nav-link:hover {
  color: var(--primary);
  border-bottom-color: rgba(var(--primary-rgb), 0.3);
}

.nav-tabs .nav-link.active {
  color: var(--primary);
  background-color: transparent;
  border-bottom-color: var(--primary);
}

/* ============================================
   BADGES & STATUS
   ============================================ */

.badge.bg-light-danger {
  background-color: rgba(241, 65, 108, 0.1) !important;
  color: var(--bs-danger);
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
}

.badge.bg-light-danger:hover {
  background-color: rgba(241, 65, 108, 0.15) !important;
}

/* ============================================
   METHODS TOOLBAR & CONTAINERS
   ============================================ */

.methods-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  transition: all var(--transition-theme);
}

.methods-toolbar__search {
  flex: 1;
  max-width: 500px;
}

.methods-toolbar__actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.methods-table-container {
  background-color: var(--surface);
  border-radius: var(--radius-md);
  padding: 1rem;
  border: 1px solid var(--border-color);
  transition: all var(--transition-theme);
}

/* ============================================
   TABLES
   ============================================ */

.table-responsive {
  border-radius: var(--radius-md);
  overflow: hidden;
}

.table {
  margin-bottom: 0;
  color: var(--text-primary);
}

.table thead th {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  padding: 1rem 1.25rem;
}

.table tbody td {
  border-color: var(--border-color);
  padding: 1rem 1.25rem;
  transition: background-color var(--transition-fast);
}

.table tbody tr {
  transition: all var(--transition-fast);
}

.table tbody tr:hover {
  background-color: var(--surface-hover);
}

/* ============================================
   SEARCH & CONTROLS
   ============================================ */

.form-control {
  border-color: var(--border-color);
  background-color: var(--surface);
  color: var(--text-primary);
  transition: all var(--transition-base);
}

.form-control:focus {
  border-color: var(--primary);
  background-color: var(--surface);
  color: var(--text-primary);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
}

.form-control::placeholder {
  color: var(--text-muted);
}

/* ============================================
   UTILITIES
   ============================================ */

.cursor-pointer {
  cursor: pointer;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 1200px) {
  .engine-card__controls {
    min-width: unset;
    width: 100%;
  }

  .engine-card__form {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .engine-config-container {
    padding: 1rem;
  }

  .engine-config-title {
    font-size: 1.5rem;
  }

  .engine-card__header {
    flex-direction: column;
    align-items: stretch;
  }

  .engine-card__title-section {
    flex: 1;
  }

  .engine-card__controls {
    width: 100%;
    justify-content: stretch;
  }

  .engine-card__btn {
    flex: 1;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .methods-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .methods-toolbar__search {
    max-width: 100%;
  }

  .methods-toolbar__actions {
    justify-content: flex-end;
  }
}

@media (max-width: 480px) {
  .engine-config-title {
    font-size: 1.25rem;
  }

  .engine-card__controls {
    gap: 0.5rem;
  }

  .engine-card__btn {
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
  }

  .methods-toolbar {
    padding: 0.75rem;
  }

  .methods-table-container {
    padding: 0.75rem;
  }
}

/* ============================================
   DARK MODE ADAPTATIONS
   ============================================ */

[data-theme="dark"] .engine-card {
  border-color: var(--border-color);
}

[data-theme="dark"] .engine-card__header {
  background: linear-gradient(
    135deg,
    rgba(var(--primary-rgb), 0.05) 0%,
    transparent 100%
  );
}

[data-theme="dark"] .engine-card__select {
  background-color: var(--surface);
  color: var(--text-primary);
}

[data-theme="dark"] .form-control {
  background-color: var(--surface);
  color: var(--text-primary);
}
</style>
