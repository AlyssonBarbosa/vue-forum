<template>
  <form @submit.prevent="handleChange">
    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
        v-model="content"
      ></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">Publish</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { usePostsStore } from "@/stores/posts";
import { ref } from "vue";

const props = defineProps({
  threadId: { type: String, required: true },
});

const content = ref();

const store = usePostsStore();

const handleChange = () => {
  store.savePost(content.value, props.threadId);
  content.value = "";
};
</script>

<style scoped></style>
