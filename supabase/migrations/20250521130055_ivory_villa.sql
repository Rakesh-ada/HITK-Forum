/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - username (text, unique)
      - email (text, unique) 
      - avatar_url (text)
      - created_at (timestamp)
      - karma (integer)
      - email_verified (boolean)

    - subreddits
      - id (text, primary key)
      - name (text, unique)
      - display_name (text)
      - description (text)
      - created_at (timestamp)
      - subscribers (integer)
      - icon_url (text)
      - banner_url (text)
      - is_nsfw (boolean)

    - posts
      - id (text, primary key)
      - title (text)
      - content (text)
      - image_url (text)
      - link (text)
      - subreddit (text, references subreddits)
      - author (text)
      - author_id (uuid, references auth.users)
      - created_at (timestamp)
      - upvotes (integer)
      - downvotes (integer)
      - comment_count (integer)
      - is_stickied (boolean)
      - is_locked (boolean)

    - comments
      - id (text, primary key)
      - post_id (text, references posts)
      - content (text)
      - author (text)
      - author_id (uuid, references auth.users)
      - created_at (timestamp)
      - upvotes (integer)
      - downvotes (integer)
      - parent_id (text, self-reference)
      - level (integer)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

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

CREATE POLICY "Users can read all users" 
  ON users 
  FOR SELECT 
  TO public 
  USING (true);

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

CREATE POLICY "Anyone can read subreddits"
  ON subreddits
  FOR SELECT
  TO public
  USING (true);

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

CREATE POLICY "Anyone can read posts"
  ON posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

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

CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their comments"
  ON comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);