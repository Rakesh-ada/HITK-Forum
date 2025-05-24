/*
  # Initial Schema Setup

  1. New Tables
    - users: Store user profiles linked to auth.users
    - subreddits: Community/forum information
    - posts: User submissions/posts
    - comments: Post comments with threading support
  
  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for CRUD operations
    
  3. Relationships
    - Users linked to auth.users
    - Posts linked to subreddits and users
    - Comments linked to posts, users, and parent comments
*/

-- Drop existing tables and policies if they exist
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS subreddits CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  karma integer DEFAULT 0,
  email_verified boolean DEFAULT false
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read all users" ON users;
CREATE POLICY "Users can read all users" 
  ON users 
  FOR SELECT 
  TO public 
  USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create subreddits table
CREATE TABLE IF NOT EXISTS subreddits (
  id text PRIMARY KEY,
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  subscribers integer DEFAULT 0,
  icon_url text,
  banner_url text,
  is_nsfw boolean DEFAULT false
);

ALTER TABLE subreddits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read subreddits" ON subreddits;
CREATE POLICY "Anyone can read subreddits"
  ON subreddits
  FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can create subreddits" ON subreddits;
CREATE POLICY "Authenticated users can create subreddits"
  ON subreddits
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id text PRIMARY KEY,
  title text NOT NULL,
  content text,
  image_url text,
  link text,
  subreddit text REFERENCES subreddits(name) ON DELETE CASCADE,
  author text NOT NULL,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  upvotes integer DEFAULT 0,
  downvotes integer DEFAULT 0,
  comment_count integer DEFAULT 0,
  is_stickied boolean DEFAULT false,
  is_locked boolean DEFAULT false
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read posts" ON posts;
CREATE POLICY "Anyone can read posts"
  ON posts
  FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can create posts" ON posts;
CREATE POLICY "Authenticated users can create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can update their posts" ON posts;
CREATE POLICY "Authors can update their posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can delete their posts" ON posts;
CREATE POLICY "Authors can delete their posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id text PRIMARY KEY,
  post_id text REFERENCES posts(id) ON DELETE CASCADE,
  content text NOT NULL,
  author text NOT NULL,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  upvotes integer DEFAULT 0,
  downvotes integer DEFAULT 0,
  parent_id text REFERENCES comments(id) ON DELETE CASCADE,
  level integer DEFAULT 0
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read comments" ON comments;
CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can create comments" ON comments;
CREATE POLICY "Authenticated users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can update their comments" ON comments;
CREATE POLICY "Authors can update their comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can delete their comments" ON comments;
CREATE POLICY "Authors can delete their comments"
  ON comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);