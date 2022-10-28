import { defineStore } from "pinia";
import type User from "@/interfaces/user";
import { usePostsStore } from "./posts";
import { useThreadStore } from "./threads";
import {
  fetchAllItems,
  fetchItem,
  makeAppendChildToParentMutation,
} from "@/helpers/piniaHelper";
import { docToResource, upsert } from "@/helpers";
import type { userForm } from "@/interfaces/user";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/plugins/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  type Unsubscribe,
} from "firebase/auth";

export type RootState = {
  authId: string | null;
  users: User[];
  fireAuthUnsubscribe: null | Unsubscribe;
};

export const useUsersStore = defineStore("auth", {
  state: () =>
    ({
      authId: null,
      users: [] as User[],
      fireAuthUnsubscribe: null,
    } as RootState),
  getters: {
    user(): Function {
      return getUser;
    },

    userAuth(): User | undefined {
      if (!this.authId) return undefined;

      return getUser(this.authId);
    },
  },
  actions: {
    initAuthentication() {
      if (this.fireAuthUnsubscribe) {
        this.fireAuthUnsubscribe();
      }

      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          console.log("onAuthStateChanged");

          if (user) {
            await useUsersStore().fetchAuthUser();
            resolve(user);
          }

          resolve(null);
        });

        this.fireAuthUnsubscribe = unsubscribe;
      });
    },
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const userRef = await getDoc(doc(db, "users", user.uid));

      if (!userRef.exists()) {
        this.createUser(
          {
            name: user.displayName || "",
            email: user.email || "",
            username: user.email || "",
            avatar: user.photoURL,
          },
          user.uid
        );
      }
    },
    async loginWithEmailAndPassword({ email, password }: any) {
      const auth = getAuth();
      return signInWithEmailAndPassword(auth, email, password);
    },

    async signOut() {
      const auth = getAuth();
      await signOut(auth);

      this.authId = null;
    },

    async createAccountWithEmailAndPassword(user: userForm) {
      if (!user.email || !user.password) return;
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      await this.createUser(user, userCredentials.user.uid);

      this.fetchAuthUser();
    },
    async createUser(user: userForm, id: string) {
      console.log("create user");
      const registeredAt = serverTimestamp();
      const usernameLower = user.username.toLowerCase();

      user.usernameLower = usernameLower;
      user.registeredAt = registeredAt;

      if (!user.avatar) user.avatar = "";
      const userRef = doc(db, "users", id);
      await setDoc(userRef, user);

      const userData = await getDoc(userRef);

      this.setUser(docToResource(userData) as User);

      return docToResource(userData) as User;
    },
    fetchUsers(ids: string[]) {
      return fetchAllItems(useUsersStore, "setUser", "users", ids);
    },

    async fetchAuthUser() {
      const auth = getAuth();

      const userId = auth.currentUser?.uid;

      if (!userId) return;

      this.authId = userId;

      return await this.fetchUser(userId);
    },
    async fetchUser(id: string) {
      return (await fetchItem(useUsersStore, "setUser", "users", id)) as User;
    },
    saveLoggedUser(user: User) {
      const index = this.users.findIndex((u) => u.id === user.id);
      this.users[index] = user;
    },

    setUser(user: User) {
      upsert(this.users, user);
    },

    appendThreadToUser: (state: any) =>
      makeAppendChildToParentMutation(state, "users", "threads"),
    incrementPost(userId: string, value: number = 1) {
      const user = this.users.find((u) => u.id === userId);

      if (user) {
        const total = user.postsCount || 0;

        user.postsCount = total + value;
      }
    },
  },
});

function getUser(id: string): User | undefined {
  const user = useUsersStore().users.find((u) => u.id === id) as User;
  if (!user) return undefined;
  return {
    ...user,
    get listThreads() {
      return useThreadStore().threads.filter((t) => t.userId === id);
    },
    get posts() {
      return usePostsStore().posts.filter((t) => t.userId === id);
    },
    get postsCount(): number {
      return user.postsCount || 0;
    },

    get threadsCount(): number {
      return user.threads?.length || 0;
    },
  };
}
