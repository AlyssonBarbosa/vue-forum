import type Thread from "@/interfaces/thread";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useForumStore } from "./forums";
import { usePostsStore } from "./posts";
import type Post from "@/interfaces/post";
import type User from "@/interfaces/user";
import { fetchAllItems, fetchItem } from "@/helpers/piniaHelper";
import { upsert, findById } from "@/helpers";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/plugins/firebase";

export type RootState = {
  threads: Thread[];
};

export const useThreadStore = defineStore({
  id: "thread",
  state: () =>
    ({
      threads: [],
    } as RootState),

  getters: {
    thread: (state) => {
      const authStore = useAuthStore();

      return (id: string): Thread | null => {
        const thread = findById(state.threads, id) as Thread;
        if (!thread) return null;
        return {
          ...thread,
          get author() {
            return findById(authStore.users, thread.userId) as User;
          },
          get countReplies() {
            //The first post is a thread content
            return thread.posts.length - 1;
          },
          get countContributors() {
            return thread.contributors.length;
          },
        };
      };
    },
  },

  actions: {
    async fetchThread(id: string) {
      return (await fetchItem(
        useThreadStore,
        "setThread",
        "threads",
        id
      )) as Thread;
    },

    fetchThreads(ids: string[]) {
      return fetchAllItems(useThreadStore, "setThread", "threads", ids);
    },

    setThread(thread: Thread) {
      upsert(this.threads, thread);
    },
    async createThread(
      text: string,
      title: string,
      forumId: string
    ): Promise<Thread | undefined> {
      const authStore = useAuthStore();
      const forumStore = useForumStore();
      const postStore = usePostsStore();

      const thread = {
        title,
        forumId,
        userId: authStore.authId,
        publishedAt: serverTimestamp(),
        posts: [],
        contributors: [],
      };

      const threadRef = doc(collection(db, "threads"));
      const forumRef = doc(collection(db, "forums"), forumId);

      const batch = writeBatch(db);

      batch.set(threadRef, thread);
      batch.update(forumRef, {
        threads: arrayUnion(threadRef.id),
      });

      await batch.commit();
      console.log(threadRef);

      const docRef = await getDoc(threadRef);
      const newThread = {
        ...docRef.data(),
        id: docRef.id,
      } as Thread;
      this.setThread(newThread);
      forumStore.appendThreadToForum(forumId, docRef.id);
      await postStore.savePost(text, docRef.id);

      return newThread;
    },

    updateThread(text: string, title: string, threadId: string) {
      const postStore = usePostsStore();

      const thread = findById(this.threads, threadId) as Thread;
      const post = findById(postStore.posts, thread?.posts[0]) as Post;
      if (!thread || !post) return;

      thread.title = title;
      post.text = text;
    },

    appendPostToThread(threadId: string, postId: string) {
      const thread = findById(this.threads, threadId) as Thread;
      if (!thread) return;
      thread.posts = (thread && thread.posts) || [];
      thread.posts.push(postId);
    },

    appendContributorToThread(threadId: string, userId: string) {
      const thread = findById(this.threads, threadId) as Thread;
      if (!thread) return;
      thread.contributors = (thread && thread.contributors) || [];
      if (thread.contributors.includes(userId)) return;
      thread.contributors.push(userId);
    },
  },
});
