<template>
  <div class="thread">
    <div>
      <p>
        <RouterLink :to="{ name: 'threadShow', params: { id: thread.id } }">
          {{ thread.title }}
        </RouterLink>
      </p>
      <p class="text-faded text-xsmall">
        By <a href="profile.html"> {{ thread.author?.name }} </a>,
        <AppDate :timestamp="thread.publishedAt" />
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">{{ thread.countReplies }} replies</p>

      <img class="avatar-medium" :src="thread.author?.avatar" alt="" />

      <div>
        <p class="text-xsmall">
          <a href="profile.html"> {{ thread.author?.name }} </a>
        </p>
        <p class="text-xsmall text-faded">
          <AppDate :timestamp="thread.publishedAt" />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Thread from "@/interfaces/thread";

defineProps({
  thread: { type: Object as () => Thread, required: true },
});
</script>

<style scoped></style>
