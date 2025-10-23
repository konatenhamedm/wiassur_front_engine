# Tabs Components Documentation

Documentation des composants Tabs - système d'onglets réutilisable avec design system intégré.

## Vue d'ensemble

Le système de **Tabs** comprend 3 composants qui fonctionnent ensemble :

- **Tabs** : Conteneur principal qui gère l'état des onglets
- **Tab** : Bouton d'onglet individuel (navigation)
- **TabPane** : Contenu d'un onglet

✅ **3 variantes** : default, pills, underline
✅ **3 tailles** : sm, md, lg
✅ **Thème complet** : support light/dark mode
✅ **Animations** : transitions fluides
✅ **Responsive** : adaptatif mobile
✅ **Accessible** : WCAG 2.1 compliant

---

## Composants

### 1. Tabs (Conteneur)

**Props** :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `string` | `''` | Valeur de l'onglet actif (v-model) |
| `variant` | `'default' \| 'pills' \| 'underline'` | `'default'` | Style des onglets |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille des onglets |
| `justified` | `boolean` | `false` | Étendre les onglets sur toute la largeur |

**Events** :
- `update:modelValue` : Émis quand l'onglet actif change
- `change` : Émis quand l'onglet actif change (même valeur)

**Slots** :
- `#nav` : Contenu de la navigation (boutons Tab)
- `default` : Contenu des onglets (composants TabPane)

---

### 2. Tab (Bouton)

**Props** :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `string` | **required** | Valeur unique de l'onglet |
| `label` | `string` | **required** | Texte affiché sur l'onglet |
| `icon` | `string` | `undefined` | Classe d'icône FontAwesome |
| `disabled` | `boolean` | `false` | Désactiver l'onglet |
| `badge` | `string \| number` | `undefined` | Badge à afficher |

---

### 3. TabPane (Contenu)

**Props** :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `string` | **required** | Valeur correspondant au Tab |
| `lazy` | `boolean` | `false` | Charger le contenu uniquement quand affiché |

---

## Exemples d'utilisation

### Exemple 1 : Tabs basiques

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '@/components/ui/Tabs.vue'
import Tab from '@/components/ui/Tab.vue'
import TabPane from '@/components/ui/TabPane.vue'

const activeTab = ref('profile')
</script>

<template>
  <Tabs v-model="activeTab">
    <template #nav>
      <Tab value="profile" label="Profil" />
      <Tab value="settings" label="Paramètres" />
      <Tab value="notifications" label="Notifications" />
    </template>

    <TabPane value="profile">
      <h3>Profil utilisateur</h3>
      <p>Informations personnelles...</p>
    </TabPane>

    <TabPane value="settings">
      <h3>Paramètres</h3>
      <p>Configurez vos préférences...</p>
    </TabPane>

    <TabPane value="notifications">
      <h3>Notifications</h3>
      <p>Gérez vos notifications...</p>
    </TabPane>
  </Tabs>
</template>
```

---

### Exemple 2 : Tabs avec icônes

```vue
<template>
  <Tabs v-model="activeTab" variant="pills">
    <template #nav>
      <Tab
        value="dashboard"
        label="Tableau de bord"
        icon="fas fa-chart-line"
      />
      <Tab
        value="users"
        label="Utilisateurs"
        icon="fas fa-users"
      />
      <Tab
        value="settings"
        label="Paramètres"
        icon="fas fa-cog"
      />
    </template>

    <TabPane value="dashboard">
      <!-- Contenu dashboard -->
    </TabPane>

    <TabPane value="users">
      <!-- Contenu users -->
    </TabPane>

    <TabPane value="settings">
      <!-- Contenu settings -->
    </TabPane>
  </Tabs>
</template>
```

---

### Exemple 3 : Tabs avec badges

```vue
<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('all')
const pendingCount = ref(5)
const approvedCount = ref(12)
</script>

<template>
  <Tabs v-model="activeTab" variant="underline">
    <template #nav>
      <Tab value="all" label="Tous" />
      <Tab
        value="pending"
        label="En attente"
        icon="fas fa-clock"
        :badge="pendingCount"
      />
      <Tab
        value="approved"
        label="Approuvés"
        icon="fas fa-check"
        :badge="approvedCount"
      />
    </template>

    <TabPane value="all">
      <!-- Tous les éléments -->
    </TabPane>

    <TabPane value="pending">
      <!-- Éléments en attente -->
    </TabPane>

    <TabPane value="approved">
      <!-- Éléments approuvés -->
    </TabPane>
  </Tabs>
</template>
```

---

### Exemple 4 : Tabs dynamiques

```vue
<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('global')

interface Insurer {
  id: number
  name: string
}

const insurers = ref<Insurer[]>([
  { id: 1, name: 'AXA' },
  { id: 2, name: 'Allianz' },
  { id: 3, name: 'Generali' }
])
</script>

