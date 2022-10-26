import type User from "./user";

export default interface Thread {
  id: string;
  title: string;
  publishedAt: any;
  posts: string[];
  userId: string;
  forumId: string;
  contributors: string[];
  author?: User;
  countReplies?: number;
  countContributors?: number;
}
