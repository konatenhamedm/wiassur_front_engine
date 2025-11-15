<script lang="ts">
import { Component } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import Button from "@/components/ui/Button.vue";
import data from "@/data/branch-category-list.json";
import { mosaicApi } from "@/services/api/mosaic";
import type { Branch, Category } from "@/types";

@Component({
  name: "BranchCategoryList",
  components: { Card, CardHeader, Button },
})
export default class BranchCategoryList extends Vue {
  declare $router: any;

  categories: Category[] = data.categories;
  branches: Branch[] = [];
  selectedBranch: string = "";
  showModal: boolean = false;
  isSubmitting: boolean = false;

  form = {
    name: "",
    description: "",
    status: "DRAFT",
    branch: "",
  };

  mounted() {
    this.fetchBranches();
  }

  async fetchBranches(id?: string) {
    const response = id
      ? await mosaicApi.getOneBranche(id)
      : await mosaicApi.getBranches();

    if (response.code === 200) {
      // @ts-ignore
      this.branches = response.data;
      console.log("✅ Branches chargées :", this.branches.length);
    }
  }

  // --- Filtrage des branches
  onCurrentBranchChange(e: any) {
    this.selectedBranch = e.target.value;
    console.log("🌿 Filtre appliqué :", this.selectedBranch);
    this.fetchBranches(this.selectedBranch);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.form = { name: "", description: "", status: "DRAFT", branch: "" };
  }

