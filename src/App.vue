// @ts-ignore
<script lang="ts">
import { Component } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'App'
})
export default class App extends Vue {
  private mediaQuery: MediaQueryList | null = null

  private applySystemTheme = () => {
    const root = document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Apply theme based on system preference
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light')

    // Set default color scheme if not already set
    if (!root.hasAttribute('data-color')) {
      root.setAttribute('data-color', 'blue')
    }
  }

  mounted() {
    // Apply initial theme
    this.applySystemTheme()

    // Listen for system theme changes
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    this.mediaQuery.addEventListener('change', this.applySystemTheme)
  }

  unmounted() {
    // Cleanup listener
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', this.applySystemTheme)
    }
  }
}
</script>

<template>
  <router-view :key="$route.fullPath"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
