import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { getMenu } from "./Menu";

// Import des modules de routes
import defaultRoutes from "./default";
import configurationRoutes from "./configuration";
import incomeRoutes from "./income";
import crmRoutes from "./crm";
import comparatorRoutes from "./comparator";
import adminRoutes from "./admin";
import partnerRoutes from "./partner";
import accountingRoutes from "./accounting";
import errorRoutes from "./error";

// ============================================
// COMPOSITION DES ROUTES
// ============================================

let routes: RouteRecordRaw[] = defaultRoutes
  .concat(configurationRoutes)
  .concat(incomeRoutes)
  .concat(crmRoutes)
  .concat(adminRoutes)
  .concat(partnerRoutes)
  .concat(accountingRoutes)
  .concat(errorRoutes);

// ============================================
// SUBDOMAIN ROUTING (Comparateur)
// ============================================

const host = window.location.host;
const parts = host.split(".");

// Si sous-domaine "comparateur", charge uniquement les routes comparateur
if (parts[0] === "comparateur") {
  // Supprime le préfixe /comparateur des routes
  for (let route of comparatorRoutes) {
    route.path = route.path.replace("/comparateur", "");
  }
  routes = comparatorRoutes;
} else {
  // Backend complet: ajoute les routes comparateur avec préfixe
  routes = routes.concat(comparatorRoutes);
}

// ============================================
// CRÉATION DU ROUTER
// ============================================

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { top: 0 };
    }
  },
});

// ============================================
// NAVIGATION GUARD GLOBAL
// ============================================

// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore()

//   // Set page title
//   const baseTitle = 'WiAssur Admin'
//   document.title = to.meta?.title
//     ? `${to.meta.title} - ${baseTitle}`
//     : baseTitle

//   // Public routes (login, comparateur, etc.)
//   if (to.meta?.requiresAuth === false) {
//     next()
//     return
//   }

//   // Vérifier l'authentification par API Key via header (pour moteur de calcul)
//   const apiKeyHeader = to.query['x-api-key'] as string || (window as any).__API_KEY__

//   if (apiKeyHeader && !authStore.isAuthenticated) {
//     try {
//       await authStore.authenticateWithApiKey(apiKeyHeader)
//       // Stockage temporaire de la clé pour les requêtes suivantes
//       ;(window as any).__API_KEY__ = apiKeyHeader

//       // Rediriger sans le paramètre x-api-key dans l'URL
//       const { 'x-api-key': removed, ...cleanQuery } = to.query
//       if (removed) {
//         next({ ...to, query: cleanQuery, replace: true })
//         return
//       }
//     } catch (error) {
//       console.error('API Key authentication failed:', error)
//       // Continue vers la vérification normale
//     }
//   }

//   // Check authentication
//   if (!authStore.isAuthenticated) {
//     next({
//       name: 'login',
//       query: { redirect: to.fullPath }
//     })
//     return
//   }

//   // ROLE_ADMIN bypass all checks
//   if (authStore.hasRole('ROLE_ADMIN')) {
//     next()
//     return
//   }

//   // Get route config from Menu
//   const menuRoute = getMenu(String(to.name))

//   // Route not configured in Menu
//   if (!menuRoute) {
//     // Admins see warning but can pass
//     if (authStore.hasRole('ROLE_ADMIN')) {
//       console.warn(`Route non configurée dans Menu.ts: ${String(to.name)}`)
//       next()
//       return
//     }

//     // Others blocked
//     next({ name: 'unauthorized' })
//     return
//   }

//   // Check roles from Menu
//   if (menuRoute.roles && menuRoute.roles.length > 0) {
//     const hasAccess = authStore.canAccessMenu(menuRoute.roles)

//     if (!hasAccess) {
//       console.warn(`Access denied to ${to.path}. Required roles:`, menuRoute.roles)
//       next({ name: 'unauthorized' })
//       return
//     }
//   }

//   next()
// })

// ============================================
// ERROR HANDLER
// ============================================

router.onError((error) => {
  console.error("Router error:", error);
});

// ============================================
// AFTER EACH (Analytics)
// ============================================

router.afterEach((to, from) => {
  if (import.meta.env.PROD) {
    // Analytics tracking here
    console.log(`Navigation: ${from.path} → ${to.path}`);
  }
});

export default router;
