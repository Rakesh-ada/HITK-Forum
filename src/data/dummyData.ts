import { User } from "../types/User";
import { Post } from "../types/Post";
import { Comment } from "../types/Comment";
import { Subreddit } from "../types/Subreddit";

export const dummyUsers: User[] = [
  {
    id: "user-1",
    username: "spez",
    email: "spez@example.com",
    password: "password123",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=spez",
    createdAt: "2005-06-23T18:24:00.000Z",
    karma: 185463,
  },
  {
    id: "user-2",
    username: "gallowboob",
    email: "gallowboob@example.com",
    password: "password123",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=gallowboob",
    createdAt: "2011-01-25T03:30:00.000Z",
    karma: 36547891,
  },
  {
    id: "user-3",
    username: "shittymorph",
    email: "shittymorph@example.com",
    password: "password123",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=shittymorph",
    createdAt: "2016-02-14T12:48:00.000Z",
    karma: 1250489,
  },
  {
    id: "user-4",
    username: "poem_for_your_sprog",
    email: "sprog@example.com",
    password: "password123",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=poem_for_your_sprog",
    createdAt: "2011-07-28T15:11:00.000Z",
    karma: 4215637,
  },
];

export const dummySubreddits: Subreddit[] = [
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
  },
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
  },
  {
    id: "sub-5",
    name: "worldnews",
    displayName: "World News",
    description: "A place for major news from around the world.",
    createdAt: "2008-01-25T00:00:00.000Z",
    subscribers: 30123456,
    iconUrl: "https://images.pexels.com/photos/327533/pexels-photo-327533.jpeg?auto=compress&cs=tinysrgb&w=300",
    bannerUrl: "https://images.pexels.com/photos/327533/pexels-photo-327533.jpeg?auto=compress",
    isNsfw: false,
  },
];

export const dummyPosts: Post[] = [
  {
    id: "post-1",
    title: "What's a movie that genuinely disturbed you?",
    content: "I'm talking about a movie that left you feeling unsettled or disturbed for days after watching it.",
    subreddit: "askreddit",
    author: "spez",
    authorId: "user-1",
    createdAt: "2023-04-01T14:22:00.000Z",
    upvotes: 45982,
    downvotes: 541,
    commentCount: 24632,
  },
  {
    id: "post-2",
    title: "Amazing sunset in Bali",
    content: "Captured this amazing sunset while on vacation in Bali last week.",
    imageUrl: "https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subreddit: "pics",
    author: "gallowboob",
    authorId: "user-2",
    createdAt: "2023-04-02T08:15:00.000Z",
    upvotes: 89721,
    downvotes: 1253,
    commentCount: 3219,
  },
  {
    id: "post-3",
    title: "My dog has no idea how mirrors work",
    content: "He keeps barking at his own reflection thinking it's another dog.",
    imageUrl: "https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subreddit: "funny",
    author: "shittymorph",
    authorId: "user-3",
    createdAt: "2023-04-03T12:45:00.000Z",
    upvotes: 65432,
    downvotes: 876,
    commentCount: 2341,
  },
  {
    id: "post-4",
    title: "Breaking: Major tech company announces layoffs",
    content: "A major tech company has announced it will lay off 10% of its workforce due to economic concerns.",
    link: "https://example.com/tech-layoffs",
    subreddit: "news",
    author: "poem_for_your_sprog",
    authorId: "user-4",
    createdAt: "2023-04-02T15:30:00.000Z",
    upvotes: 12543,
    downvotes: 321,
    commentCount: 4532,
  },
  {
    id: "post-5",
    title: "War in Eastern Europe: Peace talks scheduled for next week",
    content: "Diplomats announced that peace talks will begin next week in an attempt to end the ongoing conflict.",
    link: "https://example.com/peace-talks",
    subreddit: "worldnews",
    author: "gallowboob",
    authorId: "user-2",
    createdAt: "2023-04-03T10:15:00.000Z",
    upvotes: 35612,
    downvotes: 542,
    commentCount: 6543,
  },
  {
    id: "post-6",
    title: "What's something that's normal in your country but weird to the rest of the world?",
    content: "Every country has its quirks. What's something that people do in your country that would seem strange to foreigners?",
    subreddit: "askreddit",
    author: "shittymorph",
    authorId: "user-3",
    createdAt: "2023-04-01T19:12:00.000Z",
    upvotes: 32145,
    downvotes: 432,
    commentCount: 18765,
  },
  {
    id: "post-7",
    title: "I spent 200 hours drawing this ultra-realistic portrait",
    content: "This is my latest drawing. I used charcoal and graphite on 18x24 paper.",
    imageUrl: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subreddit: "pics",
    author: "poem_for_your_sprog",
    authorId: "user-4",
    createdAt: "2023-04-02T22:08:00.000Z",
    upvotes: 75234,
    downvotes: 821,
    commentCount: 2934,
  },
];

export const dummyComments: Comment[] = [
  {
    id: "comment-1",
    postId: "post-1",
    content: "Requiem for a Dream. I felt physically ill after watching it.",
    author: "gallowboob",
    authorId: "user-2",
    createdAt: "2023-04-01T14:35:00.000Z",
    upvotes: 15234,
    downvotes: 123,
    level: 0,
  },
  {
    id: "comment-2",
    postId: "post-1",
    content: "I agree. The ending was brutal and left me feeling empty inside.",
    author: "shittymorph",
    authorId: "user-3",
    createdAt: "2023-04-01T14:40:00.000Z",
    upvotes: 8765,
    downvotes: 87,
    parentId: "comment-1",
    level: 1,
  },
  {
    id: "comment-3",
    postId: "post-1",
    content: "Hereditary. That car scene haunts me to this day.",
    author: "poem_for_your_sprog",
    authorId: "user-4",
    createdAt: "2023-04-01T14:42:00.000Z",
    upvotes: 12543,
    downvotes: 143,
    level: 0,
  },
  {
    id: "comment-4",
    postId: "post-2",
    content: "Wow, the colors are absolutely stunning! What camera did you use?",
    author: "spez",
    authorId: "user-1",
    createdAt: "2023-04-02T08:30:00.000Z",
    upvotes: 4321,
    downvotes: 54,
    level: 0,
  },
  {
    id: "comment-5",
    postId: "post-2",
    content: "Just an iPhone 14 Pro. The camera on this thing is incredible!",
    author: "gallowboob",
    authorId: "user-2",
    createdAt: "2023-04-02T08:35:00.000Z",
    upvotes: 3452,
    downvotes: 32,
    parentId: "comment-4",
    level: 1,
  },
];

// Get posts for a specific subreddit
export const getSubredditPosts = (subredditName: string): Post[] => {
  return dummyPosts.filter(post => post.subreddit.toLowerCase() === subredditName.toLowerCase());
};

// Get a specific post by ID
export const getPostById = (postId: string): Post | undefined => {
  return dummyPosts.find(post => post.id === postId);
};

// Get comments for a specific post
export const getPostComments = (postId: string): Comment[] => {
  return dummyComments.filter(comment => comment.postId === postId);
};

// Get a specific subreddit by name
export const getSubredditByName = (name: string): Subreddit | undefined => {
  return dummySubreddits.find(sub => sub.name.toLowerCase() === name.toLowerCase());
};