  // --- Création du moteur
  async createEngine() {
    if (!this.form.name.trim() || !this.form.branch) {
      alert("Veuillez renseigner le nom et la branche du moteur !");
      return;
    }

    this.isSubmitting = true;
    console.log("🚀 Envoi des données :", this.form);

    try {
      const response = await fetch(`http://localhost:8000/api/engine/engineBranch/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      });

      const text = await response.text();
      let res;
      try {
        res = JSON.parse(text);
      } catch {
        console.error("⚠️ Réponse non JSON :", text);
        throw new Error("Le serveur n'a pas renvoyé de JSON valide");
      }

      console.log("✅ Réponse API :", res);

      this.closeModal();
      this.fetchBranches(this.form.branch);
    } catch (err) {
      console.error("Erreur API :", err);
      alert("Erreur réseau ou serveur. Consultez la console.");
    } finally {
      this.isSubmitting = false;
    }
  }

  // --- Style du sticker selon le statut
  getStatusClass(status: string): string {
    switch (status) {
      case "ACTIVE":
        return "status-active";
      case "DEPRECATED":
        return "status-deprecated";
      case "ARCHIVED":
        return "status-archived";
      default:
        return "status-draft";
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case "ACTIVE":
        return "fas fa-check-circle";
      case "DEPRECATED":
        return "fas fa-exclamation-triangle";
      case "ARCHIVED":
        return "fas fa-archive";
      default:
        return "fas fa-pencil-alt";
    }
  }
}
</script>

<template>
  <div class="container-fluid p-4 branch-category-container">
    <!-- HEADER AVEC DÉGRADÉ -->
    <div class="header-section mb-5">
      <div class="d-flex justify-content-between align-items-center">
        <div class="header-content">
          <h1 class="page-title">
            <i class="fas fa-cogs gradient-icon me-3"></i>
            Liste des Moteurs
          </h1>
          <p class="page-subtitle">Gérez et organisez vos moteurs de calcul</p>
        </div>

        <div class="header-actions">
          <!-- FILTRE STYLISÉ -->
          <div class="filter-container me-3">
            <i class="fas fa-filter filter-icon"></i>
            <select
              class="form-select-styled"
              @change="onCurrentBranchChange"
            >
              <option value="">Toutes les branches</option>
              <optgroup
                v-for="categorie in categories"
                :key="categorie.uuid"
                :label="categorie.label"
              >
                <option
                  v-for="branch in categorie.branches"
                  :key="branch.uuid"
                  :value="branch.uuid"
                >
                  {{ branch.label }}
                </option>
              </optgroup>
            </select>
          </div>

          <!-- BOUTON PRIMAIRE AVEC DÉGRADÉ -->
          <Button
            variant="primary"
            class="btn-glow"
            @click="openModal"
          >
            <i class="fas fa-plus me-2"></i>
            Nouveau Moteur
          </Button>
        </div>
      </div>
    </div>

    <!-- STATISTIQUES RAPIDES -->
    <div class="stats-container mb-5">
      <div class="row g-4">
        <div class="col-md-3">
          <div class="stat-card total-engines">
            <div class="stat-icon">
              <i class="fas fa-cogs"></i>
            </div>
            <div class="stat-content">
              <h3>{{ branches.length }}</h3>
              <p>Moteurs Total</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card active-engines">
            <div class="stat-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-content">
              <h3>{{ branches.filter(b => b.status === 'ACTIVE').length }}</h3>
              <p>Moteurs Actifs</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card draft-engines">
            <div class="stat-icon">
              <i class="fas fa-pencil-alt"></i>
            </div>
            <div class="stat-content">
              <h3>{{ branches.filter(b => b.status === 'DRAFT').length }}</h3>
              <p>En Brouillon</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card categories-count">
            <div class="stat-icon">
              <i class="fas fa-layer-group"></i>
            </div>
            <div class="stat-content">
              <h3>{{ categories.length }}</h3>
              <p>Catégories</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- LISTE DES MOTEURS AVEC DESIGN MODERNE -->
    <div class="engines-grid">
      <div 
        class="engine-card" 
        v-for="branch in branches" 
        :key="branch.uuid"
        @click="$router.push(`/configuration/engine-branches/${branch.id}/methods`)"
      >
        <!-- BADGE DE STATUT -->
        <div class="status-badge" :class="getStatusClass(branch.status || 'DRAFT')">
          <i :class="getStatusIcon(branch.status || 'DRAFT')" class="me-1"></i>
          {{ branch.status || 'DRAFT' }}
        </div>

        <!-- CONTENU DE LA CARTE -->
        <div class="card-icon">
          <i class="fas fa-cogs"></i>
        </div>
        
        <div class="card-content">
          <h3 class="card-title">{{ branch.name }}</h3>
          <p class="card-description">
            {{ branch.description || 'Aucune description fournie' }}
          </p>
        </div>

        <!-- FOOTER DE LA CARTE -->
        <div class="card-footer">
          <div class="card-meta">
            <i class="fas fa-calendar me-1"></i>
            <small>Créé récemment</small>
          </div>
          <div class="card-arrow">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>

        <!-- EFFET DE SURVOL -->
        <div class="card-hover-effect"></div>
      </div>
    </div>

    <!-- ÉTAT VIDE STYLISÉ -->
    <div class="empty-state" v-if="branches.length === 0">
      <div class="empty-icon">
        <i class="fas fa-cogs"></i>
      </div>
      <h3>Aucun moteur trouvé</h3>
      <p>Commencez par créer votre premier moteur de calcul</p>
      <Button variant="primary" class="btn-glow" @click="openModal">
        <i class="fas fa-plus me-2"></i>
        Créer un moteur
      </Button>
    </div>

    <!-- MODALE MODERNE -->
    <div v-if="showModal" class="modal-overlay-styled" @click.self="closeModal">
      <div class="modal-styled animate__animated animate__fadeInUp">
        <!-- EN-TÊTE DE LA MODALE -->
        <div class="modal-header-styled">
          <div class="modal-title-section">
            <i class="fas fa-plus-circle modal-title-icon"></i>
            <div>
              <h3>Créer un nouveau moteur</h3>
              <p>Configurez votre moteur de calcul</p>
            </div>
          </div>
          <button class="modal-close-btn" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- CORPS DE LA MODALE -->
        <div class="modal-body-styled">
          <div class="form-group-styled">
            <label for="name" class="form-label-styled">
              <i class="fas fa-tag me-2"></i>
              Nom du moteur <span class="required">*</span>
            </label>
            <input
              v-model="form.name"
              id="name"
              type="text"
              class="form-control-styled"
              placeholder="Ex: Moteur principal de calcul"
            />
          </div>

          <div class="form-group-styled">
            <label for="branch" class="form-label-styled">
              <i class="fas fa-code-branch me-2"></i>
              Branche <span class="required">*</span>
            </label>
            <select v-model="form.branch" id="branch" class="form-select-styled">
              <option disabled value="">-- Sélectionner une branche --</option>
              <optgroup
                v-for="categorie in categories"
                :key="categorie.uuid"
                :label="categorie.label"
              >
                <option
                  v-for="branch in categorie.branches"
                  :key="branch.uuid"
                  :value="branch.uuid"
                >
                  {{ branch.label }}
                </option>
              </optgroup>
            </select>
          </div>

          <div class="form-group-styled">
            <label for="description" class="form-label-styled">
              <i class="fas fa-align-left me-2"></i>
              Description
            </label>
            <textarea
              v-model="form.description"
              id="description"
              class="form-control-styled"
              rows="3"
              placeholder="Décrivez l'objectif de ce moteur..."
            ></textarea>
          </div>

          <div class="form-group-styled">
            <label for="status" class="form-label-styled">
              <i class="fas fa-circle me-2"></i>
              Statut
            </label>
            <select v-model="form.status" id="status" class="form-select-styled">
              <option value="DRAFT">Brouillon</option>
              <option value="ACTIVE">Actif</option>
              <option value="DEPRECATED">Déprécié</option>
              <option value="ARCHIVED">Archivé</option>
            </select>
          </div>
        </div>

        <!-- PIED DE LA MODALE -->
        <div class="modal-footer-styled">
          <button class="btn-cancel" @click="closeModal" :disabled="isSubmitting">
            Annuler
          </button>
          <button
            class="btn-submit"
            @click="createEngine"
            :disabled="isSubmitting"
          >
            <i v-if="isSubmitting" class="fas fa-spinner fa-spin me-2"></i>
            <i v-else class="fas fa-plus me-2"></i>
            {{ isSubmitting ? "Création..." : "Créer le moteur" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* VARIABLES ET STYLES GLOBAUX */
.branch-category-container {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
}

/* HEADER STYLISÉ */
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 20px;
  color: white;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0;
}

.gradient-icon {
  background: linear-gradient(45deg, #fff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* CONTENEUR D'ACTIONS DU HEADER */
.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* FILTRE STYLISÉ */
.filter-container {
  position: relative;
  display: inline-block;
}

.filter-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  z-index: 2;
}

.form-select-styled {
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.form-select-styled:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* BOUTON AVEC EFFET GLOW */
.btn-glow {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
  transition: all 0.3s ease;
}

.btn-glow:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(79, 172, 254, 0.6);
}

/* STATISTIQUES */
.stats-container {
  margin: 2rem 0;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.stat-content h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #1e293b;
}

.stat-content p {
  color: #64748b;
  font-weight: 500;
  margin-bottom: 0;
}

.total-engines .stat-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.active-engines .stat-icon { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); }
.draft-engines .stat-icon { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.categories-count .stat-icon { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }

/* GRILLE DES MOTEURS */
.engines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.engine-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.engine-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* BADGE DE STATUT */
.status-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-active {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.status-draft {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.status-deprecated {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.status-archived {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: white;
}

/* ICÔNE DE LA CARTE */
.card-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: white;
}

/* CONTENU DE LA CARTE */
.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.card-description {
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

/* FOOTER DE LA CARTE */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.card-meta {
  display: flex;
  align-items: center;
  color: #94a3b8;
  font-size: 0.875rem;
}

.card-arrow {
  width: 35px;
  height: 35px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.3s ease;
}

.engine-card:hover .card-arrow {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateX(5px);
}

/* EFFET DE SURVOL */
.card-hover-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.8s ease;
}

.engine-card:hover .card-hover-effect {
  left: 100%;
}

/* ÉTAT VIDE */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  margin-top: 2rem;
}

.empty-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-size: 2.5rem;
  color: #64748b;
}

.empty-state h3 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 600;
}

.empty-state p {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

/* MODALE STYLISÉE */
.modal-overlay-styled {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  backdrop-filter: blur(8px);
  padding: 1rem;
}

.modal-styled {
  background: white;
  border-radius: 24px;
  width: 500px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(15, 23, 42, 0.25);
  animation-duration: 0.4s;
}

/* EN-TÊTE DE LA MODALE */
.modal-header-styled {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.modal-title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.modal-title-icon {
  font-size: 2rem;
  opacity: 0.9;
}

.modal-header-styled h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.modal-header-styled p {
  opacity: 0.9;
  margin-bottom: 0;
  font-size: 0.95rem;
}

.modal-close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

/* CORPS DE LA MODALE */
.modal-body-styled {
  padding: 2rem;
  max-height: 60vh;
  overflow-y: auto;
}

/* FORMULAIRES STYLISÉS */
.form-group-styled {
  margin-bottom: 1.5rem;
}

.form-label-styled {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.required {
  color: #ef4444;
}

.form-control-styled,
.form-select-styled {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-control-styled:focus,
.form-select-styled:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-control-styled::placeholder {
  color: #9ca3af;
}

/* PIED DE LA MODALE */
.modal-footer-styled {
  padding: 1.5rem 2rem;
  background: #f8fafc;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  border-top: 1px solid #e5e7eb;
}

.btn-cancel {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e5e7eb;
  background: white;
  color: #374151;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-cancel:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}

.btn-submit {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* ANIMATIONS */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate__animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

.animate__fadeInUp {
  animation-name: fadeInUp;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .header-section {
    padding: 1.5rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .header-actions {
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }
  
  .filter-container {
    width: 100%;
  }
  
  .engines-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-container .row {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .modal-styled {
    width: 95vw;
  }
  
  .modal-header-styled {
    padding: 1.5rem;
  }
  
  .modal-body-styled {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .stats-container .row {
    grid-template-columns: 1fr;
  }
  
  .engine-card {
    padding: 1.5rem;
  }
  
  .modal-footer-styled {
    flex-direction: column;
  }
  
  .btn-cancel,
  .btn-submit {
    width: 100%;
  }
}
</style>