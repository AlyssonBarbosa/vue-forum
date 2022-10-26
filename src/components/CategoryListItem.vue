<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        <RouterLink :to="{ name: 'Category', params: { id: category.id } }">
          {{ category.name }}
        </RouterLink>
      </h2>

      <ForumList :forums="forums" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Category from "@/interfaces/category";
import { computed } from "vue";
import { useForumStore } from "@/stores/forums";
import { RouterLink } from "vue-router";
import ForumList from "./ForumList.vue";
import type Forum from "@/interfaces/forum";

const store = useForumStore();

const props = defineProps({
  category: { type: Object as () => Category, required: true },
});

const forums = computed(() => {
  return store.forums.filter((f) =>
    props.category.forums.includes(f.id)
  ) as Forum[];
});
</script>

<style scoped></style>
