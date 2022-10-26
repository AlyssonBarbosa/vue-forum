<template>
  <TheNavbar />
  <div class="container">
    <RouterView v-show="!loadingStore.loading" />
    <div class="push-top" v-show="loadingStore.loading">loading...</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";
import { useAuthStore } from "./stores/auth";
import { useLoadingStore } from "./stores/loading";
const loadingStore = useLoadingStore();
onBeforeMount(() => {
  loadingStore.loading = true;
  useAuthStore().fetchAuthUser();
});
</script>
