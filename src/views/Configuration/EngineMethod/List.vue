<script lang="ts">
import MethodActionsCell from "@/components/engine/MethodActionsCell.vue";
import MethodLinesManager from "@/components/engine/MethodLinesManager.vue";
import Button from "@/components/ui/Button.vue";
import Card from "@/components/ui/Card.vue";
import CardBody from "@/components/ui/CardBody.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import data from "@/data/insurer-list.json";
import Engine from "@/entity/Engine";
import type { EngineMethod } from "@/types";
import { Component, Vue } from "vue-facing-decorator";

@Component({
  name: "ConfigurationEngineMethodList",
  components: {
    Card,
    CardHeader,
    CardBody,
    Button,
    MethodLinesManager
  },
})
export default class ConfigurationEngineMethodList extends Vue {
  declare $router: any;
  declare $route: any;

  public engineMethods: EngineMethod[] = [];
  public engine: Engine | null = null;
  public insurers = data.insurers;

  public dropdownOpen = false;
  public selectedInsurerUuid = "";
  public searchQuery = "";
  public isLoading = false;

  // États pour les modales
  public showCreateModal = false;
  public showLinesManager = false;
  public showEditModal = false;
  public showDetailsModal = false;
  public selectedMethod: EngineMethod | null = null;
  public isSubmitting = false;

  // Mode d'affichage
  public viewMode: 'grid' | 'table' = 'grid';

  public form = {
    name: "",
    code: "",
    publicName: "",
    description: "",
    engineBranch: "",
    insurer: "",
  };

  public editForm = {
    name: "",
    code: "",
    publicName: "",
    description: "",
    active: true
  };

  get selectedInsurerLabel(): string | null {
    if (!this.selectedInsurerUuid) return null;
    const it = this.insurers.find((i: any) => i.uuid === this.selectedInsurerUuid);
    return it ? it.label : null;
  }

  get isGlobalMode(): boolean {
    return !this.selectedInsurerUuid;
  }

  get filteredInsurers(): any[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.insurers;
    return this.insurers.filter(
      (i: any) =>
        String(i.label || "").toLowerCase().includes(q) ||
        String(i.uuid || "").toLowerCase().includes(q)
    );
  }

  get stats() {
    return {
      total: this.engineMethods.length,
      active: this.engineMethods.filter(m => m.active).length,
      insurer: this.engineMethods.filter(m => !m.isGlobal).length,
      global: this.engineMethods.filter(m => m.isGlobal).length
    };
  }

  // ---- GESTION DU DROPDOWN ----
  public handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown') && this.dropdownOpen) {
      this.dropdownOpen = false;
    }
  }

  public toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.$nextTick(() => {
        this.searchQuery = '';
      });
    }
  }

  public selectInsurer(uuid: string) {
    this.selectedInsurerUuid = uuid;
    this.dropdownOpen = false;
    const branchSlug = this.$route.params.branchSlug as string;
    this.fetchEngineMethods(branchSlug, uuid || null);
  }

  // ---- REDIRECTION VERS LIGNES ----
