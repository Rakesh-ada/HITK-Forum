export interface Subreddit {
  id: string;
  name: string;
  displayName: string;
  description: string;
  createdAt: string;
  subscribers: number;
  iconUrl?: string;
  bannerUrl?: string;
  isNsfw: boolean;
}