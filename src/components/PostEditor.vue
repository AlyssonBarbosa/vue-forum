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
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ submitButtonText }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { usePostsStore } from "@/stores/posts";
import { computed, ref } from "vue";

const props = defineProps({
  threadId: { type: String, required: true },
  text: { type: String, default: "", required: false },
});

const content = ref(props.text);

const emit = defineEmits(["save"]);

const handleChange = () => {
  emit("save", { text: content.value, threadId: props.threadId });
  content.value = "";
};

const submitButtonText = computed(() => {
  return props.text != "" ? "Edit Post" : "Submit Post";
});
</script>

<style scoped></style>
