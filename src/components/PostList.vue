<template>
  <div class="post-list">
    <PostListItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :editing="editing === post.id"
      @start-edit="editing = $event"
    />
  </div>
</template>

<script setup lang="ts">
import type Post from "@/interfaces/post";
import { ref } from "vue";
import PostListItem from "./PostListItem.vue";

defineProps({
  posts: { type: Object as () => Post[], required: true },
});

const editing = ref("");
</script>

<style scoped></style>
