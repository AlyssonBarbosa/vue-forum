<template>
  <div class="col-full push-top" v-if="asyncDataStatus.ready">
    <h1>
      Create new thread in <i> {{ forum?.name }} </i>
    </h1>

    <ThreadEditor
      @save="save"
      @cancel="cancel"
      @clean="formEditing = false"
      @dirty="formEditing = true"
    />
  </div>
</template>

<script setup lang="ts">
import { useForumStore } from "@/stores/forums";
import { useThreadStore } from "@/stores/threads";
import { computed, onBeforeMount, ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import ThreadEditor from "@/components/ThreadEditor.vue";
import { findById } from "@/helpers";
import type Forum from "@/interfaces/forum";
import { useAsyncDataStatus } from "@/composables/asyncDataStatus";

const props = defineProps({
  forumId: { type: String, required: true },
});

const forumStore = useForumStore();
const asyncDataStatus = useAsyncDataStatus();

onBeforeMount(async () => {
  await forumStore.fetchForum(props.forumId);
  asyncDataStatus.fetched();
});

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

const formEditing = ref(false);

onBeforeRouteLeave(() => {
  if (formEditing.value) {
    const confirmed = window.confirm("Do you realy want get out the page?");

    if (!confirmed) return false;
  }
});
</script>

<style scoped></style>
