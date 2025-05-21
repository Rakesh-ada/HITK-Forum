export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  avatarUrl: string;
  createdAt: string;
  karma: number;
}