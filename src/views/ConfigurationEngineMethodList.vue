<script lang="ts">
import MethodActionsCell from "@/components/engine/MethodActionsCell.vue";
import Button from "@/components/ui/Button.vue";
import Card from "@/components/ui/Card.vue";
import CardBody from "@/components/ui/CardBody.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import TanStackDataTable from "@/components/ui/TanStackDataTable.vue";
import data from "@/data/insurer-list.json";
import Engine from "@/entity/Engine";
import type { EngineMethod } from "@/types";
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import { Component, Vue } from "vue-facing-decorator";

@Component({
  name: "ConfigurationEngineMethodList",
  components: {
    Card,
    CardHeader,
    CardBody,
    Button,
    TanStackDataTable,
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

  // Modale de création
  public showModal = false;
  public isSubmitting = false;
  public form = {
    name: "",
    code: "",
    publicName: "",
    description: "",
    engineBranch: "",
    insurer: "",
  };

  get selectedInsurerLabel(): string | null {
    if (!this.selectedInsurerUuid) return null;
    const it = this.insurers.find((i: any) => i.uuid === this.selectedInsurerUuid);
    return it ? it.label : null;
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

  // ---- Créer une méthode ----
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
      console.log("✅ Réponse API création méthode :", res);

      if (response.ok && (res.code === 200 || res.code === 201)) {
        alert("🎉 Méthode créée avec succès !");
        this.closeModal();
        this.fetchEngineMethods(branchSlug, this.selectedInsurerUuid || null);
      } else {
        alert(" Erreur lors de la création : " + (res.message || "Inconnue"));
      }
    } catch (err) {
      console.error("Erreur API :", err);
      alert("Erreur réseau ou serveur.");
    } finally {
      this.isSubmitting = false;
    }
  }

  openModal() {
    const branchSlug = this.$route.params.branchSlug;
    this.form.engineBranch = branchSlug;
    this.form.insurer = this.selectedInsurerUuid;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.form = {
      name: "",
      code: "",
      publicName: "",
      description: "",
      engineBranch: this.$route.params.branchSlug,
      insurer: this.selectedInsurerUuid,
    };
  }

  // ---- Gestion des actions ----
  handleEditMethod(methodId: number) {
    console.log('Éditer méthode:', methodId);
    // Implémentez votre logique d'édition ici
  }

  handleUpdateMethod(method: EngineMethod) {
    console.log('Mettre à jour méthode:', method);
    // Implémentez votre logique de mise à jour ici
  }

  handleDeleteMethod(methodId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette méthode ?')) {
      console.log('Supprimer méthode:', methodId);
      // Implémentez votre logique de suppression ici
    }
  }

  handleToggleDetails(method: EngineMethod) {
    console.log('Toggle détails:', method);
    // Implémentez votre logique de toggle ici
  }

  handleDuplicateToInsurer(methodId: number, insurerId: number) {
    console.log('Dupliquer méthode:', methodId, 'vers assureur:', insurerId);
    // Implémentez votre logique de duplication ici
  }

  public selectInsurer(uuid: string) {
    this.selectedInsurerUuid = uuid;
    this.dropdownOpen = false;
    const branchSlug = this.$route.params.branchSlug as string;
    this.fetchEngineMethods(branchSlug, uuid || null);
  }

  public columns: ColumnDef<EngineMethod>[] = [
    { header: "Nom", accessorKey: "name" },
    { header: "Code", accessorKey: "code" },
    { header: "Description", accessorKey: "description" },
    {
      id: "actions",
      header: "Actions",
      accessorKey: "actions",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => h(MethodActionsCell, { 
        method: row.original,
        insurers: this.insurers,
        showDuplicate: !row.original.isGlobal,
        onEditMethod: (methodId: number) => this.handleEditMethod(methodId),
        onUpdateMethod: (method: EngineMethod) => this.handleUpdateMethod(method),
        onDeleteMethod: (methodId: number) => this.handleDeleteMethod(methodId),
        onToggleDetails: (method: EngineMethod) => this.handleToggleDetails(method),
        onDuplicateToInsurer: (methodId: number, insurerId: number) => this.handleDuplicateToInsurer(methodId, insurerId)
      }),
    },
  ];

  mounted() {
    const branchSlug = this.$route.params.branchSlug as string;
    this.fetchEngineMethods(branchSlug);
  }
}
</script>