public redirectToMethodLines(method: EngineMethod) {
  this.$router.push({
    name: 'MethodLinesList',
    params: {
      branchSlug: this.$route.params.branchSlug,
      methodId: method.id
    }
  });
}

  // ---- FETCH METHODS ----
  async fetchEngineMethods(branchSlug: string, insurerUuid: string | null = null) {
    this.isLoading = true;
    try {
      let url = insurerUuid
        ? `http://localhost:8000/api/engine/method/${branchSlug}/${insurerUuid}`
        : `http://localhost:8000/api/engine/method/global`;

      const response = await fetch(url);
      const res = await response.json();

      if (res && res.code === 200) {
        const data = res.data || [];
        this.engineMethods = data.map((m: any) => ({
          id: m.id,
          name: m.name,
          code: m.code,
          description: m.description,
          active: m.active,
          engine: m.engine,
          isGlobal: !insurerUuid,
          insurerUuid: insurerUuid || null,
          showInDetails: m.showInDetails || false
        }));
        this.engine = data[0]?.engine ? new Engine(data[0].engine) : null;
      } else {
        this.engineMethods = [];
      }
    } catch (e) {
      console.error("❌ Erreur chargement méthodes :", e);
      this.engineMethods = [];
    } finally {
      this.isLoading = false;
    }
  }

  // ---- CRÉATION ----
  async createMethod() {
    if (!this.form.name.trim() || !this.form.code.trim()) {
      alert("Veuillez renseigner le nom et le code de la méthode !");
      return;
    }

    this.isSubmitting = true;
    const branchSlug = this.$route.params.branchSlug;

    const payload = {
      name: this.form.name,
      code: this.form.code,
      publicName: this.form.publicName,
      description: this.form.description,
      engineBranch: branchSlug,
      insurer: this.selectedInsurerUuid || null,
    };

    try {
      const response = await fetch(`http://localhost:8000/api/engine/method/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const res = await response.json();

      if (response.ok && (res.code === 200 || res.code === 201)) {
        alert("🎉 Méthode créée avec succès !");
        this.closeCreateModal();
        this.fetchEngineMethods(branchSlug, this.selectedInsurerUuid || null);
      } else {
        alert("❌ Erreur lors de la création : " + (res.message || "Inconnue"));
      }
    } catch (err) {
      console.error("Erreur API :", err);
      alert("Erreur réseau ou serveur.");
    } finally {
      this.isSubmitting = false;
    }
  }

  openCreateModal() {
    const branchSlug = this.$route.params.branchSlug;
    this.form = {
      name: "",
      code: "",
      publicName: "",
      description: "",
      engineBranch: branchSlug,
      insurer: this.selectedInsurerUuid
    };
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  // ---- ÉDITION ----
  openEditModal(method: EngineMethod) {
    this.selectedMethod = method;
    this.editForm = {
      name: method.name,
      code: method.code,
      publicName: method.publicName || "",
      description: method.description || "",
      active: method.active
    };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedMethod = null;
  }

  async saveEdit() {
    if (!this.selectedMethod) return;

    this.isSubmitting = true;
    try {
      const response = await fetch(
        `http://localhost:8000/api/engine/method/${this.selectedMethod.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.editForm),
        }
      );

      const res = await response.json();
      if (response.ok && res.code === 200) {
        alert("✅ Méthode mise à jour !");
        this.closeEditModal();
        this.fetchEngineMethods(
          this.$route.params.branchSlug,
          this.selectedInsurerUuid || null
        );
      } else {
        alert("❌ Erreur : " + (res.message || "Inconnue"));
      }
    } catch (err) {
      console.error("Erreur:", err);
      alert("Erreur réseau");
    } finally {
      this.isSubmitting = false;
    }
  }

  // ---- DÉTAILS ----
  openDetailsModal(method: EngineMethod) {
    this.selectedMethod = method;
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedMethod = null;
  }

  // ---- GESTION DES LIGNES ----
  openLinesManager(method: EngineMethod) {
    this.selectedMethod = method;
    this.showLinesManager = true;
  }

  closeLinesManager() {
    this.showLinesManager = false;
    this.selectedMethod = null;
  }

  // ---- SUPPRESSION ----
  async deleteMethod(method: EngineMethod) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${method.name}" ?`)) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/engine/method/${method.id}`,
        { method: "DELETE" }
      );

      const res = await response.json();
      if (res.code === 200) {
        alert("✅ Méthode supprimée");
        this.fetchEngineMethods(
          this.$route.params.branchSlug,
          this.selectedInsurerUuid || null
        );
      } else {
        alert("❌ Erreur : " + (res.message || "Inconnue"));
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur réseau");
    }
  }

  // ---- TOGGLE ACTIVE ----
  async toggleActive(method: EngineMethod) {
    const newState = !method.active;
    
    try {
      const response = await fetch(
        `http://localhost:8000/api/engine/method/${method.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: newState }),
        }
      );

      const res = await response.json();
      if (response.ok && res.code === 200) {
        method.active = newState;
      } else {
        alert("❌ Erreur : " + (res.message || "Inconnue"));
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur réseau");
    }
  }

  // ---- DUPLICATION ----
  async duplicateMethod(method: EngineMethod) {
    if (!confirm(`Dupliquer la méthode "${method.name}" ?`)) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/engine/method/${method.id}/duplicate`,
        { method: "POST" }
      );

      const res = await response.json();
      if (res.code === 201 || res.code === 200) {
        alert("✅ Méthode dupliquée !");
        this.fetchEngineMethods(
          this.$route.params.branchSlug,
          this.selectedInsurerUuid || null
        );
      } else {
        alert("❌ Erreur : " + (res.message || "Inconnue"));
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur réseau");
    }
  }

  mounted() {
    const branchSlug = this.$route.params.branchSlug as string;
    this.fetchEngineMethods(branchSlug);
    
    // Ajouter l'écouteur d'événement pour les clics extérieurs
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }
}
</script>

