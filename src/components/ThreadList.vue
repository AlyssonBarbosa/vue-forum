<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <ThreadListItem
        v-for="thread in threads"
        :key="thread.id"
        :thread="thread"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Thread from "@/interfaces/thread";

import ThreadListItem from "./ThreadListItem.vue";

defineProps({
  threads: { type: Array<Thread>, required: true },
});
</script>

<style scoped></style>
