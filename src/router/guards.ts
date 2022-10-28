import { useThreadStore } from "@/stores/threads";
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

async function threadExists(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const store = useThreadStore();
  console.log(to.params);
  const thread = await store.fetchThread(to.params.threadId.toString());

  if (!thread) {
    return next({
      name: "NotFound",
      params: { pathMatch: to.path.substring(1).split("/") },
      query: to.query,
      hash: to.hash,
    });
  }

  return next();
}

export { isAuth, threadExists };
