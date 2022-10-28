import { useUsersStore } from "@/stores/user";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

async function isAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userStore = useUsersStore();

  if (!userStore.authId) {
    return next({
      name: "Login",
    });
  }

  return next();
}

export { isAuth };
