<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{ user?.name }}</a>

      <a href="#">
        <img class="avatar-large" :src="user?.avatar" alt="" />
      </a>

      <p class="desktop-only text-small">{{ user?.postsCount }} posts</p>
      <p class="desktop-only text-small">{{ user?.threadsCount }} threads</p>
    </div>

    <div class="post-content">
      <div>
        <PostEditor
          :thread-id="post.threadId"
          :text="post.text"
          @save="updatePost($event, post.id)"
          v-if="editing"
        />
        <p v-else>
          {{ post.text }}
        </p>
      </div>
      <a
        v-if="useUsersStore().authId === post.userId"
        @click.prevent="toogleToEdit"
        style="margin-left: auto; padding-left: 10px"
        class="link-unstyled"
        title="Make a change"
      >
        <fa-icon icon="fa-solid fa-pencil" />
      </a>
    </div>

    <div class="post-date text-faded">
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Post from "@/interfaces/post";
import type User from "@/interfaces/user";
import { useUsersStore } from "@/stores/user";
import PostEditor from "@/components/PostEditor.vue";
import { computed } from "vue";
import { usePostsStore } from "@/stores/posts";

const store = useUsersStore();

const props = defineProps({
  post: { type: Object as () => Post, required: true },
  editing: { type: Boolean, default: false, required: false },
});

const user = computed(() => {
  return store.user(props.post.userId) as User;
});

const emit = defineEmits(["start-edit"]);

const toogleToEdit = () => {
  emit("start-edit", props.editing ? "" : props.post.id);
};

const updatePost = ({ text, threadId }: any, postId: string) => {
  usePostsStore().update(text, threadId, postId);
  toogleToEdit();
};
</script>

<style scoped></style>
