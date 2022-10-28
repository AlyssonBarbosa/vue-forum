<template>
  <div v-if="asyncDataStatus.ready" class="col-full push-top">
    <h1>
      Editing <i> {{ thread?.title }} </i>
    </h1>

    <ThreadEditor
      :title="thread?.title"
      :text="text"
      @save="save"
      @cancel="cancel"
      @clean="formEditing = false"
      @dirty="formEditing = true"
    />
  </div>
</template>

<script setup lang="ts">
import { useThreadStore } from "@/stores/threads";
import { computed, onBeforeMount, ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import ThreadEditor from "@/components/ThreadEditor.vue";
import { usePostsStore } from "@/stores/posts";
import type Post from "@/interfaces/post";
import { useAsyncDataStatus } from "@/composables/asyncDataStatus";

const props = defineProps({
  threadId: { type: String, required: true },
});

onBeforeMount(async () => {
  const thread = await threadStore.fetchThread(props.threadId);

  await postStore.fetchPost(thread.posts[0]);

  asyncDataStatus.fetched();
});

const thread = computed(() => {
  return threadStore.thread(props.threadId);
});

const asyncDataStatus = useAsyncDataStatus();
const postStore = usePostsStore();

const text = computed(() => {
  const post = postStore.post(thread.value?.posts[0]) as Post;

  return post ? post.text : "";
});

const threadStore = useThreadStore();
const router = useRouter();

async function save({ text, title }: any) {
  if (!thread.value) return;
  await threadStore.updateThread(text, title, thread.value.id);
  router.push({ name: "threadShow", params: { id: thread.value.id } });
}

function cancel() {
  router.push({ name: "threadShow", params: { id: thread.value?.id } });
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
