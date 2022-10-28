<template>
  <div class="col-full">
    <div class="col-full push-top" v-if="asyncDataStatus.ready && forum">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{ forum?.name }}</h1>
          <p class="text-lead">{{ forum?.description }}</p>
        </div>
        <RouterLink
          :to="{ name: 'threadCreate', params: { forumId: forum?.id } }"
          class="btn-green btn-small"
        >
          Start a thread
        </RouterLink>
      </div>
    </div>

    <div class="col-full push-top">
      <ThreadList :threads="threads || []" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ThreadList from "@/components/ThreadList.vue";
import { RouterLink } from "vue-router";

import { computed, onBeforeMount } from "vue";

import { useThreadStore } from "@/stores/threads";
import { useForumStore } from "@/stores/forums";
import { findById } from "@/helpers";
import type Forum from "@/interfaces/forum";
import type Thread from "@/interfaces/thread";
import { useUsersStore } from "@/stores/user";
import { useAsyncDataStatus } from "@/composables/asyncDataStatus";

const asyncDataStatus = useAsyncDataStatus();
const threadStore = useThreadStore();
const forumStore = useForumStore();
const authStore = useUsersStore();
const props = defineProps({
  id: { required: true, type: String },
});

onBeforeMount(async () => {
  const forum = await forumStore.fetchForum(props.id);
  const threads = (await threadStore.fetchThreads(forum.threads)) as Thread[];
  await authStore.fetchUsers(threads.map((thread) => thread.userId));

  asyncDataStatus.fetched();
});

const forum = computed(() => {
  return findById(forumStore.forums, props.id) as Forum;
});

const threads = computed(() => {
  if (!forum.value) return;
  return (
    forum.value.threads.map((thread) => threadStore.thread(thread)) as Thread[]
  ).filter((t) => t);
});
</script>

<style scoped></style>
