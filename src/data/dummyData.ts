// This file now re-exports from the storage service for backward compatibility
// This allows existing code to continue working without changes

import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  verifyUserEmail,
  getPosts,
  getPostById,
  getSubredditPosts,
  addPost,
  getComments,
  getPostComments,
  addComment,
  getSubreddits,
  getSubredditByName
} from '../services/storageService';

// Re-export everything for backward compatibility
export {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  verifyUserEmail,
  getPosts,
  getPostById,
  getSubredditPosts,
  addPost,
  getComments,
  getPostComments,
  addComment,
  getSubreddits,
  getSubredditByName
};

// For backward compatibility, export the array of users
export const dummyUsers = getUsers();

// For backward compatibility, export the array of posts
export const dummyPosts = getPosts();

// For backward compatibility, export the array of subreddits
export const dummySubreddits = getSubreddits();

// For backward compatibility, export the array of comments
export const dummyComments = getComments();