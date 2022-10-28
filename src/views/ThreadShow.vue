<template>
  <div v-if="asyncDataStatus.ready && thread" class="col-large push-top">
    <h1>
      {{ thread.title }}
      <RouterLink
        custom
        v-slot="{ navigate }"
        :to="{ name: 'threadEdit', params: { threadId: thread.id } }"
      >
        <button @click="navigate" class="btn-green btn-small">
          Edit Thread
        </button>
      </RouterLink>
    </h1>
    <p>
      By <a href="#" class="link-unstyled"> {{ thread.author?.name }} </a>,
      <AppDate :timestamp="thread.publishedAt" />
      <span
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
        >{{ thread.countReplies }} replies by
        {{ thread.countContributors }} contributors</span
      >
    </p>

    <PostList :posts="postsInThread" />
    <PostEditor :thread-id="thread.id" @save="savePost($event)" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";
import AppDate from "@/components/AppDate.vue";
import { useThreadStore } from "@/stores/threads";
import { usePostsStore } from "@/stores/posts";
import { useUsersStore } from "@/stores/user";
import type Post from "@/interfaces/post";
import { useAsyncDataStatus } from "@/composables/asyncDataStatus";
import type Thread from "@/interfaces/thread";

const threadStore = useThreadStore();
const postStore = usePostsStore();
const authStore = useUsersStore();

const props = defineProps({
  threadId: { required: true, type: String },
});

const asyncDataStatus = useAsyncDataStatus();

onBeforeMount(async () => {
  const thread = await threadStore.fetchThread(props.threadId);

  await authStore.fetchUser(thread.userId);

  const posts = (await postStore.fetchPosts(thread.posts)) as Post[];
  const users = posts.map((post) => post.userId);
  await authStore.fetchUsers(users);

  asyncDataStatus.fetched();
});

const thread = computed(() => {
  return threadStore.thread(props.threadId) as Thread;
});

const posts = computed(() => {
  return postStore.posts;
});

const postsInThread = computed(() => {
  return posts.value.filter((p) => p.threadId === thread.value?.id);
});

const savePost = ({ text, threadId }: any) =>
  postStore.savePost(text, threadId);
</script>

<style scoped></style>
