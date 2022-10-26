<template>
  <ForumListItem v-for="forum in forums" :key="forum.id" :forum="forum" />
</template>

<script setup lang="ts">
import ForumListItem from "@/components/ForumListItem.vue";
import type Forum from "@/interfaces/forum";

defineProps({
  forums: { type: Array as () => Forum[], required: true },
});
</script>

<style scoped></style>
