<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{ user?.name }}</a>

      <a href="#">
        <img class="avatar-large" :src="user?.avatar" alt="" />
      </a>

      <p class="desktop-only text-small">{{ user?.postsCount }} posts</p>
    </div>

    <div class="post-content">
      <div>
        <p>
          {{ post.text }}
        </p>
      </div>
    </div>

    <div class="post-date text-faded">
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Post from "@/interfaces/post";
import type User from "@/interfaces/user";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const store = useAuthStore();

const props = defineProps({
  post: { type: Object as () => Post, required: true },
});

const user = computed(() => {
  return store.user(props.post.userId) as User;
});
</script>

<style scoped></style>
