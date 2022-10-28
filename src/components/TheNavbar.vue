<template>
  <header class="header" id="header">
    <RouterLink :to="{ name: 'Home' }" class="logo">
      <img src="@/assets/svg/vueschool-logo.svg" />
    </RouterLink>

    <div class="btn-hamburger">
      <!-- use .btn-humburger-active to open the menu -->
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar">
      <ul>
        <li v-show="authStore.userAuth" class="navbar-user">
          <a @click.prevent="userDropOpen = !userDropOpen">
            <img
              class="avatar-small"
              :src="authStore.userAuth?.avatar"
              :alt="authStore.userAuth?.name"
            />
            <span>
              {{ authStore.userAuth?.name }}
              <img
                class="icon-profile"
                src="@/assets/svg/arrow-profile.svg"
                alt=""
              />
            </span>
          </a>

          <!-- dropdown menu -->
          <!-- add class "" to show the dropdown -->
          <div id="user-dropdown" :class="{ 'active-drop': userDropOpen }">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <RouterLink :to="{ name: 'Profile' }">
                  View profile
                </RouterLink>
              </li>
              <a @click.prevent="signOut()"> Sign Out </a>
            </ul>
          </div>
        </li>

        <li v-if="!authStore.authId" class="navbar-item">
          <RouterLink :to="{ name: 'Login' }"> Sign In </RouterLink>
        </li>
        <li v-if="!authStore.authId" class="navbar-item">
          <RouterLink :to="{ name: 'Register' }"> Register </RouterLink>
        </li>
      </ul>

      <ul>
        <li class="navbar-item" v-for="link in links" :key="link.name">
          <RouterLink :to="link" class="navbar-item">
            {{ link.name }}
          </RouterLink>
        </li>

        <!-- Show these option only on mobile-->
        <li class="navbar-item mobile-only">
          <a href="profile.html">My Profile</a>
        </li>
        <li class="navbar-item mobile-only">
          <a href="#">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useUsersStore } from "@/stores/user";

const links = ref([{ name: "Home", params: {} }]);

const authStore = useUsersStore();

const userDropOpen = ref(false);

function signOut() {
  userDropOpen.value = false;
  authStore.signOut();
}
</script>

<style scoped></style>
