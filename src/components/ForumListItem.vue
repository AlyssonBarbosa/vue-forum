<template>
  <div class="forum-listing">
    <div class="forum-details">
      <RouterLink
        class="text-xlarge"
        :to="{ name: 'Forum', params: { id: forum.id } }"
        >{{ forum.name }}</RouterLink
      >
      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p>
        <span class="count">{{ forum.threads?.length }}</span>
        {{ forumThreadsWord(forum) }}
      </p>
    </div>

    <div class="last-thread"></div>
  </div>
</template>

<script setup lang="ts">
import type Forum from "@/interfaces/forum";

defineProps({
  forum: { type: Object as () => Forum, required: true },
});

const forumThreadsWord = (forum: Forum) => {
  if (!forum.threads) {
    return "no threads";
  }

  if (forum.threads.length > 1) {
    return "threads";
  }

  return "thread";
};
</script>

<style scoped></style>
