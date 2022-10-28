<template>
  <TheNavbar />
  <div class="container">
    <RouterView v-show="!loadingStore.loading" />
    <AppSpinner v-show="loadingStore.loading" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { RouterView, useRouter } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";
import { useUsersStore } from "./stores/user";
import { useLoadingStore } from "./stores/loading";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const loadingStore = useLoadingStore();
onBeforeMount(() => {
  useUsersStore().fetchAuthUser();
});

useRouter().beforeEach(() => {
  loadingStore.loading = true;
  NProgress.configure({
    speed: 200,
    showSpinner: false,
  });
  NProgress.start();
});
</script>

<style>
#nprogress .bar {
  background-color: green;
}
</style>
