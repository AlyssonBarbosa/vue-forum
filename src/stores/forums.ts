import type Forum from "@/interfaces/forum";
import { defineStore } from "pinia";
import { findById, upsert } from "@/helpers";
import {
  fetchAllItems,
  fetchItem,
  makeAppendChildToParentMutation,
} from "@/helpers/piniaHelper";

export type RootState = {
  forums: Forum[];
};

export const useForumStore = defineStore({
  id: "forum",
  state: () =>
    ({
      forums: [],
    } as RootState),

  getters: {},

  actions: {
    fetchForums(ids: string[]) {
      return fetchAllItems(useForumStore, "setForum", "forums", ids);
    },
    async fetchForum(id: string) {
      return (await fetchItem(
        useForumStore,
        "setForum",
        "forums",
        id
      )) as Forum;
    },
    setForum(forum: Forum) {
      upsert(this.forums, forum);
    },

    appendThreadToForum: (state: any) =>
      makeAppendChildToParentMutation(state, "forums", "threads"),
  },
});
