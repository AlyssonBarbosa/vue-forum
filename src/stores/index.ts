import { defineStore } from "pinia";
import sourceData from "@/data.json";
import type Post from "@/interfaces/post";
import type Thread from "@/interfaces/thread";
import type User from "@/interfaces/user";
import type Forum from "@/interfaces/forum";
import type Category from "@/interfaces/category";

export type RootState = {
  categories: Category[];
  posts: Post[];
  forums: Forum[];
  threads: Thread[];
  users: User[];
};

export const useIndexStore = defineStore("index", {
  state: () =>
    ({
      categories: sourceData.categories as Category[],
      posts: sourceData.posts as Post[],
      forums: sourceData.forums as Forum[],
      threads: sourceData.threads as Thread[],
      users: sourceData.users as User[],
    } as RootState),
});
