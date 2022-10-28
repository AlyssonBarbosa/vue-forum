<template>
  <form @submit.prevent="save()">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        v-model="form.title"
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="form.text"
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <button type="button" class="btn btn-ghost" @click="$emit('cancel')">
        Cancel
      </button>
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ saveButtonText }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { ref } from "vue";

const props = defineProps({
  title: { type: String, required: false, default: "" },
  text: { type: String, required: false, default: "" },
});

const form = ref({
  title: props.title,
  text: props.text,
});

const emit = defineEmits(["save", "cancel", "dirty", "clean"]);

watch(
  form,
  (newValue) => {
    console.log("heloooo");
    if (newValue.text !== props.text || newValue.title !== props.title) {
      console.log("olaaaaaa");
      return emit("dirty");
    }

    emit("clean");
  },
  { deep: true }
);

function save() {
  emit("clean");
  emit("save", { ...form.value });
}

const saveButtonText = computed(() => {
  return props.title !== "" ? "Update" : "Publish";
});
</script>

<style scoped></style>
