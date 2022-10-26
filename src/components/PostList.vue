<template>
  <div class="post-list">
    <PostListItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup lang="ts">
import type Post from "@/interfaces/post";
import PostListItem from "./PostListItem.vue";

defineProps({
  posts: { type: Object as () => Post[], required: true },
});
</script>

<style scoped></style>
