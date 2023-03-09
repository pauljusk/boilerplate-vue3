<script setup lang="ts">
  import Header from "./components/Header.vue";
  import { computed } from "vue";
  import { useRoute, RouterView } from "vue-router";
  const route = useRoute();
  const showHeader = computed(() => !["/login", "/register"].includes(route.path));
</script>

<template>
  <div>
    <div>
      <Header v-if="showHeader" />
    </div>
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss"></style>
