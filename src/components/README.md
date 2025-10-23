# PlaceholderView Component

## Description

`PlaceholderView.vue` est un composant automatique qui s'affiche pour toutes les vues manquantes dans `src/views/`.

## Comment ça marche ?

1. **Configuration TypeScript** (`src/shims-vue.d.ts`)
   ```typescript
   declare module '@/views/*' {
     import PlaceholderView from '@/components/PlaceholderView.vue'
     export default PlaceholderView
   }
   ```

2. **Routes définies** sans créer les fichiers
   ```typescript
   // router/accounting.ts
   {
     path: '/accounting/operations',
     component: () => import('@/views/Accounting/Operations.vue')  // ← Fichier n'existe pas
   }
   ```

3. **Résultat**
   - ✅ Pas d'erreur TypeScript
   - ✅ Le placeholder s'affiche avec les infos de la route
   - ✅ Montre le chemin exact du composant à créer

## Avantages

- **Développement progressif**: Définir toutes les routes d'abord, implémenter les vues plus tard
- **Pas d'erreurs**: TypeScript compile sans erreur même avec des composants manquants
- **Debugging facile**: Le placeholder affiche exactement quel fichier créer et où
- **Expérience utilisateur**: Meilleur qu'une erreur 404, montre que la fonctionnalité est prévue

## Remplacer le placeholder

Quand vous êtes prêt, créez simplement le fichier réel:

```bash
# Créer le fichier
touch src/views/Accounting/Operations.vue
```

Le système utilisera automatiquement le vrai composant au lieu du placeholder.
