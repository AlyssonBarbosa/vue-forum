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
  threads?: Thread[];
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