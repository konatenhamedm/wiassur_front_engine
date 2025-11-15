import type { RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const prefix = "/configuration";

const configurationRoutes: RouteRecordRaw[] = [
  // ============================================
  // CONFIGURATION - Parent Layout
  // ============================================
  {
    path: prefix,
    component: DefaultLayout,
    children: [
      // ============================================
      // MOTEUR DE CALCUL (Engine)
      // ============================================
      {
        path: "engine",
        name: "engine-index",
        redirect: `${prefix}/engine/configuration`,
      },
      {
        path: "engine/configuration",
        name: "engine-configuration",
        component: () => import("@/views/Engine/Configuration.vue"),
        meta: { title: "Configuration Moteur" },
      },
      {
        path: "engine/methods/create",
        name: "engine-method-create",
        component: () => import("@/views/Engine/MethodForm.vue"),
        meta: { title: "Créer une méthode" },
      },
      {
        path: "engine/methods/:id",
        name: "engine-method-detail",
        component: () => import("@/views/Engine/MethodDetail.vue"),
        meta: { title: "Détail méthode" },
      },
      {
        path: "engine/methods/:id/edit",
        name: "engine-method-edit",
        component: () => import("@/views/Engine/MethodForm.vue"),
        meta: { title: "Modifier méthode" },
      },
      {
        path: "engine/test",
        name: "engine-test",
        component: () => import("@/views/Engine/Test.vue"),
        meta: { title: "Test de calcul" },
      },

      // ============================================
      // BRANCHES D'ASSURANCE
      // ============================================
      {
        path: "branches",
        name: "branch-list",
        component: () => import("@/views/Configuration/Branch/List.vue"),
        meta: { title: "Branches d'assurance" },
      },
      {
        path: "branches/create",
        name: "branch-create",
        component: () => import("@/views/Configuration/Branch/Form.vue"),
        meta: { title: "Créer une branche" },
      },
      {
        path: "branches/:slug",
        name: "branch-detail",
        component: () => import("@/views/Configuration/Branch/Detail.vue"),
        meta: { title: "Détail branche" },
      },
      {
        path: "branches/:slug/edit",
        name: "branch-edit",
        component: () => import("@/views/Configuration/Branch/Form.vue"),
        meta: { title: "Modifier branche" },
      },

      // ============================================
      // ENGINE BRANCHES D'ASSURANCE
      // ============================================
      {
        path: "engine-branches",
        name: "engine-branch-list",
        component: () => import("@/views/Configuration/EngineBranch/List.vue"),
        meta: { title: "Engine Branches d'assurance" },
      },
      {
        path: "engine-branches/create",
        name: "engine-branch-create",
        component: () => import("@/views/Configuration/EngineBranch/Form.vue"),
        meta: { title: "Créer une engine-branche" },
      },
      {
        path: "engine-branches/:slug",
        name: "engine-branch-detail",
        component: () =>
          import("@/views/Configuration/EngineBranch/Detail.vue"),
        meta: { title: "Détail engine-branche" },
      },
      {
        path: "engine-branches/:slug/edit",
        name: "engine-branch-edit",
        component: () => import("@/views/Configuration/EngineBranch/Form.vue"),
        meta: { title: "Modifier engine-branche" },
      },

      // ============================================
      // ENGINE METHODS D'ASSURANCE
      // ============================================
      {
        path: "engine-branches/:branchSlug/methods",
        name: "engine-method-list",
        component: () => import("@/views/Configuration/EngineMethod/List.vue"),
        meta: { title: "Engine Branches d'assurance" },
      },
      // NOUVELLE ROUTE POUR LES LIGNES DE MÉTHODE
      {
        path: "engine-branches/:branchSlug/methods/:methodId/lines",
        name: "MethodLinesList",
        component: () => import("@/views/Configuration/EngineMethod/MethodLinesList.vue"),
        meta: { title: "Lignes de méthode" },
      },

      // ============================================
      // ASSUREURS
      // ============================================
      {
        path: "insurers",
        name: "insurer-list",
        component: () => import("@/views/Configuration/Insurer/List.vue"),
        meta: { title: "Assureurs" },
      },
      {
        path: "insurers/create",
        name: "insurer-create",
        component: () => import("@/views/Configuration/Insurer/Form.vue"),
        meta: { title: "Créer un assureur" },
      },
      {
        path: "insurers/:id",
        name: "insurer-detail",
        component: () => import("@/views/Configuration/Insurer/Detail.vue"),
        meta: { title: "Détail assureur" },
      },
      {
        path: "insurers/:id/edit",
        name: "insurer-edit",
        component: () => import("@/views/Configuration/Insurer/Form.vue"),
        meta: { title: "Modifier assureur" },
      },

      // ============================================
      // PACKS & GARANTIES
      // ============================================
      {
        path: "branches/:branchSlug/packs",
        name: "pack-list",
        component: () => import("@/views/Configuration/Pack/List.vue"),
        meta: { title: "Packs d'assurance" },
      },
      {
        path: "branches/:branchSlug/guarantees",
        name: "guarantee-list",
        component: () => import("@/views/Configuration/Guarantee/List.vue"),
        meta: { title: "Garanties" },
      },

      // ============================================
      // FORMULAIRES (Surveys)
      // ============================================
      {
        path: "surveys",
        name: "survey-list",
        component: () => import("@/views/Configuration/Survey/List.vue"),
        meta: { title: "Formulaires" },
      },
      {
        path: "surveys/create",
        name: "survey-create",
        component: () => import("@/views/Configuration/Survey/Form.vue"),
        meta: { title: "Créer un formulaire" },
      },
      {
        path: "surveys/:id/edit",
        name: "survey-edit",
        component: () => import("@/views/Configuration/Survey/Form.vue"),
        meta: { title: "Modifier formulaire" },
      },

      // ============================================
      // TYPES DE DONNÉES
      // ============================================
      {
        path: "data-types",
        name: "data-type-manager",
        component: () => import("@/views/Configuration/DataType/Manager.vue"),
        meta: { title: "Types de données" },
      },

      // ============================================
      // TAGS
      // ============================================
      {
        path: "tags",
        name: "tag-manager",
        component: () => import("@/views/Configuration/Tag/Manager.vue"),
        meta: { title: "Tags" },
      },
    ],
  },
];

export default configurationRoutes;