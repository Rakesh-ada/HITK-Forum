import { v4 as uuidv4 } from 'uuid';
import { User } from "../types/User";
import { Post } from "../types/Post";
import { Comment } from "../types/Comment";
import { Subreddit } from "../types/Subreddit";
import fs from 'fs';
import path from 'path';

// Define paths for the data files
const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const COMMENTS_FILE = path.join(DATA_DIR, 'comments.json');
const SUBREDDITS_FILE = path.join(DATA_DIR, 'subreddits.json');

// Define the structure of our data store
interface DataStore {
  users: User[];
  posts: Post[];
  comments: Comment[];
  subreddits: Subreddit[];
}

// Helper function to read a JSON file
const readJsonFile = <T>(filePath: string, defaultValue: T): T => {
  try {
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(rawData) as T;
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
  return defaultValue;
};

// Helper function to write to a JSON file
const writeJsonFile = <T>(filePath: string, data: T): void => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
};

// Load data from JSON files
const loadData = (): DataStore => {
  return {
    users: readJsonFile<User[]>(USERS_FILE, []),
    posts: readJsonFile<Post[]>(POSTS_FILE, []),
    comments: readJsonFile<Comment[]>(COMMENTS_FILE, []),
    subreddits: readJsonFile<Subreddit[]>(SUBREDDITS_FILE, []),
  };
};

// Initialize our data store
let dataStore = loadData();

// Save specific data type to its corresponding file
const saveUsers = () => writeJsonFile(USERS_FILE, dataStore.users);
const savePosts = () => writeJsonFile(POSTS_FILE, dataStore.posts);
const saveComments = () => writeJsonFile(COMMENTS_FILE, dataStore.comments);
const saveSubreddits = () => writeJsonFile(SUBREDDITS_FILE, dataStore.subreddits);

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
  saveUsers();
  return newUser;
};

export const updateUser = (userId: string, updates: Partial<User>): User | null => {
  const userIndex = dataStore.users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) return null;
  
  dataStore.users[userIndex] = {
    ...dataStore.users[userIndex],
    ...updates
  };
  
  saveUsers();
  return dataStore.users[userIndex];
};

export const verifyUserEmail = (email: string): boolean => {
  const userIndex = dataStore.users.findIndex(user => user.email === email);
  
  if (userIndex === -1) return false;
  
  dataStore.users[userIndex].emailVerified = true;
  saveUsers();
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
  savePosts();
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
    savePosts();
  }
  
  saveComments();
  return newComment;
};

// Vote functions
export const upvotePost = (postId: string, userId: string): boolean => {
  const postIndex = dataStore.posts.findIndex(post => post.id === postId);
  if (postIndex === -1) return false;
  
  dataStore.posts[postIndex].upvotes++;
  savePosts();
  return true;
};

export const downvotePost = (postId: string, userId: string): boolean => {
  const postIndex = dataStore.posts.findIndex(post => post.id === postId);
  if (postIndex === -1) return false;
  
  dataStore.posts[postIndex].downvotes++;
  savePosts();
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
  saveSubreddits();
  return newSubreddit;
};

// Reload data from files (useful for development)
export const reloadData = (): void => {
  dataStore = loadData();
};

// Save all data to files (useful for development)
export const saveAllData = (): void => {
  saveUsers();
  savePosts();
  saveComments();
  saveSubreddits();
}; 