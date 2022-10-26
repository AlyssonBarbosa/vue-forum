<template>
  <CategoryListItem v-if="asyncDataStatus.ready" :category="category" />
</template>

<script setup lang="ts">
import CategoryListItem from "@/components/CategoryListItem.vue";
import { computed, onBeforeMount } from "vue";
import { useCategoryStore } from "@/stores/category";
import type Category from "@/interfaces/category";
import { findById } from "@/helpers";
import { useForumStore } from "@/stores/forums";
import { useAsyncDataStatus } from "@/composables/asyncDataStatus";
const asyncDataStatus = useAsyncDataStatus();

const store = useCategoryStore();
const forumStore = useForumStore();

const props = defineProps({
  id: { type: String, required: true },
});

onBeforeMount(async () => {
  const category = (await store.fetchCategory(props.id)) as Category;

  await forumStore.fetchForums(category.forums);

  asyncDataStatus.fetched();
});

const category = computed(() => {
  return findById(store.categories, props.id) as Category;
});
</script>

<style scoped></style>
