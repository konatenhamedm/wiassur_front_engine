# Plan de Travail - Migration Vue 2 → Vue 3 - WiAssur Admin

## 📋 Vue d'ensemble

**Objectif**: Migrer l'application WiAssur Admin de Vue 2 vers Vue 3 en commençant par le module Moteur de calcul.

**Stratégie**: 
- Architecture modulaire (comme l'ancien)
- Class Components (vue-facing-decorator)
- Pinia (au lieu de Vuex)
- Système de thèmes (Light/Dark + variants)
- Menu-driven permissions

---

## ✅ Ce qui est déjà fait (Artifacts disponibles)

### Configuration de base
- [x] `vite.config.ts` - Configuration Vite
- [x] `tsconfig.json` - TypeScript avec decorators
- [x] `package.json` - Scripts (à intégrer)
- [x] `.env.development` et `.env.production` - Variables environnement
- [x] `.gitignore`

### Structure application
- [x] `src/main.ts` - Bootstrap app
- [x] `src/App.vue` - Composant racine avec ThemeSwitcher
- [x] `src/env.d.ts` - Types environnement

### Configuration environnement
- [x] `src/config/env.ts` - Accès centralisé aux variables

### Styles & Thèmes
- [x] `src/assets/styles/main.css` - Variables CSS theme-aware
- [x] `src/composables/useTheme.ts` - Gestion thèmes
- [x] `src/components/ThemeSwitcher.vue` - UI switcher

### Types TypeScript
- [x] `src/types/engine.ts` - Types moteur
- [x] `src/types/auth.ts` - Types auth

### Stores Pinia
- [x] `src/stores/auth.ts` - Store authentification
- [x] `src/stores/engine.ts` - Store moteur (à vérifier/adapter)

### Services API
- [x] `src/services/api/auth.ts` - API Auth
- [x] `src/services/api/engine.ts` - API Engine

### Router
- [x] `src/router/index.ts` - Composition modulaire + Guards
- [x] `src/router/Menu.ts` - Permissions (source de vérité)
- [x] `src/router/default.ts` - Routes de base
- [x] `src/router/configuration.ts` - Routes moteur (complet)
- [x] `src/router/income.ts` - Routes production (déclarées)
- [x] `src/router/crm.ts` - Routes CRM (déclarées)
- [x] `src/router/admin.ts` - Routes admin (déclarées)
- [x] `src/router/partner.ts` - Routes partenaires (déclarées)
- [x] `src/router/accounting.ts` - Routes comptabilité (déclarées)
- [x] `src/router/comparator.ts` - Routes comparateur (déclarées)
- [x] `src/router/error.ts` - Routes erreurs (déclarées)

### Vues (partiellement)
- [x] `src/views/Engine/Configuration.vue` - Formulaire calcul (fait)
- [x] `src/views/Dashboard/Index.vue` - Dashboard placeholder
- [x] `src/views/Auth/Login.vue` - Login placeholder
- [x] `src/views/Errors/NotFound.vue` - 404 placeholder
- [x] `src/views/Errors/Unauthorized.vue` - 403 placeholder

### Documentation
- [x] GUIDE_THEMES.md
- [x] MIGRATION_THEMES.md
- [x] GUIDE_ROUTER.md
- [x] ROUTER_ARCHITECTURE.md
- [x] GUIDE_ENV.md

---

## 🚧 Tâches à accomplir

### Phase 1: Setup Projet ⏰ Priorité CRITIQUE

#### 1.1 Créer la structure de base
```bash
# Créer le projet Vite
npm create vite@latest wiassur-admin-v3 -- --template vue-ts
cd wiassur-admin-v3

# Créer la structure de dossiers
mkdir -p src/{assets/styles,components,composables,config,layouts,router,services/api,stores,types,views}
mkdir -p src/views/{Engine,Dashboard,Auth,Errors,Configuration,Income,CRM,Admin,Partner,Accounting,Comparator}
mkdir -p public/{css,icons,images,sounds}
```

#### 1.2 Installer les dépendances
```bash
# Core
npm install vue@^3.4.0 vue-router@^4.2.0 pinia@^2.1.0 vue-facing-decorator@^3.0.4

# UI
npm install bootstrap@^5.3.0 bootstrap-vue-next@^0.15.0

# Utilities
npm install axios@^1.6.0 uuid@^9.0.0 crypto-js@^4.2.0 dayjs@^1.11.0 sweetalert2@^11.10.0

# Charts
npm install apexcharts@^3.45.0 vue3-apexcharts@^1.5.0

# Dev Dependencies
npm install -D typescript@^5.3.0 @vue/tsconfig@^0.5.0 @vitejs/plugin-vue@^5.0.0 vite@^5.0.0 vue-tsc@^1.8.0
npm install -D @types/node@^20.10.0 @types/uuid@^9.0.0 @types/crypto-js@^4.2.0
```

#### 1.3 Copier les fichiers de configuration
Copier depuis les artifacts vers le projet :
- [ ] `vite.config.ts`
- [ ] `tsconfig.json`
- [ ] `tsconfig.node.json` (créer)
- [ ] `.env.development`
- [ ] `.env.production`
- [ ] `.gitignore`
- [ ] `index.html` (mettre à jour si nécessaire)

#### 1.4 Copier les fichiers sources de base
- [ ] `src/main.ts`
- [ ] `src/App.vue`
- [ ] `src/env.d.ts`
- [ ] `src/config/env.ts`
- [ ] `src/assets/styles/main.css`

#### 1.5 Test initial
```bash
npm run dev
# Devrait démarrer sur http://localhost:8080
# Devrait voir App.vue avec ThemeSwitcher
```

---

### Phase 2: Types & Composables ⏰ Priorité HAUTE

#### 2.1 Créer les types
- [ ] `src/types/engine.ts` (copier artifact)
- [ ] `src/types/auth.ts` (copier artifact)

#### 2.2 Créer les composables
- [ ] `src/composables/useTheme.ts` (copier artifact)

#### 2.3 Créer les composants globaux
- [ ] `src/components/ThemeSwitcher.vue` (copier artifact)

---

### Phase 3: Services API ⏰ Priorité HAUTE

#### 3.1 Créer les services
- [ ] `src/services/api/auth.ts` (copier artifact)
- [ ] `src/services/api/engine.ts` (copier artifact)

---

### Phase 4: Stores Pinia ⏰ Priorité HAUTE

#### 4.1 Créer les stores
- [ ] `src/stores/auth.ts` (copier artifact)
- [ ] `src/stores/engine.ts` (copier artifact, adapter si nécessaire)

---

### Phase 5: Router ⏰ Priorité HAUTE

#### 5.1 Créer les fichiers router
- [ ] `src/router/index.ts` (copier artifact)
- [ ] `src/router/Menu.ts` (copier artifact)
- [ ] `src/router/default.ts` (copier artifact)
- [ ] `src/router/configuration.ts` (copier artifact)
- [ ] `src/router/income.ts` (copier artifact)
- [ ] `src/router/crm.ts` (copier artifact)
- [ ] `src/router/admin.ts` (copier artifact depuis le fichier combiné, splitter)
- [ ] `src/router/partner.ts` (copier artifact depuis le fichier combiné, splitter)
- [ ] `src/router/accounting.ts` (copier artifact depuis le fichier combiné, splitter)
- [ ] `src/router/comparator.ts` (copier artifact depuis le fichier combiné, splitter)
- [ ] `src/router/error.ts` (copier artifact depuis le fichier combiné, splitter)

#### 5.2 Vérifier imports
S'assurer que tous les imports dans `router/index.ts` sont corrects.

---

### Phase 6: Layouts ⏰ Priorité MOYENNE

**⚠️ BESOIN DE CLARIFICATION**

Créer les layouts selon l'architecture de l'ancien projet :

#### 6.1 Identifier la structure (À FAIRE)
- [ ] Vérifier dans l'ancien projet : quel système de layout ?
- [ ] Y a-t-il un `LayoutView.vue` avec Sidebar ?
- [ ] Sidebar dynamique depuis Menu.ts ?
- [ ] Plusieurs layouts (Admin, Public, Auth) ?

#### 6.2 Créer les layouts (À DÉFINIR)
Options possibles :
- **Option A**: Layout unique avec sidebar
  - [ ] `src/layouts/DefaultLayout.vue`
  - [ ] `src/components/Sidebar.vue`
  - [ ] `src/components/Header.vue`

- **Option B**: Layouts multiples
  - [ ] `src/layouts/AdminLayout.vue` (avec sidebar)
  - [ ] `src/layouts/PublicLayout.vue` (comparateur)
  - [ ] `src/layouts/AuthLayout.vue` (login)

- **Option C**: Pas de layout (RouterView direct)
  - Déjà fait dans App.vue

**ACTION REQUISE**: Consulter ancien projet pour décider.

---

### Phase 7: Vues Moteur ⏰ Priorité HAUTE

#### 7.1 Vues Engine à créer

- [x] `src/views/Engine/Configuration.vue` - Déjà fait
- [ ] `src/views/Engine/Methods.vue` - Liste méthodes
- [ ] `src/views/Engine/MethodDetail.vue` - Détail méthode
- [ ] `src/views/Engine/MethodForm.vue` - Créer/Modifier méthode
- [ ] `src/views/Engine/Test.vue` - Interface test

#### 7.2 Template de base pour chaque vue

Chaque vue doit avoir :
```vue
<template>
  <div class="container py-4">
    <h1 class="h3 mb-4">Titre</h1>
    <div class="card">
      <div class="card-body">
        <!-- Contenu -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-facing-decorator'
import { Vue, Options } from 'vue-facing-decorator'

@Options({
  name: 'ComponentName'
})
export default class ComponentName extends Vue {
  // Logique
}
</script>
```

#### 7.3 Fonctionnalités par vue

**Methods.vue**:
- [ ] Liste des méthodes (table)
- [ ] Bouton "Créer"
- [ ] Actions: Voir, Modifier, Supprimer
- [ ] Filtres/recherche
- [ ] Pagination

**MethodDetail.vue**:
- [ ] Affichage détails méthode
- [ ] Liste des lignes (EngineMethodLine)
- [ ] Arguments de la méthode
- [ ] Boutons: Modifier, Supprimer, Test

**MethodForm.vue**:
- [ ] Formulaire create/edit
- [ ] Champs: name, code, description
- [ ] Gestion arguments
- [ ] Gestion lignes de calcul
- [ ] Validation
- [ ] Save/Cancel

**Test.vue**:
- [ ] Sélection méthode
- [ ] Sélection branche
- [ ] Sélection assureur
- [ ] Saisie arguments
- [ ] Bouton calculer
- [ ] Affichage résultats (Prime TTC, taxes, etc.)

---

### Phase 8: Vues Configuration (Branches, Assureurs) ⏰ Priorité MOYENNE

#### 8.1 Branches
- [ ] `src/views/Configuration/Branch/List.vue`
- [ ] `src/views/Configuration/Branch/Form.vue`
- [ ] `src/views/Configuration/Branch/Detail.vue`

#### 8.2 Assureurs
- [ ] `src/views/Configuration/Insurer/List.vue`
- [ ] `src/views/Configuration/Insurer/Form.vue`
- [ ] `src/views/Configuration/Insurer/Detail.vue`

#### 8.3 Autres config
- [ ] `src/views/Configuration/Pack/List.vue`
- [ ] `src/views/Configuration/Guarantee/List.vue`
- [ ] `src/views/Configuration/Survey/List.vue`
- [ ] `src/views/Configuration/Survey/Form.vue`
- [ ] `src/views/Configuration/DataType/Manager.vue`
- [ ] `src/views/Configuration/Tag/Manager.vue`

---

### Phase 9: Vues de base ⏰ Priorité HAUTE

#### 9.1 Dashboard
- [ ] Améliorer `src/views/Dashboard/Index.vue`
- [ ] Ajouter statistiques
- [ ] Ajouter graphiques (ApexCharts)

#### 9.2 Auth
- [ ] Améliorer `src/views/Auth/Login.vue`
- [ ] Formulaire fonctionnel
- [ ] Gestion erreurs
- [ ] Redirection après login

#### 9.3 Errors
- [x] `src/views/Errors/NotFound.vue` - Déjà fait
- [x] `src/views/Errors/Unauthorized.vue` - Déjà fait

---

### Phase 10: Tests & Validation ⏰ Priorité HAUTE

#### 10.1 Tests navigation
- [ ] Tester toutes les routes du moteur
- [ ] Vérifier redirections
- [ ] Vérifier guards (auth + roles)

#### 10.2 Tests thèmes
- [ ] Toggle Light/Dark
- [ ] Changer variants couleurs
- [ ] Persistence localStorage
- [ ] Transitions fluides

#### 10.3 Tests fonctionnels moteur
- [ ] CRUD méthodes
- [ ] Calcul de prime
- [ ] Affichage résultats
- [ ] Gestion erreurs API

#### 10.4 Tests permissions
- [ ] ROLE_ADMIN accède à tout
- [ ] ROLE_MANAGER accède au moteur
- [ ] Autres rôles bloqués
- [ ] Routes non configurées bloquées

---

### Phase 11: Autres modules (APRÈS validation moteur) ⏰ Priorité BASSE

**À faire uniquement quand le moteur est 100% fonctionnel**

#### 11.1 Income (Production)
- [ ] Créer les vues Quotation
- [ ] Créer les vues Contract
- [ ] Créer les vues Customer
- [ ] etc.

#### 11.2 CRM
- [ ] Créer les vues Contact
- [ ] Créer les vues Company
- [ ] etc.

#### 11.3 Admin
- [ ] Créer les vues User
- [ ] Créer les vues Role
- [ ] etc.

---

## 🎯 Ordre d'exécution recommandé

### Sprint 1 (Fondations)
1. Phase 1: Setup Projet
2. Phase 2: Types & Composables
3. Phase 3: Services API
4. Phase 4: Stores Pinia
5. Phase 5: Router

**Livrable**: Application démarre, router fonctionne, pas d'erreurs.

### Sprint 2 (Layouts & Vues de base)
1. Phase 6: Layouts (clarifier d'abord)
2. Phase 9: Vues de base (Dashboard, Login, Errors)

**Livrable**: Navigation de base fonctionne, login opérationnel.

### Sprint 3 (Moteur - CRUD)
1. Phase 7: Vues Moteur
   - Methods.vue
   - MethodDetail.vue
   - MethodForm.vue

**Livrable**: CRUD méthodes fonctionnel.

### Sprint 4 (Moteur - Calcul)
1. Phase 7: Vue Test
2. Phase 8: Vues Configuration (Branches, Assureurs)

**Livrable**: Calcul de prime fonctionnel.

### Sprint 5 (Tests & Polish)
1. Phase 10: Tests & Validation
2. Corrections bugs
3. Optimisations

**Livrable**: Moteur 100% fonctionnel et testé.

### Sprint 6+ (Autres modules)
Phase 11 : Selon priorités métier.

---

## 📝 Checklist Validation

### Avant de passer au sprint suivant

**Sprint 1 (Fondations)** ✓
- [ ] `npm run dev` fonctionne
- [ ] `npm run build` fonctionne sans erreur
- [ ] `npm run type-check` sans erreur
- [ ] Router charge correctement
- [ ] ThemeSwitcher visible et fonctionnel

**Sprint 2 (Layouts & Base)** ✓
- [ ] Layout s'affiche correctement
- [ ] Sidebar/Navigation fonctionne
- [ ] Dashboard accessible
- [ ] Login fonctionnel
- [ ] Redirection après login OK

**Sprint 3 (Moteur CRUD)** ✓
- [ ] Liste méthodes affiche données
- [ ] Créer méthode fonctionne
- [ ] Modifier méthode fonctionne
- [ ] Supprimer méthode fonctionne
- [ ] Détail méthode affiche tout

**Sprint 4 (Moteur Calcul)** ✓
- [ ] Sélection méthode/branche/assureur OK
- [ ] Calcul retourne résultats
- [ ] Résultats affichés correctement
- [ ] Gestion erreurs API OK

**Sprint 5 (Tests)** ✓
- [ ] Tous les tests passent
- [ ] Aucun bug critique
- [ ] Performance acceptable
- [ ] Tous thèmes fonctionnent

---

## 🛠️ Commandes utiles

```bash
# Développement
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Tests (à configurer)
npm run test
```

---

## 📞 Points bloquants / Questions

### À clarifier avant de continuer

1. **Layouts**: Quelle est la structure dans l'ancien projet ?
   - Sidebar dynamique ?
   - Plusieurs layouts ou un seul ?
   - Navigation dans le header ou sidebar ?

2. **API Endpoints**: Les endpoints sont-ils déjà prêts ?
   - `/engine/methods` GET/POST/PUT/DELETE
   - `/engine/calculate` POST
   - `/branches` GET
   - `/insurers` GET

3. **Données de test**: Y a-t-il des données mockées pour développer ?
   - Méthodes de calcul
   - Branches
   - Assureurs

4. **Authentification**: JWT fonctionnel ?
   - Format du token
   - Endpoints auth disponibles

---

## 📚 Ressources

- Documentation artifacts (voir liste en haut)
- Ancien projet Vue 2 (référence)
- Documentation Vue 3: https://vuejs.org/
- Documentation Pinia: https://pinia.vuejs.org/
- Documentation Vite: https://vitejs.dev/

---

**Dernière mise à jour**: Date du plan
**Status global**: 🟡 En cours - Phase 1 (Setup)