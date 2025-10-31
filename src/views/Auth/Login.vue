<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  error.value = "";
  loading.value = true;

  try {
    await authStore.login({
      username: username.value,
      password: password.value,
    });
    console.log("Login success");
    router.push("/dashboard");
  } catch (err: any) {
    error.value = err.message || "Erreur de connexion";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-page">
    <div class="container-fluid p-0">
      <div class="card shadow">
        <div class="card-body p-5">
          <div class="text-center mb-4">
            <h1 class="h3 mb-3">WiAssur Admin</h1>
            <p class="text-muted">Connectez-vous à votre compte</p>
          </div>

          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>

          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="username" class="form-label">Nom d'utilisateur</label>
              <input
                id="username"
                v-model="username"
                type="text"
                class="form-control"
                required
                :disabled="loading"
              />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Mot de passe</label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-control"
                required
                :disabled="loading"
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100"
              :disabled="loading"
            >
              <span v-if="loading">
                <span class="spinner-border spinner-border-sm me-2"></span>
                Connexion...
              </span>
              <span v-else>Se connecter</span>
            </button>
          </form>
        </div>
      </div>
      <!-- <div class="row justify-content-center">
        <div class="col-md-5 col-lg-4">
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
/* .login-page {
  min-height: 50vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2rem;
} */

.card {
  border: none;
  border-radius: 1rem;
}
</style>
