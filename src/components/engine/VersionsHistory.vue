<!-- src/components/engine/VersionsHistory.vue -->
<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import Button from '@/components/ui/Button.vue';

interface Version {
  id: number;
  versionNumber: number;
  createdAt: string;
  snapshotJson: any;
}

@Component({
  name: 'VersionsHistory',
  components: {
    Button
  }
})
export default class VersionsHistory extends Vue {
  @Prop({ required: true }) lineId!: number;

  public versions: Version[] = [];
  public isLoading = false;
  public selectedVersion: Version | null = null;

  declare $emit: (event: 'error', message: string) => void;

  async mounted() {
    await this.loadVersions();
  }

  async loadVersions() {
    this.isLoading = true;
    try {
      const response = await fetch(`http://localhost:8000/api/method-lines/${this.lineId}/versions`);
      const res = await response.json();
      
      if (res.code === 200) {
        this.versions = res.data;
        this.versions.sort((a, b) => b.versionNumber - a.versionNumber);
      } else {
        this.$emit('error', 'Erreur lors du chargement des versions');
      }
    } catch (error) {
      console.error('Erreur chargement versions:', error);
      this.$emit('error', 'Erreur réseau');
    } finally {
      this.isLoading = false;
    }
  }

  selectVersion(version: Version) {
    this.selectedVersion = version;
  }

  formatDate(dateString: string) {
    return new Date(dateString).toLocaleString('fr-FR');
  }

  async restoreVersion(versionId: number) {
    if (!confirm('Êtes-vous sûr de vouloir restaurer cette version ? Les modifications actuelles seront perdues.')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/versions/${versionId}/restore`, {
        method: 'POST'
      });

      const res = await response.json();
      
      if (res.code === 200) {
        alert('Version restaurée avec succès !');
        this.$emit('error', ''); // Clear any previous errors
      } else {
        this.$emit('error', res.message || 'Erreur lors de la restauration');
      }
    } catch (error) {
      console.error('Erreur restauration:', error);
      this.$emit('error', 'Erreur réseau');
    }
  }
}
</script>

<template>
  <div class="versions-history">
    <div class="row h-100">
      <!-- Liste des versions -->
      <div class="col-md-5 border-end">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h6 class="mb-0">Historique des versions</h6>
          <Button
            variant="outline-secondary"
            size="sm"
            icon="fas fa-sync"
            @click="loadVersions"
            :disabled="isLoading"
            title="Rafraîchir"
          />
        </div>

        <div v-if="isLoading" class="text-center py-3">
          <i class="fas fa-spinner fa-spin me-2"></i>
          Chargement...
        </div>

        <div v-else-if="versions.length === 0" class="text-center py-5 text-muted">
          <i class="fas fa-history fa-2x mb-3"></i>
          <p>Aucune version sauvegardée</p>
        </div>

        <div v-else class="versions-list">
          <div
            v-for="version in versions"
            :key="version.id"
            class="version-item card mb-2"
            :class="{ 'border-primary': selectedVersion?.id === version.id }"
            @click="selectVersion(version)"
          >
            <div class="card-body py-2">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h6 class="card-title mb-1">
                    Version #{{ version.versionNumber }}
                  </h6>
                  <small class="text-muted">
                    {{ formatDate(version.createdAt) }}
                  </small>
                </div>
                <Button
                  variant="outline-warning"
                  size="sm"
                  icon="fas fa-undo"
                  @click.stop="restoreVersion(version.id)"
                  title="Restaurer cette version"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Détails de la version -->
      <div class="col-md-7">
        <div v-if="!selectedVersion" class="text-center py-5 text-muted">
          <i class="fas fa-info-circle fa-2x mb-3"></i>
          <h6>Sélectionnez une version</h6>
          <p>Choisissez une version dans la liste pour voir son contenu</p>
        </div>

        <div v-else class="version-details">
          <h6 class="mb-3">
            Détails de la version #{{ selectedVersion.versionNumber }}
            <small class="text-muted ms-2">
              {{ formatDate(selectedVersion.createdAt) }}
            </small>
          </h6>

          <div class="mb-3">
            <label class="form-label fw-semibold">Snapshot complet</label>
            <pre class="bg-light p-3 rounded small"><code>{{ JSON.stringify(selectedVersion.snapshotJson, null, 2) }}</code></pre>
          </div>

          <div class="alert alert-warning">
            <i class="fas fa-exclamation-triangle me-2"></i>
            La restauration d'une version écrasera la configuration actuelle.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.versions-history {
  height: 100%;
  overflow-y: auto;
}

.versions-list {
  max-height: 600px;
  overflow-y: auto;
}

.version-item {
  cursor: pointer;
  transition: all 0.2s ease;
}

.version-item:hover {
  border-color: #0d6efd;
  transform: translateX(2px);
}

.version-details {
  max-height: 600px;
  overflow-y: auto;
}

pre {
  max-height: 400px;
  overflow-y: auto;
  font-size: 0.8em;
}

.small {
  font-size: 0.875em;
}
</style>