<template>
  <Tabs v-model="activeTab" variant="default">
    <template #nav>
      <Tab value="global" label="GLOBAL" icon="fas fa-globe" />
      <Tab value="risk" label="PAR RISQUE" icon="fas fa-exclamation-triangle" />

      <!-- Tabs dynamiques -->
      <Tab
        v-for="insurer in insurers"
        :key="`tab-${insurer.id}`"
        :value="`insurer-${insurer.id}`"
        :label="insurer.name.toUpperCase()"
        icon="fas fa-building"
      />
    </template>

    <TabPane value="global">
      <p>Contenu global...</p>
    </TabPane>

    <TabPane value="risk">
      <p>Contenu par risque...</p>
    </TabPane>

    <!-- TabPanes dynamiques -->
    <TabPane
      v-for="insurer in insurers"
      :key="`pane-${insurer.id}`"
      :value="`insurer-${insurer.id}`"
    >
      <p>Contenu pour {{ insurer.name }}</p>
    </TabPane>
  </Tabs>
</template>
```

---

### Exemple 5 : Tabs avec lazy loading

```vue
<template>
  <Tabs v-model="activeTab">
    <template #nav>
      <Tab value="quick" label="Rapide" />
      <Tab value="heavy" label="Données lourdes" />
    </template>

    <TabPane value="quick">
      <p>Contenu chargé immédiatement</p>
    </TabPane>

    <!-- Lazy loading : chargé uniquement quand visible -->
    <TabPane value="heavy" :lazy="true">
      <ExpensiveComponent />
    </TabPane>
  </Tabs>
</template>
```

---

### Exemple 6 : Tabs avec état désactivé

```vue
<template>
  <Tabs v-model="activeTab" variant="pills">
    <template #nav>
      <Tab value="basic" label="Basique" />
      <Tab value="advanced" label="Avancé" />
      <Tab
        value="premium"
        label="Premium"
        icon="fas fa-crown"
        :disabled="!isPremiumUser"
      />
    </template>

    <TabPane value="basic">
      <p>Fonctionnalités de base</p>
    </TabPane>

    <TabPane value="advanced">
      <p>Fonctionnalités avancées</p>
    </TabPane>

    <TabPane value="premium">
      <p>Fonctionnalités premium</p>
    </TabPane>
  </Tabs>
</template>
```

---

## Variantes

### Default (par défaut)

Bordure en bas avec indicateur coloré au hover et pour l'onglet actif.

```vue
<Tabs v-model="activeTab" variant="default">
  <!-- ... -->
</Tabs>
```

**Caractéristiques** :
- Border-bottom sur la navigation
- Barre animée gradient primary→secondary sous l'onglet actif
- Background hover subtil

---

### Pills (pilules)

Onglets avec background arrondi, style moderne.

```vue
<Tabs v-model="activeTab" variant="pills">
  <!-- ... -->
</Tabs>
```

**Caractéristiques** :
- Border-radius complet
- Background gradient pour l'onglet actif
- Box-shadow sur l'actif
- Pas de border-bottom

---

### Underline (soulignement)

Style minimaliste avec soulignement simple.

```vue
<Tabs v-model="activeTab" variant="underline">
  <!-- ... -->
</Tabs>
```

**Caractéristiques** :
- Border-bottom fine (1px)
- Border-bottom colorée (3px) pour l'onglet actif
- Pas de background

---

## Tailles

### Small

```vue
<Tabs v-model="activeTab" size="sm">
  <!-- Padding: 0.5rem 1rem, Font: 0.85rem -->
</Tabs>
```

### Medium (défaut)

```vue
<Tabs v-model="activeTab" size="md">
  <!-- Padding: 0.75rem 1.5rem, Font: 0.95rem -->
</Tabs>
```

### Large

```vue
<Tabs v-model="activeTab" size="lg">
  <!-- Padding: 1rem 2rem, Font: 1.05rem -->
</Tabs>
```

---

## Options avancées

### Tabs justifiées (pleine largeur)

```vue
<Tabs v-model="activeTab" :justified="true">
  <template #nav>
    <Tab value="tab1" label="Tab 1" />
    <Tab value="tab2" label="Tab 2" />
    <Tab value="tab3" label="Tab 3" />
  </template>
  <!-- ... -->
</Tabs>
```

Les onglets s'étendent pour occuper toute la largeur disponible.

---

### Écouter les changements

```vue
<script setup lang="ts">
const handleTabChange = (value: string) => {
  console.log('Nouvel onglet actif:', value)
  // Charger des données, analytics, etc.
}
</script>

<template>
  <Tabs v-model="activeTab" @change="handleTabChange">
    <!-- ... -->
  </Tabs>
</template>
```

---

## Styling et personnalisation

### Classes CSS disponibles

**Tabs** :
```css
.tabs { }
.tabs--pills { }
.tabs--underline { }
.tabs--sm { }
.tabs--md { }
.tabs--lg { }
.tabs--justified { }
.tabs__nav { }
.tabs__content { }
```

**Tab** :
```css
.tab { }
.tab--active { }
.tab--disabled { }
.tab--pills { }
.tab--underline { }
.tab__icon { }
.tab__label { }
.tab__badge { }
```

**TabPane** :
```css
.tab-pane { }
.tab-pane--active { }
.tab-pane__content { }
```

### Personnalisation avec CSS

```vue
<template>
  <Tabs v-model="activeTab" class="custom-tabs">
    <!-- ... -->
  </Tabs>
