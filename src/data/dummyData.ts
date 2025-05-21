// This file now re-exports from the browser file storage service for backward compatibility
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
  getSubredditByName,
  upvotePost,
  downvotePost,
  addSubreddit,
  exportData
} from '../services/browserFileStorageService';

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
  getSubredditByName,
  upvotePost,
  downvotePost,
  addSubreddit,
  exportData
};

// For backward compatibility, export the array of users
export const dummyUsers = getUsers();

// For backward compatibility, export the array of posts
export const dummyPosts = getPosts();

// For backward compatibility, export the array of subreddits
export const dummySubreddits = getSubreddits();

// For backward compatibility, export the array of comments
export const dummyComments = getComments();

// Initialize the export button if in development mode
import { createExportButton } from '../scripts/syncDataToGithub';

// Add the export button in development mode
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Wait for DOM to be ready before adding the button
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createExportButton);
  } else {
    createExportButton();
  }
}