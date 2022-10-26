<template>
  <div class="col-full text-center">
    <h1>Not Found</h1>
    <RouterLink :to="{ name: 'Home' }"> Read some cool thread </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped></style>
