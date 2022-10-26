import type Thread from "@/interfaces/thread";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useForumStore } from "./forums";
import { usePostsStore } from "./posts";
import type Post from "@/interfaces/post";
import type User from "@/interfaces/user";
import {
  fetchAllItems,
  fetchItem,
  makeAppendChildToParentMutation,
} from "@/helpers/piniaHelper";
import { upsert, findById, docToResource } from "@/helpers";
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
      const userRef = doc(collection(db, "users"), thread.userId);

      const batch = writeBatch(db);

      batch.set(threadRef, thread);
      batch.update(forumRef, {
        threads: arrayUnion(threadRef.id),
      });
      batch.update(userRef, {
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
      forumStore.appendThreadToForum({ parentId: forumId, childId: docRef.id });
      authStore.appendThreadToUser({
        parentId: authStore.authId,
        childId: threadRef.id,
      });
      await postStore.savePost(text, docRef.id);

      return newThread;
    },

    async updateThread(text: string, title: string, threadId: string) {
      const postStore = usePostsStore();

      const thread = this.thread(threadId) as Thread;
      const postId = thread?.posts[0];
      const post = postStore.post(postId) as Post;

      if (!thread || !post) return;

      thread.title = title;
      post.text = text;

      const threadRef = doc(collection(db, "threads"), threadId);
      const postRef = doc(collection(db, "posts"), postId);

      const batch = writeBatch(db);

      batch.update(threadRef, {
        title,
      });

      batch.update(postRef, {
        text,
      });

      await batch.commit();

      const newPost = await getDoc(postRef);
      const newThread = await getDoc(threadRef);

      this.setThread(docToResource(newThread) as Thread);
      postStore.setPost(docToResource(newPost) as Post);
    },

    appendPostToThread: (state: any) =>
      makeAppendChildToParentMutation(state, "threads", "posts"),

    appendContributorToThread: (state: any) =>
      makeAppendChildToParentMutation(state, "threads", "contributors"),
  },
});
