<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i> {{ forum?.name }} </i>
    </h1>

    <ThreadEditor @save="save" @cancel="cancel" />
  </div>
</template>

<script setup lang="ts">
import { useForumStore } from "@/stores/forums";
import { useThreadStore } from "@/stores/threads";
import { computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import ThreadEditor from "@/components/ThreadEditor.vue";
import { findById } from "@/helpers";
import type Forum from "@/interfaces/forum";

const props = defineProps({
  forumId: { type: String, required: true },
});

const forumStore = useForumStore();

onBeforeMount(() => forumStore.fetchForum(props.forumId));

const forum = computed(() => {
  return findById(forumStore.forums, props.forumId) as Forum;
});

const threadStore = useThreadStore();
const router = useRouter();
async function save({ text, title }: any) {
  const thread = await threadStore.createThread(text, title, props.forumId);

  router.push({ name: "threadShow", params: { id: thread?.id } });
}

function cancel() {
  router.push({ name: "Forum", params: { id: props.forumId } });
}
</script>

<style scoped></style>
