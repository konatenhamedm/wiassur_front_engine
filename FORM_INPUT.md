# FormInput Component

Composant de formulaire réutilisable avec label optionnel, support de différents types d'input, validation et gestion des erreurs.

## Import

```typescript
import FormInput from '@/components/ui/FormInput.vue'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number \| boolean` | - | Valeur du champ (v-model) |
| `label` | `string` | `''` | Label du champ |
| `type` | `string` | `'text'` | Type d'input (text, email, password, number, tel, url, search, date, time, datetime-local, textarea, select) |
| `placeholder` | `string` | `''` | Texte placeholder |
| `required` | `boolean` | `false` | Champ requis |
| `disabled` | `boolean` | `false` | Champ désactivé |
| `readonly` | `boolean` | `false` | Champ en lecture seule |
| `error` | `string` | `''` | Message d'erreur |
| `hint` | `string` | `''` | Texte d'aide |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du champ |
| `icon` | `string` | `''` | Icône Font Awesome |
| `id` | `string` | auto | ID du champ |
| `name` | `string` | `''` | Attribut name |
| `min` | `number \| string` | - | Valeur minimale (number, date) |
| `max` | `number \| string` | - | Valeur maximale (number, date) |
| `step` | `number \| string` | - | Incrément (number) |
| `rows` | `number` | `3` | Nombre de lignes (textarea) |
| `options` | `Array<{value, label, disabled?}>` | `[]` | Options (select) |
| `multiple` | `boolean` | `false` | Sélection multiple (select) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `value` | Émis lors du changement de valeur |
| `input` | `value` | Émis lors de la saisie |
| `change` | `value` | Émis lors du changement (blur) |
| `blur` | `FocusEvent` | Émis lors de la perte de focus |
| `focus` | `FocusEvent` | Émis lors du focus |

## Exemples

### Input texte simple

```vue
<template>
  <FormInput
    v-model="firstName"
    label="Prénom"
    placeholder="Entrez votre prénom"
    required
  />
</template>

<script lang="ts">
import { Component } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'
import FormInput from '@/components/ui/FormInput.vue'

@Component({
  components: { FormInput }
})
export default class MyForm extends Vue {
  firstName = ''
}
</script>
```

### Input avec icône

```vue
<FormInput
  v-model="email"
  label="Email"
  type="email"
  icon="fas fa-envelope"
  placeholder="exemple@email.com"
  required
/>
```

### Input sans label

```vue
<FormInput
  v-model="searchQuery"
  type="search"
  icon="fas fa-search"
  placeholder="Rechercher..."
/>
```

### Input numérique avec min/max

```vue
<FormInput
  v-model="age"
  label="Âge"
  type="number"
  :min="18"
  :max="100"
  :step="1"
  required
/>
```

### Textarea

```vue
<FormInput
  v-model="description"
  label="Description"
  type="textarea"
  :rows="5"
  placeholder="Décrivez votre projet..."
  hint="Maximum 500 caractères"
/>
```

### Select

```vue
<FormInput
  v-model="country"
  label="Pays"
  type="select"
  placeholder="Sélectionnez un pays"
  :options="[
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' },
    { value: 'ca', label: 'Canada' }
  ]"
  required
/>
```

### Select multiple

```vue
<FormInput
  v-model="skills"
  label="Compétences"
  type="select"
  multiple
  :options="[
    { value: 'vue', label: 'Vue.js' },
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'node', label: 'Node.js' }
  ]"
/>
```

### Avec validation d'erreur

```vue
<template>
  <FormInput
    v-model="password"
    label="Mot de passe"
    type="password"
    icon="fas fa-lock"
    :error="passwordError"
    required
    @blur="validatePassword"
  />
</template>

<script lang="ts">
import { Component } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'
import FormInput from '@/components/ui/FormInput.vue'

@Component({
  components: { FormInput }
})
export default class MyForm extends Vue {
  password = ''
  passwordError = ''

  validatePassword() {
    if (this.password.length < 8) {
      this.passwordError = 'Le mot de passe doit contenir au moins 8 caractères'
    } else {
      this.passwordError = ''
    }
  }
}
</script>
```

### Différentes tailles

```vue
<!-- Petit -->
<FormInput
  v-model="value1"
  label="Petit champ"
  size="sm"
/>

<!-- Moyen (défaut) -->
<FormInput
  v-model="value2"
  label="Champ moyen"
  size="md"
/>

<!-- Grand -->
<FormInput
  v-model="value3"
  label="Grand champ"
  size="lg"
/>
```

### Input désactivé ou readonly

```vue
<!-- Désactivé -->
<FormInput
  v-model="value"
  label="Champ désactivé"
  disabled
/>

<!-- Lecture seule -->
<FormInput
  v-model="value"
  label="Champ en lecture seule"
  readonly
/>
```

### Exemple de formulaire complet

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <FormInput
      v-model="form.name"
      label="Nom"
      icon="fas fa-user"
      placeholder="Nom complet"
      :error="errors.name"
      required
    />

    <FormInput
      v-model="form.email"
      label="Email"
      type="email"
      icon="fas fa-envelope"
      placeholder="email@exemple.com"
      :error="errors.email"
      required
    />

    <FormInput
      v-model="form.phone"
      label="Téléphone"
      type="tel"
      icon="fas fa-phone"
      placeholder="+33 6 12 34 56 78"
      hint="Format: +33 6 XX XX XX XX"
    />

    <FormInput
      v-model="form.category"
      label="Catégorie"
      type="select"
      :options="categories"
      placeholder="Choisissez une catégorie"
      required
    />

    <FormInput
      v-model="form.message"
      label="Message"
      type="textarea"
      :rows="5"
      placeholder="Votre message..."
      :error="errors.message"
      required
    />

    <Button type="submit" variant="primary">
      Envoyer
    </Button>
  </form>
</template>

<script lang="ts">
import { Component } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'
import FormInput from '@/components/ui/FormInput.vue'
import Button from '@/components/ui/Button.vue'

@Component({
  components: { FormInput, Button }
})
export default class ContactForm extends Vue {
  form = {
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  }

  errors = {
    name: '',
    email: '',
    message: ''
  }

  categories = [
    { value: 'support', label: 'Support technique' },
    { value: 'sales', label: 'Ventes' },
    { value: 'other', label: 'Autre' }
  ]

  handleSubmit() {
    // Validation et soumission
    this.validateForm()

    if (this.isValid) {
      console.log('Form submitted:', this.form)
    }
  }

  validateForm() {
    this.errors = { name: '', email: '', message: '' }

    if (!this.form.name) {
      this.errors.name = 'Le nom est requis'
    }

    if (!this.form.email) {
      this.errors.email = "L'email est requis"
    } else if (!this.isValidEmail(this.form.email)) {
      this.errors.email = "L'email n'est pas valide"
    }

    if (!this.form.message) {
      this.errors.message = 'Le message est requis'
    }
  }

  get isValid(): boolean {
    return !this.errors.name && !this.errors.email && !this.errors.message
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
</script>
```

## Styling

Le composant utilise les variables CSS du thème:
- `--surface` - Fond de l'input
- `--border-color` - Couleur de bordure
- `--text-primary` - Couleur du texte
- `--text-secondary` - Couleur du texte secondaire (icône)
- `--primary` - Couleur de focus
- `--danger` - Couleur d'erreur

Le composant supporte automatiquement le mode sombre via les variables CSS.
