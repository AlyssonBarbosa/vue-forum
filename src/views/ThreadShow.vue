<template>
  <div v-if="thread" class="col-large push-top">
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
    <PostEditor :thread-id="thread.id" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";
import AppDate from "@/components/AppDate.vue";
import { useThreadStore } from "@/stores/threads";
import { usePostsStore } from "@/stores/posts";
import { useAuthStore } from "@/stores/auth";
import type Post from "@/interfaces/post";

const threadStore = useThreadStore();
const postStore = usePostsStore();
const authStore = useAuthStore();

const props = defineProps({
  id: { required: true, type: String },
});

onBeforeMount(async () => {
  const thread = await threadStore.fetchThread(props.id);

  authStore.fetchUser(thread.userId);

  const posts = (await postStore.fetchPosts(thread.posts)) as Post[];
  const users = posts.map((post) => post.userId);
  authStore.fetchUsers(users);
});

const thread = computed(() => {
  return threadStore.thread(props.id);
});

const posts = computed(() => {
  return postStore.posts;
});

const postsInThread = computed(() => {
  return posts.value.filter((p) => p.threadId === thread.value?.id);
});
</script>

<style scoped></style>
