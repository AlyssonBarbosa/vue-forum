import { defineStore } from "pinia";
import type User from "@/interfaces/user";
import { usePostsStore } from "./posts";
import { useThreadStore } from "./threads";
import { fetchAllItems, fetchItem } from "@/helpers/piniaHelper";
import { upsert } from "@/helpers";

export type RootState = {
  authId: string;
  users: User[];
};

export const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      authId: "7uVPJS9GHoftN58Z2MXCYDqmNAh2",
      users: [] as User[],
    } as RootState),
  getters: {
    user(): Function {
      return getUser;
    },

    userAuth(): User | undefined {
      return getUser(this.authId);
    },
  },
  actions: {
    fetchUsers(ids: string[]) {
      return fetchAllItems(useAuthStore, "setUser", "users", ids);
    },

    fetchAuthUser() {
      return this.fetchUser(this.authId);
    },
    async fetchUser(id: string) {
      return (await fetchItem(useAuthStore, "setUser", "users", id)) as User;
    },
    saveLoggedUser(user: User) {
      const index = this.users.findIndex((u) => u.id === user.id);
      this.users[index] = user;
    },

    setUser(user: User) {
      upsert(this.users, user);
    },
  },
});

function getUser(id: string): User | undefined {
  const user = useAuthStore().users.find((u) => u.id === id) as User;
  if (!user) return undefined;
  return {
    ...user,
    get threads() {
      return useThreadStore().threads.filter((t) => t.userId === id);
    },
    get posts() {
      return usePostsStore().posts.filter((t) => t.userId === id);
    },
    get postsCount(): number {
      return this.posts?.length || 0;
    },

    get threadsCount(): number {
      return this.threads?.length || 0;
    },
  };
}
