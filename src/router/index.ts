import { useUsersStore } from "@/stores/user";

import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { isAuth, threadExists } from "./guards";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/PageLogin.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/PageRegister.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/PageHome.vue"),
  },
  {
    path: "/forum/:forumId/thread/create",
    name: "threadCreate",
    component: () => import("@/views/ThreadCreate.vue"),
    props: true,
    beforeEnter: [isAuth],
  },
  {
    path: "/thread/:threadId/edit",
    name: "threadEdit",
    component: () => import("@/views/ThreadEdit.vue"),
    props: true,
    beforeEnter: [isAuth, threadExists],
  },
  {
    path: "/thread/:threadId",
    name: "threadShow",
    component: () => import("@/views/ThreadShow.vue"),
    props: true,
    beforeEnter: [threadExists],
  },
  {
    path: "/forum/:id",
    name: "Forum",
    component: () => import("@/views/PageForum.vue"),
    props: true,
  },
  {
    path: "/category/:id",
    name: "Category",
    component: () => import("@/views/PageCategory.vue"),
    props: true,
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/PageProfile.vue"),
    beforeEnter: [isAuth],
  },
  {
    path: "/profile/edit",
    name: "ProfileEdit",
    component: () => import("@/views/PageProfile.vue"),
    props: { edit: true },
    beforeEnter: [isAuth],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

router.beforeEach(async () => {
  await useUsersStore().initAuthentication();
});

export default router;