<template>
  <div class="container-fluid p-4 d-flex flex-column gap-2">
    <!-- ENTÊTE -->
    <Card class="mb-4">
      <CardHeader>
        <div class="d-flex justify-content-between align-items-center gap-4">
          <div class="d-flex gap-2 align-items-center">
            <Button
              variant="light"
              size="sm"
              icon="fas fa-arrow-left"
              @click="$router.push('/configuration/engine-branches')"
              class="me-2"
            >
              Retour
            </Button>

            <h6 class="mb-0">
              <i class="fas fa-cogs"></i>
              {{ engine ? engine.name : "Méthodes du moteur" }}
            </h6>
          </div>

          <Button
            variant="primary"
            size="sm"
            class="d-flex align-items-center gap-2"
            @click="openModal"
          >
            <i class="fa fa-plus"></i> Nouvelle méthode
          </Button>
        </div>
      </CardHeader>
    </Card>

    <!-- LISTE DES MÉTHODES -->
    <Card class="mb-4">
      <CardHeader>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="mb-0">
            <i class="fa fa-building"></i> Liste des méthodes
          </h4>

          <!-- Dropdown assureurs -->
          <div class="dropdown position-relative">
            <button
              class="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              @click="
                dropdownOpen = !dropdownOpen;
                if (dropdownOpen) $nextTick(() => (searchQuery = ''));
              "
            >
              <img
                v-if="selectedInsurerUuid"
                src="/src/assets/img/insurer.png"
                alt=""
                style="width: 18px; height: 18px"
              />
              <span>{{ selectedInsurerLabel || "Globales" }}</span>
            </button>

            <ul
              v-show="dropdownOpen"
              class="dropdown-menu show p-1"
              style="
                max-height: 400px;
                overflow: auto;
                position: absolute;
                right: 0;
                top: 100%;
                width: 260px;
              "
            >
              <li class="p-2">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control rounded"
                  placeholder="Rechercher..."
                  @keydown.stop
                />
              </li>
              <li>
                <a href="#" class="dropdown-item" @click.prevent="selectInsurer('')">
                  Globales
                </a>
              </li>
              <li class="dropdown-divider">Assureurs</li>
              <li v-for="insurer in filteredInsurers" :key="insurer.uuid">
                <a
                  href="#"
                  class="dropdown-item d-flex align-items-center gap-2"
                  @click.prevent="selectInsurer(insurer.uuid)"
                >
                  <img
                    src="/src/assets/img/insurer.png"
                    alt=""
                    style="width: 18px; height: 18px"
                  />
                  <span>{{ insurer.label }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </CardHeader>

      <CardBody style="min-height: 60vh">
        <div v-if="isLoading" class="text-center py-5 text-muted">
          <i class="fa fa-spinner fa-spin fa-2x mb-3"></i>
          <div>Chargement des méthodes...</div>
        </div>

        <TanStackDataTable
          v-else
          :columns="columns"
          :data="engineMethods"
          :pagination="{ pageSize: 10 }"
          class="mb-4"
        />
      </CardBody>
    </Card>

    <!-- 🌟 MODALE DE CRÉATION -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content animate__animated animate__fadeInDown">
        <h5 class="mb-3">
          <i class="fa fa-plus-circle text-primary"></i> Créer une nouvelle méthode
        </h5>

        <div class="form-group mb-3">
          <label for="name">Nom <span class="text-danger">*</span></label>
          <input
            v-model="form.name"
            id="name"
            type="text"
            class="form-control"
            placeholder="Ex: Calcul Prime Auto"
          />
        </div>

        <div class="form-group mb-3">
          <label for="code">Code <span class="text-danger">*</span></label>
          <input
            v-model="form.code"
            id="code"
            type="text"
            class="form-control"
            placeholder="Ex: CALC_PRIME_AUTO"
          />
        </div>

        <div class="form-group mb-3">
          <label for="publicName">Nom public</label>
          <input
            v-model="form.publicName"
            id="publicName"
            type="text"
            class="form-control"
            placeholder="Ex: Prime automobile"
          />
        </div>

        <div class="form-group mb-3">
          <label for="description">Description</label>
          <textarea
            v-model="form.description"
            id="description"
            class="form-control"
            placeholder="Description de la méthode..."
          ></textarea>
        </div>

        <div class="d-flex justify-content-end gap-3">
          <button class="btn btn-light" @click="closeModal" :disabled="isSubmitting">
            Annuler
          </button>
          <button
            class="btn btn-primary d-flex align-items-center gap-2"
            @click="createMethod"
            :disabled="isSubmitting"
          >
            <i v-if="isSubmitting" class="fa fa-spinner fa-spin"></i>
            <span>{{ isSubmitting ? "Création..." : "Créer" }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  backdrop-filter: blur(2px);
}
.modal-content {
  background: white;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  padding: 25px 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  animation-duration: 0.3s;
}
</style>