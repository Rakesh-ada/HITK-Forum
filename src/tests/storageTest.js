// This file is for manual testing purposes only
// Run with: node storageTest.js

import {
  getUsers,
  addUser,
  getSubreddits,
  getPosts,
  addPost,
  getComments,
  addComment
} from '../services/storageService.js';

// Clear localStorage for testing
localStorage.clear();

console.log('=== Testing Storage Service ===');

// Test user registration
console.log('\n--- Testing User Registration ---');
const newUser = addUser({
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser'
});
console.log('New user created:', newUser);

// Verify users are stored
console.log('\n--- All Users ---');
const allUsers = getUsers();
console.log(allUsers);

// Test creating a post
console.log('\n--- Testing Post Creation ---');
const newPost = addPost({
  title: 'Test Post',
  content: 'This is a test post created by the storage service',
  subreddit: 'askreddit',
  author: newUser.username,
  authorId: newUser.id
});
console.log('New post created:', newPost);

// Verify posts are stored
console.log('\n--- All Posts ---');
const allPosts = getPosts();
console.log(allPosts);

// Test adding a comment
console.log('\n--- Testing Comment Creation ---');
const newComment = addComment({
  postId: newPost.id,
  content: 'This is a test comment on the test post',
  author: newUser.username,
  authorId: newUser.id,
  level: 0
});
console.log('New comment created:', newComment);

// Verify comments are stored
console.log('\n--- All Comments ---');
const allComments = getComments();
console.log(allComments);

// Verify subreddits are available
console.log('\n--- All Subreddits ---');
const allSubreddits = getSubreddits();
console.log(allSubreddits);

console.log('\n=== Storage Service Test Complete ==='); 