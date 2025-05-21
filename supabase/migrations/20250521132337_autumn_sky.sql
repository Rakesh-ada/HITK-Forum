/*
  # Fix User Registration

  1. Changes
    - Add INSERT policy for users table to allow new user registration
    - Ensure authenticated users can create their own profile

  2. Security
    - Add policy for authenticated users to insert their own profile
    - Maintain existing policies for read/update
*/

-- Add INSERT policy for users table
CREATE POLICY "Users can create their own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);