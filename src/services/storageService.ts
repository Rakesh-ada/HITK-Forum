import { v4 as uuidv4 } from 'uuid';
import { User } from "../types/User";
import { Post } from "../types/Post";
import { Comment } from "../types/Comment";
import { Subreddit } from "../types/Subreddit";

// Define the structure of our data store
interface DataStore {
  users: User[];
  posts: Post[];
  comments: Comment[];
  subreddits: Subreddit[];
}

// Load initial data from local storage or use defaults
const loadInitialData = (): DataStore => {
  const storedData = localStorage.getItem('forumData');
  
  if (storedData) {
    return JSON.parse(storedData);
  }

  // Default data from original dummyData.ts but with only essential examples
  return {
    users: [
      {
        id: "user-1",
        username: "spez",
        email: "spez@example.com",
        password: "password123",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=spez",
        createdAt: "2005-06-23T18:24:00.000Z",
        karma: 185463,
        emailVerified: true,
      }
    ],
    subreddits: [
      {
        id: "sub-1",
        name: "askreddit",
        displayName: "AskReddit",
        description: "Ask Reddit...anything!",
        createdAt: "2008-01-25T00:00:00.000Z",
        subscribers: 42069420,
        iconUrl: "https://images.pexels.com/photos/5308281/pexels-photo-5308281.jpeg?auto=compress&cs=tinysrgb&w=300",
        bannerUrl: "https://images.pexels.com/photos/5308281/pexels-photo-5308281.jpeg?auto=compress",
        isNsfw: false,
      }
    ],
    posts: [],
    comments: []
  };
};

// Initialize our store
let dataStore = loadInitialData();

// Save data to localStorage
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

// Add new function for direct verification
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

// Subreddit-related functions
export const getSubreddits = (): Subreddit[] => {
  return dataStore.subreddits;
};

export const getSubredditByName = (name: string): Subreddit | undefined => {
  return dataStore.subreddits.find(
    sub => sub.name.toLowerCase() === name.toLowerCase()
  );
};

// Add some default communities if they don't exist yet
export const initializeDefaultData = () => {
  // Only initialize if we don't have communities
  if (dataStore.subreddits.length <= 1) {
    // Load more communities from the original dummyData
    dataStore.subreddits = [
      ...dataStore.subreddits,
      {
        id: "sub-2",
        name: "pics",
        displayName: "Pics",
        description: "A place for pictures and photographs.",
        createdAt: "2008-01-25T00:00:00.000Z",
        subscribers: 29472123,
        iconUrl: "https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=300",
        bannerUrl: "https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress",
        isNsfw: false,
      },
      {
        id: "sub-3",
        name: "funny",
        displayName: "Funny",
        description: "Welcome to r/Funny, Reddit's home for humor.",
        createdAt: "2008-01-25T00:00:00.000Z",
        subscribers: 25123456,
        iconUrl: "https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&cs=tinysrgb&w=300",
        bannerUrl: "https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress",
        isNsfw: false,
      },
      {
        id: "sub-4",
        name: "news",
        displayName: "News",
        description: "The place for news articles about current events.",
        createdAt: "2008-01-25T00:00:00.000Z",
        subscribers: 24123456,
        iconUrl: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=300",
        bannerUrl: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress",
        isNsfw: false,
      }
    ];
    saveData();
  }
};

// Initialize default data
initializeDefaultData(); 