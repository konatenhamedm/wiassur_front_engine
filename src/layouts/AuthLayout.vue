<script lang="ts">
// @ts-ignore
import { Component } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'AuthLayout'
})
export default class AuthLayout extends Vue {
  get currentYear() {
    return new Date().getFullYear()
  }
}
</script>

<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-header">
        <h1 class="auth-logo">WiAssur</h1>
        <p class="auth-tagline">Administration</p>
      </div>

      <div class="auth-content">
        <router-view />
      </div>

      <div class="auth-footer">
        <p>&copy; {{ currentYear }} WiAssur. Tous droits réservés.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.auth-container {
  width: 100%;
  max-width: 450px;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
  color: white;
}

.auth-logo {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.auth-tagline {
  font-size: 1.1rem;
  margin: 0.5rem 0 0;
  opacity: 0.9;
}

.auth-content {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
  color: white;
  font-size: 0.875rem;
  opacity: 0.8;
}

.auth-footer p {
  margin: 0;
}
</style>
