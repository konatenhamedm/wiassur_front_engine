<script lang="ts">
// @ts-ignore
import { Component } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'EmptyLayout'
})
export default class EmptyLayout extends Vue {
}
</script>

<template>
  <div class="empty-layout">
    <router-view />
  </div>
</template>

<style scoped>
.empty-layout {
  min-height: 100vh;
}
</style>
