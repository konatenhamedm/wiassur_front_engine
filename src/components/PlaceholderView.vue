<script lang="ts">
import { Component } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";

@Component({
  name: "PlaceholderView",
})
export default class PlaceholderView extends Vue {
  get componentPath() {
    return (
      this.$route.matched[
        this.$route.matched.length - 1
      ]?.components?.default?.toString() || "Unknown"
    );
  }

  get routeName() {
    return (this.$route.name as string) || "Unknown";
  }

  get routePath() {
    return this.$route.path;
  }
}
</script>

<template>
  <div class="placeholder-view">
    <div class="container py-5">
      <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">
          <i class="fas fa-exclamation-triangle me-2"></i>
          Composant en cours de développement
        </h4>
        <hr />
        <div class="mb-3"><strong>Route:</strong> {{ routeName }}</div>
        <div class="mb-3">
          <strong>Path:</strong> <code>{{ routePath }}</code>
        </div>
        <div class="mb-0">
          <strong>Composant à créer:</strong>
          <pre
            class="mt-2 bg-light p-2 rounded"
          ><code>{{ componentPath }}</code></pre>
        </div>
      </div>

      <div class="card">
        <div class="card-body text-center py-5">
          <i class="fas fa-file-code fa-4x text-muted mb-3"></i>
          <h5 class="card-title">Cette page est en cours de développement</h5>
          <p class="card-text text-muted">
            Le composant sera créé prochainement.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.placeholder-view {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.alert-warning {
  border-left: 4px solid #ffc107;
}

pre code {
  font-size: 0.875rem;
  color: #d63384;
}
</style>
