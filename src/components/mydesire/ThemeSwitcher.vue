<template>
  <ClientOnly>
    <BCard ref="target">
      <button class="btn btn-link rounded-circle" @click="switchTheme">
        <i v-if="currentTheme === 'dark'" class="fa fa-sun"></i>
        <i v-else class="fa fa-moon"></i>
        <!-- {{ currentTheme }} -->
      </button>
    </BCard>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type BCard } from "bootstrap-vue-next/components/BCard";

const currentTheme = ref("dark");

const switchTheme = () => {
  const root = document.documentElement;

  currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
  // currentTheme = root.getAttribute("data-theme") || "light";
  root.setAttribute(
    "data-theme",
    currentTheme.value === "dark" ? "dark" : "light"
  );
};
</script>
