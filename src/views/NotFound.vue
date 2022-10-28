<template>
  <div class="col-full text-center">
    <h1>Not Found</h1>
    <RouterLink :to="{ name: 'Home' }"> Read some cool thread </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useAsyncDataStatus } from "@/composables/asyncDataStatus";
import { onBeforeMount } from "vue";
import { RouterLink } from "vue-router";

onBeforeMount(() => useAsyncDataStatus().fetched());
</script>

<style scoped></style>
