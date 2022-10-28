import type Post from "@/interfaces/post";
import { defineStore } from "pinia";
import { useUsersStore } from "./user";
import { useThreadStore } from "./threads";
import { fetchAllItems, fetchItem } from "@/helpers/piniaHelper";
import { docToResource, upsert } from "@/helpers";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  increment,
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
      const authStore = useUsersStore();
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
      const userRef = doc(db, "users", post.userId);

      batch.set(postRef, post);
      batch.update(threadRef, {
        posts: arrayUnion(postRef.id),
        contributors: arrayUnion(post.userId),
      });
      batch.update(userRef, {
        postsCount: increment(1),
      });

      await batch.commit();

      const docRef = await getDoc(postRef);

      const newPost = {
        ...docRef.data(),
        id: docRef.id,
      } as Post;

      this.setPost(newPost);

      threadsStore.appendPostToThread({
        parentId: threadId,
        childId: postRef.id,
      });
      threadsStore.appendContributorToThread({
        parentId: threadId,
        childId: authStore.authId,
      });

      authStore.incrementPost(authStore.authId, 1);
    },

    async update(text: string, threadId: string, postId: string) {
      const authStore = useUsersStore();
      const post = {
        text,
        edited: {
          at: serverTimestamp(),
          by: authStore.authId,
          moderated: false,
        },
      };

      const postRef = doc(collection(db, "posts"), postId);

      await updateDoc(postRef, post);

      const newPost = await getDoc(postRef);

      this.setPost(docToResource(newPost) as Post);
    },
  },
});
