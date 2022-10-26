<template>
  <div class="profile-card">
    <p class="text-center">
      <img :src="user.avatar" alt="" class="avatar-xlarge img-update" />
    </p>
    <form @submit.prevent="save()">
      <div class="form-group">
        <input
          v-model="userForm.username"
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold"
        />
      </div>

      <div class="form-group">
        <input
          v-model="userForm.name"
          type="text"
          placeholder="Full Name"
          class="form-input text-lead"
        />
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          v-model="userForm.bio"
          class="form-input"
          id="user_bio"
          placeholder="Write a few words about yourself."
        ></textarea>
      </div>

      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>

      <hr />

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          v-model="userForm.website"
          autocomplete="off"
          class="form-input"
          id="user_website"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input
          v-model="userForm.email"
          autocomplete="off"
          class="form-input"
          id="user_email"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input
          v-model="userForm.location"
          autocomplete="off"
          class="form-input"
          id="user_location"
        />
      </div>

      <div class="btn-group space-between">
        <button class="btn-ghost" @click="cancel()">Cancel</button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type User from "@/interfaces/user";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  user: { required: true, type: Object as () => User },
});

const authStore = useAuthStore();

/* A utilização do clone é para as alterações
feitas no objeto reativo, não impactarem na props */
const userForm = ref({ ...props.user } as User);

const router = useRouter();

function save() {
  authStore.saveLoggedUser({ ...userForm.value });
  router.push({ name: "Profile" });
}

function cancel() {
  router.push({ name: "Profile" });
}
</script>

<style scoped></style>
