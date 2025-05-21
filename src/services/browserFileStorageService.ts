import { v4 as uuidv4 } from 'uuid';
import { User } from "../types/User";
import { Post } from "../types/Post";
import { Comment } from "../types/Comment";
import { Subreddit } from "../types/Subreddit";

// Import the initial JSON data
import usersData from '../data/users.json';
import postsData from '../data/posts.json';
import commentsData from '../data/comments.json';
import subredditsData from '../data/subreddits.json';

// Define the structure of our data store
interface DataStore {
  users: User[];
  posts: Post[];
  comments: Comment[];
  subreddits: Subreddit[];
}

// Function to load data from memory or from localStorage as a fallback
const loadInitialData = (): DataStore => {
  const storedData = localStorage.getItem('forumData');
  
  if (storedData) {
    return JSON.parse(storedData);
  }

  // Use the imported JSON data
  return {
    users: usersData as User[],
    posts: postsData as Post[],
    comments: commentsData as Comment[],
    subreddits: subredditsData as Subreddit[]
  };
};

// Initialize our data store
let dataStore = loadInitialData();

// Save data to localStorage as a backup
const saveData = () => {
  localStorage.setItem('forumData', JSON.stringify(dataStore));
};

// User-related functions
export const getUsers = (): User[] => {
  return dataStore.users;
};

export const getUserById = (userId: string): User | undefined => {
  return dataStore.users.find(user => user.id === userId);
};

export const addUser = (user: Omit<User, 'id' | 'createdAt' | 'karma'>): User => {
  const newUser: User = {
    id: `user-${uuidv4()}`,
    ...user,
    createdAt: new Date().toISOString(),
    karma: 0,
    emailVerified: false
  };
  
  dataStore.users.push(newUser);
  saveData();
  return newUser;
};

export const updateUser = (userId: string, updates: Partial<User>): User | null => {
  const userIndex = dataStore.users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) return null;
  
  dataStore.users[userIndex] = {
    ...dataStore.users[userIndex],
    ...updates
  };
  
  saveData();
  return dataStore.users[userIndex];
};

export const verifyUserEmail = (email: string): boolean => {
  const userIndex = dataStore.users.findIndex(user => user.email === email);
  
  if (userIndex === -1) return false;
  
  dataStore.users[userIndex].emailVerified = true;
  saveData();
  return true;
};

export const getUnverifiedUser = (email: string): User | null => {
  const user = dataStore.users.find(user => 
    user.email === email && user.emailVerified === false
  );
  
  return user || null;
};

// Post-related functions
export const getPosts = (): Post[] => {
  return dataStore.posts;
};

export const getPostById = (postId: string): Post | undefined => {
  return dataStore.posts.find(post => post.id === postId);
};

export const getSubredditPosts = (subredditName: string): Post[] => {
  return dataStore.posts.filter(post => 
    post.subreddit.toLowerCase() === subredditName.toLowerCase()
  );
};

export const addPost = (post: Omit<Post, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'commentCount'>): Post => {
  const newPost: Post = {
    id: `post-${uuidv4()}`,
    ...post,
    createdAt: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0,
    commentCount: 0
  };
  
  dataStore.posts.push(newPost);
  saveData();
  return newPost;
};

// Comment-related functions
export const getComments = (): Comment[] => {
  return dataStore.comments;
};

export const getPostComments = (postId: string): Comment[] => {
  return dataStore.comments.filter(comment => comment.postId === postId);
};

export const addComment = (comment: Omit<Comment, 'id' | 'createdAt' | 'upvotes' | 'downvotes'>): Comment => {
  const newComment: Comment = {
    id: `comment-${uuidv4()}`,
    ...comment,
    createdAt: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0
  };
  
  dataStore.comments.push(newComment);
  
  // Update post comment count
  const postIndex = dataStore.posts.findIndex(post => post.id === comment.postId);
  if (postIndex !== -1) {
    dataStore.posts[postIndex].commentCount += 1;
  }
  
  saveData();
  return newComment;
};

// Vote functions
export const upvotePost = (postId: string, userId: string): boolean => {
  const postIndex = dataStore.posts.findIndex(post => post.id === postId);
  if (postIndex === -1) return false;
  
  dataStore.posts[postIndex].upvotes++;
  saveData();
  return true;
};

export const downvotePost = (postId: string, userId: string): boolean => {
  const postIndex = dataStore.posts.findIndex(post => post.id === postId);
  if (postIndex === -1) return false;
  
  dataStore.posts[postIndex].downvotes++;
  saveData();
  return true;
};

// Subreddit-related functions
export const getSubreddits = (): Subreddit[] => {
  return dataStore.subreddits;
};

export const getSubredditByName = (name: string): Subreddit | undefined => {
  return dataStore.subreddits.find(
    sub => sub.name.toLowerCase() === name.toLowerCase()
  );
};

export const addSubreddit = (subreddit: Omit<Subreddit, 'id' | 'createdAt'>): Subreddit => {
  const newSubreddit: Subreddit = {
    id: `sub-${uuidv4()}`,
    ...subreddit,
    createdAt: new Date().toISOString()
  };
  
  dataStore.subreddits.push(newSubreddit);
  saveData();
  return newSubreddit;
};

// Helper function to export data for syncing with GitHub
export const exportData = (): DataStore => {
  return dataStore;
}; 