</template>

<style scoped>
.custom-tabs :deep(.tab) {
  font-weight: 700;
  text-transform: lowercase;
}

.custom-tabs :deep(.tab--active) {
  color: var(--secondary);
}
</style>
```

---

## Accessibilité

Les composants Tabs respectent les standards WCAG 2.1 :

✅ **Rôles ARIA** : `role="tablist"`, `role="tab"`, `role="tabpanel"`
✅ **États ARIA** : `aria-selected`, `aria-disabled`
✅ **Navigation clavier** : Tab, Shift+Tab pour naviguer
✅ **Focus visible** : Indicateurs visuels de focus
✅ **Labels** : Textes descriptifs sur tous les onglets

---

## Theming

Les composants utilisent les variables CSS du design system :

```css
--primary, --primary-rgb, --secondary
--bg-secondary, --bg-tertiary
--text-primary, --text-secondary, --text-muted
--border-color
--surface, --surface-hover
--shadow-md
--radius-md, --radius-lg
--transition-base, --transition-theme
```

Support complet **light/dark mode** via `[data-theme="dark"]`.

---

## Migration depuis Bootstrap Tabs

### Avant (Bootstrap)

```vue
<ul class="nav nav-tabs mb-4">
  <li class="nav-item">
    <button
      class="nav-link"
      :class="{ active: activeTab === 'profile' }"
      @click="activeTab = 'profile'"
    >
      Profil
    </button>
  </li>
  <li class="nav-item">
    <button
      class="nav-link"
      :class="{ active: activeTab === 'settings' }"
      @click="activeTab = 'settings'"
    >
      Paramètres
    </button>
  </li>
</ul>

<div v-if="activeTab === 'profile'" class="tab-pane">
  <p>Contenu profil</p>
</div>

<div v-if="activeTab === 'settings'" class="tab-pane">
  <p>Contenu paramètres</p>
</div>
```

### Après (Tabs Component)

```vue
<Tabs v-model="activeTab">
  <template #nav>
    <Tab value="profile" label="Profil" />
    <Tab value="settings" label="Paramètres" />
  </template>

  <TabPane value="profile">
    <p>Contenu profil</p>
  </TabPane>

  <TabPane value="settings">
    <p>Contenu paramètres</p>
  </TabPane>
</Tabs>
```

**Gains** :
- ✅ Moins de code (50% de réduction)
- ✅ Structure plus claire
- ✅ Animations automatiques
- ✅ Theming cohérent
- ✅ Variantes et tailles prêtes
- ✅ Lazy loading disponible

---

## Performance

### Optimisations intégrées

1. **Lazy loading** : Chargement différé du contenu avec prop `lazy`
2. **Transitions CSS** : Animations GPU-accelerated
3. **Provide/Inject** : Communication efficace parent-enfant
4. **Computed properties** : Réactivité optimisée

---

## Bonnes pratiques

### ✅ À faire

```vue
<!-- Utiliser v-model pour la synchronisation -->
<Tabs v-model="activeTab">

<!-- Valeurs uniques et descriptives -->
<Tab value="user-profile" label="Profil" />

<!-- Lazy loading pour contenu lourd -->
<TabPane value="analytics" :lazy="true">
  <HeavyAnalytics />
</TabPane>
```

### ❌ À éviter

```vue
<!-- Ne pas utiliser de valeurs dupliquées -->
<Tab value="tab1" label="Tab 1" />
<Tab value="tab1" label="Tab 2" /> <!-- ❌ Même value -->

<!-- Ne pas oublier TabPane correspondant -->
<Tab value="missing" label="Missing" />
<!-- ❌ Pas de TabPane avec value="missing" -->
```

---

## Récapitulatif

| Fonctionnalité | Disponible |
|----------------|------------|
| **3 variantes** | ✅ default, pills, underline |
| **3 tailles** | ✅ sm, md, lg |
| **Icônes** | ✅ FontAwesome |
| **Badges** | ✅ Nombre ou texte |
| **Lazy loading** | ✅ Prop `lazy` |
| **État désactivé** | ✅ Prop `disabled` |
| **Tabs dynamiques** | ✅ v-for support |
| **Justified** | ✅ Pleine largeur |
| **Thème light/dark** | ✅ Variables CSS |
| **Responsive** | ✅ Mobile-friendly |
| **Accessible** | ✅ WCAG 2.1 |
| **Animations** | ✅ Transitions fluides |

---

## Ressources

- [BUTTON_COMPONENT.md](./BUTTON_COMPONENT.md) - Composant Button
- [CARD_COMPONENTS.md](./CARD_COMPONENTS.md) - Composants Card
- [TANSTACK_TABLE.md](./TANSTACK_TABLE.md) - Composant TanStackDataTable

---

## Support

Pour toute question ou problème avec les composants Tabs, consultez les exemples dans ce document ou vérifiez les fichiers sources :
- `src/components/ui/Tabs.vue`
- `src/components/ui/Tab.vue`
- `src/components/ui/TabPane.vue`
