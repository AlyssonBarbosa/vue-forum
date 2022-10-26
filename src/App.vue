<template>
  <TheNavbar />
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";
import { useAuthStore } from "./stores/auth";

onBeforeMount(() => useAuthStore().fetchAuthUser());
</script>
