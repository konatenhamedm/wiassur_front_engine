
<template>
  <div class="container-fluid p-4">
    <!-- HEADER -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center gap-3">
        <button
          class="btn btn-light rounded-circle shadow-sm"
          style="width: 45px; height: 45px"
          @click="goBack"
        >
          <i class="fas fa-arrow-left"></i>
        </button>
        <div>
          <h3 class="mb-0 fw-bold">
            <i class="fas fa-list-alt text-primary me-2"></i>
            Lignes de la méthode
          </h3>
          <p class="text-muted mb-0 small">
            Méthode: <strong>{{ methodName }}</strong> • 
            Branche: <strong>{{ branchSlug }}</strong>
          </p>
        </div>
      </div>

      <div class="d-flex gap-2">
        <Button variant="primary" @click="openCreateLineModal">
          <i class="fa fa-plus me-2"></i>
          Nouvelle ligne
        </Button>
      </div>
    </div>

    <!-- FILTRES ET STATISTIQUES -->
    <Card class="mb-4 border-0 shadow-sm">
      <CardBody class="py-3">
        <div class="row g-3 align-items-center">
          <div class="col-md-3">
            <label class="form-label fw-semibold small mb-1">Filtrer par type</label>
            <select v-model="filters.lineType" class="form-select form-select-sm" @change="applyFilters">
              <option value="">Tous les types</option>
              <option value="calculation">Calcul</option>
              <option value="validation">Validation</option>
              <option value="condition">Condition</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label fw-semibold small mb-1">Ordre</label>
            <select v-model="filters.order" class="form-select form-select-sm" @change="applyFilters">
              <option value="asc">Croissant</option>
              <option value="desc">Décroissant</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small mb-1">Recherche</label>
            <div class="input-group input-group-sm">
              <input
                v-model="filters.search"
                type="text"
                class="form-control"
                placeholder="Rechercher une ligne..."
                @input="applyFilters"
              >
              <button class="btn btn-outline-secondary" @click="clearFilters">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>

    <!-- STATISTIQUES -->
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <div class="stat-card bg-gradient-primary">
          <div class="stat-icon">
            <i class="fas fa-list"></i>
          </div>
          <div class="stat-content">
            <h3 class="mb-0">{{ statistics.totalLines }}</h3>
            <p class="mb-0">Lignes totales</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card bg-gradient-success">
          <div class="stat-icon">
            <i class="fas fa-calculator"></i>
          </div>
          <div class="stat-content">
            <h3 class="mb-0">{{ statistics.calculationLines }}</h3>
            <p class="mb-0">Calculs</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card bg-gradient-info">
          <div class="stat-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-content">
            <h3 class="mb-0">{{ statistics.validationLines }}</h3>
            <p class="mb-0">Validations</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card bg-gradient-warning">
          <div class="stat-icon">
            <i class="fas fa-code-branch"></i>
          </div>
          <div class="stat-content">
            <h3 class="mb-0">{{ statistics.conditionLines }}</h3>
            <p class="mb-0">Conditions</p>
          </div>
        </div>
      </div>
    </div>

    <!-- LISTE DES LIGNES -->
    <Card class="border-0 shadow-sm">
      <CardHeader class="bg-light">
        <h5 class="mb-0">
          <i class="fas fa-bars me-2"></i>
          Liste des lignes ({{ filteredLines.length }})
        </h5>
      </CardHeader>
      <CardBody>
        <!-- LOADING -->
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" style="width: 3rem; height: 3rem"></div>
          <p class="text-muted mt-3">Chargement des lignes...</p>
        </div>

        <!-- EMPTY STATE -->
        <div v-else-if="filteredLines.length === 0" class="text-center py-5">
          <div class="mb-4">
            <i class="fas fa-inbox fa-4x text-muted opacity-50"></i>
          </div>
          <h5 class="text-muted mb-2">Aucune ligne trouvée</h5>
          <p class="text-muted mb-4">
            {{ hasActiveFilters ? 'Aucune ligne ne correspond aux filtres' : 'Cette méthode ne contient aucune ligne de configuration' }}
          </p>
          <Button variant="primary" @click="openCreateLineModal">
            <i class="fa fa-plus me-2"></i>
            Ajouter la première ligne
          </Button>
        </div>

        <!-- LIGNES -->
        <div v-else class="method-lines-container">
          <div
            v-for="line in filteredLines"
            :key="line.id"
            class="method-line-card"
          >
            <div class="line-header">
              <div class="line-info">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <span class="line-order badge bg-primary">#{{ line.orderIndex }}</span>
                  <span class="line-type-badge" :class="getLineTypeClass(line.lineType)">
                    <i :class="getLineTypeIcon(line.lineType)" class="me-1"></i>
                    {{ getLineTypeLabel(line.lineType) }}
                  </span>
                  <span v-if="line.resultVariable" class="variable-badge">
                    <i class="fas fa-code me-1"></i>
                    {{ line.resultVariable }}
                  </span>
                </div>
                <h6 class="line-title">{{ line.expression || 'Ligne sans expression' }}</h6>
                <div class="line-meta">
                  <small class="text-muted">
                    <i class="fas fa-clock me-1"></i>
                    Créé le {{ formatDate(line.createdAt) }}
                  </small>
                  <small class="text-muted ms-3">
                    <i class="fas fa-layer-group me-1"></i>
                    {{ line.versions?.length || 0 }} version(s)
                  </small>
                  <small v-if="line.places?.length" class="text-muted ms-3">
                    <i class="fas fa-puzzle-piece me-1"></i>
                    {{ line.places.length }} place(s)
                  </small>
                </div>
              </div>
              
              <!-- BOUTONS D'ACTION DANS LA GRILLE -->
              <div class="line-actions-grid">
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="openLineDetails(line)"
                  title="Détails"
                >
                  <i class="fas fa-eye"></i> Détails
                </button>
                <button
                  class="btn btn-sm btn-outline-secondary"
                  @click="openEditLineModal(line)"
                  title="Éditer"
                >
                  <i class="fas fa-edit"></i> Éditer
                </button>
                <button
                  v-if="line.lineType !== 'calculation'"
                  class="btn btn-sm btn-outline-warning"
                  @click="openConditionModal(line)"
                  title="Gérer les conditions"
                >
                  <i class="fas fa-filter"></i> Conditions
                </button>
                <button
                  class="btn btn-sm btn-outline-info"
                  @click="openPlacesModal(line)"
                  title="Gérer les places"
                >
                  <i class="fas fa-puzzle-piece"></i> Places
                </button>
                <button
                  class="btn btn-sm btn-outline-info"
                  @click="manageVersions(line)"
                  title="Versions"
                >
                  <i class="fas fa-history"></i> Versions
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="deleteLine(line)"
                  title="Supprimer"
                >
                  <i class="fas fa-trash"></i> Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>

    <!-- MODALE PRINCIPALE AGRANDIE -->
    <div v-if="showCreateLineModal || showEditLineModal" class="modal-overlay" @click.self="closeLineModal">
      <div class="modal-dialog-custom modal-dialog-extra-large animate__animated animate__fadeInDown">
        <div class="modal-header-custom">
          <h4 class="mb-0 fw-bold">
            <i class="fas fa-plus-circle text-primary me-2"></i>
            {{ editingLine ? 'Éditer la ligne' : 'Nouvelle ligne de méthode' }}
          </h4>
          <button class="btn-close-custom" @click="closeLineModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body-custom">
          <div class="container-fluid">
            <div class="row">
              <!-- COLONNE GAUCHE - CONFIGURATION (plus large) -->
              <div class="col-md-7 border-end p-4">
                <div class="config-section">
                  <h5 class="section-title mb-4">
                    <i class="fas fa-cog me-2"></i>
                    Configuration de base
                  </h5>
                  
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label fw-semibold">
                        Ordre d'exécution <span class="text-danger">*</span>
                      </label>
                      <input
                        v-model.number="lineForm.orderIndex"
                        type="number"
                        class="form-control"
                        min="1"
                        :max="maxOrder + 1"
                      />
                    </div>

                    <div class="col-md-6">
                      <label class="form-label fw-semibold">Type de ligne</label>
                      <select v-model="lineForm.lineType" class="form-select" @change="onLineTypeChange">
                        <option value="calculation">Calcul</option>
                        <option value="validation">Validation</option>
                        <option value="condition">Condition</option>
                      </select>
                    </div>

                    <div class="col-12">
                      <label class="form-label fw-semibold">Variable de résultat</label>
                      <input
                        v-model="lineForm.resultVariable"
                        type="text"
                        class="form-control"
                        placeholder="Ex: prime_totale"
                      />
                    </div>
                  </div>

                  <!-- BOUTONS POUR OUVRIR LES MODALES SPÉCIFIQUES -->
                  <div class="action-buttons mt-4">
                    <button
                      v-if="lineForm.lineType !== 'calculation'"
                      class="btn btn-outline-warning w-100 mb-3"
                      @click="openConditionModalFromForm"
                    >
                      <i class="fas fa-filter me-2"></i>
                      Gérer les groupes de conditions
                    </button>
                    
                    <button
                      class="btn btn-outline-info w-100"
                      @click="openPlacesModalFromForm"
                    >
                      <i class="fas fa-puzzle-piece me-2"></i>
                      Gérer les éléments d'expression (Places)
                    </button>
                  </div>
                </div>
              </div>

              <!-- COLONNE DROITE - EXPRESSION (plus large) -->
              <div class="col-md-5 p-4">
                <div class="expression-section">
                  <h5 class="section-title mb-4">
                    <i class="fas fa-calculator me-2"></i>
                    Expression principale
                  </h5>

                  <div class="mb-4">
                    <label class="form-label fw-semibold">
                      Expression <span class="text-danger">*</span>
                    </label>
                    <textarea
                      v-model="lineForm.expression"
                      class="form-control"
                      rows="10"
                      placeholder="Entrez votre expression ou utilisez le builder..."
                      style="min-height: 150px;"
                    ></textarea>
                  </div>

                  <!-- BOUTON POUR OUVRIR LE BUILDER COMPLET -->
                  <div class="text-center">
                    <button
                      class="btn btn-outline-primary"
                      @click="openExpressionBuilder"
                    >
                      <i class="fas fa-cogs me-2"></i>
                      Ouvrir le builder d'expression
                    </button>
                  </div>

                  <!-- Aperçu des places existantes -->
                  <div v-if="lineForm.places?.length" class="mt-4">
                    <h6 class="section-subtitle mb-3">
                      <i class="fas fa-puzzle-piece me-2"></i>
                      Éléments d'expression ({{ lineForm.places.length }})
                    </h6>
                    <div class="places-preview">
                      <div 
                        v-for="place in sortedPlaces" 
                        :key="place.id"
                        class="place-preview-item"
                      >
                        <span class="place-preview-order">#{{ place.orderIndex }}</span>
                        <span class="place-preview-value">
                          <span v-if="place.argument">
                            {{ place.argument.code }}
                          </span>
                          <span v-else-if="place.operator">
                            {{ place.operator }}
                          </span>
                          <span v-else-if="place.literalValue">
                            "{{ place.literalValue }}"
                          </span>
                        </span>
                        <span class="place-preview-type" :class="getPlaceTypeClass(place)">
                          {{ getPlaceTypeLabel(place) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer-custom">
          <button class="btn btn-light px-4" @click="closeLineModal" :disabled="isSubmitting">
            <i class="fas fa-times me-2"></i> Annuler
          </button>
          <button
            class="btn btn-primary px-4 d-flex align-items-center gap-2"
            @click="saveLine"
            :disabled="isSubmitting || !isFormValid"
          >
            <i v-if="isSubmitting" class="fa fa-spinner fa-spin"></i>
            <i v-else class="fa fa-check"></i>
            <span>{{ isSubmitting ? 'Enregistrement...' : 'Enregistrer' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- MODALE DES GROUPES DE CONDITIONS REPENSÉE -->
    <div v-if="showConditionModal" class="modal-overlay" @click.self="closeConditionModal">
      <div class="modal-dialog-custom modal-dialog-extra-large animate__animated animate__fadeInDown">
        <div class="modal-header-custom">
          <h4 class="mb-0 fw-bold">
            <i class="fas fa-filter text-warning me-2"></i>
            Construction des conditions
          </h4>
          <button class="btn-close-custom" @click="closeConditionModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body-custom">
          <div class="conditions-management">
            <div class="row h-100">
              <!-- ZONE DES ÉLÉMENTS DISPONIBLES -->
              <div class="col-md-4 border-end p-3 bg-light">
                <h6 class="section-subtitle mb-3">
                  <i class="fas fa-box me-2"></i>
                  Éléments disponibles
                </h6>

                <!-- Arguments -->
                <div class="elements-category mb-4">
                  <h6 class="category-title small fw-bold text-uppercase text-muted mb-2">
                    <i class="fas fa-database me-1"></i> Arguments
                  </h6>
                  <div class="elements-list">
                    <div
                      v-for="arg in availableArguments"
                      :key="arg.id"
                      class="element-item argument"
                      draggable="true"
                      @dragstart="onDragStartCondition($event, { type: 'argument', data: arg })"
                      @click="addConditionElement({ type: 'argument', data: arg })"
                    >
                      <div class="element-content">
                        <div class="element-name">{{ arg.name }}</div>
                        <div class="element-code">{{ arg.code }}</div>
                        <div class="element-type" :class="getDataTypeClass(arg.dataType)">
                          {{ arg.dataType }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Opérateurs de comparaison -->
                <div class="elements-category mb-4">
                  <h6 class="category-title small fw-bold text-uppercase text-muted mb-2">
                    <i class="fas fa-balance-scale me-1"></i> Comparaison
                  </h6>
                  <div class="operators-grid-simple">
                    <button
                      v-for="op in comparisonOperators"
                      :key="op.symbol"
                      class="operator-btn-simple comparison"
                      @click="addConditionElement({ type: 'operator', data: op.symbol })"
                      :title="op.description"
                    >
                      {{ op.symbol }}
                    </button>
                  </div>
                </div>

                <!-- Opérateurs logiques -->
                <div class="elements-category mb-4">
                  <h6 class="category-title small fw-bold text-uppercase text-muted mb-2">
                    <i class="fas fa-project-diagram me-1"></i> Logiques
                  </h6>
                  <div class="operators-grid-simple">
                    <button
                      v-for="op in logicalOperators"
                      :key="op.symbol"
                      class="operator-btn-simple logical"
                      @click="addConditionElement({ type: 'logical', data: op.symbol })"
                      :title="op.description"
                    >
                      {{ op.symbol }}
                    </button>
                  </div>
                </div>

                <!-- Valeurs littérales -->
                <div class="elements-category">
                  <h6 class="category-title small fw-bold text-uppercase text-muted mb-2">
                    <i class="fas fa-font me-1"></i> Valeurs
                  </h6>
                  <div class="input-group input-group-sm mb-2">
                    <input
                      v-model="conditionCustomValue"
                      type="text"
                      class="form-control"
                      placeholder="Entrez une valeur..."
                      @keyup.enter="addConditionCustomValue"
                    >
                    <button class="btn btn-primary" @click="addConditionCustomValue">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                  <!-- Valeurs prédéfinies -->
                  <div class="predefined-values mt-2">
                    <div class="d-flex flex-wrap gap-1">
                      <button
                        v-for="value in predefinedValues"
                        :key="value"
                        class="btn btn-outline-secondary btn-sm"
                        @click="addConditionElement({ type: 'value', data: value })"
                      >
                        {{ value }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ZONE DE CONSTRUCTION DES CONDITIONS -->
              <div class="col-md-8 p-4">
                <h6 class="section-subtitle mb-3">
                  <i class="fas fa-sitemap me-2"></i>
                  Construction des groupes de conditions
                </h6>

                <!-- Message si type calcul -->
                <div v-if="conditionForm.lineType === 'calculation'" class="alert alert-info">
                  <i class="fas fa-info-circle me-2"></i>
                  Les conditions ne sont pas disponibles pour les lignes de type "Calcul".
                </div>

                <!-- Groupes de conditions -->
                <div v-else class="condition-groups-container">
                  <div 
                    v-for="(group, groupIndex) in conditionForm.conditionGroups" 
                    :key="groupIndex"
                    class="condition-group-card"
                  >
                    <!-- En-tête du groupe -->
                    <div class="group-header">
                      <div class="group-title">
                        <span class="fw-bold">Groupe {{ groupIndex + 1 }}</span>
                        <select 
                          v-model="group.logicOperator" 
                          class="form-select form-select-sm ms-2" 
                          style="width: auto;"
                        >
                          <option value="AND">ET</option>
                          <option value="OR">OU</option>
                        </select>
                      </div>
                      <div class="group-actions">
                        <button
                          class="btn btn-sm btn-outline-danger"
                          @click="removeConditionGroup(groupIndex)"
                          v-if="conditionForm.conditionGroups.length > 1"
                          title="Supprimer ce groupe"
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                    </div>

                    <!-- Conditions du groupe -->
                    <div class="group-conditions">
                      <div
                        v-for="(condition, conditionIndex) in group.conditions"
                        :key="`${groupIndex}-${conditionIndex}`"
                        class="condition-item"
                        :class="{ 'active': activeCondition?.groupIndex === groupIndex && activeCondition?.conditionIndex === conditionIndex }"
                      >
                        <!-- Zone de construction de la condition -->
                        <div
                          class="condition-zone"
                          @drop="onConditionDrop($event, groupIndex, conditionIndex)"
                          @dragover="onConditionDragOver"
                          @dragenter="onConditionDragEnter"
                          @dragleave="onConditionDragLeave"
                          @click="setActiveCondition(groupIndex, conditionIndex)"
                        >
                          <div
                            v-if="!condition.leftArgumentId && !condition.operator && !condition.rightValue"
                            class="condition-empty-state"
                          >
                            <i class="fas fa-arrow-left fa-lg text-muted mb-2"></i>
                            <p class="text-muted mb-0 small">Glissez des éléments ici</p>
                            <p class="text-muted mb-0 small">ou cliquez pour sélectionner</p>
                          </div>

                          <div v-else class="condition-tokens">
                            <!-- Argument -->
                            <div
                              v-if="condition.leftArgumentId"
                              class="condition-token token-argument"
                              @click.stop="editConditionArgument(groupIndex, conditionIndex)"
                            >
                              <span class="token-content">
                                {{ getArgumentName(condition.leftArgumentId) }}
                              </span>
                              <span class="token-remove">
                                <i class="fas fa-times"></i>
                              </span>
                            </div>

                            <!-- Opérateur -->
                            <div
                              v-if="condition.operator"
                              class="condition-token token-operator"
                              @click.stop="editConditionOperator(groupIndex, conditionIndex)"
                            >
                              <span class="token-content">
                                {{ condition.operator }}
                              </span>
                              <span class="token-remove">
                                <i class="fas fa-times"></i>
                              </span>
                            </div>

                            <!-- Valeur -->
                            <div
                              v-if="condition.rightValue"
                              class="condition-token token-value"
                              @click.stop="editConditionValue(groupIndex, conditionIndex)"
                            >
                              <span class="token-content">
                                {{ condition.rightValue }}
                              </span>
                              <span class="token-remove">
                                <i class="fas fa-times"></i>
                              </span>
                            </div>
                          </div>
                        </div>

                        <!-- Actions de la condition -->
                        <div class="condition-actions">
                          <button
                            class="btn btn-sm btn-outline-danger"
                            @click="removeCondition(groupIndex, conditionIndex)"
                            v-if="group.conditions.length > 1"
                            title="Supprimer cette condition"
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Ajouter une condition -->
                    <div class="group-footer">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-primary w-100"
                        @click="addCondition(groupIndex)"
                      >
                        <i class="fas fa-plus me-1"></i> Ajouter une condition
                      </button>
                    </div>
                  </div>

                  <!-- Ajouter un groupe -->
                  <div class="add-group-section mt-4">
                    <button
                      type="button"
                      class="btn btn-outline-secondary w-100"
                      @click="addConditionGroup"
                    >
                      <i class="fas fa-plus-circle me-2"></i> Ajouter un groupe de conditions
                    </button>
                  </div>
                </div>

                <!-- Prévisualisation et statistiques -->
                <div class="condition-controls mt-4">
                  <div class="row align-items-center">
                    <div class="col-md-8">
                      <div class="preview-section bg-light p-3 rounded">
                        <h6 class="fw-semibold mb-2 small">Prévisualisation :</h6>
                        <div class="condition-preview code-block">
                          <code>{{ generatedCondition }}</code>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="condition-stats text-center p-3 bg-light rounded">
                        <h6 class="fw-semibold mb-2 small">Statistiques</h6>
                        <div class="stats-grid">
                          <div class="stat-item">
                            <div class="stat-number">{{ conditionStats.groups }}</div>
                            <div class="stat-label">Groupes</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">{{ conditionStats.conditions }}</div>
                            <div class="stat-label">Conditions</div>
                          </div>
                          <div class="stat-item">
                            <div class="stat-number">{{ conditionStats.arguments }}</div>
                            <div class="stat-label">Arguments</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Aide rapide -->
                <div class="help-section mt-3 p-3 bg-light rounded">
                  <h6 class="fw-semibold mb-2 small">
                    <i class="fas fa-lightbulb me-2"></i>Comment construire une condition
                  </h6>
                  <div class="row small text-muted">
                    <div class="col-md-4">
                      <i class="fas fa-mouse-pointer me-1"></i>
                      <strong>Cliquer</strong> pour ajouter
                    </div>
                    <div class="col-md-4">
                      <i class="fas fa-arrows-alt me-1"></i>
                      <strong>Glisser</strong> pour déposer
                    </div>
                    <div class="col-md-4">
                      <i class="fas fa-times me-1"></i>
                      <strong>Cliquer</strong> pour supprimer
                    </div>
                  </div>
                  <div class="mt-2 small text-muted">
                    <strong>Structure :</strong> [Argument] [Opérateur] [Valeur]
                  </div>
                  <div class="mt-1 small text-muted">
                    <strong>Conseil :</strong> Cliquez sur une zone vide pour la sélectionner avant d'ajouter des éléments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer-custom">
          <button class="btn btn-light px-4" @click="closeConditionModal">
            <i class="fas fa-times me-2"></i> Annuler
          </button>
          <button class="btn btn-primary px-4" @click="saveConditions">
            <i class="fas fa-check me-2"></i> Appliquer les conditions
          </button>
        </div>
      </div>
    </div>

    <!-- MODALE DES PLACES SIMPLIFIÉE (CLIQUER-DÉPOSER) -->
    <div v-if="showPlacesModal" class="modal-overlay" @click.self="closePlacesModal">
      <div class="modal-dialog-custom modal-dialog-extra-large animate__animated animate__fadeInDown">
        <div class="modal-header-custom">
          <h4 class="mb-0 fw-bold">
            <i class="fas fa-puzzle-piece text-info me-2"></i>
            Construction de l'expression
          </h4>
          <button class="btn-close-custom" @click="closePlacesModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body-custom">
          <div class="places-management-simple">
            <div class="row h-100">
              <!-- ZONE DES ÉLÉMENTS DISPONIBLES -->
              <div class="col-md-3 border-end p-3 bg-light">
                <h6 class="section-subtitle mb-3">
                  <i class="fas fa-box me-2"></i>
                  Éléments disponibles
                </h6>

                <!-- Arguments -->
                <div class="elements-category mb-4">
                  <h6 class="category-title small fw-bold text-uppercase text-muted mb-2">
                    <i class="fas fa-database me-1"></i> Arguments
                  </h6>
                  <div class="elements-list">
                    <div
                      v-for="arg in availableArguments"
                      :key="arg.id"
                      class="element-item argument"
                      draggable="true"
                      @dragstart="onDragStart($event, { type: 'argument', data: arg })"
                      @click="addElement({ type: 'argument', data: arg })"
                    >
                      <div class="element-content">
                        <div class="element-name">{{ arg.name }}</div>
                        <div class="element-code">{{ arg.code }}</div>
                        <div class="element-type" :class="getDataTypeClass(arg.dataType)">
                          {{ arg.dataType }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Opérateurs et Parenthèses -->
                <div class="elements-category mb-4">
                  <h6 class="category-title small fw-bold text-uppercase text-muted mb-2">
                    <i class="fas fa-calculator me-1"></i> Opérateurs & Parenthèses
                  </h6>
                  
                  <!-- Opérateurs mathématiques -->
                  <div class="mb-3">
                    <h7 class="small fw-semibold text-muted mb-2 d-block">Mathématiques</h7>
                    <div class="operators-grid-simple">
                      <button
                        v-for="op in mathOperators"
                        :key="op.symbol"
                        class="operator-btn-simple math"
                        @click="addElement({ type: 'operator', data: op.symbol })"
                        :title="op.description"
                      >
                        {{ op.symbol }}
                      </button>
                    </div>
                  </div>

                  <!-- Parenthèses -->
                  <div class="mb-3">
                    <h7 class="small fw-semibold text-muted mb-2 d-block">Parenthèses</h7>
                    <div class="parenthesis-grid-simple">
                      <button
                        class="operator-btn-simple parenthesis"
                        @click="addElement({ type: 'operator', data: '(' })"
                        title="Parenthèse ouvrante"
                      >
                        (
                      </button>
                      <button
                        class="operator-btn-simple parenthesis"
                        @click="addElement({ type: 'operator', data: ')' })"
                        title="Parenthèse fermante"
                      >
                        )
                      </button>
                    </div>
                  </div>

                  <!-- Opérateurs de comparaison -->
                  <div class="mb-3">
                    <h7 class="small fw-semibold text-muted mb-2 d-block">Comparaison</h7>
                    <div class="operators-grid-simple">
                      <button
                        v-for="op in comparisonOperators"
                        :key="op.symbol"
                        class="operator-btn-simple comparison"
                        @click="addElement({ type: 'operator', data: op.symbol })"
                        :title="op.description"
                      >
                        {{ op.symbol }}
                      </button>
                    </div>
                  </div>

                  <!-- Opérateurs logiques -->
                  <div>
                    <h7 class="small fw-semibold text-muted mb-2 d-block">Logiques</h7>
                    <div class="operators-grid-simple">
                      <button
                        v-for="op in logicalOperators"
                        :key="op.symbol"
                        class="operator-btn-simple logical"
                        @click="addElement({ type: 'operator', data: op.symbol })"
                        :title="op.description"
                      >
                        {{ op.symbol }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Valeurs littérales -->
                <div class="elements-category">
                  <h6 class="category-title small fw-bold text-uppercase text-muted mb-2">
                    <i class="fas fa-font me-1"></i> Valeurs
                  </h6>
                  <div class="input-group input-group-sm mb-2">
                    <input
                      v-model="customValue"
                      type="text"
                      class="form-control"
                      placeholder="Entrez une valeur..."
                      @keyup.enter="addCustomValueAsPlace"
                    >
                    <button class="btn btn-primary" @click="addCustomValueAsPlace">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                  <!-- Valeurs prédéfinies -->
                  <div class="predefined-values mt-2">
                    <div class="d-flex flex-wrap gap-1">
                      <button
                        v-for="value in predefinedValues"
                        :key="value"
                        class="btn btn-outline-secondary btn-sm"
                        @click="addElement({ type: 'literal', data: value })"
                      >
                        {{ value }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ZONE D'EXPRESSION (CLIQUER-DÉPOSER) -->
              <div class="col-md-9 p-4">
                <h6 class="section-subtitle mb-3">
                  <i class="fas fa-code me-2"></i>
                  Votre expression
                </h6>

                <!-- Zone de dépôt -->
                <div
                  class="expression-zone"
                  @drop="onDrop"
                  @dragover="onDragOver"
                  @dragenter="onDragEnter"
                  @dragleave="onDragLeave"
                >
                  <div
                    v-if="places.length === 0"
                    class="expression-empty-state"
                  >
                    <i class="fas fa-arrow-left fa-2x text-muted mb-3"></i>
                    <p class="text-muted mb-2">Glissez des éléments ici</p>
                    <small class="text-muted">ou cliquez sur les éléments à gauche</small>
                  </div>

                  <div v-else class="expression-tokens-simple">
                    <div
                      v-for="(place, index) in sortedPlaces"
                      :key="place.id || `temp-${index}`"
                      class="expression-token-simple"
                      :class="getTokenTypeClass(place)"
                      @click="removePlace(index)"
                    >
                      <span class="token-content">
                        <span v-if="place.argument">
                          {{ place.argument.code }}
                        </span>
                        <span v-else-if="place.operator">
                          {{ place.operator }}
                        </span>
                        <span v-else-if="place.literalValue">
                          "{{ place.literalValue }}"
                        </span>
                      </span>
                      <span class="token-remove">
                        <i class="fas fa-times"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Prévisualisation et contrôles -->
                <div class="expression-controls mt-4">
                  <div class="row align-items-center">
                    <div class="col-md-8">
                      <div class="preview-section bg-light p-3 rounded">
                        <h6 class="fw-semibold mb-2 small">Expression générée :</h6>
                        <div class="expression-preview code-block">
                          <code>{{ generatedExpression }}</code>
                        </div>
                        <div v-if="hasUnbalancedParentheses" class="text-danger small mt-2">
                          <i class="fas fa-exclamation-triangle me-1"></i>
                          Parenthèses non équilibrées
                        </div>
                        <div v-else-if="sortedPlaces.length > 0" class="text-success small mt-2">
                          <i class="fas fa-check-circle me-1"></i>
                          Expression valide
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="d-flex gap-2 justify-content-end">
                        <button
                          class="btn btn-outline-danger btn-sm"
                          @click="clearPlaces"
                          :disabled="places.length === 0"
                        >
                          <i class="fas fa-trash"></i> Effacer
                        </button>
                        <button
                          class="btn btn-outline-secondary btn-sm"
                          @click="undoLastPlace"
                          :disabled="places.length === 0"
                        >
                          <i class="fas fa-undo"></i> Annuler
                        </button>
                        <button
                          class="btn btn-outline-info btn-sm"
                          @click="addParenthesesPair"
                          title="Ajouter une paire de parenthèses"
                        >
                          <i class="fas fa-parentheses"></i> ()
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Statistiques de l'expression -->
                <div class="expression-stats mt-3 p-3 bg-light rounded">
                  <h6 class="fw-semibold mb-2 small">
                    <i class="fas fa-chart-bar me-2"></i>Statistiques de l'expression
                  </h6>
                  <div class="row small text-muted">
                    <div class="col-md-3">
                      <strong>{{ expressionStats.arguments }}</strong> argument(s)
                    </div>
                    <div class="col-md-3">
                      <strong>{{ expressionStats.operators }}</strong> opérateur(s)
                    </div>
                    <div class="col-md-3">
                      <strong>{{ expressionStats.literals }}</strong> valeur(s)
                    </div>
                    <div class="col-md-3">
                      <strong>{{ expressionStats.total }}</strong> élément(s)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer-custom">
          <button class="btn btn-light px-4" @click="closePlacesModal">
            Annuler
          </button>
          <button class="btn btn-primary px-4" @click="savePlaces" :disabled="hasUnbalancedParentheses">
            <i class="fas fa-check me-2"></i>
            Enregistrer l'expression
          </button>
        </div>
      </div>
    </div>

    <!-- MODALE BUILDER D'EXPRESSION -->
    <div v-if="showExpressionBuilder" class="modal-overlay" @click.self="closeExpressionBuilder">
      <div class="modal-dialog-custom modal-dialog-extra-large animate__animated animate__fadeInDown">
        <div class="modal-header-custom">
          <h4 class="mb-0 fw-bold">
            <i class="fas fa-cogs text-primary me-2"></i>
            Builder d'expression
          </h4>
          <button class="btn-close-custom" @click="closeExpressionBuilder">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body-custom">
          <div class="container-fluid h-100">
            <div class="row h-100">
              <!-- Arguments disponibles -->
              <div class="col-md-4 border-end bg-light p-4">
                <div class="arguments-section">
                  <h6 class="section-subtitle mb-3">
                    <i class="fas fa-database me-2"></i>
                    Arguments disponibles
                  </h6>
                  
                  <div class="search-arguments mb-3">
                    <input
                      v-model="argumentSearch"
                      type="text"
                      class="form-control"
                      placeholder="🔍 Rechercher un argument..."
                      @input="filterArguments"
                    />
                  </div>
                  
                  <div class="arguments-grid">
                    <div
                      v-for="arg in filteredArguments"
                      :key="arg.id"
                      class="argument-item"
                      @click="addToExpression(arg.code)"
                    >
                      <div class="argument-header">
                        <div class="argument-name">{{ arg.name }}</div>
                        <div class="argument-type-badge" :class="getDataTypeClass(arg.dataType)">
                          {{ arg.dataType }}
                        </div>
                      </div>
                      <div class="argument-code">{{ arg.code }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Builder d'expression -->
              <div class="col-md-8 p-4">
                <div class="expression-builder h-100 d-flex flex-column">
                  <h5 class="section-title mb-4">
                    <i class="fas fa-calculator me-2"></i>
                    Construction de l'expression
                  </h5>
                  
                  <!-- Zone d'expression -->
                  <div class="expression-display mb-4 flex-grow-1">
                    <div class="expression-preview" @click="focusExpressionInput">
                      <div v-if="expressionTokens.length === 0" class="expression-placeholder">
                        Cliquez sur les arguments et opérateurs pour construire votre expression...
                      </div>
                      <div v-else class="expression-tokens">
                        <span
                          v-for="(token, index) in expressionTokens"
                          :key="index"
                          class="expression-token"
                          :class="getTokenClass(token.type)"
                          @click="removeToken(index)"
                        >
                          {{ token.value }}
                          <span class="token-remove">×</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Valeur personnalisée -->
                  <div class="custom-value-section mb-4">
                    <h6 class="section-subtitle mb-3">Valeur personnalisée</h6>
                    <div class="row g-2 align-items-end">
                      <div class="col-md-8">
                        <input
                          v-model="customValue"
                          type="text"
                          class="form-control"
                          placeholder="Entrez une valeur numérique ou textuelle..."
                          @keyup.enter="addCustomValue"
                        />
                      </div>
                      <div class="col-md-4">
                        <button class="btn btn-primary w-100" @click="addCustomValue">
                          <i class="fas fa-plus me-2"></i> Ajouter
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Opérateurs organisés -->
                  <div class="operators-sections">
                    <div class="row g-3">
                      <!-- Opérateurs mathématiques -->
                      <div class="col-md-12">
                        <div class="operators-category">
                          <h6 class="category-title">Mathématiques</h6>
                          <div class="operators-grid">
                            <button
                              v-for="op in mathOperators"
                              :key="op.symbol"
                              class="operator-btn math"
                              @click="addToExpression(op.symbol)"
                              :title="op.description"
                            >
                              <span class="operator-symbol">{{ op.symbol }}</span>
                              <span class="operator-label">{{ op.description }}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Parenthèses et actions -->
                    <div class="row g-3 mt-3">
                      <div class="col-md-6">
                        <div class="parenthesis-section">
                          <h6 class="category-title">Parenthèses</h6>
                          <div class="d-flex gap-2">
                            <button class="btn btn-outline-secondary" @click="addToExpression('(')">
                              <i class="fas fa-parenthesis me-2"></i> (
                            </button>
                            <button class="btn btn-outline-secondary" @click="addToExpression(')')">
                              <i class="fas fa-parenthesis me-2"></i> )
                            </button>
                            <button class="btn btn-outline-secondary" @click="addToExpression(' ')">
                              <i class="fas fa-space-arrow-right me-2"></i> Espace
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="actions-section">
                          <h6 class="category-title">Actions</h6>
                          <div class="d-flex gap-2">
                            <button class="btn btn-outline-danger" @click="clearExpression">
                              <i class="fas fa-trash me-2"></i> Effacer tout
                            </button>
                            <button class="btn btn-outline-warning" @click="undoLastToken">
                              <i class="fas fa-undo me-2"></i> Annuler
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer-custom">
          <button class="btn btn-light px-4" @click="closeExpressionBuilder">
            Annuler
          </button>
          <button class="btn btn-primary px-4" @click="applyExpression">
            <i class="fas fa-check me-2"></i>
            Appliquer l'expression
          </button>
        </div>
      </div>
    </div>

    <!-- MODALE DÉTAILS DE LIGNE -->
    <div v-if="showLineDetailsModal && selectedLine" class="modal-overlay" @click.self="closeLineDetailsModal">
      <div class="modal-dialog-custom modal-dialog-large animate__animated animate__fadeInDown">
        <div class="modal-header-custom">
          <h5 class="mb-0 fw-bold">
            <i class="fas fa-info-circle text-primary me-2"></i>
            Détails de la ligne
          </h5>
          <button class="btn-close-custom" @click="closeLineDetailsModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body-custom">
          <div class="row g-4">
            <!-- Informations de base -->
            <div class="col-md-6">
              <h6 class="section-title">Informations générales</h6>
              <div class="info-grid">
                <div class="info-item">
                  <label>Ordre d'exécution:</label>
                  <span class="fw-bold">#{{ selectedLine.orderIndex }}</span>
                </div>
                <div class="info-item">
                  <label>Type:</label>
                  <span class="badge" :class="getLineTypeClass(selectedLine.lineType)">
                    {{ getLineTypeLabel(selectedLine.lineType) }}
                  </span>
                </div>
                <div class="info-item">
                  <label>Variable résultat:</label>
                  <span class="font-monospace">{{ selectedLine.resultVariable || 'Non définie' }}</span>
                </div>
                <div class="info-item">
                  <label>Créée le:</label>
                  <span>{{ formatDate(selectedLine.createdAt) }}</span>
                </div>
                <div class="info-item">
                  <label>Nombre de places:</label>
                  <span>{{ selectedLine.places?.length || 0 }}</span>
                </div>
              </div>
            </div>

            <!-- Expression -->
            <div class="col-md-6">
              <h6 class="section-title">Expression</h6>
              <div class="code-block large">
                <pre><code>{{ selectedLine.expression || 'Aucune expression définie' }}</code></pre>
              </div>
            </div>

            <!-- Places détaillées -->
            <div v-if="selectedLine.places?.length" class="col-12">
              <h6 class="section-title">Éléments d'expression (Places)</h6>
              <div class="places-details">
                <div 
                  v-for="place in selectedLine.places" 
                  :key="place.id"
                  class="place-detail-item"
                >
                  <div class="place-detail-header">
                    <span class="place-order">#{{ place.orderIndex }}</span>
                    <span class="place-type" :class="getPlaceTypeClass(place)">
                      {{ getPlaceTypeLabel(place) }}
                    </span>
                  </div>
                  <div class="place-detail-content">
                    <span v-if="place.argument">
                      <strong>Argument:</strong> {{ place.argument.name }} ({{ place.argument.code }})
                    </span>
                    <span v-else-if="place.operator">
                      <strong>Opérateur:</strong> {{ place.operator }}
                    </span>
                    <span v-else-if="place.literalValue">
                      <strong>Valeur littérale:</strong> {{ place.literalValue }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer-custom">
          <button class="btn btn-light px-4" @click="closeLineDetailsModal">Fermer</button>
          <button class="btn btn-primary px-4" @click="openEditLineModal(selectedLine)">
            <i class="fas fa-edit me-2"></i>
            Modifier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "@/components/ui/Button.vue";
import Card from "@/components/ui/Card.vue";
import CardBody from "@/components/ui/CardBody.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import { Component, Vue } from "vue-facing-decorator";

interface MethodLine {
  id: number;
  orderIndex: number;
  expression: string;
  resultVariable: string;
  lineType: string;
  metadata: any;
  createdAt: string;
  method: any;
  versions: MethodLineVersion[];
  conditionGroups: ConditionGroup[];
  places: Place[];
}

interface MethodLineVersion {
  id: number;
  versionNumber: number;
  snapshotJson: any;
  createdAt: string;
  line: MethodLine;
}

interface ConditionGroup {
  id: number;
  logicOperator: string;
  orderIndex: number;
  conditions: Condition[];
}

interface Condition {
  id: number;
  leftArgumentId?: number;
  leftArgument?: Argument;
  operator: string;
  rightValue: string;
  orderIndex: number;
}

interface Argument {
  id: number;
  name: string;
  code: string;
  dataType: string;
}

interface Place {
  id?: number;
  line?: MethodLine;
  argument?: Argument;
  argumentId?: number;
  operator?: string;
  literalValue?: string;
  orderIndex: number;
}

interface NewPlace {
  type: 'argument' | 'operator' | 'literal';
  argumentId?: number;
  operator?: string;
  literalValue?: string;
  orderIndex: number;
}

interface ExpressionToken {
  type: 'argument' | 'operator' | 'value' | 'parenthesis';
  value: string;
}

interface ActiveCondition {
  groupIndex: number;
  conditionIndex: number;
}

@Component({
  name: "MethodLinesList",
  components: {
    Card,
    CardHeader,
    CardBody,
    Button,
  },
})
export default class MethodLinesList extends Vue {
  declare $router: any;
  declare $route: any;

  public methodName: string = "";
  public branchSlug: string = "";
  public methodLines: MethodLine[] = [];
  public filteredLines: MethodLine[] = [];
  public isLoading: boolean = false;
  public isSubmitting: boolean = false;

  // États des modales
  public showCreateLineModal: boolean = false;
  public showEditLineModal: boolean = false;
  public showLineDetailsModal: boolean = false;
  public showConditionModal: boolean = false;
  public showPlacesModal: boolean = false;
  public showExpressionBuilder: boolean = false;
  
  public editingLine: MethodLine | null = null;
  public selectedLine: MethodLine | null = null;

  // Gestion des conditions actives
  public activeCondition: ActiveCondition | null = null;

  // Filtres
  public filters = {
    lineType: "",
    order: "asc",
    search: ""
  };

  // Statistiques
  public statistics = {
    totalLines: 0,
    calculationLines: 0,
    validationLines: 0,
    conditionLines: 0
  };

  // Formulaire de ligne principale
  public lineForm = {
    orderIndex: 1,
    expression: "",
    resultVariable: "",
    lineType: "calculation",
    metadata: {},
    conditionGroups: [] as ConditionGroup[],
    places: [] as Place[]
  };

  // Formulaire pour les conditions
  public conditionForm = {
    lineType: "calculation",
    conditionGroups: [] as ConditionGroup[]
  };

  // Gestion des places
  public places: Place[] = [];
  public newPlace: NewPlace = {
    type: 'argument',
    orderIndex: 1
  };

  // Gestion de l'expression
  public expressionTokens: ExpressionToken[] = [];
  public customValue: string = "";
  public argumentSearch: string = "";
  public filteredArguments: Argument[] = [];

  // Gestion des conditions
  public conditionCustomValue: string = "";

  // Valeurs prédéfinies
  public predefinedValues = ['0', '1', '10', '100', 'true', 'false', 'null', '""'];

  // Opérateurs disponibles
  public mathOperators = [
    { symbol: '+', description: 'Addition', type: 'math' },
    { symbol: '-', description: 'Soustraction', type: 'math' },
    { symbol: '*', description: 'Multiplication', type: 'math' },
    { symbol: '/', description: 'Division', type: 'math' },
  ];

  public comparisonOperators = [
    { symbol: '==', description: 'Égal', type: 'comparison' },
    { symbol: '===', description: 'Strictement égal', type: 'comparison' },
    { symbol: '!=', description: 'Différent', type: 'comparison' },
    { symbol: '!==', description: 'Strictement différent', type: 'comparison' },
    { symbol: '>', description: 'Supérieur', type: 'comparison' },
    { symbol: '<', description: 'Inférieur', type: 'comparison' },
    { symbol: '>=', description: 'Supérieur ou égal', type: 'comparison' },
    { symbol: '<=', description: 'Inférieur ou égal', type: 'comparison' }
  ];

  public logicalOperators = [
    { symbol: '&&', description: 'ET logique', type: 'logical' },
    { symbol: '||', description: 'OU logique', type: 'logical' },
    { symbol: '!', description: 'NON logique', type: 'logical' }
  ];

  // Données disponibles
  public availableArguments: Argument[] = [
    { id: 1, name: "Prix de base", code: "prix_base", dataType: "number" },
    { id: 2, name: "Coefficient", code: "coefficient", dataType: "number" },
    { id: 3, name: "Majoration", code: "majoration", dataType: "number" },
    { id: 4, name: "Âge", code: "age", dataType: "number" },
    { id: 5, name: "Statut", code: "statut", dataType: "string" },
    { id: 6, name: "Usage", code: "usage", dataType: "string" },
    { id: 7, name: "Prime totale", code: "prime_totale", dataType: "number" },
    { id: 8, name: "Véhicule usage", code: "vehicule_usage", dataType: "string" },
    { id: 9, name: "Assure âge", code: "assure_age", dataType: "number" },
    { id: 10, name: "Formule", code: "formule", dataType: "string" },
    { id: 11, name: "Pack", code: "pack", dataType: "string" },
    { id: 12, name: "Valeur Neuve", code: "valeur_neuve", dataType: "number" },
    { id: 13, name: "Valeur Vénale", code: "valeur_venale", dataType: "number" },
    { id: 14, name: "Cylindrée", code: "cylindree", dataType: "number" },
    { id: 15, name: "Puissance Fiscale", code: "puissance_fiscale", dataType: "number" },
    { id: 16, name: "Nombre de places", code: "nombre_places", dataType: "number" },
    { id: 17, name: "Mise en circulation", code: "mise_circulation", dataType: "date" },
    { id: 18, name: "Charge Utile", code: "charge_utile", dataType: "number" },
    { id: 19, name: "Assistance", code: "assistance", dataType: "boolean" },
    { id: 20, name: "Remorque", code: "remorque", dataType: "boolean" }
  ];

  // ---- COMPUTED PROPERTIES ----
  get hasActiveFilters(): boolean {
    return this.filters.lineType !== "" || this.filters.search !== "";
  }

  get maxOrder(): number {
    if (this.methodLines.length === 0) return 0;
    return Math.max(...this.methodLines.map(line => line.orderIndex));
  }

  get isFormValid(): boolean {
    if (this.lineForm.lineType === 'calculation') {
      return this.lineForm.expression.trim().length > 0;
    }
    return true;
  }

  get currentExpression(): string {
    return this.expressionTokens.map(token => token.value).join(' ');
  }

  get sortedPlaces(): Place[] {
    return [...this.places].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  get generatedExpression(): string {
    return this.sortedPlaces.map(place => {
      if (place.argument) {
        return place.argument.code;
      } else if (place.operator) {
        return place.operator;
      } else if (place.literalValue) {
        return place.literalValue;
      }
      return '';
    }).join(' ');
  }

  get isNewPlaceValid(): boolean {
    if (this.newPlace.type === 'argument') {
      return !!this.newPlace.argumentId;
    } else if (this.newPlace.type === 'operator') {
      return !!this.newPlace.operator;
    } else {
      return !!this.newPlace.literalValue?.trim();
    }
  }

  get expressionStats() {
    const stats = {
      arguments: this.places.filter(p => p.argument).length,
      operators: this.places.filter(p => p.operator).length,
      literals: this.places.filter(p => p.literalValue).length,
      total: this.places.length
    };
    
    return stats;
  }

  get hasUnbalancedParentheses(): boolean {
    let balance = 0;
    
    for (const place of this.sortedPlaces) {
      if (place.operator === '(') {
        balance++;
      } else if (place.operator === ')') {
        balance--;
        if (balance < 0) return true;
      }
    }
    
    return balance !== 0;
  }

  // Nouvelles computed properties pour les conditions
  get conditionStats() {
    const groups = this.conditionForm.conditionGroups.length;
    let conditions = 0;
    let argumentsCount = 0;

    this.conditionForm.conditionGroups.forEach(group => {
      conditions += group.conditions.length;
      group.conditions.forEach(condition => {
        if (condition.leftArgumentId) argumentsCount++;
      });
    });

    return {
      groups,
      conditions,
      arguments: argumentsCount
    };
  }

  get generatedCondition(): string {
    if (this.conditionForm.conditionGroups.length === 0) {
      return "Aucune condition définie";
    }

    return this.conditionForm.conditionGroups.map((group, groupIndex) => {
      const conditions = group.conditions.map(condition => {
        const argument = condition.leftArgumentId ? this.getArgumentName(condition.leftArgumentId) : '?';
        const operator = condition.operator || '?';
        const value = condition.rightValue || '?';
        return `${argument} ${operator} ${value}`;
      }).join(` ${group.logicOperator} `);

      return groupIndex === 0 ? conditions : `(${conditions})`;
    }).join(' AND ');
  }

  // ---- LIFECYCLE ----
  mounted() {
    this.branchSlug = this.$route.params.branchSlug;
    this.fetchMethodDetails();
    this.fetchMethodLines();
    this.filteredArguments = [...this.availableArguments];
  }

  // ---- NAVIGATION ----
  goBack() {
    this.$router.push({
      name: 'engine-method-list',
      params: { branchSlug: this.branchSlug }
    });
  }

  // ---- DATA FETCHING ----
  async fetchMethodDetails() {
    const methodId = this.$route.params.methodId;
    try {
      const response = await fetch(`http://localhost:8000/api/engine/method/${methodId}`);
      const res = await response.json();
      
      if (res && res.code === 200) {
        this.methodName = res.data.name;
      }
    } catch (error) {
      console.error("Erreur chargement méthode:", error);
      this.methodName = "Méthode inconnue";
    }
  }

  async fetchMethodLines() {
    this.isLoading = true;
    const methodId = this.$route.params.methodId;
    
    try {
      const response = await fetch(`http://localhost:8000/api/engine/methodLine/Method/${methodId}`);
      const res = await response.json();
      
      if (res && res.code === 200) {
        this.methodLines = res.data;
        this.applyFilters();
        this.calculateStatistics();
      } else {
        this.methodLines = [];
      }
    } catch (error) {
      console.error("Erreur chargement lignes:", error);
      this.methodLines = [];
    } finally {
      this.isLoading = false;
    }
  }

  // ---- FILTRES ET RECHERCHE ----
  applyFilters() {
    let filtered = [...this.methodLines];

    // Filtre par type
    if (this.filters.lineType) {
      filtered = filtered.filter(line => line.lineType === this.filters.lineType);
    }

    // Filtre par recherche
    if (this.filters.search) {
      const searchLower = this.filters.search.toLowerCase();
      filtered = filtered.filter(line => 
        line.expression?.toLowerCase().includes(searchLower) ||
        line.resultVariable?.toLowerCase().includes(searchLower)
      );
    }

    // Tri par ordre
    filtered.sort((a, b) => {
      if (this.filters.order === "asc") {
        return a.orderIndex - b.orderIndex;
      } else {
        return b.orderIndex - a.orderIndex;
      }
    });

    this.filteredLines = filtered;
  }

  clearFilters() {
    this.filters = {
      lineType: "",
      order: "asc",
      search: ""
    };
    this.applyFilters();
  }

  calculateStatistics() {
    this.statistics.totalLines = this.methodLines.length;
    this.statistics.calculationLines = this.methodLines.filter(line => line.lineType === 'calculation').length;
    this.statistics.validationLines = this.methodLines.filter(line => line.lineType === 'validation').length;
    this.statistics.conditionLines = this.methodLines.filter(line => line.lineType === 'condition').length;
  }

  filterArguments() {
    if (!this.argumentSearch.trim()) {
      this.filteredArguments = [...this.availableArguments];
      return;
    }

    const searchLower = this.argumentSearch.toLowerCase();
    this.filteredArguments = this.availableArguments.filter(arg => 
      arg.name.toLowerCase().includes(searchLower) ||
      arg.code.toLowerCase().includes(searchLower) ||
      arg.dataType.toLowerCase().includes(searchLower)
    );
  }

  // ---- GESTION DES MODALES ----
  openCreateLineModal() {
    this.editingLine = null;
    this.lineForm = {
      orderIndex: this.maxOrder + 1,
      expression: "",
      resultVariable: "",
      lineType: "calculation",
      metadata: {},
      conditionGroups: this.getDefaultConditionGroup(),
      places: []
    };
    this.showCreateLineModal = true;
  }

  openEditLineModal(line: MethodLine) {
    this.editingLine = line;
    this.lineForm = {
      orderIndex: line.orderIndex,
      expression: line.expression || "",
      resultVariable: line.resultVariable || "",
      lineType: line.lineType,
      metadata: line.metadata || {},
      conditionGroups: line.conditionGroups?.length > 0 ? 
        JSON.parse(JSON.stringify(line.conditionGroups)) : this.getDefaultConditionGroup(),
      places: line.places?.length > 0 ? JSON.parse(JSON.stringify(line.places)) : []
    };
    this.showEditLineModal = true;
  }

  closeLineModal() {
    this.showCreateLineModal = false;
    this.showEditLineModal = false;
    this.editingLine = null;
  }

  // ---- GESTION DES CONDITIONS AMÉLIORÉE ----
  setActiveCondition(groupIndex: number, conditionIndex: number) {
    this.activeCondition = { groupIndex, conditionIndex };
  }

  openConditionModal(line?: MethodLine) {
    if (line) {
      this.conditionForm = {
        lineType: line.lineType,
        conditionGroups: line.conditionGroups?.length > 0 
          ? JSON.parse(JSON.stringify(line.conditionGroups))
          : this.getDefaultConditionGroup()
      };
    } else {
      this.conditionForm = {
        lineType: this.lineForm.lineType,
        conditionGroups: this.lineForm.conditionGroups?.length > 0
          ? JSON.parse(JSON.stringify(this.lineForm.conditionGroups))
          : this.getDefaultConditionGroup()
      };
    }
    this.activeCondition = null;
    this.showConditionModal = true;
  }

  openConditionModalFromForm() {
    this.openConditionModal();
  }

  closeConditionModal() {
    this.showConditionModal = false;
    this.activeCondition = null;
  }

  saveConditions() {
    this.lineForm.conditionGroups = JSON.parse(JSON.stringify(this.conditionForm.conditionGroups));
    this.closeConditionModal();
  }

  // ---- GESTION DRAG & DROP POUR LES CONDITIONS ----
  onDragStartCondition(event: DragEvent, element: { type: string, data: any }) {
    event.dataTransfer!.setData('application/json', JSON.stringify(element));
    event.dataTransfer!.effectAllowed = 'copy';
  }

  onConditionDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'copy';
  }

  onConditionDragEnter(event: DragEvent) {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.classList.add('drag-over');
  }

  onConditionDragLeave(event: DragEvent) {
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('drag-over');
  }

  onConditionDrop(event: DragEvent, groupIndex: number, conditionIndex: number) {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('drag-over');
    
    try {
      const elementData = JSON.parse(event.dataTransfer!.getData('application/json'));
      this.addConditionElementToPosition(elementData, groupIndex, conditionIndex);
      this.setActiveCondition(groupIndex, conditionIndex);
    } catch (error) {
      console.error('Error parsing dropped element:', error);
    }
  }

  // ---- AJOUT D'ÉLÉMENTS DANS LES CONDITIONS ----
  addConditionElement(element: { type: string, data: any }) {
    // Si une condition active est sélectionnée, l'utiliser
    if (this.activeCondition) {
      this.addConditionElementToPosition(element, this.activeCondition.groupIndex, this.activeCondition.conditionIndex);
      return;
    }

    // Sinon, trouver la première condition vide ou créer une nouvelle condition
    let targetGroupIndex = 0;
    let targetConditionIndex = -1;

    // Chercher une condition vide dans les groupes existants
    for (let g = 0; g < this.conditionForm.conditionGroups.length; g++) {
      const group = this.conditionForm.conditionGroups[g];
      for (let c = 0; c < group.conditions.length; c++) {
        const condition = group.conditions[c];
        if (!condition.leftArgumentId && !condition.operator && !condition.rightValue) {
          targetGroupIndex = g;
          targetConditionIndex = c;
          break;
        }
      }
      if (targetConditionIndex !== -1) break;
    }

    // Si aucune condition vide trouvée, créer une nouvelle condition dans le premier groupe
    if (targetConditionIndex === -1) {
      targetGroupIndex = 0;
      this.addCondition(targetGroupIndex);
      targetConditionIndex = this.conditionForm.conditionGroups[targetGroupIndex].conditions.length - 1;
    }

    this.addConditionElementToPosition(element, targetGroupIndex, targetConditionIndex);
    this.setActiveCondition(targetGroupIndex, targetConditionIndex);
  }

  addConditionElementToPosition(element: { type: string, data: any }, groupIndex: number, conditionIndex: number) {
    const condition = this.conditionForm.conditionGroups[groupIndex].conditions[conditionIndex];
    
    switch (element.type) {
      case 'argument':
        condition.leftArgumentId = element.data.id;
        condition.leftArgument = element.data;
        break;
      case 'operator':
        condition.operator = element.data;
        break;
      case 'value':
        condition.rightValue = element.data;
        break;
      case 'logical':
        // Les opérateurs logiques sont gérés au niveau des groupes
        break;
    }
  }

  addConditionCustomValue() {
    if (this.conditionCustomValue.trim()) {
      this.addConditionElement({
        type: 'value',
        data: this.conditionCustomValue.trim()
      });
      this.conditionCustomValue = '';
    }
  }

  // ---- ÉDITION DES ÉLÉMENTS DE CONDITION ----
  editConditionArgument(groupIndex: number, conditionIndex: number) {
    const condition = this.conditionForm.conditionGroups[groupIndex].conditions[conditionIndex];
    if (confirm('Voulez-vous supprimer cet argument ?')) {
      condition.leftArgumentId = undefined;
      condition.leftArgument = undefined;
    }
  }

  editConditionOperator(groupIndex: number, conditionIndex: number) {
    const condition = this.conditionForm.conditionGroups[groupIndex].conditions[conditionIndex];
    if (confirm('Voulez-vous supprimer cet opérateur ?')) {
      condition.operator = '';
    }
  }

  editConditionValue(groupIndex: number, conditionIndex: number) {
    const condition = this.conditionForm.conditionGroups[groupIndex].conditions[conditionIndex];
    if (confirm('Voulez-vous supprimer cette valeur ?')) {
      condition.rightValue = '';
    }
  }

  // ---- GESTION DES GROUPES ET CONDITIONS ----
  getDefaultConditionGroup(): ConditionGroup[] {
    return [
      {
        logicOperator: "AND",
        orderIndex: 1,
        conditions: [
          {
            leftArgumentId: undefined,
            leftArgument: null,
            operator: "",
            rightValue: "",
            orderIndex: 1
          }
        ]
      }
    ];
  }

  addConditionGroup() {
    this.conditionForm.conditionGroups.push({
      logicOperator: "AND",
      orderIndex: this.conditionForm.conditionGroups.length + 1,
      conditions: [
        {
          leftArgumentId: undefined,
          leftArgument: null,
          operator: "",
          rightValue: "",
          orderIndex: 1
        }
      ]
    });
    this.activeCondition = {
      groupIndex: this.conditionForm.conditionGroups.length - 1,
      conditionIndex: 0
    };
  }

  removeConditionGroup(groupIndex: number) {
    this.conditionForm.conditionGroups.splice(groupIndex, 1);
    this.activeCondition = null;
  }

  addCondition(groupIndex: number) {
    const group = this.conditionForm.conditionGroups[groupIndex];
    const newCondition: Condition = {
      leftArgumentId: undefined,
      leftArgument: null,
      operator: "",
      rightValue: "",
      orderIndex: group.conditions.length + 1
    };
    
    group.conditions.push(newCondition);
    this.setActiveCondition(groupIndex, group.conditions.length - 1);
  }

  removeCondition(groupIndex: number, conditionIndex: number) {
    this.conditionForm.conditionGroups[groupIndex].conditions.splice(conditionIndex, 1);
    this.activeCondition = null;
  }

  onArgumentChange(condition: Condition) {
    const argument = this.availableArguments.find(arg => arg.id === condition.leftArgumentId);
    condition.leftArgument = argument || null;
  }

  isValidConditionValue(condition: Condition): boolean {
    if (!condition.leftArgument) return true;
    
    const value = condition.rightValue.trim();
    if (!value) return true;

    switch (condition.leftArgument.dataType) {
      case 'number':
        return !isNaN(Number(value));
      case 'boolean':
        return ['true', 'false', '0', '1'].includes(value.toLowerCase());
      case 'date':
        return !isNaN(Date.parse(value));
      default:
        return true;
    }
  }

  getArgumentName(argumentId: number): string {
    const argument = this.availableArguments.find(arg => arg.id === argumentId);
    return argument ? argument.code : 'Inconnu';
  }

  // ---- MODALE PLACES ----
  openPlacesModal(line?: MethodLine) {
    if (line) {
      this.places = JSON.parse(JSON.stringify(line.places || []));
    } else {
      this.places = JSON.parse(JSON.stringify(this.lineForm.places));
    }
    
    this.resetNewPlace();
    this.showPlacesModal = true;
  }

  openPlacesModalFromForm() {
    this.openPlacesModal();
  }

  closePlacesModal() {
    this.showPlacesModal = false;
    this.places = [];
    this.resetNewPlace();
  }

  resetNewPlace() {
    this.newPlace = {
      type: 'argument',
      orderIndex: this.places.length > 0 ? Math.max(...this.places.map(p => p.orderIndex)) + 1 : 1
    };
  }

  // ---- GESTION DRAG & DROP POUR LES PLACES ----
  onDragStart(event: DragEvent, element: { type: string, data: any }) {
    event.dataTransfer!.setData('application/json', JSON.stringify(element));
    event.dataTransfer!.effectAllowed = 'copy';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'copy';
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.classList.add('drag-over');
  }

  onDragLeave(event: DragEvent) {
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('drag-over');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('drag-over');
    
    try {
      const elementData = JSON.parse(event.dataTransfer!.getData('application/json'));
      this.addElement(elementData);
    } catch (error) {
      console.error('Error parsing dropped element:', error);
    }
  }

  // ---- AJOUT SIMPLIFIÉ D'ÉLÉMENTS ----
  addElement(element: { type: string, data: any }) {
    const place: Place = {
      orderIndex: this.places.length + 1
    };

    switch (element.type) {
      case 'argument':
        place.argument = element.data;
        place.argumentId = element.data.id;
        break;
      case 'operator':
        place.operator = element.data;
        break;
      case 'literal':
        place.literalValue = element.data;
        break;
    }

    this.places.push(place);
  }

  addCustomValueAsPlace() {
    if (this.customValue.trim()) {
      this.addElement({
        type: 'literal',
        data: this.customValue.trim()
      });
      this.customValue = '';
    }
  }

  // ---- GESTION DES PLACES SIMPLIFIÉE ----
  undoLastPlace() {
    if (this.places.length > 0) {
      this.places.pop();
    }
  }

  clearPlaces() {
    if (confirm('Êtes-vous sûr de vouloir effacer toute l\'expression ?')) {
      this.places = [];
    }
  }

  addParenthesesPair() {
    this.addElement({ type: 'operator', data: '(' });
    this.addElement({ type: 'operator', data: ')' });
  }

  getTokenTypeClass(place: Place): string {
    if (place.argument) return 'token-argument';
    if (place.operator) {
      if (place.operator === '(' || place.operator === ')') {
        return 'token-parenthesis';
      }
      return 'token-operator';
    }
    if (place.literalValue) return 'token-value';
    return 'token-unknown';
  }

  onPlaceTypeChange() {
    if (this.newPlace.type === 'argument') {
      this.newPlace.operator = undefined;
      this.newPlace.literalValue = undefined;
    } else if (this.newPlace.type === 'operator') {
      this.newPlace.argumentId = undefined;
      this.newPlace.literalValue = undefined;
    } else {
      this.newPlace.argumentId = undefined;
      this.newPlace.operator = undefined;
    }
  }

  addPlace() {
    const place: Place = {
      orderIndex: this.newPlace.orderIndex
    };

    if (this.newPlace.type === 'argument' && this.newPlace.argumentId) {
      const argument = this.availableArguments.find(arg => arg.id === this.newPlace.argumentId);
      if (argument) {
        place.argument = argument;
        place.argumentId = argument.id;
      }
    } else if (this.newPlace.type === 'operator' && this.newPlace.operator) {
      place.operator = this.newPlace.operator;
    } else if (this.newPlace.type === 'literal' && this.newPlace.literalValue) {
      place.literalValue = this.newPlace.literalValue;
    }

    this.places.push(place);
    this.resetNewPlace();
  }

  editPlace(place: Place, index: number) {
    this.places.splice(index, 1);
    
    if (place.argument) {
      this.newPlace = {
        type: 'argument',
        argumentId: place.argument.id,
        orderIndex: place.orderIndex
      };
    } else if (place.operator) {
      this.newPlace = {
        type: 'operator',
        operator: place.operator,
        orderIndex: place.orderIndex
      };
    } else if (place.literalValue) {
      this.newPlace = {
        type: 'literal',
        literalValue: place.literalValue,
        orderIndex: place.orderIndex
      };
    }
  }

  removePlace(index: number) {
    this.places.splice(index, 1);
    
    this.places.forEach((place, idx) => {
      place.orderIndex = idx + 1;
    });
    
    this.resetNewPlace();
  }

  movePlaceUp(index: number) {
    if (index > 0) {
      const currentPlace = this.places[index];
      const previousPlace = this.places[index - 1];
      
      const tempOrder = currentPlace.orderIndex;
      currentPlace.orderIndex = previousPlace.orderIndex;
      previousPlace.orderIndex = tempOrder;
      
      [this.places[index], this.places[index - 1]] = [this.places[index - 1], this.places[index]];
    }
  }

  movePlaceDown(index: number) {
    if (index < this.places.length - 1) {
      const currentPlace = this.places[index];
      const nextPlace = this.places[index + 1];
      
      const tempOrder = currentPlace.orderIndex;
      currentPlace.orderIndex = nextPlace.orderIndex;
      nextPlace.orderIndex = tempOrder;
      
      [this.places[index], this.places[index + 1]] = [this.places[index + 1], this.places[index]];
    }
  }

  savePlaces() {
    this.lineForm.places = JSON.parse(JSON.stringify(this.places));
    this.lineForm.expression = this.generatedExpression;
    this.closePlacesModal();
  }

  // Méthodes utilitaires pour les places
  getPlaceTypeClass(place: Place): string {
    if (place.argument) return 'bg-primary';
    if (place.operator) {
      if (place.operator === '(' || place.operator === ')') {
        return 'bg-info';
      }
      return 'bg-warning';
    }
    if (place.literalValue) return 'bg-success';
    return 'bg-secondary';
  }

  getPlaceTypeLabel(place: Place): string {
    if (place.argument) return 'Argument';
    if (place.operator) {
      if (place.operator === '(' || place.operator === ')') {
        return 'Parenthèse';
      }
      return 'Opérateur';
    }
    if (place.literalValue) return 'Valeur';
    return 'Inconnu';
  }

  getPlaceDetails(place: Place): string {
    if (place.argument) {
      return `Argument: ${place.argument.dataType}`;
    } else if (place.operator) {
      if (place.operator === '(') {
        return 'Parenthèse ouvrante';
      } else if (place.operator === ')') {
        return 'Parenthèse fermante';
      }
      return `Opérateur: ${this.getOperatorDescription(place.operator)}`;
    } else if (place.literalValue) {
      return `Valeur littérale`;
    }
    return 'Élément non défini';
  }

  getOperatorDescription(operator: string): string {
    const allOperators = [...this.mathOperators, ...this.comparisonOperators, ...this.logicalOperators];
    const found = allOperators.find(op => op.symbol === operator);
    
    if (found) return found.description;
    
    if (operator === '(') return 'Parenthèse ouvrante';
    if (operator === ')') return 'Parenthèse fermante';
    
    return operator;
  }

  // ---- MODALE BUILDER D'EXPRESSION ----
  openExpressionBuilder() {
    this.parseExpressionToTokens(this.lineForm.expression);
    this.showExpressionBuilder = true;
  }

  closeExpressionBuilder() {
    this.showExpressionBuilder = false;
  }

  applyExpression() {
    this.lineForm.expression = this.currentExpression;
    this.closeExpressionBuilder();
  }

  // ---- GESTION DES LIGNES ----
  async saveLine() {
    this.isSubmitting = true;
    const methodId = this.$route.params.methodId;
    
    try {
      const url = this.editingLine
        ? `http://localhost:8000/api/engine/method/line/${this.editingLine.id}`
        : `http://localhost:8000/api/engine/method/${methodId}/line`;

      const method = this.editingLine ? "PUT" : "POST";

      const payload = {
        orderIndex: this.lineForm.orderIndex,
        expression: this.lineForm.expression,
        resultVariable: this.lineForm.resultVariable,
        lineType: this.lineForm.lineType,
        metadata: this.lineForm.metadata,
        conditionGroups: this.lineForm.conditionGroups.map((group, index) => ({
          ...group,
          orderIndex: index + 1,
          conditions: group.conditions.map((condition, condIndex) => ({
            ...condition,
            orderIndex: condIndex + 1,
            leftArgumentId: condition.leftArgumentId
          }))
        })),
        places: this.lineForm.places.map((place, index) => ({
          id: place.id,
          argumentId: place.argumentId,
          operator: place.operator,
          literalValue: place.literalValue,
          orderIndex: place.orderIndex
        }))
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const res = await response.json();

      if (response.ok && (res.code === 200 || res.code === 201)) {
        alert(this.editingLine ? "✅ Ligne mise à jour !" : "🎉 Ligne créée avec succès !");
        this.closeLineModal();
        this.fetchMethodLines();
      } else {
        alert("❌ Erreur : " + (res.message || "Inconnue"));
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur réseau ou serveur");
    } finally {
      this.isSubmitting = false;
    }
  }

  async deleteLine(line: MethodLine) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la ligne #${line.orderIndex} ?`)) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/engine/method/line/${line.id}`,
        { method: "DELETE" }
      );

      const res = await response.json();
      if (res.code === 200) {
        alert("✅ Ligne supprimée");
        this.fetchMethodLines();
      } else {
        alert("❌ Erreur : " + (res.message || "Inconnue"));
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur réseau");
    }
  }

  // ---- BUILDER D'EXPRESSION ----
  addToExpression(value: string) {
    let type: ExpressionToken['type'] = 'value';
    
    if (this.availableArguments.some(arg => arg.code === value)) {
      type = 'argument';
    } else if (this.mathOperators.some(op => op.symbol === value) ||
               this.comparisonOperators.some(op => op.symbol === value) ||
               this.logicalOperators.some(op => op.symbol === value)) {
      type = 'operator';
    } else if (value === '(' || value === ')') {
      type = 'parenthesis';
    } else if (value === ' ') {
      type = 'value';
    }

    this.expressionTokens.push({ type, value });
  }

  removeToken(index: number) {
    this.expressionTokens.splice(index, 1);
  }

  undoLastToken() {
    if (this.expressionTokens.length > 0) {
      this.expressionTokens.pop();
    }
  }

  clearExpression() {
    this.expressionTokens = [];
  }

  parseExpressionToTokens(expression: string) {
    this.expressionTokens = [];
    if (!expression) return;

    const tokens = expression.split(/\s+/).filter(token => token.trim());
    
    tokens.forEach(token => {
      let type: ExpressionToken['type'] = 'value';
      
      if (this.availableArguments.some(arg => arg.code === token)) {
        type = 'argument';
      } else if (this.mathOperators.some(op => op.symbol === token) ||
                 this.comparisonOperators.some(op => op.symbol === token) ||
                 this.logicalOperators.some(op => op.symbol === token)) {
        type = 'operator';
      } else if (token === '(' || token === ')') {
        type = 'parenthesis';
      }

      this.expressionTokens.push({ type, value: token });
    });
  }

  addCustomValue() {
    if (this.customValue.trim()) {
      this.addToExpression(this.customValue.trim());
      this.customValue = "";
    }
  }

  focusExpressionInput() {
    // Pour le focus si nécessaire
  }

  getTokenClass(type: string): string {
    return `token-${type}`;
  }

  onLineTypeChange() {
    if (this.lineForm.lineType === 'calculation') {
      this.lineForm.conditionGroups = [];
    } else if (this.lineForm.conditionGroups.length === 0) {
      this.lineForm.conditionGroups = this.getDefaultConditionGroup();
    }
  }

  // ---- AFFICHAGE DÉTAILS ----
  openLineDetails(line: MethodLine) {
    this.selectedLine = line;
    this.showLineDetailsModal = true;
  }

  closeLineDetailsModal() {
    this.showLineDetailsModal = false;
    this.selectedLine = null;
  }

  manageVersions(line: MethodLine) {
    alert(`Gestion des versions pour la ligne #${line.orderIndex} - À implémenter`);
  }

  // ---- UTILITAIRES ----
  getLineTypeClass(lineType: string): string {
    const classes = {
      calculation: 'bg-success',
      validation: 'bg-info',
      condition: 'bg-warning'
    };
    return classes[lineType as keyof typeof classes] || 'bg-secondary';
  }

  getLineTypeIcon(lineType: string): string {
    const icons = {
      calculation: 'fas fa-calculator',
      validation: 'fas fa-check-circle',
      condition: 'fas fa-code-branch'
    };
    return icons[lineType as keyof typeof icons] || 'fas fa-circle';
  }

  getLineTypeLabel(lineType: string): string {
    const labels = {
      calculation: 'Calcul',
      validation: 'Validation',
      condition: 'Condition'
    };
    return labels[lineType as keyof typeof labels] || lineType;
  }

  getDataTypeClass(dataType: string): string {
    const classes: { [key: string]: string } = {
      number: 'bg-primary',
      string: 'bg-success',
      boolean: 'bg-warning',
      date: 'bg-info',
      object: 'bg-secondary',
      array: 'bg-dark'
    };
    return classes[dataType] || 'bg-secondary';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
</script>

<style scoped>
/* Styles pour les modales */
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
  width: 900px;
}

.modal-dialog-medium {
  width: 700px;
  max-width: 90%;
}

.modal-dialog-extra-large {
  width: 95%;
  max-width: 1400px;
  max-height: 90vh;
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

/* Styles pour les sections */
.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.section-subtitle {
  font-size: 0.9rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.75rem;
}

.category-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

/* Boutons dans la grille */
.line-actions-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
}

.line-actions-grid .btn {
  justify-content: flex-start;
  font-size: 0.8rem;
  padding: 0.4rem 0.75rem;
}

/* Boutons d'action */
.action-buttons .btn {
  padding: 0.75rem 1rem;
  font-weight: 500;
}

/* Arguments */
.arguments-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.argument-item {
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.argument-item:hover {
  background: #f8f9fa;
  border-color: #007bff;
  transform: translateX(4px);
}

.argument-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
}

.argument-name {
  font-weight: 600;
  color: #495057;
  font-size: 0.875rem;
  flex: 1;
}

.argument-type-badge {
  font-size: 0.6rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  color: white;
  font-weight: 500;
}

.argument-code {
  font-family: 'Courier New', monospace;
  color: #6c757d;
  font-size: 0.75rem;
}

/* Builder d'expression */
.expression-builder-section {
  min-height: 600px;
}

.expression-display {
  border: 2px dashed #dee2e6;
  border-radius: 12px;
  padding: 1.5rem;
  background: #f8f9fa;
  min-height: 150px;
  cursor: text;
}

.expression-preview {
  min-height: 120px;
}

.expression-placeholder {
  color: #6c757d;
  font-style: italic;
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.1rem;
}

.expression-tokens {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  min-height: 80px;
}

.expression-token {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-weight: 500;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.expression-token:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.expression-token:hover .token-remove {
  opacity: 1;
}

.token-argument {
  background: #e7f3ff;
  border: 2px solid #b3d9ff;
  color: #0066cc;
}

.token-operator {
  background: #fff3cd;
  border: 2px solid #ffeaa7;
  color: #856404;
}

.token-value {
  background: #d1ecf1;
  border: 2px solid #b6effb;
  color: #0c5460;
}

.token-parenthesis {
  background: #e2e3e5;
  border: 2px solid #d6d8db;
  color: #383d41;
}

.token-remove {
  opacity: 0;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: opacity 0.2s;
}

/* Opérateurs */
.operators-category {
  margin-bottom: 1.5rem;
}

.operators-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.operator-btn {
  padding: 1rem 0.75rem;
  border: 2px solid;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.operator-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.operator-btn.math {
  border-color: #ffeaa7;
  background: #fff3cd;
}

.operator-btn.comparison {
  border-color: #b3d9ff;
  background: #e7f3ff;
}

.operator-btn.logical {
  border-color: #d6d8db;
  background: #e2e3e5;
}

.operator-symbol {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

.operator-label {
  font-size: 0.75rem;
  color: #6c757d;
}

/* Valeur personnalisée */
.custom-value-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px dashed #dee2e6;
}

/* Styles pour la nouvelle interface des conditions */
.conditions-management {
  min-height: 600px;
}

.condition-groups-container {
  max-height: 400px;
  overflow-y: auto;
}

.condition-group-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  position: relative;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  border-radius: 12px 12px 0 0;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.group-conditions {
  padding: 1.5rem;
}

.condition-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: #fafafa;
  transition: all 0.3s ease;
}

.condition-item.active {
  border-color: #007bff;
  background: #e7f3ff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.condition-item:last-child {
  margin-bottom: 0;
}

.condition-zone {
  flex: 1;
  min-height: 80px;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: 1rem;
  background: white;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.condition-zone.drag-over {
  border-color: #007bff;
  background: #e7f3ff;
  transform: scale(1.02);
}

.condition-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #6c757d;
  text-align: center;
}

.condition-tokens {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.condition-token {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  user-select: none;
}

.condition-token:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.condition-token:hover .token-remove {
  opacity: 1;
}

.token-argument {
  background: #e7f3ff;
  border: 2px solid #b3d9ff;
  color: #0066cc;
}

.token-operator {
  background: #fff3cd;
  border: 2px solid #ffeaa7;
  color: #856404;
}

.token-value {
  background: #d1ecf1;
  border: 2px solid #b6effb;
  color: #0c5460;
}

.condition-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.group-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
  border-radius: 0 0 12px 12px;
}

.add-group-section {
  border-top: 1px solid #e9ecef;
  padding-top: 1.5rem;
}

/* Contrôles des conditions */
.condition-controls {
  border-top: 1px solid #e9ecef;
  padding-top: 1rem;
}

.condition-preview {
  background: #1a1a1a;
  color: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  min-height: 60px;
  display: flex;
  align-items: center;
}

.condition-stats {
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.stat-item {
  text-align: center;
  padding: 0.5rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
}

.stat-label {
  font-size: 0.75rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

/* Styles pour la nouvelle interface des places */
.places-management-simple {
  min-height: 600px;
}

.elements-category {
  margin-bottom: 1.5rem;
}

.elements-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
}

.element-item {
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: white;
  cursor: grab;
  transition: all 0.2s;
  user-select: none;
}

.element-item:hover {
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.element-item:active {
  cursor: grabbing;
}

.element-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.element-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: #495057;
}

.element-code {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #6c757d;
}

.element-type {
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  color: white;
  align-self: flex-start;
}

/* Styles pour les opérateurs et parenthèses */
.operators-grid-simple {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.parenthesis-grid-simple {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.operator-btn-simple {
  padding: 0.75rem 0.5rem;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 1.1rem;
}

.operator-btn-simple.math {
  background: #fff3cd;
  border-color: #ffeaa7;
}

.operator-btn-simple.math:hover {
  background: #ffeaa7;
  border-color: #ffd740;
}

.operator-btn-simple.comparison {
  background: #e7f3ff;
  border-color: #b3d9ff;
}

.operator-btn-simple.comparison:hover {
  background: #b3d9ff;
  border-color: #80bdff;
}

.operator-btn-simple.logical {
  background: #e2e3e5;
  border-color: #d6d8db;
}

.operator-btn-simple.logical:hover {
  background: #d6d8db;
  border-color: #c8cbcd;
}

.operator-btn-simple.parenthesis {
  background: #d1ecf1;
  border-color: #b6effb;
}

.operator-btn-simple.parenthesis:hover {
  background: #b6effb;
  border-color: #81e3f4;
}

/* Zone d'expression drag & drop */
.expression-zone {
  min-height: 200px;
  border: 2px dashed #dee2e6;
  border-radius: 12px;
  padding: 1.5rem;
  background: #f8f9fa;
  transition: all 0.3s;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.5rem;
}

.expression-zone.drag-over {
  border-color: #007bff;
  background: #e7f3ff;
}

.expression-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  color: #6c757d;
  text-align: center;
}

.expression-tokens-simple {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.expression-token-simple {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  user-select: none;
}

.expression-token-simple:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.expression-token-simple:hover .token-remove {
  opacity: 1;
}

.token-argument {
  background: #e7f3ff;
  border: 2px solid #b3d9ff;
  color: #0066cc;
}

.token-operator {
  background: #fff3cd;
  border: 2px solid #ffeaa7;
  color: #856404;
}

.token-value {
  background: #d1ecf1;
  border: 2px solid #b6effb;
  color: #0c5460;
}

.token-parenthesis {
  background: #d1ecf1;
  border: 2px solid #b6effb;
  color: #0c5460;
}

.token-unknown {
  background: #e2e3e5;
  border: 2px solid #d6d8db;
  color: #383d41;
}

.token-content {
  font-size: 0.9rem;
}

.token-remove {
  opacity: 0;
  color: #dc3545;
  font-size: 0.8rem;
  transition: opacity 0.2s;
}

/* Contrôles d'expression */
.expression-controls {
  border-top: 1px solid #e9ecef;
  padding-top: 1rem;
}

.help-section {
  font-size: 0.875rem;
}

/* Statistiques de l'expression */
.expression-stats {
  font-size: 0.875rem;
}

.expression-stats .row > div {
  text-align: center;
}

/* Valeurs prédéfinies */
.predefined-values {
  margin-top: 0.5rem;
}

.predefined-values .btn {
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
}

/* Indication de parenthèses non équilibrées */
.text-danger small {
  font-weight: 500;
}

.text-success small {
  font-weight: 500;
}

/* Gestion des places */
.places-management {
  min-height: 600px;
}

.place-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  background: white;
  transition: all 0.2s;
}

.place-item:hover {
  border-color: #007bff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.place-content {
  flex: 1;
}

.place-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.place-order {
  font-size: 0.75rem;
}

.place-type-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
}

.place-value {
  font-weight: 500;
  font-family: 'Courier New', monospace;
}

.place-details {
  font-size: 0.8rem;
}

.place-actions {
  display: flex;
  gap: 0.25rem;
}

.place-actions .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}

/* Aperçu des places */
.places-preview {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.place-preview-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.875rem;
}

.place-preview-order {
  background: #007bff;
  color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}

.place-preview-value {
  font-family: 'Courier New', monospace;
  flex: 1;
}

.place-preview-type {
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
}

/* Détails des places */
.places-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.place-detail-item {
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #f8f9fa;
}

.place-detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.place-detail-content {
  font-size: 0.9rem;
}

/* Styles pour la prévisualisation de l'expression */
.preview-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
}

.expression-preview {
  background: #1a1a1a;
  color: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  min-height: 60px;
  display: flex;
  align-items: center;
}

/* Styles pour les badges de type */
.bg-primary { background: #007bff; }
.bg-warning { background: #ffc107; color: #000; }
.bg-success { background: #28a745; }
.bg-info { background: #17a2b8; }
.bg-secondary { background: #6c757d; }

/* Styles existants pour le reste de l'interface */
.method-lines-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.method-line-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.method-line-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #007bff;
}

.line-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.line-info {
  flex: 1;
}

.line-order {
  font-size: 0.875rem;
  font-weight: 600;
}

.line-type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.variable-badge {
  background: #6f42c1;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: monospace;
}

.line-title {
  font-weight: 600;
  margin: 0.5rem 0;
  color: #1a1a1a;
}

.line-meta {
  display: flex;
  gap: 1rem;
}

/* Statistiques */
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

/* Informations détaillées */
.info-grid {
  display: grid;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item label {
  font-weight: 500;
  color: #6c757d;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
}

.code-block.large {
  min-height: 120px;
}

/* Animation */
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

/* Sous-titres dans les catégories */
h7 {
  font-size: 0.75rem;
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
  color: #6c757d;
}

/* Amélioration responsive */
@media (max-width: 768px) {
  .line-actions-grid {
    flex-direction: row;
    flex-wrap: wrap;
    min-width: auto;
  }
  
  .line-actions-grid .btn {
    flex: 1;
    min-width: 120px;
    font-size: 0.75rem;
  }
  
  .modal-dialog-extra-large {
    width: 98%;
    margin: 1%;
  }
  
  .line-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .line-actions-grid {
    width: 100%;
  }

  .place-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .place-actions {
    width: 100%;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }

  .expression-tokens-simple {
    justify-content: center;
  }
  
  .operators-grid-simple,
  .parenthesis-grid-simple {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .expression-stats .row > div {
    margin-bottom: 0.5rem;
    text-align: left;
  }
  
  .expression-controls .d-flex {
    flex-wrap: wrap;
    justify-content: center !important;
  }
  
  .expression-controls .btn {
    margin-bottom: 0.25rem;
  }
  
  .help-section .row > div {
    margin-bottom: 0.5rem;
  }

  .condition-item {
    flex-direction: column;
    gap: 0.5rem;
  }

  .condition-actions {
    justify-content: flex-start;
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 576px) {
  .modal-dialog-custom {
    margin: 0.5rem;
    width: calc(100% - 1rem);
  }
  
  .modal-body-custom {
    padding: 1rem;
  }
  
  .modal-header-custom,
  .modal-footer-custom {
    padding: 1rem;
  }
  
  .operators-grid-simple,
  .parenthesis-grid-simple {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .expression-stats .row {
    text-align: center;
  }
  
  .expression-stats .row > div {
    margin-bottom: 0.75rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* Styles pour les boutons d'action dans la zone d'expression */
.expression-controls .btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
}

/* Amélioration visuelle pour les sous-catégories d'opérateurs */
.elements-category .mb-3:last-child {
  margin-bottom: 0 !important;
}

/* Style pour l'espacement des catégories */
.elements-category > div {
  margin-bottom: 1rem;
}

.elements-category > div:last-child {
  margin-bottom: 0;
}

/* Style pour les éléments de la liste avec défilement */
.elements-list::-webkit-scrollbar {
  width: 6px;
}

.elements-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.elements-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.elements-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Amélioration du focus pour l'accessibilité */
.operator-btn-simple:focus,
.element-item:focus,
.expression-token-simple:focus,
.condition-token:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Style pour les états de chargement */
.spinner-border {
  border-width: 0.15em;
}

/* Style pour les messages d'erreur et de succès */
.alert {
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
}

.alert-info {
  background: #e7f3ff;
  color: #0066cc;
}

/* Style pour les badges dans les statistiques */
.badge {
  font-size: 0.7em;
  font-weight: 600;
}

/* Style pour les transitions fluides */
.method-line-card,
.stat-card,
.element-item,
.expression-token-simple,
.operator-btn-simple,
.place-item,
.condition-group-card,
.condition-token {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Style pour les ombres portées améliorées */
.modal-dialog-custom,
.method-line-card:hover,
.stat-card:hover,
.expression-token-simple:hover,
.condition-token:hover {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

/* Style pour les bordures subtiles */
.border-end {
  border-right: 1px solid #e9ecef !important;
}

/* Style pour les états vides améliorés */
.text-muted {
  color: #6c757d !important;
}

.opacity-50 {
  opacity: 0.5;
}

/* Style pour la prévisualisation du code */
code {
  font-family: 'Courier New', monospace;
  background: transparent;
  color: inherit;
}

/* Style pour les zones de texte */
.form-control {
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.2s;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Style pour les sélecteurs */
.form-select {
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.2s;
}

.form-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Style pour les boutons */
.btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background: #0056b3;
  border-color: #0056b3;
  transform: translateY(-1px);
}

.btn-outline-primary {
  color: #007bff;
  border-color: #007bff;
}

.btn-outline-primary:hover {
  background: #007bff;
  border-color: #007bff;
  transform: translateY(-1px);
}

/* Style pour les icônes */
.fas, .fa {
  font-size: 0.875em;
}

/* Style pour les en-têtes de section */
.section-title .fas,
.section-subtitle .fas,
.category-title .fas {
  opacity: 0.8;
}

/* Style pour les états désactivés */
.btn:disabled,
.form-control:disabled,
.form-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn:disabled:hover {
  transform: none;
}

/* Style pour les messages de validation */
.invalid-feedback {
  font-size: 0.75rem;
  color: #dc3545;
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.form-control.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
</style>