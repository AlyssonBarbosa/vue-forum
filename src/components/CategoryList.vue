<template>
  <CategoryListItem
    v-for="category in categories"
    :key="category.id"
    :category="category"
  />
</template>

<script setup lang="ts">
import type Category from "@/interfaces/category";
import CategoryListItem from "@/components/CategoryListItem.vue";

defineProps({
  categories: { type: Array as () => Category[], required: true },
});
</script>

<style scoped></style>
