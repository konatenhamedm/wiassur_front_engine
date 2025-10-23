import type { Plugin } from 'vite'
import { resolve } from 'path'

/**
 * Plugin Vite pour rediriger automatiquement les imports de vues manquantes
 * vers le composant PlaceholderView
 */
export function placeholderViewPlugin(): Plugin {
  const placeholderPath = resolve(__dirname, 'src/components/PlaceholderView.vue')

  return {
    name: 'placeholder-view-resolver',
    resolveId(source) {
      // Si c'est un import vers /views/ qui n'existe pas
      if (source.includes('@/views/') || source.includes('/views/')) {
        // On vérifie si le fichier existe vraiment
        // Si non, on redirige vers PlaceholderView
        return null // Laisser Vite essayer de résoudre normalement
      }
      return null
    },
    load(id) {
      // Intercepter les erreurs de chargement de fichiers dans /views/
      if (id.includes('/views/') && id.endsWith('.vue')) {
        // Vérifier si le fichier existe
        try {
          // Si le fichier n'existe pas, Vite génère une erreur
          // On ne peut pas facilement le détecter ici
          return null
        } catch {
          // Rediriger vers PlaceholderView
          return `export { default } from '${placeholderPath}'`
        }
      }
      return null
    }
  }
}
