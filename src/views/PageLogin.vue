<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="login()" class="card card-form">
        <h1 class="text-center">Login</h1>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="form.email"
            id="email"
            type="text"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="form.password"
            id="password"
            type="password"
            class="form-input"
          />
        </div>

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="form-actions text-right">
          <RouterLink :to="{ name: 'Register' }"> Create account </RouterLink>
        </div>
      </form>

      <div class="push-top text-center">
        <button @click="loginWithGoogle()" class="btn-red btn-xsmall">
          <i class="fa fa-google fa-btn"></i>Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncDataStatus } from "@/composables/asyncDataStatus";
import { useUsersStore } from "@/stores/user";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

onBeforeMount(() => useAsyncDataStatus().fetched());

const form = ref({
  email: "",
  password: "",
});

const router = useRouter();

async function login() {
  try {
    await useUsersStore().loginWithEmailAndPassword(form.value);
    router.push({ name: "Home" });
  } catch (error: any) {
    alert(error.message);
  }
}

async function loginWithGoogle() {
  await useUsersStore().loginWithGoogle();

  router.push({ name: "Home" });
}
</script>

<style scoped></style>
