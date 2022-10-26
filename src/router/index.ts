import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

/* import { useIndexStore } from "@/stores";
import { findById } from "@/helpers";
import type Thread from "@/interfaces/thread"; */

//const store = useIndexStore();

const routes = [
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
  },
  {
    path: "/thread/:threadId/edit",
    name: "threadEdit",
    component: () => import("@/views/ThreadEdit.vue"),
    props: true,
  },
  {
    path: "/thread/:id",
    name: "threadShow",
    component: () => import("@/views/ThreadShow.vue"),
    props: true,
    /* beforeEnter(to, from, next) {
      const store = useIndexStore();

      const threadExists = findById(
        store.threads,
        to.params.id.toString()
      ) as Thread;

      if (threadExists) {
        return next();
      }

      return next({
        name: "NotFound",
        params: { pathMatch: to.path.substring(1).split("/") },
        query: to.query,
        hash: to.hash,
      });
    }, */
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
  },
  {
    path: "/profile/edit",
    name: "ProfileEdit",
    component: () => import("@/views/PageProfile.vue"),
    props: { edit: true },
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

export default router;
