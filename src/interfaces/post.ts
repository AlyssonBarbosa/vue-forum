import type { FieldValue } from "firebase/firestore";

export default interface Post {
  id: string;
  publishedAt: any;
  userId: string;
  text: string;
  threadId: string;
}
