import type Post from "./post";
import type Thread from "./thread";

export default interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  lastVisitAt: number;
  isModerator: boolean;
  registeredAt: number;
  username: string;
  usernameLower: string;
  bio?: string;
  website?: string;
  location: string;
  posts?: Post[];
  threads?: string[];
  listThreads: Thread[];
  postsCount?: number;
  threadsCount?: number;
}

export interface UserAuth {
  id: string;
  name: string;
  avatar: string;
  email: string;
  lastVisitAt: number;
  isModerator: boolean;
  registeredAt: number;
  username: string;
  usernameLower: string;
  bio?: string;
  website?: string;
  posts: Post[];
  postsCount: number;
  threads: Thread[];
  threadsCount: number;
  location: string;
}

export interface userForm {
  name: string;
  avatar: string | null;
  email: string;
  username: string;
  usernameLower?: string | null;
  password?: string;
  registeredAt?: any;
}
