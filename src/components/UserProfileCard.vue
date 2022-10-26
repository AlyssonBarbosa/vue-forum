<template>
  <div>
    <div class="profile-card">
      <p class="text-center">
        <img :src="user.avatar" alt="" class="avatar-xlarge" />
      </p>

      <h1 class="title">{{ user.username }}</h1>

      <p class="text-lead">{{ user.name }}</p>

      <p class="text-justify">{{ user.bio || "No bio specified." }}</p>

      <span class="online">{{ user.name }} is online</span>

      <div class="stats">
        <span> {{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>

      <hr />

      <p class="text-large text-center">
        <i class="fa fa-globe"></i>
        <a :href="user.website"> {{ user.website }} </a>
      </p>
    </div>

    <p class="text-xsmall text-faded text-center">
      Member since june 2003, last visited 4 hours ago
    </p>

    <div class="text-center">
      <hr />
      <RouterLink :to="{ name: 'ProfileEdit' }" class="btn-green btn-small">
        Edit Profile
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type User from "@/interfaces/user";
import { RouterLink } from "vue-router";

defineProps({
  user: { required: true, type: Object as () => User },
});
</script>

<style scoped></style>