<template>
  <div class="container-fluid p-4">
    <!-- HEADER AVEC NAVIGATION -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center gap-3">
        <button
          class="btn btn-light rounded-circle shadow-sm"
          style="width: 45px; height: 45px"
          @click="$router.push('/configuration/engine-branches')"
        >
          <i class="fas fa-arrow-left"></i>
        </button>

        <div>
          <h3 class="mb-0 fw-bold">
            <i class="fas fa-cogs text-primary me-2"></i>
            {{ engine ? engine.name : "Méthodes du moteur" }}
          </h3>
          <p class="text-muted mb-0 small">
            <span v-if="selectedInsurerLabel">
              <i class="fas fa-building me-1"></i>
              {{ selectedInsurerLabel }}
            </span>
            <span v-else>
              <i class="fas fa-globe me-1"></i>
              Méthodes globales
            </span>
          </p>
        </div>
      </div>

      <div class="d-flex gap-2">
        <!-- Toggle view mode -->
        <div class="btn-group btn-group-sm" role="group">
          <button
            type="button"
            class="btn"
            :class="viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'"
            @click="viewMode = 'grid'"
          >
            <i class="fas fa-th"></i>
          </button>
          <button
            type="button"
            class="btn"
            :class="viewMode === 'table' ? 'btn-primary' : 'btn-outline-primary'"
            @click="viewMode = 'table'"
          >
            <i class="fas fa-list"></i>
          </button>
        </div>

        <Button variant="primary" @click="openCreateModal">
          <i class="fa fa-plus me-2"></i>
          Nouvelle méthode
        </Button>
      </div>
    </div>

    <!-- FILTRE ASSUREURS -->
    <Card class="mb-4 border-0 shadow-sm">
      <CardBody class="py-3">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex gap-2 align-items-center">
            <i class="fas fa-filter text-muted"></i>
            <span class="text-muted">Filtrer par :</span>
          </div>

          <div class="dropdown position-relative">
            <button
              class="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2 px-4"
              type="button"
              @click="toggleDropdown"
            >
              <i :class="selectedInsurerUuid ? 'fas fa-building' : 'fas fa-globe'"></i>
              <span class="fw-semibold">{{ selectedInsurerLabel || "Méthodes Globales" }}</span>
            </button>

            <ul
              v-show="dropdownOpen"
              class="dropdown-menu show p-2 shadow-lg border-0"
              style="max-height: 400px; overflow: auto; position: absolute; right: 0; top: 100%; width: 280px; margin-top: 8px;"
            >
              <li class="p-2">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control border-0 bg-light"
                  placeholder="🔍 Rechercher..."
                  @keydown.stop
                />
              </li>
              <li>
                <a
                  href="#"
                  class="dropdown-item rounded d-flex align-items-center gap-2 py-2"
                  :class="{ 'bg-primary text-white': !selectedInsurerUuid }"
                  @click.prevent="selectInsurer('')"
                >
                  <i class="fas fa-globe"></i>
                  <span>Méthodes Globales</span>
                </a>
              </li>
              <li><hr class="dropdown-divider my-2" /></li>
              <li v-for="insurer in filteredInsurers" :key="insurer.uuid">
                <a
                  href="#"
                  class="dropdown-item rounded d-flex align-items-center gap-2 py-2"
                  :class="{ 'bg-primary text-white': selectedInsurerUuid === insurer.uuid }"
                  @click.prevent="selectInsurer(insurer.uuid)"
                >
                  <img src="/src/assets/img/insurer.png" alt="" style="width: 20px; height: 20px" />
                  <span>{{ insurer.label }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </CardBody>
    </Card>

    <!-- STATISTIQUES -->
    <div class="row g-3 mb-4" v-if="!isLoading && engineMethods.length > 0">
      <div class="col-md-3">
        <div class="stat-card bg-gradient-primary">
          <div class="stat-icon">
            <i class="fas fa-list-alt"></i>
          </div>
          <div class="stat-content">
            <h3 class="mb-0">{{ stats.total }}</h3>
            <p class="mb-0">Total méthodes</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card bg-gradient-success">
          <div class="stat-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-content">
            <h3 class="mb-0">{{ stats.active }}</h3>
            <p class="mb-0">Actives</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card bg-gradient-info">
          <div class="stat-icon">
            <i class="fas fa-building"></i>
          </div>
          <div class="stat-content">
            <h3 class="mb-0">{{ stats.insurer }}</h3>
            <p class="mb-0">Assureur</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card bg-gradient-warning">
          <div class="stat-icon">
            <i class="fas fa-globe"></i>
          </div>
          <div class="stat-content">
            <h3 class="mb-0">{{ stats.global }}</h3>
            <p class="mb-0">Globales</p>
          </div>
        </div>
      </div>
    </div>

    <!-- LOADING -->
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem"></div>
      <p class="text-muted mt-3">Chargement des méthodes...</p>
    </div>

    <!-- EMPTY STATE -->
    <div v-else-if="engineMethods.length === 0" class="text-center py-5">
      <div class="mb-4">
        <i class="fas fa-inbox fa-4x text-muted opacity-50"></i>
      </div>
      <h5 class="text-muted mb-2">Aucune méthode trouvée</h5>
      <p class="text-muted mb-4">
        {{ isGlobalMode ? 'Aucune méthode globale configurée' : 'Aucune méthode pour cet assureur' }}
      </p>
      <Button variant="primary" @click="openCreateModal">
        <i class="fa fa-plus me-2"></i>
        Créer la première méthode
      </Button>
    </div>

    <!-- GRID VIEW -->
    <div v-else-if="viewMode === 'grid'" class="row g-4">
      <div v-for="method in engineMethods" :key="method.id" class="col-12 col-md-6 col-xl-4">
        <div class="method-card">
          <!-- Header -->
          <div class="method-card-header">
            <div class="d-flex align-items-start justify-content-between mb-2">
              <div class="flex-grow-1">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <span
                    class="badge"
                    :class="method.isGlobal ? 'badge-global' : 'badge-insurer'"
                  >
                    <i :class="method.isGlobal ? 'fas fa-globe' : 'fas fa-building'" class="me-1"></i>
                    {{ method.isGlobal ? 'Globale' : 'Assureur' }}
                  </span>
                  <span
                    class="badge"
                    :class="method.active ? 'badge-active' : 'badge-inactive'"
                  >
                    <i :class="method.active ? 'fas fa-check-circle' : 'fas fa-pause-circle'" class="me-1"></i>
                    {{ method.active ? 'Active' : 'Inactive' }}
                  </span>
                </div>
                <h5 class="method-title mb-1">{{ method.name }}</h5>
                <code class="method-code">{{ method.code }}</code>
              </div>

              <!-- Toggle active -->
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :checked="method.active"
                  @change="toggleActive(method)"
                />
              </div>
            </div>

            <p class="method-description">
              {{ method.description || 'Aucune description' }}
            </p>
          </div>

          <!-- Actions -->
          <div class="method-card-actions">
            <!-- Actions communes -->
            <button
              class="action-btn action-btn-details"
              @click="openDetailsModal(method)"
              title="Voir les détails"
            >
              <i class="fas fa-eye"></i>
              <span>Détails</span>
            </button>

            <button
              class="action-btn action-btn-edit"
              @click="openEditModal(method)"
              title="Éditer la méthode"
            >
              <i class="fas fa-edit"></i>
              <span>Éditer</span>
            </button>

            <!-- Nouvelle action pour rediriger vers les lignes -->
            <button
              class="action-btn action-btn-builder"
              @click="redirectToMethodLines(method)"
              title="Voir les lignes de méthode"
            >
              <i class="fas fa-list-alt"></i>
              <span>Lignes</span>
            </button>

            <!-- Menu plus d'options -->
            <div class="dropdown">
              <button
                class="action-btn action-btn-more dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="duplicateMethod(method)">
                    <i class="fas fa-copy me-2"></i>
                    Dupliquer
                  </a>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a
                    class="dropdown-item text-danger"
                    href="#"
                    @click.prevent="deleteMethod(method)"
                  >
                    <i class="fas fa-trash me-2"></i>
                    Supprimer
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TABLE VIEW (ancienne vue) -->
    <Card v-else class="border-0 shadow-sm">
      <CardBody>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Code</th>
              <th>Type</th>
              <th>Statut</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="method in engineMethods" :key="method.id">
              <td>
                <strong>{{ method.name }}</strong>
                <br />
                <small class="text-muted">{{ method.description }}</small>
              </td>
              <td><code>{{ method.code }}</code></td>
              <td>
                <span
                  class="badge"
                  :class="method.isGlobal ? 'bg-success' : 'bg-info'"
                >
                  {{ method.isGlobal ? 'Globale' : 'Assureur' }}
                </span>
              </td>
              <td>
                <span
                  class="badge"
                  :class="method.active ? 'bg-success' : 'bg-warning'"
                >
                  {{ method.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="text-end">
                <div class="btn-group btn-group-sm">
                  <button class="btn btn-outline-secondary" @click="openDetailsModal(method)">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn btn-outline-primary" @click="openEditModal(method)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    class="btn btn-primary"
                    @click="redirectToMethodLines(method)"
                    title="Voir les lignes de méthode"
                  >
                    <i class="fas fa-list-alt"></i>
                  </button>
                  <button class="btn btn-outline-danger" @click="deleteMethod(method)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </CardBody>
    </Card>

    <!-- MODALE CRÉATION -->
    <div v-if="showCreateModal" class="modal-overlay" @click.self="closeCreateModal">
      <div class="modal-dialog-custom animate__animated animate__fadeInDown">
        <div class="modal-header-custom">
          <h5 class="mb-0 fw-bold">
            <i class="fa fa-plus-circle text-primary me-2"></i>
            Créer une nouvelle méthode
          </h5>
          <button class="btn-close-custom" @click="closeCreateModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body-custom">
          <div class="alert alert-info d-flex align-items-start gap-2 mb-4">
            <i class="fas fa-info-circle mt-1"></i>
            <div class="small">
              <strong>Type:</strong>
              {{ selectedInsurerUuid ? 'Méthode spécifique assureur' : 'Méthode globale' }}
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">
              Nom <span class="text-danger">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              class="form-control"
              placeholder="Ex: Calcul Prime Auto"
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">
              Code <span class="text-danger">*</span>
            </label>
            <input
              v-model="form.code"
              type="text"
              class="form-control"
              placeholder="Ex: CALC_PRIME_AUTO"
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Nom public</label>
            <input
              v-model="form.publicName"
              type="text"
              class="form-control"
              placeholder="Ex: Prime automobile"
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Description</label>
            <textarea
              v-model="form.description"
              class="form-control"
              rows="3"
              placeholder="Description de la méthode..."
            ></textarea>
          </div>
        </div>

        <div class="modal-footer-custom">
          <button class="btn btn-light px-4" @click="closeCreateModal" :disabled="isSubmitting">
            Annuler
          </button>
          <button
            class="btn btn-primary px-4 d-flex align-items-center gap-2"
            @click="createMethod"
            :disabled="isSubmitting"
          >
            <i v-if="isSubmitting" class="fa fa-spinner fa-spin"></i>
            <i v-else class="fa fa-check"></i>
            <span>{{ isSubmitting ? 'Création...' : 'Créer' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- MODALE ÉDITION -->
    <div v-if="showEditModal && selectedMethod" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-dialog-custom animate__animated animate__fadeInDown">
        <div class="modal-header-custom">
          <h5 class="mb-0 fw-bold">
            <i class="fas fa-edit text-primary me-2"></i>
            Éditer la méthode
          </h5>
          <button class="btn-close-custom" @click="closeEditModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body-custom">
          <div class="mb-3">
            <label class="form-label fw-semibold">Nom</label>
            <input v-model="editForm.name" type="text" class="form-control" />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Code</label>
            <input v-model="editForm.code" type="text" class="form-control" />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Nom public</label>
            <input v-model="editForm.publicName" type="text" class="form-control" />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Description</label>
            <textarea v-model="editForm.description" class="form-control" rows="3"></textarea>
          </div>

          <div class="form-check">
            <input
              v-model="editForm.active"
              class="form-check-input"
              type="checkbox"
              id="activeCheck"
            />
            <label class="form-check-label" for="activeCheck">
              Méthode active
            </label>
          </div>
        </div>

        <div class="modal-footer-custom">
          <button class="btn btn-light px-4" @click="closeEditModal" :disabled="isSubmitting">
            Annuler
          </button>
          <button
            class="btn btn-primary px-4 d-flex align-items-center gap-2"
            @click="saveEdit"
            :disabled="isSubmitting"
          >
            <i v-if="isSubmitting" class="fa fa-spinner fa-spin"></i>
            <i v-else class="fa fa-save"></i>
            <span>{{ isSubmitting ? 'Enregistrement...' : 'Enregistrer' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- MODALE DÉTAILS -->
    <div v-if="showDetailsModal && selectedMethod" class="modal-overlay" @click.self="closeDetailsModal">
      <div class="modal-dialog-custom modal-dialog-large animate__animated animate__fadeInDown">
        <div class="modal-header-custom">
          <h5 class="mb-0 fw-bold">
            <i class="fas fa-eye text-primary me-2"></i>
            Détails de la méthode
          </h5>
          <button class="btn-close-custom" @click="closeDetailsModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body-custom">
          <!-- Badges -->
          <div class="d-flex gap-2 mb-4">
            <span
              class="badge badge-lg"
              :class="selectedMethod.isGlobal ? 'badge-global' : 'badge-insurer'"
            >
              <i :class="selectedMethod.isGlobal ? 'fas fa-globe' : 'fas fa-building'" class="me-1"></i>
              {{ selectedMethod.isGlobal ? 'Globale' : 'Assureur' }}
            </span>
            <span
              class="badge badge-lg"
              :class="selectedMethod.active ? 'badge-active' : 'badge-inactive'"
            >
              <i :class="selectedMethod.active ? 'fas fa-check-circle' : 'fas fa-pause-circle'" class="me-1"></i>
              {{ selectedMethod.active ? 'Active' : 'Inactive' }}
            </span>
          </div>

          <!-- Informations -->
          <div class="row g-3">
            <div class="col-md-6">
              <label class="small text-muted d-block mb-1">Nom</label>
              <p class="mb-0 fw-semibold">{{ selectedMethod.name }}</p>
            </div>

            <div class="col-md-6">
              <label class="small text-muted d-block mb-1">Code</label>
              <code class="d-block">{{ selectedMethod.code }}</code>
            </div>

            <div class="col-12">
              <label class="small text-muted d-block mb-1">Description</label>
              <p class="mb-0">{{ selectedMethod.description || 'Aucune description' }}</p>
            </div>

            <div class="col-md-6">
              <label class="small text-muted d-block mb-1">Nom public</label>
              <p class="mb-0">{{ selectedMethod.publicName || 'Non défini' }}</p>
            </div>

            <div class="col-md-6">
              <label class="small text-muted d-block mb-1">Moteur</label>
              <p class="mb-0">{{ selectedMethod.engine?.name || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <div class="modal-footer-custom">
          <button class="btn btn-light px-4" @click="closeDetailsModal">Fermer</button>
          <button class="btn btn-primary px-4" @click="openEditModal(selectedMethod); closeDetailsModal();">
            <i class="fas fa-edit me-2"></i>
            Éditer
          </button>
          <button
            class="btn btn-success px-4"
            @click="redirectToMethodLines(selectedMethod); closeDetailsModal();"
          >
            <i class="fas fa-list-alt me-2"></i>
            Voir les lignes
          </button>
        </div>
      </div>
    </div>

    <!-- MODALE GESTION DES LIGNES -->
    <MethodLinesManager
      v-if="showLinesManager && selectedMethod"
      :method="selectedMethod"
      @close="closeLinesManager"
    />
  </div>
</template>

<style scoped>
/* === VARIABLES === */
:root {
  --color-global: #198754;
  --color-insurer: #0d6efd;
  --color-active: #198754;
  --color-inactive: #6c757d;
}

/* === STAT CARDS === */
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  color: white;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 150%;
  height: 200%;
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(-15deg);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-gradient-success {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.bg-gradient-info {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.bg-gradient-warning {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.stat-icon {
  font-size: 2rem;
  opacity: 0.9;
}

.stat-content h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-content p {
  font-size: 0.875rem;
  opacity: 0.9;
}

/* === METHOD CARDS === */
.method-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.method-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.method-card-header {
  padding: 1.5rem;
  flex-grow: 1;
  border-bottom: 1px solid #f0f0f0;
}

.method-title {
  color: #1a1a1a;
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.4;
}

.method-code {
  font-size: 0.75rem;
  color: #6c757d;
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.method-description {
  color: #6c757d;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8em;
}

/* === BADGES === */
.badge-global {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
  font-weight: 600;
  padding: 0.35em 0.75em;
  border-radius: 6px;
}

.badge-insurer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  padding: 0.35em 0.75em;
  border-radius: 6px;
}

.badge-active {
  background: #d4edda;
  color: #155724;
  font-weight: 600;
  padding: 0.35em 0.75em;
  border-radius: 6px;
}

.badge-inactive {
  background: #f8d7da;
  color: #721c24;
  font-weight: 600;
  padding: 0.35em 0.75em;
  border-radius: 6px;
}

.badge-lg {
  padding: 0.5em 1em;
  font-size: 0.875rem;
}

/* === ACTIONS === */
.method-card-actions {
  padding: 1rem 1.5rem;
  background: #fafafa;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 80px;
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.action-btn-details {
  color: #6c757d;
  border-color: #6c757d;
}

.action-btn-details:hover {
  background: #6c757d;
  color: white;
}

.action-btn-edit {
  color: #0d6efd;
  border-color: #0d6efd;
}

.action-btn-edit:hover {
  background: #0d6efd;
  color: white;
}

.action-btn-builder {
  color: #198754;
  border-color: #198754;
}

.action-btn-builder:hover {
  background: #198754;
  color: white;
}

.action-btn-more {
  flex: 0;
  min-width: auto;
  padding: 0.5rem 0.75rem;
}

/* === MODALS === */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  backdrop-filter: blur(4px);
  padding: 1rem;
}

.modal-dialog-custom {
  background: white;
  border-radius: 16px;
  width: 600px;
  max-width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation-duration: 0.3s;
}

.modal-dialog-large {
  width: 800px;
}

.modal-header-custom {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-body-custom {
  padding: 2rem;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-footer-custom {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-close-custom {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6c757d;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.btn-close-custom:hover {
  background: #f8f9fa;
  color: #1a1a1a;
}

/* === DROPDOWN === */
.dropdown-menu {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: none;
}

.dropdown-item {
  padding: 0.6rem 1rem;
  transition: all 0.2s;
  border-radius: 6px;
  margin: 0 0.25rem;
}

.dropdown-item:hover {
  background: #f8f9fa;
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .method-card-actions {
    flex-direction: column;
  }

  .action-btn {
    min-width: 100%;
  }

  .stat-card {
    padding: 1rem;
  }
}

/* === ANIMATIONS === */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate__animated {
  animation-duration: 0.3s;
  animation-fill-mode: both;
}

.animate__fadeInDown {
  animation-name: fadeInDown;
}
</style>