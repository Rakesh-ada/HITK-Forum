export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  link?: string;
  subreddit: string;
  author: string;
  authorId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  isStickied?: boolean;
  isLocked?: boolean;
}