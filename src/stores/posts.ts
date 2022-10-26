import type Post from "@/interfaces/post";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useThreadStore } from "./threads";
import { fetchAllItems, fetchItem } from "@/helpers/piniaHelper";
import { upsert } from "@/helpers";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/plugins/firebase";

export type RootState = {
  posts: Post[];
};

export const usePostsStore = defineStore({
  id: "posts",
  state: () =>
    ({
      posts: [],
    } as RootState),
  getters: {
    post(): Function {
      return (id: string): Post | undefined => {
        return this.posts.find((p) => p.id === id) || undefined;
      };
    },
  },
  actions: {
    fetchPosts(ids: string[]) {
      return fetchAllItems(usePostsStore, "setPost", "posts", ids);
    },
    async fetchPost(id: string) {
      return (await fetchItem(usePostsStore, "setPost", "posts", id)) as Post;
    },
    setPost(post: Post) {
      upsert(this.posts, post);
    },
    async savePost(text: string, threadId: string) {
      const authStore = useAuthStore();
      const threadsStore = useThreadStore();
      const post: Post = {
        text,
        threadId,
        userId: authStore.authId,
        publishedAt: serverTimestamp(),
      } as Post;

      const batch = writeBatch(db);

      const postRef = doc(collection(db, "posts"));
      const threadRef = doc(db, "threads", threadId);

      batch.set(postRef, post);
      batch.update(threadRef, {
        posts: arrayUnion(postRef.id),
        contributors: arrayUnion(post.userId),
      });

      await batch.commit();

      this.posts.push({ ...post, id: postRef.id });
      threadsStore.appendPostToThread(threadId, postRef.id);
      threadsStore.appendContributorToThread(threadId, authStore.authId);
    },
  },
});
