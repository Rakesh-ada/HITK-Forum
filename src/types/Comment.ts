export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  parentId?: string;
  level: number;
}