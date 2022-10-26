<template>
  <h1>Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>

<script setup lang="ts">
import CategoryList from "@/components/CategoryList.vue";
import { computed, onBeforeMount } from "vue";
import type Category from "@/interfaces/category";
import { useCategoryStore } from "@/stores/category";
import { useForumStore } from "@/stores/forums";

const store = useCategoryStore();
const storeForum = useForumStore();

const categories = computed(() => {
  return store.categories as Category[];
});

onBeforeMount(async () => {
  const categories = await store.fetchAllCategories();

  const forumsIds = categories
    .map((category) => category.forums)
    .flat() as string[];

  storeForum.fetchForums(forumsIds);
});
</script>

<style scoped></style>
